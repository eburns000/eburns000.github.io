import ToDoModel from './toDoModel.js';
import ToDoView from './toDoView.js';

export default class toDoController {

  constructor(parentID) {
    this.parentElement = document.getElementById(parentID);
    this.inputTask = document.getElementById('task-add-textbox'); 
    this.btnAddTask = document.getElementById('task-add-button');
    this.taskStatus = document.getElementsByName('task-filter'); 
    this.toDoModel = new ToDoModel();
    this.toDoView = new ToDoView(); 
  }

  toggleToDoActive(e) {
    const toDoList = this.toDoModel.getAllToDos();
    const index = toDoList.map(x => x.getTimestamp().toString()).indexOf(e.target.parentElement.id);
    toDoList[index].isComplete() ? toDoList[index].markActive() : toDoList[index].markComplete();
    this.showToDoList(toDoList);
  }

  countActive() {
    let count = 0;
    const toDoList = this.toDoModel.getAllToDos();
    toDoList.forEach(toDo => {
      if (!toDo.isComplete()) count++;
    });
    return count;
  }

  addToDo(description) {
    const toDo = this.toDoModel.createToDo(description);
    const toDoList = this.toDoModel.getAllToDos();
    toDoList.push(toDo);
    this.showToDoList(toDoList);
  }

  removeToDo(e) {
    const toDoList = this.toDoModel.getAllToDos();
    const index1 = toDoList.map(x => x.getTimestamp().toString()).indexOf(e.target.parentElement.id);
    toDoList.splice(index1, 1);
    this.showToDoList(toDoList);
  }

  appInit() {
    const toDoList = this.toDoModel.getAllToDos();
    this.showToDoList(toDoList);    
    this.addOneTimeListeners();
  }

  showToDoList(toDoList) {
    this.toDoView.renderToDoList(this.parentElement, toDoList);
    this.toDoView.renderRemaining(this.countActive());
    this.addToDoListener();
  }

  addOneTimeListeners() {
    // listener for add task button
    this.btnAddTask.addEventListener('click', () => {
      this.addToDo(this.inputTask.value);
    });

    // listener for filter radio button
    this.taskStatus.forEach(elem => elem.addEventListener('change', () => {
      const toDoList = this.toDoModel.getAllToDos();
      this.toDoView.renderToDoList(this.parentElement, toDoList);
    }));
  }

  addToDoListener() {
    const childrenArray = Array.from(this.parentElement.children);
    childrenArray.forEach(child => {
      child.children[2].addEventListener('click', e => {
        this.removeToDo(e);
        console.log(e);
      });

      child.children[0].addEventListener('click', e => {        
        this.toggleToDoActive(e);
        console.log(e);
      });

    });
  }

}