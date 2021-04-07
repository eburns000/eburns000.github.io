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

// initialization button and message
const btnInit = document.getElementById('btn-init');
const initInstructions = document.getElementById('init-instructions');

// if there are users localstorage, hide init btn/msg and load user data
if (window.localStorage.getItem('users')) {  
  btnInit.classList.add('display-none');
  initInstructions.classList.add('display-none');
  myUserModel.loadLocalData();
}

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
        setActiveClientID(user.getUserid());
        setActiveClientName(`${user.getFirst()} ${user.getLast()}`);
        document.location = './my-exercises.html';
        break;
      default:
        document.location = './index.html';
    }
  }
});

// initialize local storage and load local data
btnInit.addEventListener('click', () => {
  initializeLocalStorage();
  btnInit.classList.add('display-none');
  initInstructions.classList.add('display-none');
});

/* UTILS ******************************************/
// Check if the user exists in database
function isAuthenticated({
  id,
  pwd
}) {
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

function setActiveClientID(clientID) {
  window.localStorage.setItem('activeClient', clientID);
}

function setActiveClientName(clientName) {
  window.localStorage.setItem('activeClientName', clientName);
}

function initializeLocalStorage() {
  try {
    // clear any data in localStorage
    window.localStorage.clear();

    // load initial data into local Storage
    const initializedUsers = JSON.stringify(initUsers);
    const initializedAssignedExercises = JSON.stringify(initAssignedExercises);
    const initializedLibrary = JSON.stringify(initLibrary);
    window.localStorage.setItem('users', initializedUsers);    
    window.localStorage.setItem('assigned-exercises', initializedAssignedExercises);
    window.localStorage.setItem('exercise-library', initializedLibrary);
    myUserModel.loadLocalData();
  } catch (error) {
    console.error(error, "Unable to initialize local storage.")
  }
}

/* INITIALIZATION DATA ***************************/
const initUsers = [{
    timestamp: 1617661529024,
    userid: "admin@ac.com",
    password: "password",
    first: "Admin",
    last: "Bob",
    phone: "509-888-1111",
    clinic: "Wenatchee",
    accountType: "admin",
    therapist: "na"
  },
  {
    timestamp: 1617661552965,
    userid: "hal@ac.com",
    password: "password",
    first: "Hal",
    last: "Hunsaker",
    phone: "509-888-2505",
    clinic: "Wenatchee",
    accountType: "therapist",
    therapist: "Hal Hunsaker"
  },
  {
    timestamp: 1617661586550,
    userid: "bobbie@gmail.com",
    password: "password",
    first: "Bobbie",
    last: "Client",
    phone: "509-888-1111",
    clinic: "Wenatchee",
    accountType: "client",
    therapist: "Hal Hunsaker"
  },
  {
    timestamp: 1617756473538,
    userid: "don@ac.com",
    password: "password",
    first: "Don",
    last: "Langford",
    phone: "509-435-0481",
    clinic: "Spokane",
    accountType: "therapist",
    therapist: "Don Langford"
  },
  {
    timestamp: 1617756522132,
    userid: "sally@gmail.com",
    password: "password",
    first: "Sally",
    last: "Client",
    phone: "509-555-3333",
    clinic: "Spokane",
    accountType: "client",
    therapist: "Don Langford"
  }
];

const initAssignedExercises = [{
    assignedExerciseID: 1617756045896,
    clientID: "bobbie@gmail.com",
    title: "TH Sound",
    discipline: "Speech Therapy",
    modality: "Language",
    steps: "Step 1...\nStep 2...\nStep 3...\nStep 4...",
    dueDate: "2021-04-10",
    pointValue: "5",
    status: "not-started"
  },
  {
    assignedExerciseID: 1617756096569,
    clientID: "bobbie@gmail.com",
    title: "R Sound",
    discipline: "Speech Therapy",
    modality: "Language",
    steps: "Step 1...\nStep 2...\nStep 3...\nStep 4...",
    dueDate: "2021-04-17",
    pointValue: "10",
    status: "started"
  },
  {
    assignedExerciseID: 1617756111062,
    clientID: "bobbie@gmail.com",
    title: "Neck Roll",
    discipline: "Physicial Therapy",
    modality: "Range of Motion",
    steps: "Sit in an upright position.\nTake a deep breath, then exhale.\nDrop head forward.\nMove head slowly from one side to the other, coming to rest just below the shoulder, creating a smiley face with the chin.\nRepeat 10x",
    dueDate: "2021-05-01",
    pointValue: "20",
    status: "started"
  },
  {
    assignedExerciseID: 1617757055001,
    clientID: "sally@gmail.com",
    title: "Lowercase Letter B",
    discipline: "Occupational Therapy",
    modality: "Writing",
    steps: "Big line down,\nClimb up halfway,\nCurve to the bottom.",
    dueDate: "2021-05-08",
    pointValue: "15",
    status: "started"
  },
  {
    assignedExerciseID: 1617757110208,
    clientID: "sally@gmail.com",
    title: "R Sound",
    discipline: "Speech Therapy",
    modality: "Language",
    steps: "Step 1...\nStep 2...\nStep 3...\nStep 4...",
    dueDate: "2021-05-15",
    pointValue: "25",
    status: "started"
  }
];

const initLibrary = [{
  exerciseid: 1617739759876,
  title: "TH Sound",
  discipline: "Speech Therapy",
  modality: "Language",
  steps: "Step 1...\nStep 2...\nStep 3...\nStep 4..."
}, {
  exerciseid: 1617739787004,
  title: "R Sound",
  discipline: "Speech Therapy",
  modality: "Language",
  steps: "Step 1...\nStep 2...\nStep 3...\nStep 4..."
}, {
  exerciseid: 1617739987837,
  title: "Neck Roll",
  discipline: "Physicial Therapy",
  modality: "Range of Motion",
  steps: "Sit in an upright position.\nTake a deep breath, then exhale.\nDrop head forward.\nMove head slowly from one side to the other, coming to rest just below the shoulder, creating a smiley face with the chin.\nRepeat 10x"
}, {
  exerciseid: 1617740096021,
  title: "Lowercase Letter B",
  discipline: "Occupational Therapy",
  modality: "Writing",
  steps: "Big line down,\nClimb up halfway,\nCurve to the bottom."
}, {
  exerciseid: 1617740203109,
  title: "Tongue Tip Lat",
  discipline: "Speech Therapy",
  modality: "Tongue Exercises",
  steps: "Gently rub a tongue depressor side to side along the tip of the tongue in a tickling motion."
}];

