// import React, { useState, useEffect } from 'react';

// const FuelFormPage = (props) => {
//   const currentDateTime = new Date();
//   const formattedDateTime = currentDateTime.toISOString().slice(0, 16);


//   const [fuelForm, setFuelForm] = useState({
//     DATE_TIME: formattedDateTime,
//     AMOUNT: '',
//     TOTAL_COST: '',
//     NAME_STATION: '',
//     PERSON_NAME: '',
//     BEFORE: '',
//     AFTER: '',
//     VEHICLE: '',
//     DRIVER: '',
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [formKey, setFormKey] = useState(0);

//   const maxDateTime = new Date();
//   maxDateTime.setHours(maxDateTime.getHours() + 6);

//   useEffect(() => {
//     // Initialize the DATE_TIME field with the current date and time
//     const localDateTime = new Date();
//     localDateTime.setMinutes(
//       localDateTime.getMinutes() - localDateTime.getTimezoneOffset()
//     );
//     const formattedLocalDateTime = localDateTime.toISOString().slice(0, 16);
//     setFuelForm((prevData) => ({
//       ...prevData,
//       DATE_TIME: formattedLocalDateTime,
//     }));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     const newValue = type === 'file' ? e.target.files[0] : value;

//     setFuelForm((prevData) => ({
//       ...prevData,
//       [name]: newValue,
//     }));
//   };

//  const handleSubmit = async (e) => {
//    e.preventDefault();

//    try {
//      if (!fuelForm.BEFORE || !fuelForm.AFTER) {
//        setErrorMessage('Both "Before" and "After" images are required.');
//        return;
//      }

//      const formData = new FormData();
//      Object.entries(fuelForm).forEach(([key, value]) => {
//        formData.append(key, value);
//      });

//      const response = await fetch(
//        'https://daniyarkoishin.pythonanywhere.com/fuelingrecords/',
//        {
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json',
//            Authorization: `Bearer ${props.token}`,
//          },
//          body: formData, // Use the FormData directly as the body
//        }
//      );

//      if (response.ok) {
//        setErrorMessage('');
//        // Increment the key to reset the form
//        setFormKey((prevKey) => prevKey + 1);
//        setFuelForm({
//          DATE_TIME: formattedDateTime,
//          AMOUNT: '',
//          TOTAL_COST: '',
//          NAME_STATION: '',
//          PERSON_NAME: '',
//          BEFORE: '',
//          AFTER: '',
//          VEHICLE: '',
//          DRIVER: '',
//        });
//        console.log('Fuel report created successfully!');
//      } else {
//        const errorData = await response.json();
//        console.error(
//          'Error creating fuel report:',
//          response.statusText,
//          errorData
//        );
//        setErrorMessage(errorData.message || 'An error occurred');
//      }
//    } catch (error) {
//      console.error('Error creating fuel report:', error);
//      setErrorMessage('An error occurred');
//    }
//  };
//   return (
//     <form key={formKey} onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor="make" className="form-label">
//           Date time
//         </label>
//         <input
//           type="datetime-local"
//           className="form-control"
//           name="DATE_TIME"
//           value={fuelForm.DATE_TIME}
//           onChange={handleChange}
//           required
//           min="2000-01-01T00:00" // Set your desired minimum date and time
//           max={maxDateTime.toISOString().slice(0, 16)}
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="model" className="form-label">
//           Amount of fuel
//         </label>
//         <input
//           type="number"
//           min="0"
//           className="form-control"
//           id="model"
//           name="AMOUNT"
//           value={fuelForm.AMOUNT}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="year" className="form-label">
//           Total Cost
//         </label>
//         <input
//           type="number"
//           min="0"
//           className="form-control"
//           name="TOTAL_COST"
//           value={fuelForm.TOTAL_COST}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="licensePlate" className="form-label">
//           Gas Station Name
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           name="NAME_STATION"
//           value={fuelForm.NAME_STATION}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="driver" className="form-label">
//           Fueling Person Name
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           name="PERSON_NAME"
//           value={fuelForm.PERSON_NAME}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="before" className="form-label">
//           Before Image
//         </label>
//         <input
//           // type="file"
//           type="text"
//           className="form-control"
//           name="BEFORE"
//           onChange={handleChange}
//           accept="image/*"
//           required // Add the required attribute
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="after" className="form-label">
//           After Image
//         </label>
//         <input
//           // type="file"
//           type="text"
//           className="form-control"
//           name="AFTER"
//           onChange={handleChange}
//           accept="image/*"
//           required // Add the required attribute
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="sittingCap" className="form-label">
//           Vehicle
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           name="VEHICLE"
//           value={fuelForm.VEHICLE}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="price" className="form-label">
//           Driver
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           id="price"
//           name="DRIVER"
//           value={fuelForm.DRIVER}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <button type="submit" className="btn btn-primary">
//         Create Fuel Report
//       </button>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//     </form>
//   );
// };

// export default FuelFormPage;

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const FuelFormPage = (props) => {
  const [formData, setFormData] = useState({
    date_time: '',
    amount_of_fuel: '',
    total_cost: '',
    gas_station_name: '',
    fueling_person_name: '',
    before_image: '',
    after_image: '',
    vehicle: props.record['VEHICLE_ID'],
    driver: props.record['DRIVER_ID'],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   const handleDelete = async () => {
       try {
         const deleteResponse = await fetch(
           `https://daniyarkoishin.pythonanywhere.com/fuelrequests/${props.record["REG_ID"]}`,
           {
             method: 'DELETE',
             'Content-Type': 'application/json',
             headers: { Authorization: `Bearer ${props.token}` },
           }
         );
         if (deleteResponse.ok) {
           console.log('Record deleted successfully');
           props.close();
         } else {
           console.error('Error deleting record:', deleteResponse.status);
         }
       } catch (error) {
         console.error('Error deleting record:', error.message);
     }
   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://daniyarkoishin.pythonanywhere.com/fuelingrecords/',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${props.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // You can handle success here, e.g., show a success message or redirect
      console.log('Fueling record submitted successfully');
      props.close();
      handleDelete();
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation:',
        error.message
      );
    }
  };

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Fueling Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="make" className="form-label">
              Date time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              name="date_time"
              value={formData.date_time}
              onChange={handleChange}
              required
              min="2000-01-01T00:00" // Set your desired minimum date and time
              // max={maxDateTime.toISOString().slice(0, 16)}
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
              name="amount_of_fuel"
              value={formData.amount_of_fuel}
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
              name="total_cost"
              value={formData.total_cost}
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
              name="gas_station_name"
              value={formData.gas_station_name}
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
              name="fueling_person_name"
              value={formData.fueling_person_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="before" className="form-label">
              Before Image
            </label>
            <input
              // type="file"
              type="text"
              className="form-control"
              name="before_image"
              onChange={handleChange}
              value={formData.before_image}
              required // Add the required attribute
            />
          </div>

          <div className="mb-3">
            <label htmlFor="after" className="form-label">
              After Image
            </label>
            <input
              // type="file"
              type="text"
              className="form-control"
              name="after_image"
              onChange={handleChange}
              value={formData.after_image}
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
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              required
              readOnly
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
              name="driver"
              value={formData.driver}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Primary Button
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FuelFormPage;
