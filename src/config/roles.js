const allRoles = {
  // trong trường hợp những api nào không cần đăng nhập vẫn show hoặc vẫn có thể xem thì sẽ không cần auth()

  // Bảo vệ
  user: [
    'getPlaces',
    'getOrganizations',
    'addTimesheets',
    'getTimesheets',
    'getDivisions',
    'getCurrentUser',
    'getUsers',
    'createExplain',
    'approvalExplain',
    'resetPassword',
  ],
  // Đội trưởng đội bảo vệ
  leader: [
    'getCurrentUser',
    'managePlaces',
    'getPlaces',
    'manageCheckins',
    'getCheckins',
    'getOrganizations',
    'addTimesheets',
    'getTimesheets',
    'manageTimesheets',
    'manageDivisions',
    'getDivisions',
    'getUsers',
    'manageUsers',
    'approvalExplain',
    'resetPassword',
  ],
  // Quản lí khu vực
  manager: [
    'getCurrentUser',
    'getUsers',
    'manageUsers',
    'managePlaces',
    'getPlaces',
    'manageCheckins',
    'getCheckins',
    'getOrganizations',
    'manageScanQRs',
    'getScanQRs',
    'manageShifts',
    'getShifts',
    'getTimesheets',
    'manageTimesheets',
    'approvalExplain',
    'addTimesheets',
  ],
  // Giám đốc
  admin: [
    'getCurrentUser',
    'getUsers',
    'manageUsers',
    'managePlaces',
    'getPlaces',
    'getShifts',
    'manageShifts',
    'getOrganizations',
    'manageOrganizations',
    'getTimesheets',
    'manageTimesheets',
    'resetPassword',
    'approvalExplain',
    'addTimesheets',
  ],
  // // DEV - Quản trị hệ thống
  // superadmin: [
  //   'manageOrganizations',
  //   'getOrganizations',
  // ]
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
