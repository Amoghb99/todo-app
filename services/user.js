var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const coreRequestModel = require("../model/serviceModel/user");
const joiValidationModel = require("../model/validationModel/user");

const UserSchema = require("../model/user");
const user = require("../model/user");
const saltRounds = 10;


const loginUser = async (req, res) => {

    let userLoginDetailsRequest = new coreRequestModel.loginRequest(req);
    let validateRequest = joiValidationModel.userLogin(userLoginDetailsRequest);
  
    if (validateRequest.error) {
      throw new Error(validateRequest.error.message);
    }
  
    try {

    const existingUser = await UserSchema.findOne({$or: [{ email: req.body.email }, { phone: req.body.phone }]});
    if (existingUser) {
      const comparePassword = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );
      if (comparePassword == false) {
        throw new Error(`Entered Password is Wrong!`);
      } else {
        var token = jwt.sign({ id: existingUser._id }, "todoapp", {
          expiresIn: 86400, // expires in 24 hours
        });
        }
      }
      return {token, existingUser};
  
    } catch (errUserLogin) {

      throw new Error(errUserLogin.message);
    }
};

const registerUser = async (req, res) => {

    let userRegisterDetailsRequest = new coreRequestModel.registerRequest(req);
    let validateRequest = joiValidationModel.userRegister(userRegisterDetailsRequest);
  
    if (validateRequest.error) {

      throw new Error(validateRequest.error.message);
    }
  
    //Check if user is already registered
    try {
      const existingUser = await UserSchema.findOne({ email: req.body.email });
      if (existingUser) {
        throw new Error(`User Already exist!`);
      } else {
        var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        let newUser = new UserSchema();
        newUser.email = req.body.email;
        newUser.password = hashedPassword;
  
        const saveUser = await newUser.save();
  
        var token = jwt.sign({ id: saveUser._id }, "todoapp", {
          expiresIn: 86400, // expires in 24 hours
        });
        var secret = "todoapp" + saveUser.password;
        var token = jwt.sign(
          { email: saveUser.email, id: saveUser._id },
          secret,
          { expiresIn: "15m" }
        );

      return {token, saveUser};
  
      }
    } catch (errRegister) {
      throw new Error(errRegister.message);
    }
};

const getTodo = async (req,res) => {

  let getTodoRequest = new coreRequestModel.getTodoRequest(req);
  let validateRequest = joiValidationModel.getTodo(getTodoRequest);

  if (validateRequest.error) {
    throw new Error(validateRequest.error.message);
  }
  
  try {
    const todo = await UserSchema.findOne({_id: req.userId}).populate('list')
    return todo
  } catch(errGetTodo){
    throw new Error(errGetTodo.message)
  }
};

const addList = async (req,res) => {

  let addListRequest = new coreRequestModel.addListRequest(req);
  let validateRequest = joiValidationModel.addList(addListRequest);

  if (validateRequest.error) {
    throw new Error(validateRequest.error.message);
  }

  try{
          const newList = {};
          newList.name = req.body.obj.name
          const saveList = await UserSchema.findOneAndUpdate({_id: req.userId},
            {
              $push:{list:newList}
            }); 
            const savedList = await UserSchema.findOne({_id: req.userId})
          return savedList

    } catch(errAddList){
      throw new Error(errAddList.message)
    }
};

const addTodo = async (req,res) => {

  let addTodoRequest = new coreRequestModel.addTodoRequest(req);
  let validateRequest = joiValidationModel.addTodo(addTodoRequest);

  if (validateRequest.error) {
    throw new Error(validateRequest.error.message);
  }

  try{
          const newTodo = {};
          newTodo.title = req.body.obj.title
          const saveTodo = await UserSchema.findOneAndUpdate({'list._id': req.body.obj.listId},
          { $push: { [`list.$.items`]: newTodo } },
          ); 
          const savedTodo = await UserSchema.findOne({_id: req.userId})
          return savedTodo

    } catch(errAddTodo){
      throw new Error(errAddTodo.message)
    }
};

const editTodo = async (req,res) => {

  let editTodoRequest = new coreRequestModel.editTodoRequest(req);
  let validateRequest = joiValidationModel.editTodo(editTodoRequest);

  if (validateRequest.error) {
    throw new Error(validateRequest.error.message);
  }

  try{
          const newTodo = {};
          newTodo.title = req.body.obj.title

          const saveTodo = await UserSchema.findOneAndUpdate({'list.items._id': req.body.obj.todoId},
          { $set: { 'list.$[outer].items.$[inner].title': req.body.obj.title } },
          { arrayFilters: [{ 'outer.items._id': req.body.obj.todoId }, { 'inner._id': req.body.obj.todoId }] } );

          const savedTodo = await UserSchema.findOne({_id: req.userId})
          return savedTodo

    } catch(errEditTodo){
      throw new Error(errEditTodo.message)
    }
};

const editList = async (req,res) => {

  let editListRequest = new coreRequestModel.editListRequest(req);
  let validateRequest = joiValidationModel.editList(editListRequest);

  if (validateRequest.error) {
    throw new Error(validateRequest.error.message);
  }

  try{
          const newList = {};
          newList.name = req.body.obj.name
          const saveList = await UserSchema.findOneAndUpdate({'list._id': req.body.obj.listId},
          { $set: { 'list.$.name': newList.name } });
          const savedList = await UserSchema.findOne({_id: req.userId})
          return savedList

    } catch(errEditList){
      throw new Error(errEditList.message)
    }
};

const deleteTodo = async (req,res) => {

  let deleteTodoRequest = new coreRequestModel.deleteTodoRequest(req);
  let validateRequest = joiValidationModel.deleteTodo(deleteTodoRequest);

  if (validateRequest.error) {
    throw new Error(validateRequest.error.message);
  }

  try{
    const deleteList = await UserSchema.findOneAndUpdate({'list.items._id': req.body.obj.todoId},
    { $pull: { 'list.$.items': { _id: req.body.obj.todoId } } });
    const deletedList = await UserSchema.findOne({_id: req.userId})
    return deletedList

    } catch(errDeleteTodo){
      throw new Error(errDeleteTodo.message)
    }
};

const deleteList = async (req,res) => {

  let deleteListRequest = new coreRequestModel.deleteListRequest(req);
  let validateRequest = joiValidationModel.deleteList(deleteListRequest);

  if (validateRequest.error) {
    throw new Error(validateRequest.error.message);
  }

  try{
          const deleteList = await UserSchema.findOneAndUpdate({'list._id': req.body.obj.listId},
          { $pull: { list: { _id: req.body.obj.listId } } });
          const deletedList = await UserSchema.findOne({_id: req.userId})
          return deletedList

    } catch(errDeleteList){
      throw new Error(errDeleteList.message)
    }
};

module.exports = {
    loginUser,
    registerUser,
    getTodo,
    addList,
    addTodo,
    deleteTodo,
    deleteList,
    editTodo,
    editList
};