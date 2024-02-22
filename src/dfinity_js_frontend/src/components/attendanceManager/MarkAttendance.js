import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const MarkAttendance = ({ reserve, available }) => {
  const [attendanceId, setAttendanceId] = useState("");

  const isFormFilled = () => attendanceId;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {!available ? (
        <Button disabled={true} variant="outline-dark" className="w-100 py-3">
          No Slots available
        </Button>
      ) : (
        <>
          <Button
            onClick={handleShow}
            variant="outline-dark"
            className="w-100 py-3"
          >
            Reserve Payroll
          </Button>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>New Employee</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>
                <FloatingLabel
                  controlId="inputAttendanceId"
                  label="attendanceId"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setAttendanceId(e.target.value);
                    }}
                    placeholder="Enter your attendanceId"
                  />
                </FloatingLabel>
              </Modal.Body>
            </Form>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="dark"
                disabled={!isFormFilled()}
                onClick={() => {
                  reserve(attendanceId);
                  handleClose();
                }}
              >
                Reserve Payroll
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

MarkAttendance.propTypes = {
  reserve: PropTypes.func.isRequired,
};

export default MarkAttendance;
