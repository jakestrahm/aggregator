import { Logger } from 'winston';

//extend express request type
declare global {
	namespace Express {
		interface Request {
			correlationId?: string;
			logger?: Logger;
		}
	}
}

export { };
