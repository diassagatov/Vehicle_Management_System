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
  const [userType, setUserType] = useState("");

  useEffect(() => {
    //ReactSession.set("loggedIn", true);
    if (ReactSession.get("loggedIn") == false) {
      setStatus(false);
    }
    fetchData();
  }, [status]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://daniyarkoishin.pythonanywhere.com/user_by_token/",
        {
          method: "GET", // Explicitly set the method to GET
          headers: {
            Authorization: `Bearer ${ReactSession.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setUserType(result["position"]);
      console.log(userType);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function receiveDataFromChild(data) {
    ReactSession.set("loggedIn", true);
    ReactSession.set("token", data);

    fetchData();
    setStatus(true);
    setUserType(ReactSession.get("type"));
    console.log("recieve worked" + ReactSession.get("token"));
  }

  function logOutHandle() {
    ReactSession.set("type", "");
    ReactSession.set("loggedIn", false);
    ReactSession.set("type", "");
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
      case "Administration Staff":
        return (
          <AdminPage logOut={logOutHandle} token={ReactSession.get("token")} />
        );
      case "Driver":
        return (
          <DriverPage logOut={logOutHandle} token={ReactSession.get("token")} />
        );
      case "Fueling Person":
        return (
          <FuelPage logOut={logOutHandle} token={ReactSession.get("token")} />
        );
      case "Maintenance Person":
        return (
          <MaintPage logOut={logOutHandle} token={ReactSession.get("token")} />
        );
    }
  }
};

export default App;
