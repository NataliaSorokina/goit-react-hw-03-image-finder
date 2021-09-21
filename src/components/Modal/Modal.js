import { Component } from "react";
import { Overlay, ModalWindow } from "./Modal.styled";
// import PropTypes from 'prop-types';
// import React, Component from 'react';
// import * as basicLightbox from 'basiclightbox';

// const modalRoot = document.querySelector('#modal-root');

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
      // console.log('currentTarget: ', event.currentTarget);
      // console.log('target: ', event.target);
      this.props.onClose();
    }
  };

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      // console.log('Escape');

      this.props.onClose();
    }
  };

  render() {
    const { fullImage } = this.props;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img
            src={fullImage.largeImageURL}
            alt={fullImage.tags}
            /* width='800' */ height="700"
          />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;
