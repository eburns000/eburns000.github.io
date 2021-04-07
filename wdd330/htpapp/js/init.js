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

function initializeLocalStorage() { // make this more generic, so you can pass in the name of the data element in local storage
  try {
    // clear any data in localStorage
    window.localStorage.clear();

    // load initial data into local Storage
    const initializedUsers = JSON.stringify(initUsers);
    window.localStorage.setItem('users', initializedUsers);
    const initializedAssignedExercises = JSON.stringify(initAssignedExercises);
    window.localStorage.setItem('assigned-exercises', initializedAssignedExercises);
    const initializedLibrary = JSON.stringify(initLibrary);
    window.localStorage.setItem('exercise-library', initializedLibrary);
  } catch (error) {
    console.error(error, "Unable to initialize local storage.")
  }
}

// initialization button and message
const btnInit = document.getElementById('btn-init');
const initInstructions = document.getElementById('init-instructions');

// if there are users localstorage, hide the initialization button and message
if(window.localStorage.getItem('users')) {
  btnInit.classList.add('display-none');
  initInstructions.classList.add('display-none');
}

// initialize local storage
btnInit.addEventListener('click', () => {
  initializeLocalStorage();
  btnInit.classList.add('display-none');
  initInstructions.classList.add('display-none');
});