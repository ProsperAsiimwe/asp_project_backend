const { HttpResponse, generateClingoCode } = require("../helpers");
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

      const program = generateClingoCode(data);

      // Write Clingo program to a file inside the output folder
      const clingoFilePath = path.join(
        outputFolder,
        `${data.time_table_name.replace(/ /g, "_")}.lp`
      );

      fs.writeFileSync(clingoFilePath, program);

      await res.download(clingoFilePath, "timetable.lp", (error) => {
        if (error) {
          throw new Error(error.message);
        }
      });
    } catch (error) {
      http.setError(400, "Unable To Create Timetable", {
        error: error.message,
      });

      return http.send(res);
    }
  }
}

module.exports = TimetableGen;
