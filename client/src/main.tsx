import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, } from "react-router-dom"

import Home from './routes/home.tsx';
import Login from './routes/login.tsx';
import Dashboard from './routes/dashboard.tsx';
import Register from './routes/register.tsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />
	},
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/register",
		element: <Register />
	},
	{
		path: "/dashboard",
		element: <Dashboard />
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
)
