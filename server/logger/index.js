const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json } = format;

const createLoggerInstance = () => {
  try {
    const logger = createLogger({
      format: combine(timestamp(), errors({ stack: true }), json()),
      defaultMeta: { service: 'portfolio' },
      transports: [
        /*
            - Write all logs with level `error` and below to `error.log`
            - Write all logs with level `info` and below to `combined.log`
            */
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
    return logger;
  } catch (err) {}
};

export default createLoggerInstance;
