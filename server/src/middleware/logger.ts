import { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";

export const correlation = (req: Request, res: Response, next: NextFunction) => {
	const correlationId = req.headers['x-correlation-id'] as string || uuidv4();
	req.correlationId = correlationId;
	res.setHeader('x-correlation-id', correlationId);
	next();
}

//custom morgan format with correlation ID
morgan.token('correlation-id', (req: any) => req.correlationId);

export const httpLogger = morgan(
	':method :url :status :res[content-length] - :response-time ms [correlationId: :correlation-id]',
	{
		stream: {
			write: (message: string) => {
				logger.info(message.trim(), { context: 'http' });
			}
		}
	}
);

// add correlation ID to logger context
export const addLoggerContext = (req: Request, res: Response, next: NextFunction) => {
	req.logger = logger.child({
		correlationId: req.correlationId,
		userAgent: req.get('User-Agent'),
		ip: req.ip
	});
	next();
};
