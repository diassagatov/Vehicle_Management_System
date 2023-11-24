import Tab from "react-bootstrap/Tab";
import DataTable from "./components/DataTable";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./components/TabsPage.css";
import { useState } from "react";
import CreateRequest from "./components/CreateRequest";
import MapElement from "./components/MapElement";
import RoutesDataTable from "./components/RoutesDataTable";
import UpdatableRoutesDataTable from "./components/UpdatableRoutesDataTable";

const DriverPage = (props) => {
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
                Active Routes
              </Nav.Link>
              <Nav.Link onClick={() => handleTabChange("2")}>
                Routes History
              </Nav.Link>
              <Nav.Link onClick={() => handleTabChange("3")}>
                Make Request
              </Nav.Link>
              <Nav.Link onClick={props.logOut}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Tab.Container className="tabContainer" activeKey={activeKey}>
        <Tab.Content className="tabContent p-2 p-md-4">
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="1">
            <UpdatableRoutesDataTable
              token={props.token}
              title="Users"
              link="https://daniyarkoishin.pythonanywhere.com/routes/"
            />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="2">
            <RoutesDataTable
              token={props.token}
              title="Users"
              link="https://daniyarkoishin.pythonanywhere.com/routes/"
            />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="3">
            <CreateRequest
              title="Fuel Request"
              link="https://daniyarkoishin.pythonanywhere.com/fuelrequests/"
              token={props.token}
            />
            <CreateRequest
              title="Maintenance Request"
              link="https://daniyarkoishin.pythonanywhere.com/maintrequests/"
              token={props.token}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default DriverPage;
