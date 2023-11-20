import React, { useState } from "react";

const AddVehicle = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    MAKE: "",
    MODEL: "",
    YEAR: null,
    LIC_PLATE: "",
    TYPE: "",
    MILEAGE: null,
    USED_TIME: null,
    SITTING_CAP: null,
    PRICE: null,
    DRIVER_ID: null,
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'http://localhost:8000/vehicles/?format=api' with your actual backend API endpoint
      const url = "http://localhost:8000/vehicles/?format=api";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("POST request successful:", responseData);

      // Optionally, reset the form after successful submission
      setFormData({
        MAKE: "",
        MODEL: "",
        YEAR: null,
        LIC_PLATE: "",
        TYPE: "",
        MILEAGE: null,
        USED_TIME: null,
        SITTING_CAP: null,
        PRICE: null,
        DRIVER_ID: null,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each property in the formData object */}
        <label>
          Make:
          <input
            type="text"
            name="MAKE"
            value={formData.MAKE}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddVehicle;
