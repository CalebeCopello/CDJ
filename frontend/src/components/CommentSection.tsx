import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { PostType, CommentType } from '../libs/types';

interface PostViewProp {
	post: PostType;
}

const CommentSection: React.FC<PostViewProp> = ({ post }) => {
	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
	const [commentsFetched, setCommentsFetched] = useState<CommentType[] | null>(null);

	const API_URL: string = import.meta.env.VITE_API_URL;

	useEffect(() => {
		setIsPageLoaded(() => true);
		axios
			.get(`${API_URL}/comment/get-all`, {
				params: {
					post_id: post?.id,
				},
			})
			.then((res) => {
				console.log(res);
				setCommentsFetched(() => res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	console.log(commentsFetched);
	return (
		<>
			<div>Comments</div>
			{commentsFetched?.map((value: CommentType, index) => (
				<div key={index}>{value?.comment}</div>
			))}
		</>
	);
};

export default CommentSection;
