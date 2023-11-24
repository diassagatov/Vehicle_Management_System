import Tab from "react-bootstrap/Tab";
import DataTable from "./components/DataTable";
import UpdatableDataTable from "./components/UpdatableDataTable";
import RepairingDataTable from "./components/RepairingDataTable";
import VehicleTable from "./components/VehicleTable";
import Part from "./components/Part";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./components/TabsPage.css";
import { useState } from "react";

const MaintPage = (props) => {
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
              <Nav.Link onClick={() => handleTabChange("1")}>
                Maintenance requests
              </Nav.Link>
              <Nav.Link onClick={() => handleTabChange("2")}>
                Maintenance Jobs
              </Nav.Link>
              <Nav.Link onClick={() => handleTabChange("3")}>
                Repairing parts
              </Nav.Link>
              <Nav.Link onClick={() => handleTabChange("4")}>Vehicle</Nav.Link>
              <Nav.Link onClick={props.logOut}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Tab.Container className="tabContainer" activeKey={activeKey}>
        <Tab.Content className="p-2 p-md-4">
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="1">
            <UpdatableDataTable
              token={props.token}
              title="Maintenance Requests"
              link="https://daniyarkoishin.pythonanywhere.com/maintrequests/"
            />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="2">
            <DataTable
              token={props.token}
              title="Maintenance Jobs"
              link="https://daniyarkoishin.pythonanywhere.com/maintenancejobs"
            />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="3">
            <RepairingDataTable
              token={props.token}
              title="Repairing Parts"
              link="https://daniyarkoishin.pythonanywhere.com/repairingparts/"
            />
            <Part token={props.token} />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="4">
            <VehicleTable
              token={props.token}
              title="Vehicles"
              link="https://daniyarkoishin.pythonanywhere.com/vehicles/"
            />
          </Tab.Pane>

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

export default MaintPage;
