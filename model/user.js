let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
    },
    list: [
      {
        name: {
          type: String,
          required: true
        },
        items:[
          {
            title: {
              type: String,
              required: true
            },
         },
        ]
      }
    ]
  });

  module.exports = mongoose.model("user_details", UserSchema);
  