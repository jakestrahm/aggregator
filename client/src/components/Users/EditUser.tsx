import { useForm } from "react-hook-form";
import { useEditUserMutation, User } from "../../redux/services/users";
import { useAppDispatch } from "../../redux/hooks";

export default function EditUser({ setData, userId }: any) {
	const { register, handleSubmit } = useForm();
	const [editUser, editedUser] = useEditUserMutation();

	async function submitForm(data: any) {
		try {
			const res: any = await editUser(data).unwrap()
			console.log(res)
		} catch (err: any) {
			console.error(err.message)
		}
	}

	return (
		<form onSubmit={handleSubmit(submitForm)}>
			<h3>edit</h3>
			<input
				type="id"
				{...register('id')}
				defaultValue={'0'}
				required />
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
			<button type='submit'>
				update
			</button>

			{JSON.stringify(editedUser)}
		</form>
	)

}
