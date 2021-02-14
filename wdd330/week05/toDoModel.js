let toDoList = [];

class ToDo {
  constructor(task, completed = false) {
    this.timestamp = Date.now();
    this.completed = completed;
    this.task = task;
  }
  markComplete() {
    this.completed = true;
  }
  markActive() {
    this.completed = false;
  }
  getDescription() {
    return this.task;
  }
  setDescription(task) {
    this.task = task;
  }
  getTimestamp() {
    return this.timestamp;
  }
  isComplete() {
    return this.completed;
  }
}

class ToDoModel {

  createToDo(description) {
    return new ToDo(description);
  }

  getAllToDos() {
    return toDoList;
  }

  loadLocalData() {
    try {

      if (window.localStorage.getItem('myData')) {
        console.log("load attempted");
        const myData = window.localStorage.getItem('myData');
        toDoList = JSON.parse(myData);
        console.log(toDoList);
      }

    } catch (error) {
      console.error(error, "Unable to load data from local storage.");
    }
  }

  saveLocalData() {
    try {
      const myData = JSON.stringify(toDoList);
      window.localStorage.setItem('myData', myData);
    } catch (error) {
      console.error(error, "Unable to save data to local storage.")
    }
  }

}

export default ToDoModel;