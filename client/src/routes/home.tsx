import { useGetUserByIdQuery, useGetUsersQuery } from "../redux/services/users"

export default function Home() {
	// const { data } = useGetUserByIdQuery(1);
	// console.log(data)

	const users = useGetUsersQuery(null).data;
	console.log(users)

	return (
		<>
			home
		</>
	)
}
