import { useState } from "react";
import { useDeleteUserMutation } from "../../redux/services/users";

export default function RemoveUser({ setData }: any) {
	const [userId, setUserId] = useState("");

	const [deleteUser, deletedUser] = useDeleteUserMutation();

	return (
		<div className="App">
			<input
				placeholder="enter user id"
				value={userId}
				type="number"
				onChange={(e) => setUserId(e.target.value)}
			/>
			{deletedUser ? (
				<div>{JSON.stringify(deletedUser)}</div>
			) : null}

			<button
				onClick={() => deleteUser(parseInt(userId))}
			>
				delete user with id {userId}
			</button>
		</div>
	)

}
