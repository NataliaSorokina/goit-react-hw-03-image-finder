import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

function ImageGallery({ images, onSelect }) {
  return (
    <ul /* className='ImageGallery' */>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onSelect={() => onSelect(image)}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
