import { useEffect, useState } from 'react';
import axios from 'axios';


import PostListComponent from '../screens/PostListComponent';
import { PostType } from '../libs/types';

const PostsList = () => {
	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
	const [fetchedPosts, setFetchedPosts] = useState<PostType[] | null>(null);

	const API_URL: string = import.meta.env.VITE_API_URL;
	console.log(fetchedPosts)
	useEffect(() => {
		setIsPageLoaded(true);
		axios
			.get(`${API_URL}/post/get-all`)
			.then((res) => {
				setFetchedPosts(() => res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<>
		<PostListComponent fetchedPosts={fetchedPosts} isPageLoaded={isPageLoaded} searchTag={''} />
		</>
	);
};

export default PostsList;
