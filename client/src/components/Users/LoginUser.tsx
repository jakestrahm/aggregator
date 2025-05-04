import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { LoginResponse, useLoginMutation } from "../../redux/services/auth";
import { setCredentials } from "../../redux/slices/authSlice";

export default function LoginUser() {
	const dispatch = useAppDispatch();
	const { register, handleSubmit } = useForm();
	const [Login] = useLoginMutation();


	async function submitForm(data: any) {
		try {
			console.log(data)
			const user: LoginResponse = await Login(data).unwrap()
			dispatch(setCredentials(user))
		} catch (err: any) {
			console.error(err.message)
		}
	}

	return (
		<form onSubmit={handleSubmit(submitForm)}>
			<h3>login</h3>
			<input
				type="email"
				{...register('email')}
				defaultValue={'email11757@hotmail.com'}
				required />
			<input
				type="password"
				{...register('password')}
				defaultValue={'!Password1'}
				required />
			<button type='submit'>
				login
			</button>
		</form>
	)

}
