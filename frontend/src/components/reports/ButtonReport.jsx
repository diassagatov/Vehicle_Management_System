// src/index.css or your main CSS file
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import FuelFormPage from './FuelFormPage';
import ReportListPage from "./ReportListPage";

const ButtonReport = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Generate a report
      </Button>

      <ReportListPage
        record={props.record}
        token={props.token}
        show={showModal}
        close={handleClose}
        name={props.title}
      />
    </div>
  );
};

export default ButtonReport;
