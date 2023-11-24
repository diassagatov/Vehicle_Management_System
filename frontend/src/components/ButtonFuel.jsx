// src/index.css or your main CSS file
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FuelFormPage from "./FuelFormPage";

const ButtonFuel = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Complete
      </Button>
      <FuelFormPage
        record={props.record}
        token={props.token}
        show={showModal}
        close={handleClose}
        reload={props.reload}
        setReload={props.setReload}
      />
    </div>
  );
};

export default ButtonFuel;
