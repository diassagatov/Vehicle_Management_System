import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import DataTable from "./components/DataTable";
import AddVehicle from "./components/AddVehicle";
import AddUser from "./components/AddUser";
import "./components/TabsPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
              <NavDropdown
                title="Add user"
                id="basic-nav-dropdown"
                className="dropdownCustom"
              >
                <NavDropdown.Item onClick={() => handleTabChange("4")}>
                  Admin
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleTabChange("5")}>
                  Driver
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleTabChange("6")}>
                  Maintenance person
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleTabChange("7")}>
                  Fueling person
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={() => handleTabChange("8")}>
                Add vehicle
              </Nav.Link>
              <Nav.Link onClick={props.logOut}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Tab.Container className="tabContainer" activeKey={activeKey}>
        <Tab.Content className="tabContent p-2 p-md-4">
          <Tab.Pane eventKey="1">
            <DataTable
              token={props.token}
              title="Users"
              link="https://daniyarkoishin.pythonanywhere.com/users/"
            />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="2">
            <DataTable
              token={props.token}
              title="Vehicles"
              link="https://daniyarkoishin.pythonanywhere.com/vehicles/"
            />
          </Tab.Pane>

          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="4">
            <AddUser token={props.token} />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="8">
            <AddVehicle token={props.token} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default TabsPage;
