import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.baseURL = "https://pixabay.com/api/";
axios.defaults.params = new URLSearchParams({
  key: "22624965-297697bc75a5089bebc4e5f11",
  image_type: "photo",
  orientation: "horizontal",
});

export const fetchImages = async (searchQuery, page, per_page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&per_page=${per_page}`
  );
  return response.data;
};

fetchImages.propTypes = {
  searchQuery: PropTypes.array,
  page: PropTypes.number,
  per_page: PropTypes.number,
};
