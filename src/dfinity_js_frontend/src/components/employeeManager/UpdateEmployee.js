import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel, Stack } from "react-bootstrap";

const Update = ({ employee, save }) => {
  const [description, setDescription] = useState(employee.description);
  const [date, setDate] = useState(employee.date);
  const [startTime, setStartTime] = useState(employee.startTime);
  const [attachmentURL, setImage] = useState(employee.attachmentURL);
  const [location, setLocation] = useState(employee.location);
  const [maxSlots, setMaxSlots] = useState(employee.maxSlots / BigInt(10 ** 8));
  const isFormFilled = () =>
    startTime && date && attachmentURL && description && maxSlots && location;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill"
        // style={{ width: "38px" }}
      >
        Update <i className="bi bi-pencil-square"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Stack>
            <Modal.Title>New Employee</Modal.Title>
            <span>you can leave blank for unchanged values</span>
          </Stack>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputUrl"
              label="Image URL"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Image URL"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputDate" label="Date" className="mb-3">
              <Form.Control
                type="date"
                placeholder="Date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputTime"
              label="Start Time"
              className="mb-3"
            >
              <Form.Control
                type="time"
                placeholder="Start Time"
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="description"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputLocation"
              label="Location"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputMaxSlots"
              label="maxSlots"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="maxSlots"
                onChange={(e) => {
                  setMaxSlots(e.target.value);
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
                description,
                location,
                startTime,
                attachmentURL,
                maxSlots,
                date,
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

export default Update;
