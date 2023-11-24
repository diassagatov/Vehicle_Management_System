import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import ReportMaint from "./ReportMaint";
import html2pdf from "html2pdf.js";

const ReportListPage = (props) => {
  const [pdfContent, setPdfContent] = useState(null);

  const generatePdf = () => {
    const element = document.getElementById("modal-content");

    html2pdf(element, {
      margin: 10,
      filename: "report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2, // Increase or decrease scale as needed
        letterRendering: false,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a2",
        orientation: "portrait",
        // compress: true,
      },
    }).outputPdf((pdf) => {
      const blob = pdf.output("blob");
      setPdfContent(URL.createObjectURL(blob));
    });
  };

  return (
    <Modal show={props.show} onHide={props.close} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="modal-content">
          {/* <h1>{props.name}</h1> */}
          <h1>Driver Information</h1>
          <Table hover className="custom-colored-table">
            <thead>
              <tr>
                {Object.keys(props.record).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(props.record).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            </tbody>
          </Table>

          <ReportMaint
            token={props.token}
            title="Maintenances"
            link="https://daniyarkoishin.pythonanywhere.com/maintenancejobs/"
          />
          <ReportMaint
            token={props.token}
            title="Fueling Reports"
            link="https://daniyarkoishin.pythonanywhere.com/fuelingrecords/"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button onClick={generatePdf}>Download Data</Button>
          </div>
        </div>
      </Modal.Body>
      {
        <a download="report.pdf" style={{ display: "none" }}>
          Download PDF
        </a>
      }
    </Modal>
  );
};

export default ReportListPage;
