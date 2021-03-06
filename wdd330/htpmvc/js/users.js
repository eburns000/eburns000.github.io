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
        const users = window.localStorage.getItem('users');        
        const tempArray = JSON.parse(users);

        // clear the existing array
        userList.splice(0, userList.length);

        // now load the array by creating objects from the JSON data
        for (let i = 0; i < tempArray.length; i++) {
          const tempUser = new User(tempArray[i].userid, tempArray[i].password, tempArray[i].first, tempArray[i].last, tempArray[i].phone, tempArray[i].clinic, tempArray[i].accountType, tempArray[i].therapist, tempArray[i].timestamp);
          userList.push(tempUser);
        }
      }

    } catch (error) {
      console.error(error, "Unable to load data from local storage.");
    }
  }

  saveLocalData() { // make this more generic, so you can pass in the name of the data element in local storage
    try {
      const users = JSON.stringify(userList);
      window.localStorage.setItem('users', users);
    } catch (error) {
      console.error(error, "Unable to save data to local storage.")
    }
  }
}

/* VIEW **********************************************************************/
class UserListView {

  renderUserList(parentElement, myUserList) {
    // clear user list
    parentElement.innerHTML = "";
    myUserList.forEach(user => this.renderUser(parentElement, user));
  }

  renderUser(parentElement, user) {
    let userSection = document.createElement('section');
    userSection.classList.add('card-section');
    console.log(user.getUserid());
    userSection.id = user.getUserid();
    userSection.innerHTML = `
      <div class="card-section-left">
        <div class="equipment-img">
          <img src="images/people.png" alt="person icon">
        </div>
        <div class="equipment-data">
          <h3>${user.getFirst()} ${user.getLast()}</h3>              
        </div>
      </div>
      <div class="card-section-right">
        <p class="status">Active</p>
        <p class="account-type">${user.getAccountType()}</p>
        <p class="clinic">${user.getClinic()}</p>
      </div>`;
    parentElement.appendChild(userSection);
  }
}

/* CONTROLLER ****************************************************************/
// create userModel object
const myUserModel = new UserModel();

// load user list
myUserModel.loadLocalData();

// display users
const myUserListView = new UserListView();
const parentDiv = document.getElementById('user-list');
myUserListView.renderUserList(parentDiv, userList);
