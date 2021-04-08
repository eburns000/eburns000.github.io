/* CONTROLLER ****************************************************************/
// create Model object
const myAssignedExerciseModel = new AssignedExerciseModel();

// load array with data from local storage
myAssignedExerciseModel.loadLocalData();

// display client's exercises
const myAssignedExerciseView = new AssignedExerciseView();
const pDiv = document.getElementById('assignment');
const assignment = assignedExercises.filter(ae => ae.getAssignedExerciseID() === parseInt(getActiveAssignedExerciseID()));
myAssignedExerciseView.renderExerciseList(pDiv, assignment);
addBtnListener();

// set listener on button
function addBtnListener() {
  const btnUpdateStatus = document.getElementById('btn-update-status');
  btnUpdateStatus.addEventListener('click', e => updateStatus(e.target.value));
}

async function updateStatus(value) {
  let updateValue = null;
  switch (value) {
    case 'Start Exercise Now':
      updateValue = "started";
      break;
    case 'Mark Complete':
      updateValue = "completed";
      break;
    case 'Completed':
      return;
    default:
      return;
  }

  if (updateValue) {
    console.log("updateValue: ", updateValue);
    // call update array async with await
    await updateArray(updateValue);
    // call update local storage with await
    await updateLocalStorage();
    await myConsole();

    // rerender and add listener
    myAssignedExerciseView.renderExerciseList(pDiv, assignment);
    addBtnListener();
  }

}

async function myConsole() {
  console.log("status from array: ", assignment[0].getStatus());
}

async function updateArray(value) {
  assignment[0].setStatus(value); // this is allowable because we have a reference above, but may have to do it differently
}

async function updateLocalStorage() {
  myAssignedExerciseModel.saveLocalData();
}

/* UTILS ***********************************************************************/
function getActiveClientID() {
  return window.localStorage.getItem('activeClient');
}

function getActiveClientName() {
  return window.localStorage.getItem('activeClientName');
}

// why can't you do a generic function taking two arguments - the local storage name and the value you want to set? Having it be this way, you can control in LS what value you want to use in LS for the entire program, so maybe it makes sense to keep it this way
function setActiveAssignedExerciseID(id) {
  window.localStorage.setItem('activeAssignedExerciseID', id);
}

function getActiveAssignedExerciseID() {
  return window.localStorage.getItem('activeAssignedExerciseID');
}