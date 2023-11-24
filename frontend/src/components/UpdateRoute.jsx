import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UpdateRoute = (props) => {
  const [routeData, setRouteData] = useState({
    ROUTE_ID: props.record["ROUTE_ID"],
    START_TIME: props.record["START_TIME"],
    FINISH_TIME: props.record["FINISH_TIME"],
    START_LOC: props.record["START_LOC"],
    FINISH_LOC: props.record["FINISH_LOC"],
    DISTANCE: props.record["DISTANCE"],
    PURPOSE: props.record["PURPOSE"],
    STATUS: props.record["STATUS"],
    DRIVER_ID: props.record["DRIVER_ID"],
    VEHICLE_ID: props.record["VEHICLE_ID"],
  });
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://daniyarkoishin.pythonanywhere.com/routes/${props.record["ROUTE_ID"]}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(routeData),
        }
      );

      if (response.ok) {
        console.log("Route updated successfully!");
        handleClose();
        props.setReload(!props.reload);
      } else {
        const errorData = await response.json();
        console.error("Error updating route:", response.statusText, errorData);
        setErrorMessage(errorData.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error updating route:", error);
      setErrorMessage("An error occurred");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Complete Route
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* Fields for each route attribute */}
            {Object.keys(routeData).map((key) => (
              <div className="form-group" key={key}>
                <label htmlFor={key}>{key.replace(/_/g, " ")}</label>
                <input
                  type={key === "DISTANCE" ? "number" : "text"}
                  name={key}
                  value={routeData[key]}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={["ROUTE_ID", "DRIVER_ID", "VEHICLE_ID"].includes(
                    key
                  )}
                />
              </div>
            ))}
            <input
              type="submit"
              className="btn btn-success"
              value="Save Changes"
            />
          </form>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateRoute;
