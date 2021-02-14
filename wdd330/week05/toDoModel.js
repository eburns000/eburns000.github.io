let toDoList = [];

class ToDo {
  constructor(task, completed = false, timestamp = Date.now()) {
    this.timestamp = timestamp;
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
        console.log("MyData: ", myData);
        
        const tempArray = JSON.parse(myData);

        // clear the existing array
        toDoList.splice(0, toDoList.length);

        // now load the array by creating objects from the JSON data
        for (let i = 0; i < tempArray.length; i++) {
          const tempToDo = new ToDo(tempArray[i].task, tempArray[i].completed, tempArray[i].timestamp);
          toDoList.push(tempToDo);
        }
        
        console.log("ToDoList After Parse: ", toDoList);
      }

    } catch (error) {
      console.error(error, "Unable to load data from local storage.");
    }
  }

  saveLocalData() {
    try {
      const myData = JSON.stringify(toDoList);
      window.localStorage.setItem('myData', myData);
      console.log("todolist after save: ", toDoList);
    } catch (error) {
      console.error(error, "Unable to save data to local storage.")
    }
  }

}

export default ToDoModel;