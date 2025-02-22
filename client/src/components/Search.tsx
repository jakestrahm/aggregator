import { useRef } from "react";

export default function Search({ setValue, value }: any) {
	const options = ['Register User', 'Edit User', 'Remove User', 'Find User', 'Get All Users'];
	const timeoutRef = useRef(0);

	const handleChange = (event: any) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setValue(event.target.value);
		}, 250);
	};

	return (
		<>
			<input
				onChange={handleChange}
				type="text"
			/>

			<pre>
				{JSON.stringify(value, null, 4)}
			</pre>
		</>
	)

}
