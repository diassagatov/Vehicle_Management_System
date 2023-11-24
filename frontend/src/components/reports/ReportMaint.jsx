import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "../DataTable.css";
import { Modal, Button } from "react-bootstrap";

function ReportMaint(props) {
  const [data, setData] = useState(null);
  const [showModals, setShowModals] = useState([]);

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
          // Initialize showModals array with false values for each row
          setShowModals(Array(result.length).fill(false));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, []);

  const handleShow = (index) => {
    const updatedShowModals = [...showModals];
    updatedShowModals[index] = true;
    setShowModals(updatedShowModals);
  };

  const handleClose = (index) => {
    const updatedShowModals = [...showModals];
    updatedShowModals[index] = false;
    setShowModals(updatedShowModals);
  };

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
                .filter(
                  (record) =>
                    record["driver_id"] === 8 || record["driver"] === 8
                )
                .map((record, recordIndex) => (
                  <tr key={recordIndex}>
                    {Object.entries(record).map(([key, value], index) => (
                      <td key={index}>
                        {key !== "replaced_part_image" &&
                        key !== "before_image" &&
                        key !== "after_image" ? (
                          value
                        ) : (
                          <div>
                            <img
                              src={value}
                              alt={""}
                              style={{
                                cursor: "pointer",
                                height: "150px",
                                width: "150px",
                              }}
                              onClick={() => handleShow(recordIndex)}
                            />

                            <Modal
                              style={{ marginLeft: "50px" }}
                              show={showModals[recordIndex]}
                              onHide={() => handleClose(recordIndex)}
                            >
                              <Modal.Body>
                                <img
                                  src={value}
                                  alt=""
                                  style={{
                                    width: "50%",
                                    display: "block",
                                    margin: "auto",
                                  }}
                                />
                              </Modal.Body>
                            </Modal>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ReportMaint;
