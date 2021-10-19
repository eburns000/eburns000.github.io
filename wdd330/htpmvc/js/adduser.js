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

  createUser (email, password, first, last, phone, clinic, accountType, therapist) {
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

//add event listener to add user buttron - adduser.html
const btnAddUser = document.getElementById('btn-adduser');

btnAddUser.addEventListener('click', () => {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const first = document.getElementById('first').value;
  const last = document.getElementById('last').value;
  const phone = document.getElementById('phone').value;
  const clinic = document.getElementById('clinic').value;
  const accountType = document.getElementById('account-type').value;
  const therapist = document.getElementById('therapist').value;

  const newUser = myUserModel.createUser(email, password, first, last, phone, clinic, accountType, therapist);

  userList.push(newUser);

  myUserModel.saveLocalData();

  document.location = './users.html';

});