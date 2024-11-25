import { Box, Stack } from '@mui/material';
import NavBar from '../components/NavBar';

const Home = () => {
	return (
		<>
			<Box>
				<NavBar />
			</Box>
			<Stack component={'main'}>
				<main>Home</main>
			</Stack>
		</>
	);
};

export default Home;
