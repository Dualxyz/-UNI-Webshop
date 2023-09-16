import React from "react";
import Modal from "react-bootstrap/Modal";
import VerificationForm from "./VerificationForm";

const VerificationModal = ({ isVisible, data, handleClose, handleConfirm }) => {
  return (
    data && (
      <Modal show={isVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify {data.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VerificationForm handleSubmit={handleConfirm} userData={data} />
        </Modal.Body>
      </Modal>
    )
  );
};

export default VerificationModal;
