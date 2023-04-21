const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
require("dotenv").config();

// Models
require("./model/user");

//Routes
const userRouter = require("./routes/user");

app.use("/user", userRouter);

/* MONGODB CONNECTION */
mongoose
  .connect("mongodb+srv://amoghb54:RXaK2SDrcrlBJiKp@cluster0.sk5h5cb.mongodb.net/?retryWrites=true&w=majority", {
    dbName: "todo-app",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use('/', async(req,res)=>{
    console.log("Welcome to TODO App!!")
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Our app is running on port number ${PORT}`);
});
