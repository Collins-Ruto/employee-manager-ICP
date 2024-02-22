import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddEmployee from "./AddEmployee";
import Employee from "./Employee";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getEmployees as getEmployeeList,
  createEmployee,
  reserveEmployee,
  updateEmployee,
} from "../../utils/employeeManager";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of employees
  const getEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setEmployees(await getEmployeeList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addEmployee = async (data) => {
    try {
      setLoading(true);
      const maxSlotsStr = data.maxSlots;
      data.maxSlots = parseInt(maxSlotsStr, 10) * 10 ** 8;
      createEmployee(data).then((resp) => {
        getEmployees();
        toast(<NotificationSuccess text="Employee added successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a employee." />);
    } finally {
      setLoading(false);
    }
  };

  const checkin = async (data) => {
    try {
      setLoading(true);
      checkinAttendance(data).then((resp) => {
        getAttendances();
      });
      toast(<NotificationSuccess text="Attendance added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a attendance." />);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setLoading(true);
      const maxSlotsStr = data.maxSlots;
      data.maxSlots = parseInt(maxSlotsStr, 10) * 10 ** 8;
      updateEmployee(data).then((resp) => {
        getEmployees();
        toast(<NotificationSuccess text="Employee added successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a employee." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Employees</h1>
            <Link
              to="/attendances"
              className="justify-content-start py-2 px-3 my-2 bg-secondary text-white rounded-pill "
            >
              Attendances Manager
            </Link>
            <div className="d-flex align-items-center">
              <div className="mr-6">Add Employee</div>
              <AddEmployee save={addEmployee} />
            </div>
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {employees.map((_employee, index) => (
              <Employee
                key={index}
                employee={{
                  ..._employee,
                }}
                checkin={checkin}
                update={update}
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

export default Employees;
