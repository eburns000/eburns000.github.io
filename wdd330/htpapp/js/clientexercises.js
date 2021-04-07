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
class AssignedExerciseView {

  renderExerciseList(parentElement, myExerciseList) {
    // clear list
    parentElement.innerHTML = "";
    myExerciseList.forEach(exercise => this.renderExercise(parentElement, exercise));
  }

  renderExercise(parentElement, exercise) {
    let section = document.createElement('section');
    section.classList.add('card-section');
    console.log(exercise.getAssignedExerciseID());
    section.id = exercise.getAssignedExerciseID();
    section.innerHTML = `
      <div class="card-section-left">
        <div class="equipment-img">
          <img src="images/exercise.png" alt="exercise icon">
        </div>
        <div class="equipment-data">
          <h3>${exercise.getTitle()}</h3>
          <p>${exercise.getDiscipline()}</p>           
        </div>
      </div>
      <div class="card-section-right">
        <p class="status">${exercise.getStatus()}</p>
        <p class="due-date">Due ${exercise.getDueDate()}</p>
        <p class="point-value">Worth ${exercise.getPointValue()} points</p>        
      </div>`;
    parentElement.appendChild(section);
  } 

}

/* CONTROLLER ****************************************************************/
// display active Client
const clientName = document.getElementById('client-name');
clientName.innerHTML = window.localStorage.getItem('activeClientName');

// create Model object
const myAssignedExerciseModel = new AssignedExerciseModel();

// load array with data from local storage
myAssignedExerciseModel.loadLocalData();

// display client's exercises
const myAssignedExerciseView = new AssignedExerciseView();
const pDiv = document.getElementById('assigned-exercises');
console.log("pDiv: ", pDiv);
const filteredAssignedExercises = assignedExercises.filter(ae => ae.getClientID() === getActiveClientID());
myAssignedExerciseView.renderExerciseList(pDiv, filteredAssignedExercises);

//set listener


/* UTILS ***********************************************************************/
function getActiveClientID() {
  return window.localStorage.getItem('activeClient');
}

function getActiveClientName() {
  return window.localStorage.getItem('activeClientName');
}


