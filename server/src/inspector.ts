import * as inspector from 'node:inspector/promises';

//todo might be deprecated

// export async function startCpuProfiling(): Promise<inspector.Profiler.Profile> {
export async function startCpuProfiling() {
	const session = new inspector.Session();
	session.connect();

	try {
		await session.post('Profiler.enable');
		await session.post('Profiler.start');


		const { profile } = await session.post('Profiler.stop');

		console.log(profile)
	} catch (err) {
		console.error('profiling error: ', err)
	} finally {
		session.disconnect();
	}

}
