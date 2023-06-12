const winston = require("winston");
require("winston-daily-rotate-file");
const fs = require("fs");
const moment = require("moment");

const log_folder = `../b2b logger/b2b.log/`;

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ulaanbaatar",
  });
};

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: log_folder + "%DATE%_combined.log",
  datePattern: "YYYYMMDD",
  maxFiles: "30d",
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: timezoned,
    }),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  defaultMeta: {
    service: "b2b-service",
  },
  transports: [fileRotateTransport],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports.logger = logger;