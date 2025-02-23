import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { errorHandler } from './middleware/error'
import { router as users } from './routes/user'
import { router as items } from './routes/items'
// import { router as groups } from './routes/groups'
// import { router as group_items } from './routes/group_items'
import { profiler } from './middleware/profiler'

dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

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
app.use('/items', items)
// app.use('/groups', groups)
// app.use('/group_items', group_items)

app.use(errorHandler)

server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
	console.log(`...`);
});
