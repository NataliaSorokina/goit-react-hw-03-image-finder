import { Component } from "react";
import { toast } from "react-toastify";
import {
  Header,
  SearchForm,
  SearchBtn,
  SearchBtnLabel,
  Input,
} from "./Searchbar.styled";

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
    this.setState({ searchQuery: "" });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <SearchBtnLabel>Search</SearchBtnLabel>
          </SearchBtn>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleSearchQuery}
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;
