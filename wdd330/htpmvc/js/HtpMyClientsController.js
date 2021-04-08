/* CONTROLLER ****************************************************************/
// create userModel object
const myUserModel = new UserModel();

// load user list
myUserModel.loadLocalData();

// get active user
const activeUser = window.localStorage.getItem('activeUser');
console.log("activeUser:", activeUser);

// filter user list to those who are clients and the therapist matches the user
// this will show only those users that are clients to the therapist user
const myTherapist = userList.filter(user => user.userid === activeUser)[0].getTherapist();
const myClients = userList.filter(user => user.therapist === myTherapist && user.accountType === "client");

// display users
const myMyClientsView = new MyClientsView();
const parentDiv = document.getElementById('user-list');
myMyClientsView.renderUserList(parentDiv, myClients);

// did it this way, so that the current target, or section, would be the "parent" and 
// so that no matter what part of the card you clicked on, the id of that section woudl be pulled
// make this a utility function
const childrenArray = Array.from(parentDiv.children);
childrenArray.forEach(child => {
  child.addEventListener('click', e => {
    setActiveClientID(e.currentTarget.id);
    const currentUser = userList.filter(user => user.userid === e.currentTarget.id)[0];
    setActiveClientName(currentUser.getFirst() + " " + currentUser.getLast());
    document.location = './client-exercises.html';
  });
});


/* UTILS *********************************************************************/
function setActiveClientID(clientID) {
  window.localStorage.setItem('activeClient', clientID);
}

function setActiveClientName(clientName) {
  window.localStorage.setItem('activeClientName', clientName);
}

