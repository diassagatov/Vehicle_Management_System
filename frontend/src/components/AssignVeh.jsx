import React, { useState } from 'react';

const AssignVeh = (props) => {
  const [vehicleData, setVehicleData] = useState({
    DRIVER_ID: '',
    driver_license: '2',
    VEHICLE_ID: '',
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
        'https://daniyarkoishin.pythonanywhere.com/drivers/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(vehicleData),
        }
      );
console.log(vehicleData);
      if (response.ok) {
        // Clear form fields
        setVehicleData({
          DRIVER_ID: '',
          VEHICLE_ID: '',
        });

        // Handle success, e.g., show a success message or redirect
        console.log('Vehicle created successfully!');
      } else {
        // Log error details
        const errorData = await response.json();
        console.error(
          'Error creating assign:',
          response.statusText,
          errorData
        );

        // Set error message
        setErrorMessage(errorData.message || 'An error occurred');
      }
    } catch (error) {
      // Log network error details
      console.error('Error creating vehicle:', error);

      // Set error message
      setErrorMessage('An error occurred');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Assign Vehicle to the Driver</h2>
      <div className="mb-3">
        <label htmlFor="DRIVER_ID" className="form-label">
          Driver id
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

      <button type="submit" className="btn btn-primary">
        Assign Vehicle
      </button>
      {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
    </form>
  );
};

export default AssignVeh;
