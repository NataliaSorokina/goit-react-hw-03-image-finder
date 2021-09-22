import React from "react";
import PropTypes from "prop-types";
import { List } from "./ImageGallery.styled";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

function ImageGallery({ images, onSelect }) {
  return (
    <List>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onSelect={() => onSelect(image)}
        />
      ))}
    </List>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.object,
  onSelect: PropTypes.func,
};

export default ImageGallery;
