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
  None,
  nat64,
  Result,
  Canister,
} from "azle";
// Importing UUID v4 for generating unique identifiers
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

/**
 * This type represents an employee that can be listed on an employee manager.
 * It contains basic properties needed to define an employee.
 */
const Employee = Record({
  id: text,
  name: text,
  email: text,
  phone: text,
  address: text,
  department: text,
  designation: text,
  hireDate: text,
  salary: nat64,
});

// Payload structure for creating an employee
const EmployeePayload = Record({
  name: text,
  email: text,
  phone: text,
  address: text,
  department: text,
  designation: text,
  salary: nat64,
});

// Payload structure for updating an employee
const UpdateEmployeePayload = Record({
  id: text,
  email: text,
  phone: text,
  address: text,
  department: text,
  designation: text,
  salary: nat64,
});

// Record structure representing Payroll Details
const Payroll = Record({
  id: text,
  employeeId: text,
  month: text,
  year: nat64,
  basicSalary: nat64,
  allowances: nat64,
  netSalary: nat64,
});

// Record structure representing Add Payroll Details
const PayrollPayload = Record({
  employeeId: text,
  month: text,
  year: nat64,
  basicSalary: nat64,
  allowances: nat64,
  netSalary: nat64,
});

// Structure representing a payslip
const Payslip = Record({
  id: text,
  employeeId: text,
  employeeName: text,
  month: text,
  year: nat64,
  basicSalary: nat64,
  allowances: nat64,
  netSalary: nat64,
});

// Structure representing a attendance
const Attendance = Record({
  id: text,
  employeeId: text,
  employeeName: text,
  date: text,
  checkInTime: text,
  checkOutTime: Opt(text),
});

// Variant representing different error types
const ErrorType = Variant({
  NotFound: text,
  InvalidPayload: text,
  PaymentFailed: text,
  PaymentCompleted: text,
});

// return type for the getEmployeeAnalysis function
const EmployeeAnalysis = Record({
  employeeName: text,
  totalDays: text,
  presentDays: text,
  absentDays: text,
});

/**
 * `employeesStorage` - a key-value data structure used to store employees by sellers.
 * {@link StableBTreeMap} is a self-balancing tree that acts as durable data storage across canister upgrades.
 * For this contract, `StableBTreeMap` is chosen for the following reasons:
 * - `insert`, `get`, and `remove` operations have constant time complexity (O(1)).
 * - Data stored in the map survives canister upgrades, unlike using HashMap where data is lost after an upgrade.
 *
 * Breakdown of the `StableBTreeMap(text, Employee)` data structure:
 * - The key of the map is an `employeeId`.
 * - The value in this map is an employee (`Employee`) related to a given key (`employeeId`).
 *
 * Constructor values:
 * 1) 0 - memory id where to initialize a map.
 * 2) 16 - maximum size of the key in bytes.
 * 3) 1024 - maximum size of the value in bytes.
 * Values 2 and 3 are not used directly in the constructor but are utilized by the Azle compiler during compile time.
 */
const employeesStorage = StableBTreeMap(0, text, Employee);
const payrollsStorage = StableBTreeMap(1, text, Payroll);
const attendancesStorage = StableBTreeMap(3, text, Attendance);

