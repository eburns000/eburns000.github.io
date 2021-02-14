const toDoList = []; // get this from local storage - controller needs to load this from local storage I would think

class ToDo {
  constructor(task, completed = false) {
    this.timestamp = Date.now();
    this.completed = completed;
    this.task = task;
  }
  markComplete()         { this.completed = true;    }
  markActive()           { this.completed = false;   }
  getDescription()       { return this.task;         }
  setDescription(task)   { this.task = task;         }
  getTimestamp()         { return this.timestamp;    }
  isComplete()           { return this.completed;    }
}

class ToDoModel {
  // create a new ToDo
  createToDo(description) {
    return new ToDo(description);
  }

  // where do we get the data from the local storage - is it a constructor for the toDoModel? or do we do that with getAllToDos()? It would need to be a one time deal - maybe "loadAllToDos" or something similar
  getAllToDos() {
    return toDoList;
  }
}

export default ToDoModel;

