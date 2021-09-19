import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import { fetchImages } from "API-service/API-service";
import Searchbar from "components/Searchbar/Searchbar";

class App extends React.Component {
  state = {
    searchQuery: "",
    page: 1,
    per_page: 40,
    images: [],
    searchStatus: "idle",
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, per_page } = this.state;
    const shouldFetch =
      prevState.searchQuery !== searchQuery && searchQuery !== "";

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
      } catch (error) {
        this.setState({ searchStatus: "rejected" });
        console.log(error);
        toast.error("Error. We are sorry, but something went wrong.");
      }
    }
  }

  render() {
    return (
      <div className="photo-card">
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
