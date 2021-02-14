import ToDoModel from './toDoModel.js';
import ToDoView from './toDoView.js';

export default class toDoController {

  constructor(parentID) {
    this.parentElement = document.getElementById(parentID); // this is getting the div with ID 'task-list' where all of our tasks are going to reside
    this.inputTask = document.getElementById('task-add-textbox'); // may want to add a generic ID and pass it into controller
    this.btnAddTask = document.getElementById('task-add-button'); // may want to add a generic ID and pass it into controller
    this.remainingTasks = document.querySelector('.summary-remaining-value'); // may want to add a generic ID and pass it into controller
    this.taskStatus = document.getElementsByName('task-filter'); // may want to add a generic ID and pass it into controller
    this.toDoModel = new ToDoModel();
    this.toDoView = new ToDoView(); // may want to pass on parentID here so that the View has direct access to the parentElement
  }



  toggleToDoActive(e) {
    const index = toDoList.map(x => x.getTimestamp().toString()).indexOf(e.target.parentElement.id);
    toDoList[index].isComplete() ? toDoList[index].markActive() : toDoList[index].markComplete();
    renderTaskList();
  }

  countActive() {
    let count = 0;
    toDoList.forEach(toDo => {
      if (!toDo.isComplete()) count++;
    });
    return count;
  }






  showToDoList() {
    const toDoList = this.toDoModel.getAllToDos();
    this.toDoView.renderToDoList(this.parentElement, toDoList);
    this.addToDoListener();
  }


  // may not need this - probably will not need this
  showOneToDo(toDoName) {
    const toDo = this.toDoModel.getToDoByTimestamp(timestamp); // should be toDo timestamp - that is the unique identifier - was get Hike by Name
    this.toDoView.renderOneToDo(this.parentElement, toDo)
      .onclick = () => {
        this.showToDoList();
      };
  }

  addToDoListener() {

    // CONTROLLER - when add (+) button is clicked, add the todo and re-render the tasks
    this.btnAddTask.addEventListener('click', () => {
      addToDo(inputTask.value);
      renderTaskList();
    });

    // CONTROLLER - when a filter value is checked, re-render the tasks based on the filter
    this.taskStatus.forEach(elem => elem.addEventListener('change', renderTaskList));

    const childrenArray = Array.from(this.parentElement.children);
    childrenArray.forEach(child => {
      child.children[2].addEventListener('click', e => {
        // removeToDo
      });

      child.children[0].addEventListener('click', e => {
        // toggleToDoActive
      });


      child.addEventListener('click', e => {
        this.showOneToDo(e.currentTarget.dataset.name);
      });



    });
  }

}