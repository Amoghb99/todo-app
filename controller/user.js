const Service = require('../services/user')


const registerUser = async (req, res) => {
    try {

      const resultData = await Service.registerUser(req,res);
      return res.send(resultData);
    } catch (err) {
      return res.status(400).json(`${err.message}`);
    }
  };

const loginUser = async (req, res) => {
    try {

      const resultData = await Service.loginUser(req,res);
      return res.status(200).json({ result: resultData, success: true })
    } catch (err) {
      return res.status(400).json(err.message);
    }
};

const getTodo = async (req, res) => {
    try {
      const resultData = await Service.getTodo(req,res);
      return res.status(200).json({ result: resultData, success: true })
    } catch (err) {
      return res.status(400).json(err.message);
    }
};

const addList = async (req, res) => {
    try {
      const resultData = await Service.addList(req,res);
      return res.status(200).json({ result: resultData, success: true })
    } catch (err) {
      return res.status(400).json(err.message);
    }
};

const addTodo = async (req, res) => {
  try {

    const resultData = await Service.addTodo(req,res);
    return res.status(200).json({ result: resultData, success: true })
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

 const editList = async (req, res) => {
  try {
    const resultData = await Service.editList(req,res);
    return res.status(200).json({ result: resultData, success: true })
  } catch (err) {
    return res.status(400).json(err.message);
  }
}; 

 const editTodo = async (req, res) => {
  try {

    const resultData = await Service.editTodo(req,res);
    return res.status(200).json({ result: resultData, success: true })
  } catch (err) {
    return res.status(400).json(err.message);
  }
}; 

const deleteTodo = async (req, res) => {
  try {

    const resultData = await Service.deleteTodo(req,res);
    return res.status(200).json({ result: resultData, success: true })
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const deleteList = async (req, res) => {
  try {

    const resultData = await Service.deleteList(req,res);
    return res.status(200).json({ result: resultData, success: true })
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
module.exports = {
    registerUser,
    loginUser,
    getTodo,
    addList,
    addTodo,
    deleteTodo,
    deleteList,
    editList,
    editTodo
}
