import { Box, Stack } from '@mui/material';

import NavBar from '../components/NavBar';
import PostView from '../components/PostView';

const Post = () => {
	return (
		<>
			<Box>
				<NavBar />
			</Box>
			<Stack component={'main'}>
				<PostView />
			</Stack>
		</>
	);
};

export default Post;
