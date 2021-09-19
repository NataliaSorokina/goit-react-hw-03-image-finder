import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import { fetchImages } from "API-service/API-service";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Button from "components/Button/Button";

class App extends React.Component {
  state = {
    searchQuery: "",
    page: 1,
    per_page: 40,
    images: [],
    totalImages: 0,
    searchStatus: "idle",
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  incrementPage = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, per_page } = this.state;
    const shouldFetch =
      prevState.searchQuery !== searchQuery && searchQuery !== "" && page === 1;
    const shouldFetchMore = prevState.page !== page;

    if (shouldFetch) {
      try {
        this.setState({ searchStatus: "pending", images: [] });
        const result = await fetchImages(searchQuery, page, per_page);
        this.setState({ searchStatus: "resolved" });
        const { hits, totalHits } = result;
        if (hits.length === 0) {
          toast.error(
            `Sorry, there are no images matching your search query '${searchQuery}'. Please try again.`
          );
          return;
        }
        if (hits.length > 0 && page === 1) {
          toast(`Hooray! We found ${totalHits} images.`);
        }
        if (totalHits < page * per_page) {
          toast(
            "We are sorry, but you have reached the end of search results."
          );
        }

        this.setState({
          images: [...this.state.images, ...hits],
          totalImages: totalHits,
        });
      } catch (error) {
        this.setState({ searchStatus: "rejected" });
        console.log(error);
        toast.error("Error. We are sorry, but something went wrong.");
      }
    }

    if (shouldFetchMore) {
      try {
        this.setState({
          searchStatus: "pending",
          images: [...this.state.images],
        });
        const result = await fetchImages(searchQuery, page, per_page);
        this.setState({ searchStatus: "resolved" });
        const { hits } = result;
        this.setState({
          images: [...this.state.images, ...hits],
        });
        console.log(result);
      } catch (error) {
        this.setState({ searchStatus: "rejected" });
        console.log(error);
        toast.error("Error. We are sorry, but something went wrong.");
      }
    }
  }

  render() {
    const { images, searchStatus, per_page, totalImages } = this.state;
    const shouldRenderButton =
      (totalImages > per_page) & (searchStatus !== "pending");
    return (
      <div className="photo-card">
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {shouldRenderButton && <Button onClick={this.incrementPage} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
