import React from "react";

function Button({ onClick }) {
  return (
    <button type="button" class="load-more" onClick={onClick}>
      Load more
    </button>
  );
}

export default Button;
