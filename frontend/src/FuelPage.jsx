import Tab from "react-bootstrap/Tab";
import DataTable from "./components/DataTable";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./components/TabsPage.css";
import { useState } from "react";
import AddVehicle from "./components/AddVehicle";
import FuelFormPage from "./FuelFormPage";


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
              <Nav.Link onClick={() => handleTabChange('2')}>Create Reports</Nav.Link>
              <Nav.Link onClick={() => handleTabChange('4')}>
                Fueling Report
              </Nav.Link>
              <Nav.Link onClick={props.logOut}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Tab.Container className="tabContainer" activeKey={activeKey}>
        <Tab.Content className="tabContent p-2 p-md-4">
          <Tab.Pane
            className="tabContent p-sm-1 p-md-2"
            eventKey="4"
          ></Tab.Pane>
          
          <FuelFormPage />
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default TabsPage;

//  const AddVehicle = (props) => {
//   const [vehicleData, setVehicleData] = useState({
//     MAKE: '',
//     MODEL: '',
//     YEAR: 'null',
//     LIC_PLATE: '',
//     DRIVER: '',
//     TYPE: '',
//     MILEAGE: 'null',
//     USED_TIME: '0',
//     SITTING_CAP: 'null',
//     PRICE: 'null',
//   });
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVehicleData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         'https://daniyarkoishin.pythonanywhere.com/vehicles/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${props.token}`,
//           },
//           body: JSON.stringify(vehicleData),
//         }
//       );

//       if (response.ok) {
//         // Clear form fields
//         setVehicleData({
//           MAKE: '',
//           MODEL: '',
//           YEAR: '',
//           LIC_PLATE: '',
//           DRIVER: '',
//           TYPE: '',
//           MILEAGE: '',
//           SITTING_CAP: '',
//           PRICE: '',
//         });

//         // Handle success, e.g., show a success message or redirect
//         console.log('Vehicle created successfully!');
//       } else {
//         // Log error details
//         const errorData = await response.json();
//         console.error(
//           'Error creating vehicle:',
//           response.statusText,
//           errorData
//         );

//         // Set error message
//         setErrorMessage(errorData.message || 'An error occurred');
//       }
//     } catch (error) {
//       // Log network error details
//       console.error('Error creating vehicle:', error);

//       // Set error message
//       setErrorMessage('An error occurred');
//     }
//   };
// // 