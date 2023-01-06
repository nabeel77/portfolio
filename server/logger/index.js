import { format, createLogger, transports } from 'winston';
const { timestamp, combine, errors, json } = format;

export const logger = createLogger({
  format: combine(timestamp(), errors({ stack: true }), json()),
  defaultMeta: { service: 'webscraper' },
  transports: [
    new transports.Console({
      stderrLevels: ['critical', 'error', 'debug', 'info', 'warn'], // send all to stdout!
      colorize: true,
    }),
  ],
});
