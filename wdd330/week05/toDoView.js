class toDoView {

  // you may want a constructor - and if so, you can pass the parent ID into this one as well, which will give you taskListElement 

  renderTaskList(taskListElement, toDoList) { // in the example, I am passing in the toDoListElement and the toDoList - do I need this here?
    // clear tasks
    taskListElement.innerHTML = "";

    // if a filter value is selected, filter array and render the todos - probably want to split this out
    if (document.querySelector('input[name="task-filter"]:checked')) {
      const filter = document.querySelector('input[name="task-filter"]:checked').value;

      if (filter === "active")
        toDoList.filter(todo => todo.isComplete() === false).forEach(toDo => renderToDo(toDo));
      else if (filter === "completed")
        toDoList.filter(todo => todo.isComplete() === true).forEach(toDo => renderToDo(toDo));
      else
        toDoList.forEach(toDo => renderToDo(toDo));
    } else {
      toDoList.forEach(toDo => renderToDo(toDo));
    }

    // render remaining tasks value
    renderRemaining(); // I may want to call this from the controller - probably, but maybe
  }

  renderToDo(toDo) {
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.id = toDo.getTimestamp();
    taskDiv.innerHTML = `
      <input class="task-check" type="checkbox" name="checkbox" ${toDo.isComplete() ? "checked" : "unchecked"}>
      <label class="task-label" for="checkbox">${toDo.getDescription()}</label>
      <button class="task-button">X</button>`;
    taskDiv.children[2].addEventListener('click', event => removeToDo(event)); // can I do this elsewhere?
    taskDiv.children[0].addEventListener('click', event => toggleToDoActive(event)); // can I do this elsewhere?
    taskListElement.appendChild(taskDiv); // this is probably why the other code is returning the item so it can be added - can do that later
    // return taskDiv; - may not need this
  }

  // probably need to pass into here the toDo - the count active function will be part of the toDoModel class
  renderRemaining() {
    remainingTasks.innerText = countActive(); // remaining tasks refers to a specific element - do I want to put that in the controller? Possibly
  }


}

export default toDoView