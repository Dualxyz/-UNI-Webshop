import React from "react";
import Modal from "react-bootstrap/Modal";
import EditForm from "./EditForm";

const UserModal = ({ isVisible, data, handleClose, handleConfirm }) => {
  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditForm handleSubmit={handleConfirm} userData={data} />
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
