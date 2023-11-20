import LoginForm from "./components/LoginForm";
import { useState, useEffect } from "react";
import "./App.css";
import { ReactSession } from "react-client-session";
import AdminPage from "./AdminPage";
import DriverPage from "./DriverPage";
import MaintPage from "./MaintPage";
import FuelPage from "./FuelPage";

const App = () => {
  ReactSession.setStoreType("localStorage");
  const [status, setStatus] = useState(ReactSession.get("loggedIn"));
  const [userType, setUserType] = useState("Admin");

  useEffect(() => {
    if (ReactSession.get("loggedIn") == false) {
      setStatus(false);
    }
  }, []);

  function receiveDataFromChild(data) {
    ReactSession.set("loggedIn", true);
    ReactSession.set("token", data);
    setStatus(true);
    console.log("recieve worked" + ReactSession.get("loggedIn"));
  }

  function logOutHandle() {
    ReactSession.set("loggedIn", false);
    setStatus(false);
    console.log("logout worked");
  }

  if (!status) {
    return (
      <>
        <LoginForm sendDataToParent={receiveDataFromChild} />
      </>
    );
  } else {
    switch (userType) {
      case "Admin":
        return (
          <AdminPage logOut={logOutHandle} token={ReactSession.get("token")} />
        );
      case "Driver":
        return (
          <DriverPage logOut={logOutHandle} token={ReactSession.get("token")} />
        );
      case "Fuel":
        return (
          <FuelPage logOut={logOutHandle} token={ReactSession.get("token")} />
        );
      case "Maint":
        return (
          <MaintPage logOut={logOutHandle} token={ReactSession.get("token")} />
        );
    }
  }
};

export default App;
