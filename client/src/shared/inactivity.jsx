import React from 'react';
import { Modal,Button } from "react-bootstrap";
const Inactivity = ({show,handleClose})=>{

    return (
      <>
      {console.log(show)}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>You have been inactive for a while. Your session will end soon.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default Inactivity;