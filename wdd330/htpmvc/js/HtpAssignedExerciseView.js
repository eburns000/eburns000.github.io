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

export default AssignedExerciseView;