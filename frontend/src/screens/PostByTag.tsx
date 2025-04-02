import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../components/NavBar';
import { PostType, TagType } from '../libs/types';
import axios from 'axios';
import PostListComponent from '../components/PostListComponent';
import { Box, Stack } from '@mui/material';

const PostByTag = () => {
	const [fetchedPosts, setFetchedPosts] = useState<PostType[] | null>(null);
	const [fetchedTag, setFetchedTag] = useState<TagType | null>(null);
	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

	const API_URL: string = import.meta.env.VITE_API_URL;
	const { slug } = useParams();

	useEffect(() => {
		setIsPageLoaded(() => true);
		axios
			.get(`${API_URL}/post/get/bytag/${slug}`)
			.then((res) => {
				setFetchedPosts(() => res.data.posts);
				setFetchedTag(() => res.data.tag);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [slug]);

	return (
		<>
			<Box>
				<NavBar />
			</Box>
			<Stack component={'main'}>
				<PostListComponent
					fetchedPosts={fetchedPosts}
					isPageLoaded={isPageLoaded}
					searchTag={fetchedTag?.name}
				/>
			</Stack>
		</>
	);
};

export default PostByTag;
