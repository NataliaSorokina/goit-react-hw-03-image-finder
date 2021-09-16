import { Component } from "react";

class API extends Component {
  state = {
    // searchQuery: '',
    page: 1,
    per_page: 12,
    // loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      console.log("Изменился запрос");
      console.log("prevProps.searchQuery: ", prevProps.searchQuery);
      console.log("this.props.searchQuery: ", this.props.searchQuery);
    }
    fetch(
      `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.state.page}&key=22624965-297697bc75a5089bebc4e5f11&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}`
    )
      .then((response) => response.json())
      .then(console.log);
  }

  render() {
    return (
      <div>
        <p>{this.props.API}</p>
      </div>
    );
  }
}

export default API;
