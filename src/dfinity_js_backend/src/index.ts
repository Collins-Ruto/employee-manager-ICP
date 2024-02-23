// Import necessary modules and libraries from the Azle framework and UUID for generating unique identifiers.
import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  Ok,
  Err,
  Opt,
  Some,
  None,
  nat64,
  Result,
  Canister,
} from "azle";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

// Define record structure for an Employee
const Employee = Record({
  id: text,
  name: text,
  email: text,
  phone: text,
  profileImg: text,
  address: text,
  department: text,
  designation: text,
  hireDate: text,
  salary: nat64,
});

// Define payload structure for creating an employee
const EmployeePayload = Record({
  name: text,
  email: text,
  phone: text,
  profileImg: text,
  address: text,
  department: text,
  designation: text,
  salary: nat64,
});

// Define payload structure for updating an employee
const UpdateEmployeePayload = Record({
  id: text,
  email: text,
  phone: text,
  address: text,
  department: text,
  designation: text,
  salary: nat64,
});

// Define record structure for Payroll Details
const Payroll = Record({
  id: text,
  employeeId: text,
  date: text,
  month: text,
  year: text,
  basicSalary: nat64,
  allowances: nat64,
  netSalary: nat64,
});

// Define payload structure for adding Payroll Details
const PayrollPayload = Record({
  employeeId: text,
  basicSalary: nat64,
  allowances: nat64,
});

// Define record structure for a Payslip
const Payslip = Record({
  id: text,
  employeeId: text,
  employeeName: text,
  date: text,
  month: text,
  year: text,
  basicSalary: nat64,
  allowances: nat64,
  netSalary: nat64,
});

// Define record structure for Attendance
const Attendance = Record({
  id: text,
  employeeId: text,
  employeeName: text,
  date: text,
  checkInTime: text,
  checkOutTime: Opt(text), // Optional field for check-out time
});

// Define variant representing different error types
const ErrorType = Variant({
  NotFound: text,
  InvalidPayload: text,
  PaymentFailed: text,
  PaymentCompleted: text,
});

// Define record structure for Employee Analysis
const EmployeeAnalysis = Record({
  employeeName: text,
  totalDays: text,
  presentDays: text,
  absentDays: text,
});

// Initialize StableBTreeMap instances to store employees, payrolls, and attendance records.
const employeesStorage = StableBTreeMap(0, text, Employee);
const payrollsStorage = StableBTreeMap(1, text, Payroll);
const attendancesStorage = StableBTreeMap(3, text, Attendance);

