import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Stack } from "react-bootstrap";

const Attendance = ({ attendance, checkout }) => {
  const { id, employeeId, date, checkInTime, checkOutTime, employeeName } =
    attendance;

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Body className="d-flex  flex-column text-center">
          <Stack>
            <Card.Title>Name: {employeeName}</Card.Title>
          </Stack>
          <Card.Text>Id: {id}</Card.Text>
          <Card.Text className="flex-grow-1 ">Date: {date}</Card.Text>
          <Card.Text className="flex-grow-1 ">
            employeeId: {employeeId}
          </Card.Text>
          <Card.Text className="flex-grow-1 ">
            checkInTime: {checkInTime}
          </Card.Text>
          <Card.Text className="flex-grow-1 ">
            checkOutTime: {checkOutTime}
          </Card.Text>
          <Button
            onClick={() => checkout(id)}
            variant="dark"
            className="rounded-pill"
            // style={{ width: "38px" }}
          >
            Check Out <i className="bi bi-pencil-square"></i>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Attendance.propTypes = {
  attendance: PropTypes.instanceOf(Object).isRequired,
};

export default Attendance;
