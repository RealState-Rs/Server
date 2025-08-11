import fs from "fs";
import path from "path";
import { createLogger, format, transports, addColors } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue"
  }
};

addColors(customLevels.colors);

const dailyRotateFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "%DATE%-combined.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d"
});

const dailyRotateErrorTransport = new DailyRotateFile({
  filename: path.join(logDir, "%DATE%-error.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  level: "error",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json()
  )
});


const logger = createLogger({
  levels: customLevels.levels,
  level: "http",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    // Console
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.printf(({ level, message, timestamp, stack }) => {
          return stack
            ? `${timestamp} ${level}: ${message}\n${stack}`
            : `${timestamp} ${level}: ${message}`;
        })
      )
    }),

    dailyRotateFileTransport,
    dailyRotateErrorTransport
  ]
});

export default logger;
