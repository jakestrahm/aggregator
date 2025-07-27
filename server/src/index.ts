import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { correlation, httpLogger, addLoggerContext } from './middleware/logger'
import { profiler } from './middleware/profiler'
import { errorHandler } from './middleware/error'
import { router as users } from './routes/user'
import { router as items } from './routes/items'
import { logger } from './utils/logger'


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


dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// middleware
app.use(correlation);
app.use(httpLogger);
app.use(addLoggerContext);
app.use(cors({
	// allow frontend
	origin: 'http://localhost:5173'
}));
app.use(profiler);
app.use(express.json());
app.use(errorHandler);

//routes
app.use('/hello-world', (_, res) => {
	res.json({ "hello": "world" });
})
app.use('/users', users);
app.use('/items', items);


server.listen(PORT, () => {
	logger.info(`server starting`, {
		port: PORT,
		nodeEnv: process.env.NODE_ENV,
		timestam: new Date().toISOString()
	});
	console.log(`...`);
});

process.on('SIGTERM', () => {
	logger.info('server stopping');
	server.close(() => {
		logger.info('server stopped')
	})
})
