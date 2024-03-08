import React from "react";
import { Modal, Button, ModalFooter } from "react-bootstrap";

const CustomModal2 = ({ showModal2, closeModal2, children }) => {
  return (
    <Modal show={showModal2}    onHide={closeModal2} centered>
      <Modal.Body>
          {children}
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" className="btn btn-danger" onClick={closeModal2}>
                Close
          </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal2;
