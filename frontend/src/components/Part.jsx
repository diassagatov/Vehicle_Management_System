import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Part = (props) => {
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
    name: "",
    code: "",
    image: "",
    quantity: "",
    condition: "",
  });
  const [show, setShow] = useState(false);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://daniyarkoishin.pythonanywhere.com/repairingparts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(JSON.stringify(formData));
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add part
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="code">Code</label>
              <input
                type="number"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChangeImage}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="condition">Condition</label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <input type="submit" className="btn btn-success" value="Add" />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Part;
