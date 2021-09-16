import React from "react";
import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import Searchbar from "components/Searchbar/Searchbar";
import API from "components/API-service/API-service";

class App extends React.Component {
  state = {
    searchQuery: "",
    // page: 1,
    // per_page: 40,
    // loading: false,
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div className="photo-card">
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        <API searchQuery={this.state.searchQuery} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
