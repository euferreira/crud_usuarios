const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().required(),
  password: Joi.string().alphanum().required(),
});
