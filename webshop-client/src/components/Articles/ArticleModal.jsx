import React from "react";
import Modal from "react-bootstrap/Modal";
import ArticleForm from "./ArticleForm";

const ArticleModal = ({ isVisible, data, handleClose, handleConfirm }) => {
  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ArticleForm handleSubmit={handleConfirm} articleData={data} />
      </Modal.Body>
    </Modal>
  );
};

export default ArticleModal;
