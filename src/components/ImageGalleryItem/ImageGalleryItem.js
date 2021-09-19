import React from "react";

function ImageGalleryItem({ src, alt, key }) {
  return (
    <li /*  className="ImageGalleryItem" */>
      <img
        src={src}
        alt={alt}
        id={key} /* className="ImageGalleryItem-image" */
      />
    </li>
  );
}

export default ImageGalleryItem;
