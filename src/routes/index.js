const { Router } = require("express");
const timetableRoute = require("./timetable.routes");

const indexRouter = Router();

// create and fetch applicant route
indexRouter.use("/timetable", timetableRoute);

module.exports = indexRouter;
