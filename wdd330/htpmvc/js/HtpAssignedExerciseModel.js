// assigned exercises
let assignedExercises = [];

// Assigned Exercise class
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

// AssignedExerciseModel class
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

export default AssignedExerciseModel;