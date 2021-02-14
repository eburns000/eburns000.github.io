import toDoController from './toDoController.js';

// onload function
const myToDoController = new toDoController(); // need a parent ID

// CONTROLLER - render the task on window load - needs to render Task List - but this is going to be called by showToDoList
window.addEventListener('load', () => {
  myToDoController.showToDoList('task-list');  
});