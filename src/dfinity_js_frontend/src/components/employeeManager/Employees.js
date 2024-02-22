import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddEmployee from "./AddEmployee";
import Employee from "./Employee";
import Loader from "../utils/Loader";
import { Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getEmployees as getEmployeeList,
  createEmployee,
  updateEmployee,
  payEmployee,
} from "../../utils/employeeManager";
import { checkinAttendance } from "../../utils/attendanceManager";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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
      data.salary = parseInt(data.salary, 10);
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
        getEmployees();
      });
      toast(<NotificationSuccess text="Attendance added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a attendance." />);
    } finally {
      setLoading(false);
    }
  };

  const pay = async (data) => {
    try {
      setLoading(true);
      data.basicSalary = parseInt(data.basicSalary, 10);
      data.allowances = parseInt(data.allowances, 10);
      payEmployee(data).then((resp) => {
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

  const update = async (data) => {
    try {
      setLoading(true);
      data.salary = parseInt(data.salary, 10);
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

  // function to filter the employees name, designation, department based on the search input
  const filterEmployees = () => {
    // if search is empty, set the employees to the original list
    if (search === "") {
      getEmployees();
      return;
    }
    const filteredEmployees = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.designation.toLowerCase().includes(search.toLowerCase()) ||
        employee.department.toLowerCase().includes(search.toLowerCase())
    );
    setEmployees(filteredEmployees);
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
            <div className="input-group" style={{ width: "30%" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, designation, department"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <div className="input-group-append">
                <Button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    filterEmployees();
                  }}
                >
                  <i className="bi bi-search"></i>
                </Button>
              </div>
            </div>
            <Link
              to="/attendances"
              className="justify-content-start text-decoration-none py-2 px-3 my-2 bg-secondary text-white "
            >
              Attendances Page
            </Link>
            <div className="d-flex align-items-center">
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
                pay={pay}
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
