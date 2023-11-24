import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import AssignRecords from "./AssignRecords";

const containerStyle = {
  width: "900px",
  height: "900px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MapElement = (props) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(""); // State to hold the distance
  const startRef = useRef(null);
  const endRef = useRef(null);

  const handleMapChange = (e) => {};

  const onMapLoad = () => {
    const startAutocomplete = new window.google.maps.places.Autocomplete(
      startRef.current
    );
    const endAutocomplete = new window.google.maps.places.Autocomplete(
      endRef.current
    );

    startAutocomplete.addListener("place_changed", () => {
      const place = startAutocomplete.getPlace();
      if (place.geometry) {
        setStart(place.geometry.location);
      }
    });

    endAutocomplete.addListener("place_changed", () => {
      const place = endAutocomplete.getPlace();
      if (place.geometry) {
        setEnd(place.geometry.location);
      }
    });
  };

  const fetchDirections = (response) => {
    if (response !== null) {
      setDirections(response);
      const routeDistance = response.routes[0].legs[0].distance.text;
      setDistance(routeDistance); // Set the calculated distance
    }
  };

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <div>
        <input
          type="text"
          placeholder="Start location"
          ref={startRef}
          onChange={handleMapChange}
          className="inp"
        />
        <input
          type="text"
          placeholder="End location"
          ref={endRef}
          onChange={handleMapChange}
          className="inp"
        />
        {distance && <h3>Distance: {distance}</h3>}{" "}
        {/* Display the distance here */}
        <LoadScript
          googleMapsApiKey="AIzaSyAQxqXDuOKSsjBez813a0rlEVS9P9RUpyg"
          libraries={["places"]}
          onLoad={onMapLoad}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {directions && <DirectionsRenderer directions={directions} />}
            {start && end && (
              <DirectionsService
                options={{
                  origin: start,
                  destination: end,
                  travelMode: "DRIVING",
                }}
                callback={fetchDirections}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      <AssignRecords token={props.token} DISTANCE={parseInt(distance)} />
    </div>
  );
};

export default MapElement;
