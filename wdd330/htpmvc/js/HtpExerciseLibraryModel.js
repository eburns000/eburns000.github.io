// user table
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

export default ExerciseModel;
