const { HttpResponse, generateClingoTimetableProgram } = require("../helpers");
const fs = require("fs");
const path = require("path");

const http = new HttpResponse();

class TimetableGen {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async writeClingoFile(req, res) {
    try {
      const data = req.body;

      // Define output folder path
      const outputFolder = path.join(__dirname, "outputs", "clingo");

      // Ensure the output folder exists
      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }

      // const filePath = `../outputs/${data.time_table_name}.lp`;

      const program = generateClingoTimetableProgram(data);

      // Write Clingo program to a file inside the output folder
      const clingoFilePath = path.join(
        outputFolder,
        `${data.time_table_name.replace(/ /g, "_")}.lp`
      );

      fs.writeFileSync(clingoFilePath, program);

      console.log(`Clingo program written to ${clingoFilePath}`);

      http.setSuccess(200, "Timetable Generated Successfully", {
        // admissionForms,
      });

      return http.send(res);
    } catch (error) {
      http.setError(400, "Unable To Fetch Admission Forms", {
        error: error.message,
      });

      return http.send(res);
    }
  }
}

module.exports = TimetableGen;
