import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

export async function createEmployee(employee) {
  return window.canister.employeeManager.addEmployee(employee);
}

export async function updateEmployee(employee) {
  return window.canister.employeeManager.updateEmployee(employee);
}

export async function reserveEmployee(payroll) {
  return window.canister.employeeManager.createPayroll(payroll);
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

export async function buyEmployee(employee) {
  const employeeManagerCanister = window.canister.employeeManager;
  const orderResponse = await employeeManagerCanister.createPayroll(
    employee.id
  );
  const sellerPrincipal = Principal.from(orderResponse.Ok.seller);
  const sellerAddress = await employeeManagerCanister.getAddressFromPrincipal(
    sellerPrincipal
  );
  const block = await transferICP(
    sellerAddress,
    orderResponse.Ok.price,
    orderResponse.Ok.memo
  );
  await employeeManagerCanister.completePurchase(
    sellerPrincipal,
    employee.id,
    orderResponse.Ok.price,
    block,
    orderResponse.Ok.memo
  );
}
