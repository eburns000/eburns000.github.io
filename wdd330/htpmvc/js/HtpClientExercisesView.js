class ClientExercisesView {

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

export default ClientExercisesView;