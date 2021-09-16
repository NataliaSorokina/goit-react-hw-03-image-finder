import { Component } from "react";
import { toast } from "react-toastify";
import { ImSearch } from "react-icons/im";

class Searchbar extends Component {
  state = {
    searchQuery: "",
  };

  handleSearchQuery = (event) => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === "") {
      toast.error("Enter search query!");
      return;
    }
    this.props.onFormSubmit(this.state.searchQuery);
    // this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <ImSearch style={{ marginRight: 8 }} />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleSearchQuery}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
