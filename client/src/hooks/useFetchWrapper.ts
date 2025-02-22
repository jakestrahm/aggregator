import { useDispatch, useSelector } from "react-redux";
import { selectProfilingStatus } from "../features/profiling/profilingSlice";
import { setProfilingData } from "../features/profiling/profilingSlice";

export default function useFetchWrapper() {
	//todo get auth in state and check for it
	// const auth = useSelector(selectAuth)

	const profilingEnabled = useSelector(selectProfilingStatus);
	const dispatch = useDispatch();

	return async (url: string, options: RequestInit = {}) => {

		try {
			const headers = new Headers(options.headers || {});
			headers.set('Content-Type', 'application/json')

			if (profilingEnabled) {
				headers.set('Profile-Request', 'true')
			}

			//prepare body
			let json = JSON.stringify(options.body)
			options.body = json

			const res = await fetch(url, {
				...options,
				headers
			});

			if (!res.ok) {
				console.error(res.status + ": " + res.statusText)
				// throw new Error(res.status + ": " + res.statusText)
			}

			let jsonRes = await res.json()


			if (jsonRes.profile) {
				dispatch(setProfilingData(jsonRes.profile))
			}

			return jsonRes;
		} catch (err) {
			console.error(err)
		}
	}
}
