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
import ReportDataTable from "./components/reports/ReportDataTable";
import AssignVeh from "./components/AssignVeh";
import VehicleTable from "./components/VehicleTable";
import AuctionAdder from "./components/AuctionAdder";
import MapElement from "./components/MapElement";
import Profile from "./components/Profile";

const AdminPage = (props) => {
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
              <Nav.Link onClick={() => handleTabChange("3")}>Auction</Nav.Link>

              <NavDropdown title="Add user" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleTabChange("5")}>
                  Driver
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleTabChange("6")}>
                  Fueling person
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleTabChange("7")}>
                  Maintenance person
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => handleTabChange("8")}>
                Add vehicle
              </Nav.Link>

              <NavDropdown title="Assign" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleTabChange("9")}>
                  Assign Vehicle to Driver
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleTabChange("10")}>
                  Assign Route to Driver
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => handleTabChange("11")}>Reports</Nav.Link>
              <Nav.Link onClick={() => handleTabChange("12")}>Profile</Nav.Link>
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
            <VehicleTable
              token={props.token}
              title="Vehicles"
              link="https://daniyarkoishin.pythonanywhere.com/vehicles/"
            />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="3">
            <DataTable
              token={props.token}
              title="Auction"
              link="https://daniyarkoishin.pythonanywhere.com/auctionvehicles"
            />
            <AuctionAdder token={props.token} />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="5">
            <AddUser position="Driver" token={props.token} />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="6">
            <AddUser position="Fueling Person" token={props.token} />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="7">
            <AddUser position="Maintenance Person" token={props.token} />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="8">
            <AddVehicle token={props.token} />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="9">
            <AssignVeh token={props.token} />
          </Tab.Pane>
          <Tab.Pane className="tabContent p-sm-1 p-md-2" eventKey="10">
            <MapElement token={props.token} />
          </Tab.Pane>
          <Tab.Pane eventKey="11">
            <ReportDataTable
              token={props.token}
              title="Reports"
              link="https://daniyarkoishin.pythonanywhere.com/users/"
            />
          </Tab.Pane>
          <Tab.Pane eventKey="12">
            <Profile token={props.token} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default AdminPage;
