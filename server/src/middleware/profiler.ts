import * as inspector from 'node:inspector';
import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from './asyncHandler';

export const profiler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

	const profilingEnabled = req.header('Profile-Request') === 'true'
	if (!profilingEnabled) {
		next();
		return;
	}

	const session = new inspector.Session();
	session.connect();

	await session.post('Profiler.enable');
	await session.post('Profiler.start');

	const originalJson = res.json;

	res.json = function(this: Response, body: any): Response {
		session.post('Profiler.stop', (err, { profile }) => {
			if (err) {
				console.error('Profiling error:', err);
			} else {
				// include the profile data in the response
				body = { data: body, profile: profile };
			}
			session.disconnect();
			originalJson.call(this, body);
		});
		return this;
	};


	next();
});
