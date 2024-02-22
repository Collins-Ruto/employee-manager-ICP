import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UpdateEmployee from "./UpdateEmployee";
import AddPayroll from "./AddPayroll";

const Employee = ({ employee, checkin, pay, update }) => {
  const {
    id,
    name,
    phone,
    email,
    address,
    department,
    profileImg,
    designation,
    salary,
    hireDate,
  } = employee;

  const intSalary = Number(salary);

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <span className="font-monospace">{name}</span>
        </Card.Header>
        <div className="d-flex justify-content-around my-2">
          <UpdateEmployee employee={employee} save={update} />
          <AddPayroll employee={employee} save={pay} />
        </div>
        <div className=" ratio ratio-4x3">
          <img src={profileImg} alt={name} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column ">
          <Card.Title>Name: {name}</Card.Title>
          <Card.Text className="flex-grow-1 ">phone: {phone}</Card.Text>
          <Card.Text className="flex-grow-1 ">email: {email}</Card.Text>
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
        </Card.Body>
        <Link
          to={`/payrolls?employeeId=${id}`}
          className="btn btn-outline-dark w-100 py-3 mb-3"
        >
          View Payrolls
        </Link>
        <Button
          onClick={() => checkin(employee.id)}
          variant="dark"
          className="btn btn-outline-info w-100 py-3 mb-3"
          // style={{ width: "38px" }}
        >
          Check In <i className="bi bi-clipboard-check"></i>
        </Button>
      </Card>
    </Col>
  );
};

Employee.propTypes = {
  employee: PropTypes.instanceOf(Object).isRequired,
};

export default Employee;
