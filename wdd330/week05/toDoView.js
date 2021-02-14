class toDoView {

  constructor() {
    this.remainingTasks = document.getElementById('summary-remaining-value');
  }

  renderToDoList(parentElement, toDoList) {
    // clear tasks
    parentElement.innerHTML = "";

    // if a filter value is selected, filter array and render the todos
    if (document.querySelector('input[name="task-filter"]:checked')) {
      const filter = document.querySelector('input[name="task-filter"]:checked').value;

      if (filter === "active")
        toDoList.filter(todo => todo.isComplete() === false).forEach(toDo => renderToDo(parentElement, toDo));
      else if (filter === "completed")
        toDoList.filter(todo => todo.isComplete() === true).forEach(toDo => renderToDo(parentElement, toDo));
      else
        toDoList.forEach(toDo => renderToDo(parentElement, toDo));
    } else {
      toDoList.forEach(toDo => renderToDo(parentElement, toDo));
    }
  }

  renderToDo(parentElement, toDo) {
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.id = toDo.getTimestamp();
    taskDiv.innerHTML = `
      <input class="task-check" type="checkbox" name="checkbox" ${toDo.isComplete() ? "checked" : "unchecked"}>
      <label class="task-label" for="checkbox">${toDo.getDescription()}</label>
      <button class="task-button">X</button>`;
    parentElement.appendChild(taskDiv);
  }

  renderRemaining(count) {
    this.remainingTasks.innerText = count;
  }

}

export default toDoView