// Exporting default Canister module
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

  // Function to retrieve a specific employee by id
  getEmployee: query([text], Result(Employee, ErrorType), (id) => {
    const employeeOpt = employeesStorage.get(id);
    if ("None" in employeeOpt) {
      return Err({ NotFound: `employee with id=${id} not found` });
    }
    return Ok(employeeOpt.Some);
  }),

  // search employee by name
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

  // Function to add a attendance
  addAttendance: update([text], Result(Attendance, ErrorType), (employeeId) => {
    // get the employee
    const employeeOpt = employeesStorage.get(employeeId);
    // Check if the payload is a valid object
    if (!employeeId) {
      return Err({ NotFound: "invalid payload" });
    }

    // Create a attendance with a unique id generated using UUID v4
    const attendance = {
      id: uuidv4(),
      date: new Date().toISOString(),
      checkInTime: new Date().toLocaleTimeString(),
      checkOutTime: None,
      employeeName: employeeOpt.Some.name,
      employeeId,
    };
    // Insert the attendance into the attendancesStorage
    attendancesStorage.insert(attendance.id, attendance);
    return Ok(attendance);
  }),

  // Function to update a attendance for check out
  updateAttendance: update([text], Result(Attendance, ErrorType), (id) => {
    const attendanceOpt = attendancesStorage.get(id);
    if ("None" in attendanceOpt) {
      return Err({ NotFound: `attendance with id=${id} not found` });
    }
    const attendance = attendanceOpt.Some;
    const updatedAttendance = {
      ...attendance,
      checkOutTime: new Date().toLocaleTimeString(),
    };
    attendancesStorage.insert(attendance.id, updatedAttendance);
    return Ok({
      ...updatedAttendance,
    });
  }),

  // Function to retrieve all attendances
  getAllAttendances: query([], Vec(Attendance), () => {
    return attendancesStorage.values();
  }),

  // Function to retrieve a specific attendance by id
  getAttendance: query([text], Result(Attendance, ErrorType), (id) => {
    const attendanceOpt = attendancesStorage.get(id);
    if ("None" in attendanceOpt) {
      return Err({ NotFound: `attendance with id=${id} not found` });
    }
    return Ok(attendanceOpt.Some);
  }),

  // Function to retrieve a specific attendance by date
  getAttendanceByDate: query([text], Attendance, (date) => {
    const attendances = attendancesStorage.values();
    return attendances.filter((attendance) => attendance.date === date)[0];
  }),

  // Function to retrieve attendances for an employees
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

  // get employee analysis based on attendance
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

  // Function to add a payroll
  addPayroll: update(
    [PayrollPayload],
    Result(Payslip, ErrorType),
    (payload) => {
      // get the employee
      const employeeOpt = employeesStorage.get(payload.employeeId);
      if ("None" in employeeOpt) {
        return Err({
          NotFound: `employee with id=${payload.employeeId} not found`,
        });
      }
      // Create a payroll with a unique id generated using UUID v4
      const payroll = {
        id: uuidv4(),
        ...payload,
      };
      // Insert the payroll into the payrollsStorage
      payrollsStorage.insert(payroll.id, payroll);
      return Ok({
        employeeName: employeeOpt.Some.name,
        ...payroll,
      });
    }
  ),

  // Function to retrieve all payrolls
  getAllPayrolls: query([], Vec(Payroll), () => {
    return payrollsStorage.values();
  }),

  // Function to retrieve a specific payroll by id
  getPayroll: query([text], Result(Payroll, ErrorType), (id) => {
    const payrollOpt = payrollsStorage.get(id);
    if ("None" in payrollOpt) {
      return Err({ NotFound: `payroll with id=${id} not found` });
    }
    return Ok(payrollOpt.Some);
  }),

  // Function to retrieve payrolls for an employees
  getEmployeePayrolls: query([text], Vec(Payroll), (employeeId) => {
    const payrolls = payrollsStorage.values();
    return payrolls.filter((payroll) => payroll.employeeId === employeeId);
  }),

  // Function to retrieve a specific year payrolls
  getYearPayrolls: query([nat64], Vec(Payroll), (year) => {
    const payrolls = payrollsStorage.values();
    return payrolls.filter((payroll) => payroll.year === year);
  }),

  // Function to retrieve a specific month payrolls
  getMonthPayrolls: query([text], Vec(Payroll), (month) => {
    const payrolls = payrollsStorage.values();
    return payrolls.filter((payroll) => payroll.month === month);
  }),
});

// A workaround to make the uuid package work with Azle
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
