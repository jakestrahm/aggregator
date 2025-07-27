import winston from "winston";

const logLevel = process.env.LOG_LEVEL || 'info';

const logFormat = winston.format.combine(
	winston.format.timestamp(),
	winston.format.errors({ stack: true }),
	winston.format.json(),
	winston.format.printf(({ timestamp, level, message, correlationId, ...meta }) => {
		return JSON.stringify({
			timestamp,
			level,
			message,
			correlationId,
			...meta
		});
	})
);

const logger = winston.createLogger({
	level: logLevel,
	format: logFormat,
	defaultMeta: { service: 'howdy-service' },
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
