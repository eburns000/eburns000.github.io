// create Model object
const myExerciseModel = new ExerciseModel();

// load array with data from local storage
myExerciseModel.loadLocalData();

// display library
const myExerciseLibraryView = new ExerciseLibraryView();
const pDiv = document.getElementById('exercise-library');
console.log("pDiv: ", pDiv);
myExerciseLibraryView.renderExerciseList(pDiv, exerciseLibrary);