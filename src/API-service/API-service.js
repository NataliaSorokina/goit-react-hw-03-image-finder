import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.baseURL = "https://pixabay.com/api/";
axios.defaults.params = {
  key: "22624965-297697bc75a5089bebc4e5f11",
  image_type: "photo",
  orientation: "horizontal",
};

export const fetchImages = async (searchQuery, page, per_page) => {
  return await axios
    .get("", {
      params: { q: searchQuery, page, per_page },
    })
    .then((response) => response.data);
};

fetchImages.propTypes = {
  searchQuery: PropTypes.array,
  page: PropTypes.number,
  per_page: PropTypes.number,
};
