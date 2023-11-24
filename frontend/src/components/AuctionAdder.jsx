import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AuctionAdder = (props) => {
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [auctionData, setAuctionData] = useState({
    make: "",
    model: "",
    year: "",
    status: "",
    description: "",
    starting_bid: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuctionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeImage = (e) => {
    const { name, files } = e.target;
    setAuctionData((prevData) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(auctionData).forEach((key) => {
      formData.append(key, auctionData[key]);
    });

    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch(
        "https://daniyarkoishin.pythonanywhere.com/auctionvehicles/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${props.token}`,
            // 'Content-Type': 'multipart/form-data' // You might not need to set this header. It's set automatically.
          },
          body: formData,
        }
      );

      if (response.ok) {
        // Clear form fields
        setAuctionData({
          make: "",
          model: "",
          year: "",
          status: "",
          description: "",
          starting_bid: "",
          image: null,
        });

        // Handle success
        console.log("Auction created successfully!");
        handleClose();
      } else {
        // Handle error
        const errorData = await response.json();
        console.error("Error creating auction:", errorData);
        setErrorMessage(errorData.message || "An error occurred");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("An error occurred");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add vehicle
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="make" className="form-label">
                Make
              </label>
              <input
                type="text"
                className="form-control"
                id="make"
                name="make"
                value={auctionData.make}
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
                name="model"
                value={auctionData.model}
                onChange={handleChange}
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
                name="year"
                value={auctionData.year}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <textarea
                className="form-control"
                id="status"
                name="status"
                value={auctionData.status}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={auctionData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Starting Bid */}
            <div className="mb-3">
              <label htmlFor="startingBid" className="form-label">
                Starting Bid
              </label>
              <input
                type="number"
                className="form-control"
                id="startingBid"
                name="starting_bid"
                value={auctionData.starting_bid}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={handleChangeImage}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add vehicle into Auction
            </button>
            {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuctionAdder;
