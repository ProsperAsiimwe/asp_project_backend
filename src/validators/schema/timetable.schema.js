const Joi = require("joi");

const courseList = Joi.object().keys({
  name: Joi.string().required(),
  maxStudents: Joi.number().required(),
  teachers: Joi.array().items(Joi.string()).required(),
});

const teacherList = Joi.object().keys({
  name: Joi.string().required(),
  availability: Joi.array().items(Joi.string()).required(),
});

const roomList = Joi.object().keys({
  name: Joi.string().required(),
  capacity: Joi.number().required(),
});

const clingoSchema = Joi.object({
  time_table_name: Joi.string().required(),
  courses: Joi.array().items(courseList).required(),
  teachers: Joi.array().items(teacherList).required(),
  rooms: Joi.array().items(roomList).required(),
});

module.exports = { clingoSchema };
