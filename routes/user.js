let express = require("express");
let router = express.Router();
const Controller = require("../controller/user")
const verifyToken = require("../middleware/verify_token")


//POST Request
router.post('/register', Controller.registerUser);
router.post('/login', Controller.loginUser);

router.post('/list/:token', verifyToken, Controller.addList);
router.post('/todo/:token', verifyToken, Controller.addTodo);

//GET Request
router.get('/todo/:token', verifyToken, Controller.getTodo);

// Edit Request
router.put('/list/:token',verifyToken,Controller.editList)
router.put('/todo/:token',verifyToken,Controller.editTodo)

// Delete Request
router.post('/deltodo/:token', verifyToken, Controller.deleteTodo);
router.post('/dellist/:token', verifyToken, Controller.deleteList);


module.exports = router; 