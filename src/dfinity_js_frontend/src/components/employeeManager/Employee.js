import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import UpdateEmployee from "./UpdateEmployee";

const Employee = ({ employee, checkin }) => {
  const {
    id,
    name,
    phone,
    email,
    address,
    department,
    designation,
    salary,
    hireDate,
  } = employee;

  const intSalary = Number(salary / BigInt(10 ** 8));

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <span className="font-monospace text-secondary">{name}</span>
        </Card.Header>
        <UpdateEmployee employee={employee} save={update} />
        <div className=" ratio ratio-4x3">
          <img src={email} alt={name} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1 ">phone: {phone}</Card.Text>
          <Card.Text className="flex-grow-1 ">hireDate: {hireDate}</Card.Text>
          <Card.Text className="flex-grow-1 ">
            designation: {designation}
          </Card.Text>
          <Card.Text className="flex-grow-1 ">Salary: {intSalary}</Card.Text>
          <Card.Text className="flex-grow-1 ">address: {address}</Card.Text>
          <Card.Text className="flex-grow-1">
            department: {department}
          </Card.Text>
          {/* Router Link to send attendance to payrolls page passing the employeeid as search param */}
          <Link
            to={`/payrolls?employeeId=${id}`}
            className="btn btn-outline-dark w-100 py-3 mb-3"
          >
            View Payrolls
          </Link>
          <Button
            onClick={() => checkin(employee.id)}
            variant="dark"
            className="rounded-pill"
            // style={{ width: "38px" }}
          >
            Check In <i className="bi bi-pencil-square"></i>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Employee.propTypes = {
  employee: PropTypes.instanceOf(Object).isRequired,
};

export default Employee;
