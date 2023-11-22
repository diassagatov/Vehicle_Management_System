import React, { useState } from "react";

const AddVehicle = (props) => {
  const [vehicleData, setVehicleData] = useState({
    MAKE: "",
    MODEL: "",
    YEAR: "",
    LIC_PLATE: "",
    DRIVER: "",
    TYPE: "",
    MILEAGE: "",
    USED_TIME: "",
    SITTING_CAP: "",
    PRICE: "",
  });

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
        // Handle success, e.g., show a success message or redirect
        console.log("Vehicle created successfully!");
      } else {
        // Handle errors, e.g., show an error message
        console.error("Error creating vehicle:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating vehicle:", error.message);
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
        <label htmlFor="driver" className="form-label">
          Driver ID
        </label>
        <input
          type="number"
          className="form-control"
          id="driver"
          name="DRIVER"
          value={vehicleData.DRIVER}
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
        <label htmlFor="usedTime" className="form-label">
          Used Time
        </label>
        <input
          type="text"
          className="form-control"
          id="usedTime"
          name="USED_TIME"
          value={vehicleData.USED_TIME}
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
    </form>
  );
};

export default AddVehicle;
