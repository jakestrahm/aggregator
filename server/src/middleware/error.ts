import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../utilities/ResponseError';
import { DbError, DbErrorType } from '../utilities/DbError';

const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
	console.error(err)

	if (err instanceof ResponseError) {
		res.status(err.statusCode).json({ error: err.message })
	} else if (err instanceof DbError) {
		let responseErrorVersion = convertDbErrorToResponseError(err);
		res.status(responseErrorVersion.statusCode).json({ error: responseErrorVersion.message })
	} else {
		res.status(500).json({ error: err.message });
	}
}

const convertDbErrorToResponseError = (dbError: DbError): ResponseError => {
	let resErr = new ResponseError(dbError.message, 0);

	switch (dbError.errorType) {
		case (DbErrorType.MissingRecord):
			resErr.statusCode = 404
			break;
		case (DbErrorType.InvalidInput):
			resErr.statusCode = 400
			break;
		case (DbErrorType.DataIntegrityViolation):
			resErr.statusCode = 409
			break;
		case (DbErrorType.ServerError):
			resErr.statusCode = 500
			break;
		case (DbErrorType.DatabaseUnavailable):
			resErr.statusCode = 503
			break;
	}

	return resErr;
}

export { errorHandler }
