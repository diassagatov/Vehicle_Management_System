import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DataTable.css";
import { Modal, Button } from "react-bootstrap";
import UpdateRoute from "./UpdateRoute";
import MapDisplay from "./MapDisplay";

const UpdatableRoutesDataTable = (props) => {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  useEffect(() => {
    const fetchData = async () => {
      if (props.token) {
        try {
          const response = await fetch(props.link, {
            headers: {
              Authorization: `Bearer ${props.token}`,
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
          console.error("Error fetching data:", error);
          console.error("Error status:", response.status);
          console.error("Error response:", await response.text());
        }
      }
    };
    fetchData();
  }, [props.activeKey]);

  return (
    <div className="elementContainer">
      <h1>{props.title}</h1>
      {data && (
        <div className="innerContainer">
          <Table hover className="custom-colored-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data
                .filter((record) => record["STATUS"] === "Active")
                .map((record, recordIndex) => (
                  <tr key={recordIndex}>
                    {Object.entries(record).map(([key, value], index) => (
                      <td key={index}>{value}</td>
                    ))}
                    <MapDisplay
                      start={record["START_LOC"]}
                      end={record["FINISH_LOC"]}
                    />
                    <UpdateRoute
                      reload={reload}
                      setReload={setReload}
                      token={props.token}
                      record={record}
                    />
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UpdatableRoutesDataTable;
