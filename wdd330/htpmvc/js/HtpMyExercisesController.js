/* CONTROLLER ****************************************************************/
// display active Client
const clientName = document.getElementById('client-name');
if(clientName) {
  clientName.innerHTML = window.localStorage.getItem('activeClientName');
}

// create Model object
const myAssignedExerciseModel = new AssignedExerciseModel();

// load array with data from local storage
myAssignedExerciseModel.loadLocalData();

// display client's exercises
const myMyExercisesView = new MyExercisesView();
const pDiv = document.getElementById('assigned-exercises');
console.log("pDiv: ", pDiv);
const filteredAssignedExercises = assignedExercises.filter(ae => ae.getClientID() === getActiveClientID());
myMyExercisesView.renderExerciseList(pDiv, filteredAssignedExercises);

//set listener - refactor this with function in my-clients - will need to change pdiv to parentdiv
const childrenArray = Array.from(pDiv.children);
childrenArray.forEach(child => {
  child.addEventListener('click', e => {
    setActiveAssignedExerciseID(e.currentTarget.id);  // set callback to make this generic
    document.location = './assignment.html';
  });
});

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