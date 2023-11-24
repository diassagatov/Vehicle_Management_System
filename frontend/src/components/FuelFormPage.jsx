import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const FuelFormPage = (props) => {
  const imageLinks = {
    car1: "https://i.ibb.co/TY5hF4m/car1.jpg",
    car2: "https://i.ibb.co/6XY7xXY/car2.jpg",
    car3: "https://i.ibb.co/z2XgvXg/car3.jpg",
    part1: "https://i.ibb.co/0Yn6wD4/part1.jpg",
    part2: "https://i.ibb.co/ZL89bmq/part2.jpg",
    part3: "https://i.ibb.co/rpL2Xqv/part3.jpg",
    fuel1: "https://i.ibb.co/h9BNs4v/fuel1.jpg",
    fuel2: "https://i.ibb.co/524V84Y/fuel2.jpg",
    fuel3: "https://i.ibb.co/H7Jg9RW/fuel3.webp",
  };

  const [formData, setFormData] = useState({
    date_time: "",
    amount_of_fuel: "",
    total_cost: "",
    gas_station_name: "",
    fueling_person_name: "",
    before_image: "",
    after_image: "",
    vehicle: props.record["VEHICLE_ID"],
    driver: props.record["DRIVER_ID"],
  });

  const handleChangeImage = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => {
      let fileName = "";
      if (files && files.length > 0) {
        // Extract the file name without extension
        const fullName = files[0].name;
        fileName = fullName.split(".").slice(0, -1);
      }
      console.log(fileName[0]);
      return {
        ...prevData,
        [name]: imageLinks[fileName],
      };
    });
  };

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
          method: "DELETE",
          "Content-Type": "application/json",
          headers: { Authorization: `Bearer ${props.token}` },
        }
      );
      if (deleteResponse.ok) {
        console.log("Record deleted successfully");
        props.close();
      } else {
        console.error("Error deleting record:", deleteResponse.status);
      }
    } catch (error) {
      console.error("Error deleting record:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://daniyarkoishin.pythonanywhere.com/fuelingrecords/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${props.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log(JSON.stringify(formData));

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // You can handle success here, e.g., show a success message or redirect
      console.log("Fueling record submitted successfully");
      props.close();
      handleDelete();
      props.setReload(!props.reload);
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
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
              type="file"
              className="form-control"
              name="before_image"
              onChange={handleChangeImage}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="after" className="form-label">
              After Image
            </label>
            <input
              type="file"
              className="form-control"
              name="after_image"
              onChange={handleChangeImage}
              required
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
