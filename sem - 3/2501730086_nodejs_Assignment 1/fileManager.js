const fs = require("fs");
const logMessage = require("./modules/logger");

const fileName = "test.txt";

logMessage("Creating File...");
fs.writeFile(fileName, "Hello Node.js", (err) => {
  if (err) {
    console.log("Error creating file:", err.message);
    return;
  }
  logMessage("File Created");

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err.message);
      return;
    }
    logMessage("Reading File");
    console.log(data);

    fs.appendFile(fileName, "\nLearning FS Module", (err) => {
      if (err) {
        console.log("Error updating file:", err.message);
        return;
      }
      logMessage("File Updated");

      fs.readFile(fileName, "utf8", (err, data) => {
        console.log(data);

        fs.unlink(fileName, (err) => {
          if (err) {
            console.log("Error deleting file:", err.message);
            return;
          }
          logMessage("File Deleted");
        });
      });
    });
  });
});
