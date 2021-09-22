import { Component } from "react";
import { Overlay, ModalWindow } from "./Modal.styled";
import PropTypes from "prop-types";

class Modal extends Component {
  componentDidMount() {
    console.log("Modal componentDidMount");
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log("Modal componentWillUnmount");
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    const { fullImage } = this.props;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={fullImage.largeImageURL} alt={fullImage.tags} />
        </ModalWindow>
      </Overlay>
    );
  }
}

Overlay.propTypes = {
  fullImage: PropTypes.object,
  onClose: PropTypes.func,
};

export default Modal;
