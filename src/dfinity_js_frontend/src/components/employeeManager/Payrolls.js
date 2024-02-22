import React, { useEffect, useState, useCallback } from "react";
import Payroll from "./Payroll";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEmployeePayrolls as getEmployeePayrollList } from "../../utils/employeeManager";

const Payrolls = ({ employeeId }) => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of payrolls
  const getEmployeePayrolls = useCallback(async () => {
    try {
      setLoading(true);
      setPayrolls(await getEmployeePayrollList(employeeId));
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    getEmployeePayrolls();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Payrolls</h1>
            <Link
              to="/"
              className="justify-content-start text-decoration-none mr-4 py-2 px-3 my-2 bg-secondary text-white "
            >
              Employees Page
            </Link>
            <Link
              to="/attendances"
              className="justify-content-start text-decoration-none py-2 px-3 my-2 bg-secondary text-white "
            >
              Attendances Page
            </Link>
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {payrolls.map((_payroll, index) => (
              <Payroll
                key={index}
                payroll={{
                  ..._payroll,
                }}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Payrolls;
