import { useForm } from "react-hook-form";
import { useRegisterMutation, User } from "../../redux/services/users";
import { useAppDispatch } from "../../redux/hooks";
import { setProfilingData } from "../../redux/slices/profilingSlice";

export default function RegisterUser({ setData }: any) {
	const { register, handleSubmit } = useForm();
	const [RegisterUser] = useRegisterMutation();
	const dispatch = useAppDispatch();


	async function submitForm(data: any) {
		try {
			const res: any = await RegisterUser(data).unwrap()
			const user: User = res.data
			console.log(user)
			setData(user);
			dispatch(setProfilingData(res.profile));
		} catch (err: any) {
			console.error(err.message)
		}
	}

	// useForm using "register" is completely coincidental
	return (
		<form onSubmit={handleSubmit(submitForm)}>
			<h3>register user</h3>
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
				register
			</button>
		</form>
	)

}
