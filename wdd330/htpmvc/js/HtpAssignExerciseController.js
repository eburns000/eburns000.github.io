/* CONTROLLER - EXERISE LIBRARY *******************************************/
// create Model object
const myExerciseModel = new ExerciseModel();

// load array with data from local storage
myExerciseModel.loadLocalData();

// display library
const myExerciseLibraryView = new AssignExerciseLibraryView();
const pDiv = document.getElementById('exercise-library');
console.log("pDiv: ", pDiv);
myExerciseLibraryView.renderExerciseList(pDiv, exerciseLibrary);



/* CONTROLLER - ASSIGN EXERCISE *********************************************/
// display active Client
const clientName = document.getElementById('client-name');
clientName.innerHTML = getActiveClientName();

// create Model object
const myAssignedExerciseModel = new AssignedExerciseModel();

// load array with data from local storage
myAssignedExerciseModel.loadLocalData();

//add event listener to add buttron
const btnAssignExercise = document.getElementById('btn-assign-exercise');

btnAssignExercise.addEventListener('click', () => {

  const selectedExerciseID = parseInt(document.getElementById('exercise-library').value);
  console.log("selected ExerciseID: ", selectedExerciseID);

  const tempExercise = exerciseLibrary.filter(e => e.getExerciseid() === selectedExerciseID)[0];
  console.log("tempExercise: ", tempExercise);
  
  
  const pointValue = document.getElementById('point-value').value;
  const status = document.getElementById('status').value;
  const dueDate = document.getElementById('due-date').value;
  
  const newAssignedExercise = myAssignedExerciseModel.assignExercise(getActiveClientID(), tempExercise.title, tempExercise.discipline, tempExercise.modality, tempExercise.steps, dueDate, pointValue, status);

  assignedExercises.push(newAssignedExercise);

  myAssignedExerciseModel.saveLocalData();

  document.location = './client-exercises.html';

});

/* UTILS ****************************************************/
// get client id from active user from local storage
function getActiveClientID() {
  return window.localStorage.getItem('activeClient');
}

function getActiveClientName() {
  return window.localStorage.getItem('activeClientName');
}