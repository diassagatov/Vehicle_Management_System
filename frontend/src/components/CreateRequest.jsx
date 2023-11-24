import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateMaintRequest = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [status, setStatus] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request using fetch
      const response = await fetch(props.link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          DRIVER_ID: driverId,
          VEHICLE_ID: vehicleId,
          STATUS: status,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Close the modal after successful submission
      closeModal();
    } catch (error) {
      console.error("Error submitting maintenance request:", error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        {props.title}
      </Button>

      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDriverId">
              <Form.Label>Driver ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Driver ID"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formVehicleId">
              <Form.Label>Vehicle ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Vehicle ID"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateMaintRequest;
