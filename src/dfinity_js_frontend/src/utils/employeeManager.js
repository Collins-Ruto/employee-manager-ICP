export async function createEmployee(employee) {
  return window.canister.employeeManager.addEmployee(employee);
}

export async function updateEmployee(employee) {
  return window.canister.employeeManager.updateEmployee(employee);
}

// pay employee creates payroll
export async function payEmployee(payrollId) {
  return window.canister.employeeManager.addPayroll(payrollId);
}

export async function getEmployees() {
  try {
    return await window.canister.employeeManager.getEmployees();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getEmployeePayrolls(employeeId) {
  try {
    return await window.canister.employeeManager.getEmployeePayrolls(
      employeeId
    );
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
