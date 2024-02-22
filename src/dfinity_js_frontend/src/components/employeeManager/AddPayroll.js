import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddPayroll = ({ employee, save }) => {
  const [basicSalary, setBasicSalary] = useState("");
  const [allowances, setAllowances] = useState("");

  const employeeId = employee.id;

  const isFormFilled = () => employeeId && allowances && basicSalary;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        className="rounded-pill btn btn-primary"
        // style={{ width: "38px" }}
      >
        Pay Employee <i className="bi bi-credit-card"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pay `${employee.name}` / New Payroll</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputAllowances"
              label="Allowances"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Allowances"
                onChange={(e) => {
                  setAllowances(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputBasicSalary"
              label="BasicSalary"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="basicSalary"
                onChange={(e) => {
                  setBasicSalary(e.target.value);
                }}
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
              save({
                employeeId,
                basicSalary,
                allowances,
              });
              handleClose();
            }}
          >
            Save Payroll
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddPayroll.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddPayroll;
