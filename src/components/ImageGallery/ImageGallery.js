import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

function ImageGallery({ images }) {
  return (
    <ul /* className="ImageGallery" */>
      {images.map(({ webformatURL, tags, id }) => (
        <ImageGalleryItem src={webformatURL} alt={tags} key={id} />
      ))}
    </ul>
  );
}

export default ImageGallery;
