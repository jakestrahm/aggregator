import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	enableProfiling,
	disableProfiling,
	selectProfilingData,
	selectProfilingStatus
} from '../redux/slices/profilingSlice';
import FlameGraph from '../components/FlameGraph';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RegisterUser from "../components/Users/RegisterUser";
import EditUser from "../components/Users/EditUser";
import RemoveUser from "../components/Users/RemoveUser";
import FindUser from "../components/Users/FindUser";
import Search from "../components/Search";

export default function Dashboard() {
	const dispatch = useDispatch();
	const profilingStatus = useSelector(selectProfilingStatus);
	const profile = useSelector(selectProfilingData);
	const [data, setData] = useState({});
	const [activeForm, setActiveForm] = useState('');
	const [searchText, setSearchText] = useState("");

	const buttons = ['Register User', 'Edit User', 'Remove User', 'Find User', 'Select All Users'];

	const filteredButtons = buttons.filter(button =>
		button.toLowerCase().includes(searchText.toLowerCase())
	);

	function handleClick(formName: string) {
		setActiveForm(formName);
	}

	function renderForm() {
		switch (activeForm) {
			case 'Register User':
				return <RegisterUser setData={setData} />;
			case 'Edit User':
				return <EditUser setData={setData} />;
			case 'Remove User':
				return <RemoveUser setData={setData} />;
			case 'Find User':
				return <FindUser setData={setData} />;
			default:
				return null;
		}
	}

	useEffect(() => {
		dispatch(enableProfiling());
		return () => {
			dispatch(disableProfiling());
		};
	}, [dispatch]);

	return (
		<div>
			<Search setValue={setSearchText} value={searchText} />
			<Stack spacing={2} direction="column">
				{filteredButtons.map((label) => (
					<div key={label}>
						<Button
							variant='outlined'
							onClick={() => handleClick(label)}
						>
							{label}
						</Button>
					</div>
				))}
				{renderForm()}
			</Stack>
			<pre>{JSON.stringify(data, null, 4)}</pre>
			profilingStatus: {profilingStatus} <br />
			{profile != null && <FlameGraph profile={profile} />}
		</div>
	);
}
