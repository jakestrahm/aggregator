import { useForm } from "react-hook-form";

export default function EditUser({ setData, userId }: any) {
	const { register, handleSubmit } = useForm();


	async function submitForm(data: any) {
		try {
			// const user: User = await RegisterUser(data).unwrap()
			// console.log(user)
		} catch (err: any) {
			console.error(err.message)
		}
	}

	return (
		<form onSubmit={handleSubmit(submitForm)}>
			<h3>edit</h3>
			<input
				type="username"
				{...register('username')}
				defaultValue={'testUsername'}
				required />
			<input
				type="email"
				{...register('email')}
				defaultValue={'testEmail@hotmail.com'}
				required />
			<input
				type="password"
				{...register('password')}
				defaultValue={'!Password1'}
				required />
			<button type='submit'>
				update
			</button>
		</form>
	)

}
