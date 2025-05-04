import { useState } from "react";
import { useFindUserQuery } from "../../redux/services/users";
import { skipToken } from "@reduxjs/toolkit/query/react";

export default function FindUser({ setData }: any) {
	const [userId, setUserId] = useState("");

	const { data, error, isLoading } = useFindUserQuery(
		userId ? parseInt(userId) : skipToken
	);

	return (
		<div className="App">
			<input
				placeholder="enter user id"
				value={userId}
				type="number"
				onChange={(e) => setUserId(e.target.value)}
			/>
			{error ? (
				<>{JSON.stringify(error)}</>
			) : isLoading ? (
				<>Loading...</>
			) : data ? (
				<div key={data.id}>{JSON.stringify(data)}</div>
			) : null}
		</div>
	)
}
