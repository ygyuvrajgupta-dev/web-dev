const crypto = require("crypto");
const logMessage = require("./modules/logger");

function rollDice() {
  const randomByte = crypto.randomBytes(1)[0];
  return (randomByte % 6) + 1;
}

const totalRolls = process.argv[2] ? Number(process.argv[2]) : 1;

logMessage("Rolling dice " + totalRolls + " time(s)");

for (let i = 1; i <= totalRolls; i++) {
  console.log("Roll " + i + " -> Dice Rolled: " + rollDice());
}
