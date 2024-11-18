const fs = require("fs");
const path = require("path");

const logError = (error) => {
  const errorLog = `[${new Date().toISOString()}] ${error.stack || error}\n`;
  const logPath = path.join(__dirname, "../logs/errors.log");

  // Ensure the logs directory exists
  if (!fs.existsSync(path.dirname(logPath))) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
  }

  fs.appendFileSync(logPath, errorLog);
  console.error(`[ERROR]: ${error.stack || error}`);
};

process.on("unhandledRejection", (reason) => logError(reason));
process.on("uncaughtException", (error) => logError(error));

module.exports = { logError };
