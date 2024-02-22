import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Stack, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdateEmployee = ({ employee, save }) => {
  const [department, setDepartment] = useState(employee.department);
  const [phone, setPhone] = useState(employee.phone);
  const [email, setEmail] = useState(employee.email);
  const [address, setAddress] = useState(employee.address);
  const [designation, setDesignation] = useState(employee.designation);
  const [salary, setSalary] = useState(Number(employee.salary));

  const isFormFilled = () =>
    email && phone && address && department && designation && salary;

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
        Update <i className="bi bi-pencil-square"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Stack>
            <Modal.Title>New Event</Modal.Title>
            <span>you can leave blank for unchanged values</span>
          </Stack>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputAddress"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputPhone"
              label="Phone"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDepartment"
              label="Department"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="department"
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDesignation"
              label="designation"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="designation"
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputSalary"
              label="Salary"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Salary"
                onChange={(e) => {
                  setSalary(e.target.value);
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
                id: employee.id,
                email,
                phone,
                address,
                department,
                designation,
                salary,
              });
              handleClose();
            }}
          >
            Update employee
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UpdateEmployee.propTypes = {
  save: PropTypes.func.isRequired,
};

export default UpdateEmployee;
