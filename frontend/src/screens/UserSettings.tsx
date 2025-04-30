import { Box, Stack } from '@mui/material';
import NavBar from '../components/NavBar';
import UserSettingsComponennt from '../components/UserSettingsComponent';

const UserSettings = () => {
	return (
		<>
			<Box>
				<NavBar />
			</Box>
			<Stack component={'main'}>
                <UserSettingsComponennt />
            </Stack>
		</>
	);
};

export default UserSettings;
