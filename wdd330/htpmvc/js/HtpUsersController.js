/* CONTROLLER ****************************************************************/
// create userModel object
const myUserModel = new UserModel();

// load user list
myUserModel.loadLocalData();

// display users
const myUserListView = new UserListView();
const parentDiv = document.getElementById('user-list');
myUserListView.renderUserList(parentDiv, userList);