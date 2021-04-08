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

export default AssignExerciseLibraryView;