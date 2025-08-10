import morgan from "morgan";
import logger from "../utils/logger";

// Morgan will format the HTTP logs, Winston will store them
const stream = {
  write: (message: string) => logger.http(message.trim()),
};

const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

export default requestLogger;
