// user table
let userList = [];

// user class
class User {
  constructor(email, password, first, last, phone, clinic, accountType, therapist, timestamp = Date.now()) {
    this.timestamp = timestamp;
    this.userid = email;
    this.password = password;
    this.first = first;
    this.last = last;
    this.phone = phone;
    this.clinic = clinic;
    this.accountType = accountType;
    this.therapist = therapist;
  }

  getTimestamp() {
    return this.timestamp;
  }

  getUserid() {
    return this.userid;
  }

  getFirst() {
    return this.first;
  }

  getLast() {
    return this.last;
  }

  getPhone() {
    return this.phone;
  }

  getClinic() {
    return this.clinic;
  }

  getAccountType() {
    return this.accountType;
  }

  getTherapist() {
    return this.therapist;
  }

}

// userModel class
class UserModel {

  createUser(email, password, first, last, phone, clinic, accountType, therapist) {
    return new User(email, password, first, last, phone, clinic, accountType, therapist);
  }

  getUsers() {
    return userList;
  }

  loadLocalData() {
    try {

      if (window.localStorage.getItem('users')) {

        console.log("load attempted");
        const users = window.localStorage.getItem('users');
        console.log("User List: ", users);

        const tempArray = JSON.parse(users);

        // clear the existing array
        userList.splice(0, userList.length);

        // now load the array by creating objects from the JSON data
        for (let i = 0; i < tempArray.length; i++) {
          const tempUser = new User(tempArray[i].userid, tempArray[i].password, tempArray[i].first, tempArray[i].last, tempArray[i].phone, tempArray[i].clinic, tempArray[i].accountType, tempArray[i].therapist, tempArray[i].timestamp);
          userList.push(tempUser);
        }

        console.log("UserList After Parse: ", userList);
      }

    } catch (error) {
      console.error(error, "Unable to load data from local storage.");
    }
  }

  saveLocalData() { // make this more generic, so you can pass in the name of the data element in local storage
    try {
      const users = JSON.stringify(userList);
      window.localStorage.setItem('users', users);
      console.log("UserLIst after save: ", userList);
    } catch (error) {
      console.error(error, "Unable to save data to local storage.")
    }
  }
}

/* CONTROLLER ****************************************************************/
// create userModel object
const myUserModel = new UserModel();

// load user list
myUserModel.loadLocalData();

// login
const btnLogin = document.getElementById('btn-login');

btnLogin.addEventListener('click', () => {

  const username = document.getElementById('userid').value;
  const password = document.getElementById('password').value;
  const postData = {
    id: username,
    pwd: password
  };
  const msg = document.getElementById('invalid-message');
  console.log("button clicked");
  console.log(postData);

  if (!isAuthenticated(postData)) {
    msg.classList.toggle('display-none');
  } else {
    const user = getUser(username);
    setActiveUser(user);
    console.log("user: ", user);
    console.log("account type: ", user.accountType);
    switch (user.accountType) {
      case 'admin':
        document.location = './users.html';
        break;
      case 'therapist':
        document.location = './my-clients.html';
        break;
      case 'client':
        document.location = './my-exercises.html';
        break;
      default:
        document.location = './index.html';
    }
  }
});

/* UTILS ******************************************/
// Check if the user exists in database
function isAuthenticated({ id, pwd }) {
  console.log("Is Authenticated was called");
  return (
    // no user found will be -1, which will be not true
    userList.findIndex(user => user.userid === id && user.password === pwd) !== -1
  );
}

function getUser(id) {
  console.log("getUser was called");
  return userList.filter(user => user.userid === id)[0];
}

function setActiveUser(user) {
  window.localStorage.setItem('activeUser', user.getUserid());
}
