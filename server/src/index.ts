import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { errorHandler } from './middleware/error'
// import { printToAllSockets, setUpWebSocket } from './websocket';
import { router as users } from './routes/user'
import { profiler } from './middleware/profiler'

dotenv.config()
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
// const wss = setUpWebSocket(server);

// allow frontend
app.use(cors({
	origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(profiler)


//routes
app.use('/hello-world', (_, res) => {
	res.json({ "hello": "world" });
})
app.use('/users', users)

// app.use('/test', (req, res) => {
// 	printToAllSockets(req, res, wss)
// })

app.use(errorHandler)

server.listen(PORT, () => {
	// console.log(`server running on port ${PORT}`);
	console.log(`...`);
});
