import React, { useState, useEffect } from "react";

const AssignRecords = (props) => {
  const [vehicleData, setVehicleData] = useState({
    START_TIME: "",
    FINISH_TIME: "2023-05-13T13:30",
    START_LOC: "",
    FINISH_LOC: "",
    DRIVER_ID: "",
    VEHICLE_ID: "",
    DISTANCE: props.DISTANCE,
    PURPOSE: "",
    STATUS: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setVehicleData((prevData) => ({
      ...prevData,
      DISTANCE: props.DISTANCE,
    }));
  }, [props.DISTANCE]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "FINISH_TIME") {
      // Prevent updating FINISH_TIME
      setVehicleData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://daniyarkoishin.pythonanywhere.com/routes/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(vehicleData),
        }
      );
      console.log(JSON.stringify(vehicleData));
      if (response.ok) {
        // Clear form fields
        setVehicleData({
          START_TIME: "",
          FINISH_TIME: "",
          START_LOC: "",
          FINISH_LOC: "",
          DRIVER_ID: "",
          VEHICLE_ID: "",
          DISTANCE: "",
          PURPOSE: "",
          STATUS: "",
        });

        // Handle success, e.g., show a success message or redirect
        console.log("Vehicle created successfully!");
      } else {
        // Log error details
        const errorData = await response.json();
        console.error("Error creating assign:", response.statusText, errorData);

        // Set error message
        setErrorMessage(errorData.message || "An error occurred");
      }
    } catch (error) {
      // Log network error details
      console.error("Error creating vehicle:", error);

      // Set error message
      setErrorMessage("An error occurred");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Assign Route to Driver</h2>
      <div className="mb-3">
        <label htmlFor="START_TIME" className="form-label">
          START TIME
        </label>
        <input
          type="datetime-local"
          min="2000-01-01T00:00"
          className="form-control"
          name="START_TIME"
          value={vehicleData.START_TIME}
          onChange={handleChange}
          required
        />
      </div>
      0
      <div className="mb-3">
        <label htmlFor="START_LOC" className="form-label">
          START_LOC
        </label>
        <input
          type="text"
          className="form-control"
          name="START_LOC"
          value={vehicleData.START_LOC}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="FINISH_LOC" className="form-label">
          FINISH_LOC
        </label>
        <input
          type="text"
          className="form-control"
          name="FINISH_LOC"
          value={vehicleData.FINISH_LOC}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="DRIVER_ID" className="form-label">
          DRIVER_ID
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          name="DRIVER_ID"
          value={vehicleData.DRIVER_ID}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="VEHICLE_ID" className="form-label">
          Vehicle id
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          name="VEHICLE_ID"
          value={vehicleData.VEHICLE_ID}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="DISTANCE" className="form-label">
          DISTANCE
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          name="DISTANCE"
          value={vehicleData.DISTANCE}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="PURPOSE" className="form-label">
          Purpose
        </label>
        <input
          type="text"
          className="form-control"
          name="PURPOSE"
          value={vehicleData.PURPOSE}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="STATUS" className="form-label">
          Status
        </label>
        <input
          type="text"
          className="form-control"
          name="STATUS"
          value={vehicleData.STATUS}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Assign Route
      </button>
    </form>
  );
};

export default AssignRecords;