// Export default Canister module
export default Canister({
  // Function to add an employee
  addEmployee: update(
    [EmployeePayload],
    Result(Employee, ErrorType),
    (payload) => {
      // Check if the payload is a valid object
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ NotFound: "invalid payload" });
      }
      // Create an employee with a unique id generated using UUID v4
      const employee = {
        id: uuidv4(),
        hireDate: new Date().toISOString(),
        ...payload,
      };
      // Insert the employee into the employeesStorage
      employeesStorage.insert(employee.id, employee);
      return Ok(employee);
    }
  ),

  // Function to retrieve all employees
  getEmployees: query([], Vec(Employee), () => {
    return employeesStorage.values();
  }),

  // Function to retrieve a specific employee by ID
  getEmployee: query([text], Result(Employee, ErrorType), (id) => {
    const employeeOpt = employeesStorage.get(id);
    if ("None" in employeeOpt) {
      return Err({ NotFound: `employee with id=${id} not found` });
    }
    return Ok(employeeOpt.Some);
  }),

  // Function to search for employees by name
  searchEmployee: query([text], Vec(Employee), (name) => {
    const employees = employeesStorage.values();
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(name.toLowerCase())
    );
  }),

  // Function to update an employee
  updateEmployee: update(
    [UpdateEmployeePayload],
    Result(Employee, ErrorType),
    (payload) => {
      const employeeOpt = employeesStorage.get(payload.id);
      if ("None" in employeeOpt) {
        return Err({ NotFound: `employee with id=${payload.id} not found` });
      }
      const employee = employeeOpt.Some;
      const updatedEmployee = {
        ...employee,
        ...payload,
      };
      employeesStorage.insert(employee.id, updatedEmployee);
      return Ok(updatedEmployee);
    }
  ),

  // Function to add an attendance record for an employee
  addAttendance: update([text], Result(Attendance, ErrorType), (employeeId) => {
    // Get the employee
    const employeeOpt = employeesStorage.get(employeeId);
    // Check if the payload is a valid object
    if (!employeeId) {
      return Err({ NotFound: "invalid payload" });
    }

    // Create an attendance record with a unique id generated using UUID v4
    const attendance = {
      id: uuidv4(),
      date: new Date().toISOString(),
      checkInTime: new Date().toLocaleTimeString(),
      checkOutTime: None,
      employeeName: employeeOpt.Some.name,
      employeeId,
    };
    // Insert the attendance record into the attendancesStorage
    attendancesStorage.insert(attendance.id, attendance);
    return Ok(attendance);
  }),

  // Function to update an attendance record for check-out time
  updateAttendance: update([text], Result(Attendance, ErrorType), (id) => {
    const attendanceOpt = attendancesStorage.get(id);
    if ("None" in attendanceOpt) {
      return Err({ NotFound: `attendance with id=${id} not found` });
    }
    const attendance = attendanceOpt.Some;
    const updatedAttendance = {
      ...attendance,
      checkOutTime: Some(new Date().toLocaleTimeString()),
    };
    attendancesStorage.insert(attendance.id, updatedAttendance);
    return Ok({
      ...updatedAttendance,
    });
  }),

  // Function to retrieve all attendance records
  getAllAttendances: query([], Vec(Attendance), () => {
    return attendancesStorage.values();
  }),

  // Function to retrieve a specific attendance record by ID
  getAttendance: query([text], Result(Attendance, ErrorType), (id) => {
    const attendanceOpt = attendancesStorage.get(id);
    if ("None" in attendanceOpt) {
      return Err({ NotFound: `attendance with id=${id} not found` });
    }
    return Ok(attendanceOpt.Some);
  }),

  // Function to retrieve attendance records for a specific date
  getAttendanceByDate: query([text], Attendance, (date) => {
    const attendances = attendancesStorage.values();
    return attendances.filter((attendance) => attendance.date === date)[0];
  }),

  // Function to retrieve attendance records for a specific employee
  getEmployeeAttendances: query([text], Vec(Attendance), (employeeId) => {
    const employeeOpt = employeesStorage.get(employeeId);
    if ("None" in employeeOpt) {
      return [];
    }
    const employee = employeeOpt.Some;
    const attendances = attendancesStorage.values();
    return attendances
      .filter((attendance) => attendance.employeeId === employeeId)
      .map((attendance) => {
        return {
          employeeName: employee.name,
          ...attendance,
        };
      });
  }),

  // Function to perform analysis on employee attendance
  getEmployeeAnalysis: query(
    [text],
    Result(EmployeeAnalysis, ErrorType),
    (employeeId) => {
      const employeeOpt = employeesStorage.get(employeeId);
      if ("None" in employeeOpt) {
        return Err({ NotFound: `employee with id=${employeeId} not found` });
      }
      const employee = employeeOpt.Some;
      const attendances = attendancesStorage.values();
      const totalDays = attendances.filter(
        (attendance) => attendance.employeeId === employeeId
      ).length;
      const presentDays = attendances.filter(
        (attendance) =>
          attendance.employeeId === employeeId &&
          attendance.checkOutTime !== None
      ).length;
      const absentDays = totalDays - presentDays;
      return Ok({
        employeeName: employee.name,
        totalDays: totalDays.toString(),
        presentDays: presentDays.toString(),
        absentDays: absentDays.toString(),
      });
    }
  ),

  // Function to add payroll details for an employee
  addPayroll: update(
    [PayrollPayload],
    Result(Payslip, ErrorType),
    (payload) => {
      // Get the employee
      const employeeOpt = employeesStorage.get(payload.employeeId);
      if ("None" in employeeOpt) {
        return Err({
          NotFound: `employee with id=${payload.employeeId} not found`,
        });
      }
      const date = new Date();
      // Create a payroll record with a unique id generated using UUID v4
      const payroll = {
        id: uuidv4(),
        month: date.getFullYear().toString(),
        year: date.getMonth().toString(),
        date: date.toISOString(),
        netSalary: payload.basicSalary + payload.allowances,
        ...payload,
      };
      // Insert the payroll record into the payrollsStorage
      payrollsStorage.insert(payroll.id, payroll);
      return Ok({
        employeeName: employeeOpt.Some.name,
        ...payroll,
      });
    }
  ),

  // Function to retrieve all payroll records
  getAllPayrolls: query([], Vec(Payroll), () => {
    return payrollsStorage.values();
  }),

  // Function to retrieve a specific payroll record by ID
  getPayroll: query([text], Result(Payroll, ErrorType), (id) => {
    const payrollOpt = payrollsStorage.get(id);
    if ("None" in payrollOpt) {
      return Err({ NotFound: `payroll with id=${id} not found` });
    }
    return Ok(payrollOpt.Some);
  }),

  // Function to retrieve payroll records for a specific employee
  getEmployeePayrolls: query([text], Vec(Payroll), (employeeId) => {
    const payrolls = payrollsStorage.values();
    return payrolls.filter((payroll) => payroll.employeeId === employeeId);
  }),

  // Function to retrieve payroll records for a specific year
  getYearPayrolls: query([nat64], Vec(Payroll), (year) => {
    const payrolls = payrollsStorage.values();
    return payrolls.filter((payroll) => payroll.year === year);
  }),

  // Function to retrieve payroll records for a specific month
  getMonthPayrolls: query([text], Vec(Payroll), (month) => {
    const payrolls = payrollsStorage.values();
    return payrolls.filter((payroll) => payroll.month === month);
  }),
});

// A workaround to make the UUID package work with Azle
globalThis.crypto = {
  // @ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  },
};
