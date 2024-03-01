  import React from "react";
  import { Modal, Button, ModalFooter } from "react-bootstrap";

  const CustomModal = ({ showModal, closeModal, children }) => {
    return (
      <Modal show={showModal}    onHide={closeModal} centered>
        <Modal.Body>
            {children}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" className="btn btn-danger" onClick={closeModal}>
                  Close
            </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  export default CustomModal;
