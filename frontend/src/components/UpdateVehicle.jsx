import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UpdateVehicle = (props) => {
  const [vehicleData, setVehicleData] = useState({
    MAKE: props.record["MAKE"],
    MODEL: props.record["MODEL"],
    YEAR: props.record["YEAR"],
    LIC_PLATE: props.record["LIC_PLATE"],
    DRIVER: props.record["DRIVER"],
    TYPE: props.record["TYPE"],
    MILEAGE: props.record["MILEAGE"],
    USED_TIME: props.record["USED_TIME"],
    SITTING_CAP: props.record["SITTING_CAP"],
    PRICE: props.record["PRICE"],
  });
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://daniyarkoishin.pythonanywhere.com/vehicles/${props.record["VEHICLE_ID"]}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(vehicleData),
        }
      );

      if (response.ok) {
        console.log("Vehicle updated successfully!");
        props.setReload(!props.reload);
      } else {
        // Log error details
        const errorData = await response.json();
        console.error(
          "Error updating vehicle:",
          response.statusText,
          errorData
        );

        // Set error message
        setErrorMessage(errorData.message || "An error occurred");
      }
    } catch (error) {
      // Log network error details
      console.error("Error updating vehicle:", error);

      // Set error message
      setErrorMessage("An error occurred");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="MAKE">Make</label>
              <input
                type="text"
                name="MAKE"
                value={props.record["MAKE"]}
                onChange={handleChange}
                className="form-control"
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="MODEL">Model</label>
              <input
                type="text"
                name="MODEL"
                value={props.record["MODEL"]}
                onChange={handleChange}
                className="form-control"
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="YEAR">Year</label>
              <input
                type="number"
                min="0"
                value={props.record["YEAR"]}
                className="form-control"
                name="YEAR"
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="LIC_PLATE">License Plate</label>
              <input
                type="text"
                name="LIC_PLATE"
                defaultValue={props.record["LIC_PLATE"]}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="TYPE">Type</label>
              <input
                type="text"
                name="TYPE"
                value={props.record["TYPE"]}
                onChange={handleChange}
                className="form-control"
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="MILEAGE">Mileage</label>
              <input
                type="number"
                min="0"
                step="0.1"
                defaultValue={props.record["MILEAGE"]}
                className="form-control"
                name="MILEAGE"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="SITTING_CAP">Sitting Capacity</label>
              <input
                type="number"
                min="0"
                value={props.record["SITTING_CAP"]}
                className="form-control"
                name="SITTING_CAP"
                readOnly
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="PRICE">Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                defaultValue={props.record["PRICE"]}
                className="form-control"
                name="PRICE"
                onChange={handleChange}
              />
            </div>

            <input
              type="submit"
              className="btn btn-success"
              onClick={handleClose}
              value="Save Changes"
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateVehicle;
