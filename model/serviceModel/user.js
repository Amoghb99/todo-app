// Register
class registerRequest {
    constructor(req) {
      this.email = req.body.email ? req.body.email : null;
      this.password = req.body.password ? req.body.password : null;
    }
  }

  //Login
  class loginRequest {
    constructor(req) {
      this.email = req.body.email ? req.body.email : null;
      this.password = req.body.password ? req.body.password : null;
    }
  }

    //Add List
    class addListRequest {
      constructor(req) {
        this.name = req.body.obj.name ? req.body.obj.name : null;
        this.userId = req.userId ? req.userId : null;
      }
    }

   // Get Todo
   class getTodoRequest {
    constructor(req) {
      this.userId = req.userId ? req.userId : null;
    }
  }
  
      //Add Todo
  class addTodoRequest {
    constructor(req) {
        this.title = req.body.obj.title ? req.body.obj.title : null;
        this.listId = req.body.obj.listId ? req.body.obj.listId : null;
    }
  }

   // Delete List
class deleteListRequest {
    constructor(req) {
      this.listId = req.body.obj.listId ? req.body.obj.listId : null;
    }
}

   //Delete Todo
class deleteTodoRequest {
    constructor(req) {
      this.todoId = req.body.obj.todoId ? req.body.obj.todoId : null;
    }
}

   // Edit List
   class editListRequest {
    constructor(req) {
      this.listId = req.body.obj.listId ? req.body.obj.listId : null;
      this.name = req.body.obj.name ? req.body.obj.name : null;
    }
}

   //Edit Todo
class editTodoRequest {
    constructor(req) {
      this.todoId = req.body.obj.todoId ? req.body.obj.todoId : null;
      this.title = req.body.obj.title ? req.body.obj.title : null;
    }
}

module.exports.registerRequest = registerRequest;
module.exports.loginRequest = loginRequest;
module.exports.addListRequest = addListRequest;
module.exports.addTodoRequest = addTodoRequest;
module.exports.getTodoRequest = getTodoRequest;
module.exports.deleteTodoRequest = deleteTodoRequest;
module.exports.deleteListRequest = deleteListRequest;
module.exports.editListRequest = editListRequest;
module.exports.editTodoRequest = editTodoRequest;
