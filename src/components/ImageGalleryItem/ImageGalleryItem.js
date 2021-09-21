import React from "react";

function ImageGalleryItem({ onSelect, image }) {
  const { webformatURL, tags } = image;
  return (
    <li onClick={onSelect} /*  className='ImageGalleryItem' */>
      <img
        src={webformatURL}
        alt={tags}
        /* className='ImageGalleryItem-image' */
      />
    </li>
  );
}

export default ImageGalleryItem;
