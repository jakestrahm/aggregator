export enum DbErrorType {
	MissingRecord,
	InvalidInput,
	DataIntegrityViolation,
	ServerError,
	DatabaseUnavailable
}
export class DbError extends Error {
	errorType: DbErrorType
	originalError?: Error;

	constructor(message: string, errorType: DbErrorType, originalError?: Error) {
		super(message)
		this.errorType = errorType
		this.originalError = originalError;
		this.name = 'DbError';
		Object.setPrototypeOf(this, DbError.prototype);
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			errorType: DbErrorType[this.errorType],
			originalError: this.originalError ? {
				name: this.originalError.name,
				message: this.originalError.message,
				stack: process.env.NODE_ENV === 'development' ? this.originalError.stack : undefined
			} : undefined
		};
	}

}
