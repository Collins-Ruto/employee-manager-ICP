import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PayrollsPage from "./pages/Payroll";
import AttendancesPage from "./pages/Attendances";
import EmployeesPage from "./pages/Employees";

const App = function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<EmployeesPage />} />
        <Route path="/attendances" element={<AttendancesPage />} />
        <Route path="/payrolls" element={<PayrollsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
