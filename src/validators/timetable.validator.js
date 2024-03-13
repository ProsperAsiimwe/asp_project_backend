const { JoiValidator } = require("../helpers");
const { TimetableSchema } = require("./schema");

const validateCreateTimeTableClingoFile = async (req, res, next) => {
  return await JoiValidator(req, res, next, TimetableSchema.clingoSchema);
};

module.exports = {
  validateCreateTimeTableClingoFile,
};
