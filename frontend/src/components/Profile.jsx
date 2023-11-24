import React, { useEffect, useState } from "react";
import { Card, ListGroup, Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = (props) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://daniyarkoishin.pythonanywhere.com/user_by_token/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${props.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setUserData(result);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-center">
                <Card.Title>User Profile</Card.Title>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>First Name:</strong> {userData.first_name || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Middle Name:</strong> {userData.middle_name || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Last Name:</strong> {userData.last_name || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {userData.email || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Government ID:</strong> {userData.gov_id || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone Number:</strong> {userData.phone || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Address:</strong> {userData.address || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Position:</strong> {userData.position || "N/A"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
