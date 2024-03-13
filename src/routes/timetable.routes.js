const express = require("express");
const timeTableRouter = express.Router();
const { TimetableGen } = require("../controllers");
const { TimetableValidator } = require("../validators");

const controller = new TimetableGen();

timeTableRouter.post(
  "/generate-clingo",
  [TimetableValidator.validateCreateTimeTableClingoFile],
  controller.writeClingoFile
);

module.exports = timeTableRouter;
