import React, { useState, useEffect } from 'react';

const FuelFormPage = (props) => {
  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toISOString().slice(0, 16);


  const [fuelForm, setFuelForm] = useState({
    DATE_TIME: formattedDateTime,
    AMOUNT: '',
    TOTAL_COST: '',
    NAME_STATION: '',
    PERSON_NAME: '',
    BEFORE: '',
    AFTER: '',
    VEHICLE: '',
    DRIVER: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [formKey, setFormKey] = useState(0);

  const maxDateTime = new Date();
  maxDateTime.setHours(maxDateTime.getHours() + 6);

  useEffect(() => {
    // Initialize the DATE_TIME field with the current date and time
    const localDateTime = new Date();
    localDateTime.setMinutes(
      localDateTime.getMinutes() - localDateTime.getTimezoneOffset()
    );
    const formattedLocalDateTime = localDateTime.toISOString().slice(0, 16);
    setFuelForm((prevData) => ({
      ...prevData,
      DATE_TIME: formattedLocalDateTime,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;

    setFuelForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!fuelForm.BEFORE || !fuelForm.AFTER) {
        setErrorMessage('Both "Before" and "After" images are required.');
        return;
      }

      const formData = new FormData();
      Object.entries(fuelForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(
        // 'https://daniyarkoishin.pythonanywhere.com/vehicles/',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setErrorMessage('');
        // Increment the key to reset the form
        setFormKey((prevKey) => prevKey + 1);
        setFuelForm({
          DATE_TIME: formattedDateTime,
          AMOUNT: '',
          TOTAL_COST: '',
          NAME_STATION: '',
          PERSON_NAME: '',
          BEFORE: '',
          AFTER: '',
          VEHICLE: '',
          DRIVER: '',
        });
        console.log('Vehicle created successfully!');
      } else {
        const errorData = await response.json();
        console.error(
          'Error creating vehicle:',
          response.statusText,
          errorData
        );
        setErrorMessage(errorData.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error creating vehicle:', error);
      setErrorMessage('An error occurred');
    }
  };
  return (
    <form key={formKey} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="make" className="form-label">
          Date time
        </label>
        <input
          type="datetime-local"
          className="form-control"
          name="DATE_TIME"
          value={fuelForm.DATE_TIME}
          onChange={handleChange}
          required
          min="2000-01-01T00:00" // Set your desired minimum date and time
          max={maxDateTime.toISOString().slice(0, 16)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="model" className="form-label">
          Amount of fuel
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          id="model"
          name="AMOUNT"
          value={fuelForm.AMOUNT}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Total Cost
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          name="TOTAL_COST"
          value={fuelForm.TOTAL_COST}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="licensePlate" className="form-label">
          Gas Station Name
        </label>
        <input
          type="text"
          className="form-control"
          name="NAME_STATION"
          value={fuelForm.NAME_STATION}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="driver" className="form-label">
          Fueling Person Name
        </label>
        <input
          type="text"
          className="form-control"
          name="PERSON_NAME"
          value={fuelForm.PERSON_NAME}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="before" className="form-label">
          Before Image
        </label>
        <input
          type="file"
          className="form-control"
          name="BEFORE"
          onChange={handleChange}
          accept="image/*"
          required // Add the required attribute
        />
      </div>

      <div className="mb-3">
        <label htmlFor="after" className="form-label">
          After Image
        </label>
        <input
          type="file"
          className="form-control"
          name="AFTER"
          onChange={handleChange}
          accept="image/*"
          required // Add the required attribute
        />
      </div>

      <div className="mb-3">
        <label htmlFor="sittingCap" className="form-label">
          Vehicle
        </label>
        <input
          type="text"
          className="form-control"
          name="VEHICLE"
          value={fuelForm.VEHICLE}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Driver
        </label>
        <input
          type="text"
          className="form-control"
          id="price"
          name="DRIVER"
          value={fuelForm.DRIVER}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create Fuel Report
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default FuelFormPage;
