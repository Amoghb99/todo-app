const joi = require("joi");

module.exports.userLogin = (requestParams) => {
  let joiSchema = joi.object({
    email: joi.string().email({minDomainSegments: 2,tlds: { allow: ["com", "in"] }}).required(),
    password: joi.string().required()
  });
  return joiSchema.validate(requestParams);
};

module.exports.userRegister = (requestParams) => {
  let joiSchema = joi.object({
    email: joi.string().email({minDomainSegments: 2,tlds: { allow: ["com", "in"] }}).required(),
    password: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

module.exports.addList = (requestParams) => {
  let joiSchema = joi.object({
    name: joi.string().required(),
    userId: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

module.exports.addTodo = (requestParams) => {
  let joiSchema = joi.object({
    title: joi.string().required(),
    listId: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

module.exports.getTodo = (requestParams) => {
  let joiSchema = joi.object({
    userId: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

module.exports.deleteList = (requestParams) => {
  let joiSchema = joi.object({
    listId: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

module.exports.deleteTodo = (requestParams) => {
  let joiSchema = joi.object({
    todoId: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

module.exports.editTodo = (requestParams) => {
  let joiSchema = joi.object({
    todoId: joi.string().required(),
    title: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

module.exports.editList = (requestParams) => {
  let joiSchema = joi.object({
    listId: joi.string().required(),
    name: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};