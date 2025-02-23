import { NextFunction, Request, RequestHandler, Response } from "express";

// takes a request handler function as input
const asyncHandler = (fn: RequestHandler) => {
	// returns a new function that wraps the original handler
	// this new function takes the standard express params
	return (req: Request, res: Response, next: NextFunction) => {

		// wraps the handler in a promise to ensure async handling
		Promise.resolve(fn(req, res, next))
			// if any errors occur, pass them to express error middleware
			.catch(next);
	}
}



export { asyncHandler }
