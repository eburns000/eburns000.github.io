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

  addToDo(description) {
    const toDo = new ToDo(description);
    toDoList.push(toDo);
  }

  removeToDo(e) {
    const index1 = toDoList.map(x => x.getTimestamp().toString()).indexOf(e.target.parentElement.id);
    toDoList.splice(index1, 1);
    renderTaskList();
  }



  // where do we get the data from the local storage - is it a constructor for the toDoModel? or do we do that with getAllToDos()? It would need to be a one time deal - maybe "loadAllToDos" or something similar
  getAllToDos() {
    return toDoList;
  }

  getToDoByTimestamp(timestamp) {
    return toDoList.find(toDo => toDo.timestamp === timestamp);
  }
}

export default ToDoModel;
// do I need to export the ToDo class as well?

