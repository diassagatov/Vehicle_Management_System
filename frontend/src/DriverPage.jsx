import Tab from "react-bootstrap/Tab";
import DataTable from "./components/DataTable";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./components/TabsPage.css";
import { useState } from "react";
import AddVehicle from "./components/AddVehicle";

const TabsPage = (props) => {
  const [activeKey, setActiveKey] = useState("1");
  const [expanded, setExpanded] = useState(false);

  const handleTabChange = (key) => {
    setActiveKey(key);
    if (expanded) {
      setExpanded(!expanded);
    }
  };

  return (
    <>
      <Navbar
        expand="md"
        expanded={expanded}
        className="bg-body-dark navBarCustom"
      >
        <Container>
          <Navbar.Brand className="logo">
            <span></span>
            VMS
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleTabChange("1")}>Users</Nav.Link>
              <Nav.Link onClick={() => handleTabChange("2")}>Vehicles</Nav.Link>
              <Nav.Link onClick={() => handleTabChange("3")}>Reports</Nav.Link>
              <Nav.Link onClick={() => handleTabChange("4")}>Title</Nav.Link>
              <Nav.Link onClick={props.logOut}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Tab.Container className="tabContainer" activeKey={activeKey}>
        <Tab.Content className="tabContent p-2 p-md-4">
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="1">
            THiS is driver!!!!!
          </Tab.Pane>
          <Tab.Pane
            className="tabContent p-sm-1 p-md-2"
            eventKey="2"
          ></Tab.Pane>
          <Tab.Pane
            className="tabContent p-sm-1 p-md-2"
            eventKey="3"
          ></Tab.Pane>
          <Tab.Pane
            className="tabContent p-sm-1 p-md-2"
            eventKey="4"
          ></Tab.Pane>
          {/*
          
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="8">
            <YOUR COMPONENT/>
          </Tab.Pane>
           
          */}
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default TabsPage;
