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
      prevState.searchQuery !== searchQuery || prevState.page !== page;

    if (shouldFetch) {
      try {
        this.setState({ searchStatus: "pending" });
        const result = await fetchImages(searchQuery, page, per_page);
        const { hits, totalHits } = result;
        if (hits.length === 0) {
          toast.error(
            `Sorry, there are no images matching your search query '${searchQuery}'. Please try again.`
          );
          return;
        }
        if (hits.length > 0 && page === 1) {
          toast(`${totalHits} images found.`);
        }
        if (totalHits < page * per_page) {
          toast("Sorry, but you have reached the end of search results.");
        }
        this.setState(
          (prevState) => ({
            searchStatus: "resolved",
            images: [...prevState.images, ...hits],
            totalImages: totalHits,
          }),
          () => {
            this.handleScroll();
          }
        );
      } catch (error) {
        this.setState({ searchStatus: "rejected" });
        toast.error("Error. We are sorry, but something went wrong.");
        console.log(error);
      }
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
