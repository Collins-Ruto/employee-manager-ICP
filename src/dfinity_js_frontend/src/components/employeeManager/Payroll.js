import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Stack } from "react-bootstrap";

const Payroll = ({ payroll }) => {
  const {
    id,
    employeeId,
    employeeName,
    year,
    month,
    basicSalary,
    allowances,
    netSalary,
  } = payroll;

  const intBasicSalary = Number(basicSalary);
  const intAllowances = Number(allowances);
  const intNetSalary = Number(netSalary);

  console.log(payroll);

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            {employeeName}
          </Stack>
        </Card.Header>
        <Card.Body className="d-flex  flex-column ">
          <Card.Text className="flex-grow-1 ">PayrollId: {id}</Card.Text>
          <Card.Text className="flex-grow-1 ">
            employeeId: {employeeId}
          </Card.Text>
          <Card.Text className="flex-grow-1 ">year: {year}</Card.Text>
          <Card.Text className="flex-grow-1 ">month: {month}</Card.Text>
          <Card.Text className="flex-grow-1 ">
            basicSalary: {intBasicSalary}
          </Card.Text>
          <Card.Text className="flex-grow-1 ">
            allowances: {intAllowances}
          </Card.Text>
          <hr />
          <Card.Text className="flex-grow-1 ">
            netSalary: {intNetSalary}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

Payroll.propTypes = {
  payroll: PropTypes.instanceOf(Object).isRequired,
};

export default Payroll;
