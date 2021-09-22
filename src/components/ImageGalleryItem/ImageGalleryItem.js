import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemImage } from "./ImageGalleryItem.styled";

function ImageGalleryItem({ onSelect, image }) {
  const { webformatURL, tags } = image;
  return (
    <ListItem onClick={onSelect}>
      <ListItemImage src={webformatURL} alt={tags} />
    </ListItem>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
