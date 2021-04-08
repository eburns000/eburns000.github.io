class ExerciseLibraryView {

  renderExerciseList(parentElement, myExerciseList) {
    // clear list
    parentElement.innerHTML = "";
    myExerciseList.forEach(exercise => this.renderExercise(parentElement, exercise));
  }

  renderExercise(parentElement, exercise) {
    let section = document.createElement('section');
    section.classList.add('card-section');
    console.log(exercise.getExerciseid());
    section.id = exercise.getExerciseid();
    section.innerHTML = `
      <div class="card-section-left">
        <div class="equipment-img">
          <img src="images/exercise.png" alt="exercise icon">
        </div>
        <div class="equipment-data">
          <h3>${exercise.getTitle()}</h3>              
        </div>
      </div>
      <div class="card-section-right">
        <p class="discipline">${exercise.getDiscipline()}</p>
        <p class="modality">${exercise.getModality()}</p>        
      </div>`;
    parentElement.appendChild(section);
  }
}

export default ExerciseLibraryView;