import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Attendance from "./Attendance";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getAttendances as getAttendanceList,
  checkoutAttendance,
} from "../../utils/attendanceManager";
import { Link } from "react-router-dom";

const Attendances = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of attendances
  const getAttendances = useCallback(async () => {
    try {
      setLoading(true);
      setAttendances(await getAttendanceList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  console.log(attendances);

  const checkout = async (data) => {
    try {
      setLoading(true);
      checkoutAttendance(data).then((resp) => {
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

  useEffect(() => {
    getAttendances();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Attendances Manager</h1>
            <Link
              to="/"
              className="justify-content-start mr-4 py-2 px-3 my-2 bg-secondary text-white "
            >
              Employees Page
            </Link>
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {attendances.map((_attendance, index) => (
              <Attendance
                key={index}
                attendance={{
                  ..._attendance,
                }}
                checkout={checkout}
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

export default Attendances;
