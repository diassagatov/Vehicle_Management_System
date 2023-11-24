import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Jobs = (props) => {
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
    vehicle: props.record["VEHICLE_ID"],
    date_time: "",
    mileage: "",
    plate_number: "",
    job_description: "",
    status: "",
    total_cost: "",
    replaced_part_image: "",
    driver_id: props.record["DRIVER_ID"],
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeImage = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => {
      let fileName = "";
      if (files && files.length > 0) {
        // Extract the file name without extension
        const fullName = files[0].name;
        fileName = fullName.split(".").slice(0, -1);
      }
      return {
        ...prevData,
        [name]: imageLinks[fileName],
      };
    });
  };

  const handleDelete = async () => {
    try {
      const deleteResponse = await fetch(
        `https://daniyarkoishin.pythonanywhere.com/maintrequests/${props.record["id"]}`,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://daniyarkoishin.pythonanywhere.com/maintenancejobs/",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      console.log(JSON.stringify(formData)["email"]);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      handleDelete();
      props.setReload(!props.reload);
    } catch (error) {
      console.error("Error creating maintenance job", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Complete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding Repairing Parts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="date_time">Date and Time</label>
              <input
                type="datetime-local"
                name="date_time"
                value={formData.dateObject}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="mileage">Mileage</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="plate_number">Plate Number</label>
              <input
                type="text"
                name="plate_number"
                value={formData.plate_number}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="job_description">Job Description</label>
              <textarea
                name="job_description"
                value={formData.job_description}
                onChange={handleChange}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="replaced_part_image" className="form-label">
                Replaced Part Image
              </label>
              <input
                type="file"
                className="form-control"
                name="replaced_part_image"
                onChange={handleChangeImage}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Active">Active</option>
                <option value="Non-Active">Non-active</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="total_cost">Total Cost</label>
              <input
                type="number"
                name="total_cost"
                value={formData.total_cost}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <br />
            <input type="submit" className="btn btn-primary" />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Jobs;
