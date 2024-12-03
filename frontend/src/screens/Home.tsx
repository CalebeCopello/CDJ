import { Box, Stack } from '@mui/material';
import NavBar from '../components/NavBar';
import PostsList from '../components/PostsList';

const Home = () => {
	return (
		<>
			<Box>
				<NavBar />
			</Box>
			<Stack component={'main'}>
				<PostsList />
			</Stack>
		</>
	);
};

export default Home;
