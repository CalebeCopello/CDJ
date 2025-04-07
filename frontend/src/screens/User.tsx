import { Box, Stack } from '@mui/material';
import NavBar from '../components/NavBar';
import UserProfile from '../components/UserProfile';

const User = () => {
	return (
		<>
			<Box>
				<NavBar />
			</Box>
			<Stack component={'main'}>
				<UserProfile />
			</Stack>
		</>
	);
};

export default User;
