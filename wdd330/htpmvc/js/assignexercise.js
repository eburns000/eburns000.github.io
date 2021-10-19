/* EXERCISE LIBRARY MODEL *********************************************/
// exercise library
let exerciseLibrary = [];

// user class
class Exercise {
  constructor(title, discipline, modality, steps, timestamp = Date.now()) {
    this.exerciseid = timestamp;
    this.title = title;
    this.discipline = discipline;
    this.modality = modality;
    this.steps = steps;
  }

  getExerciseid() {
    return this.exerciseid;
  }

  getTitle() {
    return this.title;
  }

  getDiscipline() {
    return this.discipline;
  }

  getModality() {
    return this.modality;
  }

  getSteps() {
    return this.steps;
  }
}

// userModel class
class ExerciseModel {

  createExercise (title, discipline, modality, steps) {
    return new Exercise(title, discipline, modality, steps);
  }

  getExerciseLibrary() {
    return exerciseLibrary;
  }

  loadLocalData() {
    try {

      if (window.localStorage.getItem('exercise-library')) {

        console.log("load attempted");
        const library = window.localStorage.getItem('exercise-library');
        console.log("Exercise Library: ", library);
        
        const tempArray = JSON.parse(library);

        // clear the existing array
        exerciseLibrary.splice(0, exerciseLibrary.length);

        // now load the array by creating objects from the JSON data
        for (let i = 0; i < tempArray.length; i++) {
          const tempExercise = new Exercise(tempArray[i].title, tempArray[i].discipline, tempArray[i].modality, tempArray[i].steps, tempArray[i].exerciseid);
          exerciseLibrary.push(tempExercise);
        }
        
        console.log("Exercise Library After Parse: ", exerciseLibrary);
      }

    } catch (error) {
      console.error(error, "Unable to load data from local storage.");
    }
  }

  saveLocalData() { // make this more generic, so you can pass in the name of the data element in local storage
    try {
      const library = JSON.stringify(exerciseLibrary);
      window.localStorage.setItem('exercise-library', library);
      console.log("Exercise Library after save: ", exerciseLibrary);
    } catch (error) {
      console.error(error, "Unable to save data to local storage.")
    }
  }

}

/* ASSIGNED EXERCISES MODEL **************************************/
// assigned exercises
let assignedExercises = [];

// user class
class AssignedExercise {
  constructor(clientID, title, discipline, modality, steps, dueDate, pointValue = 0, status = "not-started", timestamp = Date.now()) {
    this.assignedExerciseID = timestamp;
    this.clientID = clientID;
    this.title = title;
    this.discipline = discipline;
    this.modality = modality;
    this.steps = steps;
    this.dueDate = dueDate;
    this.pointValue = pointValue;
    this.status = status;    
  }

  getAssignedExerciseID() {
    return this.assignedExerciseID;
  }

  getClientID() {
    return this.clientID;
  }

  getTitle() {
    return this.title;
  }

  getDiscipline() {
    return this.discipline;
  }

  getModality() {
    return this.modality;
  }

  getSteps() {
    return this.steps;
  }

  getDueDate() {
    return this.dueDate;
  }

  getPointValue() {
    return this.pointValue;
  }

  getStatus() {
    return this.status;
  }
}

// userModel class
class AssignedExerciseModel {

  assignExercise (clientID, title, discipline, modality, steps, dueDate, pointValue, status) {
    return new AssignedExercise(clientID, title, discipline, modality, steps, dueDate, pointValue, status);
  }

  getAssignedExercises() {
    return assignedExercises;
  }

  loadLocalData() {
    try {

      if (window.localStorage.getItem('assigned-exercises')) {

        console.log("load attempted");
        const assignedExercisesList = window.localStorage.getItem('assigned-exercises');
        console.log("Exercise Library: ", assignedExercisesList);
        
        const tempArray = JSON.parse(assignedExercisesList);

        // clear the existing array
        assignedExercises.splice(0, assignedExercises.length);

        // now load the array by creating objects from the JSON data
        for (let i = 0; i < tempArray.length; i++) {
          const tempExercise = new AssignedExercise(tempArray[i].clientID, tempArray[i].title, tempArray[i].discipline, tempArray[i].modality, tempArray[i].steps, tempArray[i].dueDate, tempArray[i].pointValue, tempArray[i].status, tempArray[i].assignedExerciseID); 
          assignedExercises.push(tempExercise);
        }
        
        console.log("Assigned Exercises After Parse: ", assignedExercises);
      }

    } catch (error) {
      console.error(error, "Unable to load data from local storage.");
    }
  }

  saveLocalData() { // make this more generic, so you can pass in the name of the data element in local storage
    try {
      const assignedExercisesList = JSON.stringify(assignedExercises);
      window.localStorage.setItem('assigned-exercises', assignedExercisesList);
      console.log("Exercise Library after save: ", assignedExercises);
    } catch (error) {
      console.error(error, "Unable to save data to local storage.")
    }
  }

}

/* VIEW **********************************************************/
class AssignExerciseLibraryView {

  renderExerciseList(parentElement, myExerciseList) {
    // clear list
    parentElement.innerHTML = "";
    myExerciseList.forEach(exercise => this.renderExercise(parentElement, exercise));
  }

  renderExercise(parentElement, exercise) {
    let option = document.createElement('option');    
    console.log(exercise.getExerciseid());
    option.value = exercise.getExerciseid();
    option.innerHTML = exercise.getTitle();
    parentElement.appendChild(option);
  }  

}

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