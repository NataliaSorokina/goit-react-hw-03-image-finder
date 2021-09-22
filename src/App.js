import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { AppComponent } from "./App.styled.js";
import { fetchImages } from "API-service/API-service";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import Modal from "components/Modal/Modal";

class App extends React.Component {
  state = {
    searchQuery: "",
    page: 1,
    per_page: 12,
    totalImages: 0,
    images: [],
    searchStatus: "idle",
    largeImage: "",
    showModal: false,
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      images: [],
    });
  };

  handlePageIncrement = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  handleModalToggle = (fullImage) => {
    this.setState(({ showModal }) => ({
      largeImage: !showModal ? fullImage : "",
      showModal: !showModal,
    }));
  };

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, per_page } = this.state;
    const shouldFetch =
      prevState.searchQuery !== searchQuery && searchQuery !== "";
    const shouldFetchMore = prevState.page !== page;

    try {
      if (shouldFetch) {
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
      }
      if (shouldFetchMore) {
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
        this.handleScroll();
      }
    } catch (error) {
      this.setState({ searchStatus: "rejected" });
      console.log(error);
      toast.error("Error. We are sorry, but something went wrong.");
    }
  }

  render() {
    const {
      images,
      searchStatus,
      per_page,
      totalImages,
      showModal,
      largeImage,
    } = this.state;
    const shouldRenderButton =
      totalImages > per_page && searchStatus !== "pending";
    return (
      <AppComponent>
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        {searchStatus === "pending" && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} onSelect={this.handleModalToggle} />
        )}
        {shouldRenderButton && <Button onClick={this.handlePageIncrement} />}
        {showModal && (
          <Modal fullImage={largeImage} onClose={this.handleModalToggle} />
        )}
        <ToastContainer autoClose={3000} />
      </AppComponent>
    );
  }
}

export default App;
