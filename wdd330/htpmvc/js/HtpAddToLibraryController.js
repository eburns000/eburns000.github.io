import ExerciseModel from './HtpExerciseLibraryModel.js';

export default class AddToLibraryController {

  constructor() {
    this.myExerciseModel = new ExerciseModel();
    this.btnAddExercise = document.getElementById('btn-addexercise');
  }

  appInit() {
    // load array with data from local storage
    this.myExerciseModel.loadLocalData();
    this.addOneTimeListeners();
    console.log("AddToLibraryController Initialized");
  } 

  addOneTimeListeners() {
    //add event listener to add buttron
    this.btnAddExercise.addEventListener('click', () => {
      const title = document.getElementById('title').value;
      const discipline = document.getElementById('discipline').value;
      const modality = document.getElementById('modality').value;
      const steps = document.getElementById('steps').value;  
      const newExercise = this.myExerciseModel.createExercise(title, discipline, modality, steps);  
      this.myExerciseModel.getExerciseLibrary().push(newExercise);  
      this.myExerciseModel.saveLocalData();  
      document.location = './library.html';  
    });
  }
}