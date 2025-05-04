import { useListUsersQuery } from "../../redux/services/users"

export default function ListUsers() {
	const { data, isLoading, error } = useListUsersQuery(null); // Need to pass null here

	return (
		<div className="App">
			{error ? (
				<>error</>
			) : isLoading ? (
				<>Loading...</>
			) : data ? (
				<>
					{data.map((user) => (
						<div key={user.id}>{JSON.stringify(user)}</div>
					))}
				</>
			) : null}
		</div>
	)
}
