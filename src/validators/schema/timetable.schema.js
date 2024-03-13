const Joi = require("joi");

const clingoSchema = Joi.object({
  time_table_name: Joi.string().required(),
  courses: Joi.array().items(Joi.string()).required(),
  rooms: Joi.array().items(Joi.string()).required(),
  timeSlots: Joi.array().items(Joi.string()).required(),
  teachers: Joi.array().items(Joi.string()).required(),
});

module.exports = { clingoSchema };
