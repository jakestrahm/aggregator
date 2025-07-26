import winston from "winston";

const logLevel = process.env.LOG_LEVEL || 'info';

const logger = winston.createLogger({
	level: logLevel,
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error',
			maxsize: 5242880,
			maxFiles: 5,
		}),
		new winston.transports.File({
			filename: 'logs/combined.log',
			maxsize: 5242880,
			maxFiles: 5,
		}),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format:
			winston.format.combine(
				winston.format.prettyPrint(),
			)
	}));
}

export { logger }
