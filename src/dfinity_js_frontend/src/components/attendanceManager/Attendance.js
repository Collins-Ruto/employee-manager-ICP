import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Stack, Button } from "react-bootstrap";

const Attendance = ({ attendance, checkout }) => {
  const { id, employeeId, date, checkInTime, checkOutTime, employeeName } =
    attendance;

  console.log(attendance);

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Body className="d-flex  flex-column text-center">
          <Stack>
            <Card.Title>Name: {employeeName}</Card.Title>
          </Stack>
          <Card.Text>Id: {id}</Card.Text>
          <Card.Text className="flex-grow-1 ">
            employeeId: {employeeId}
          </Card.Text>
          <Card.Text className="flex-grow-1 ">Date: {date}</Card.Text>
          <Card.Text className="flex-grow-1 ">
            checkInTime: {checkInTime}
          </Card.Text>
          <Card.Text className="flex-grow-1 ">
            checkOutTime: {checkOutTime}
          </Card.Text>
          <Button
            onClick={() => checkout(id)}
            disabled={checkOutTime.length > 0}
            variant="dark"
            className="btn btn-outline-info w-100 py-3 mb-3"
            // style={{ width: "38px" }}
          >
            Check Out <i className="bi bi-clipboard-check"></i>
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
