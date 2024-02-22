export async function createAttendance(attendance) {
  return window.canister.employeeManager.addAttendance(attendance);
}

export async function updateAttendance(attendance) {
  return window.canister.employeeManager.updateAttendance(attendance);
}

export async function checkinAttendance(attendance) {
  return window.canister.employeeManager.addAttendance(attendance);
}

// checkout attendance updates attendance
export async function checkoutAttendance(attendanceId) {
  return window.canister.employeeManager.updateAttendance(attendanceId);
}

export async function getAttendances() {
  try {
    return await window.canister.employeeManager.getAllAttendances();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
