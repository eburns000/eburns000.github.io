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
const myClientExercisesView = new ClientExercisesView();
const pDiv = document.getElementById('assigned-exercises');
console.log("pDiv: ", pDiv);
const filteredAssignedExercises = assignedExercises.filter(ae => ae.getClientID() === getActiveClientID());
myClientExercisesView.renderExerciseList(pDiv, filteredAssignedExercises);

//set listener


/* UTILS ***********************************************************************/
function getActiveClientID() {
  return window.localStorage.getItem('activeClient');
}

function getActiveClientName() {
  return window.localStorage.getItem('activeClientName');
}