import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddEmployee = ({ save }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [designation, setDesignation] = useState(0);
  const isFormFilled = () =>
    name &&
    email &&
    phone &&
    address &&
    department &&
    designation &&
    salary &&
    profileImg;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} variant="dark" className="rounded-pill ">
        Add Employee <i className="bi ml-2 bi-plus"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Employee</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="Employee name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name of employee"
              />
            </FloatingLabel>
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
              controlId="inputUrl"
              label="Profile Image"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Profile Image"
                onChange={(e) => {
                  setProfileImg(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputPhone"
              label="Phone"
              className="mb-3"
            >
              <Form.Control
                type="text"
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
                name,
                email,
                phone,
                profileImg,
                address,
                department,
                designation,
                salary,
              });
              handleClose();
            }}
          >
            Save employee
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddEmployee.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddEmployee;
