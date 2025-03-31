import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Container, Stack } from '@mui/material';

import NavBar from '../components/NavBar';
import PostView from '../components/PostView';
import CommentSection from '../components/CommentSection';

import { PostType } from '../libs/types';

const Post = () => {
	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
	const [isPostFound, setIsPostFound] = useState<boolean>(false);
	const [postFetched, setPostFetched] = useState<PostType | undefined>();

	const { slug } = useParams();
	const API_URL: string = import.meta.env.VITE_API_URL;

	useEffect(() => {
		setIsPageLoaded(() => true);
		axios
			.get(`${API_URL}/post/get/${slug}`)
			.then((res) => {
				setIsPostFound(() => true);
				setPostFetched(() => res.data);
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		<>
			<Box>
				<NavBar />
			</Box>
			{isPageLoaded && isPostFound && postFetched && (
				<Container>
					<Stack component={'main'}>
						<PostView post={postFetched} />
					</Stack>
					<Box>
						<CommentSection post={postFetched} />
					</Box>
				</Container>
			)}
			{isPageLoaded && !isPostFound && (
				<div>
					Post not found. <br /> 404
				</div>
			)}
		</>
	);
};

export default Post;
