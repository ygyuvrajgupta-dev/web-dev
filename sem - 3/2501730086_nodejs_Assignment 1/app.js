const isEven = require("./modules/isEven");
const logMessage = require("./modules/logger");

logMessage("Starting app.js");

const numbers = [3, 8, 15, 24, 7];

numbers.forEach((n) => {
  if (isEven(n)) {
    console.log(n + " is even");
  } else {
    console.log(n + " is odd");
  }
});

logMessage("app.js finished");
