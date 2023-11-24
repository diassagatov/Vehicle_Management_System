import React, { useState } from "react";

const AddVehicle = (props) => {
  const [vehicleData, setVehicleData] = useState({
    MAKE: "",
    MODEL: "",
    YEAR: "null",
    LIC_PLATE: "",
    TYPE: "",
    MILEAGE: "null",
    USED_TIME: "0",
    SITTING_CAP: "null",
    PRICE: "null",
  });
  const [errorMessage, setErrorMessage] = useState("");

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
        "https://daniyarkoishin.pythonanywhere.com/vehicles/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(vehicleData),
        }
      );

      if (response.ok) {
        // Clear form fields
        setVehicleData({
          MAKE: "",
          MODEL: "",
          YEAR: "",
          LIC_PLATE: "",
          TYPE: "",
          MILEAGE: "",
          SITTING_CAP: "",
          PRICE: "",
        });

        // Handle success, e.g., show a success message or redirect
        console.log("Vehicle created successfully!");
      } else {
        // Log error details
        const errorData = await response.json();
        console.error(
          "Error creating vehicle:",
          response.statusText,
          errorData
        );

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
      <div className="mb-3">
        <label htmlFor="make" className="form-label">
          Make
        </label>
        <input
          type="text"
          className="form-control"
          id="make"
          name="MAKE"
          value={vehicleData.MAKE}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="model" className="form-label">
          Model
        </label>
        <input
          type="text"
          className="form-control"
          id="model"
          name="MODEL"
          value={vehicleData.MODEL}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Year
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          id="year"
          name="YEAR"
          value={vehicleData.YEAR}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="licensePlate" className="form-label">
          License Plate
        </label>
        <input
          type="text"
          className="form-control"
          id="licensePlate"
          name="LIC_PLATE"
          value={vehicleData.LIC_PLATE}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type
        </label>
        <input
          type="text"
          className="form-control"
          id="type"
          name="TYPE"
          value={vehicleData.TYPE}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="mileage" className="form-label">
          Mileage
        </label>
        <input
          type="number"
          min="0"
          step="0.1"
          className="form-control"
          id="mileage"
          name="MILEAGE"
          value={vehicleData.MILEAGE}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="sittingCap" className="form-label">
          Sitting Capacity
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          id="sittingCap"
          name="SITTING_CAP"
          value={vehicleData.SITTING_CAP}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="form-control"
          id="price"
          name="PRICE"
          value={vehicleData.PRICE}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create Vehicle
      </button>
      {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
    </form>
  );
};

export default AddVehicle;
