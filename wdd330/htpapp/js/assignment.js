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

  setTitle(title) {
    this.title = title;
  }

  setDiscipline(discipline) {
    this.discipline = discipline;
  }

  setModality(modality) {
    this.modality = modality;
  }

  setSteps(steps) {
    this.steps = steps;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  setPointValue(pointValue) {
    this.pointValue = pointValue;
  }

  setStatus(status) {
    this.status = status;
  }
}

// userModel class
class AssignedExerciseModel {

  assignExercise(clientID, title, discipline, modality, steps, dueDate, pointValue, status) {
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
        console.log("Assigned Exercises: ", assignedExercisesList);

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
    const assignmentTitle = document.getElementById('assignment-title');
    assignmentTitle.innerHTML = exercise.getTitle();
    let div = document.createElement('div');
    div.classList.add('assignment-container');
    div.innerHTML = `
    <div class="assignment">
      <div class="assignment-status">
        <p>Status: <span id="assignment-status-value">${exercise.getStatus()}</span></p>
        <p>Date Due: <span id="assignment-due-date">${exercise.getDueDate()}</span></p>
        <p>Steps: </p>
      </div>      
      <textarea class="assignment-steps" name="steps" id="steps" cols="30" rows="10" disabled>${exercise.getSteps()}</textarea>  
    </div>
    <div class="assignment-complete">
      <p>Completing this will earn me <span id="assignment-point-value">${exercise.getPointValue()}</span> points</p>
    </div>
    <input class="btn-save btn-update-status" id="btn-update-status" type="button" value="${this.renderUpdateButton(exercise.getStatus())}">
    </div>`;
    parentElement.appendChild(div);
  }

  renderUpdateButton(status) {
    switch (status) {
      case 'not-started':
        return 'Start Exercise Now';
      case 'started':
        return 'Mark Complete';
      case 'completed':
        return 'Completed';
      case 'archived':
        return 'Completed';
      default:
        return 'Start Exercise Now';
    }
  }

}

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