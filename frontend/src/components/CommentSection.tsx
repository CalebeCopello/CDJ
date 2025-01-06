import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { PostType, CommentType } from '../libs/types';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
interface PostViewProp {
	post: PostType;
}

interface CommentTreeType extends CommentType {
	children: CommentType[];
	depth: number;
}

const CommentSection: React.FC<PostViewProp> = ({ post }) => {
	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
	const [isCommentsFetched, setIsCommentsFetched] = useState<boolean>(false);
	const [commentTree, setCommentTree] = useState<CommentTreeType[]>([]);

	const MAX_DEPTH: number = 3;
	const API_URL: string = import.meta.env.VITE_API_URL;
	const mValue: number = 2;

	const theme = useTheme()

	const commentTreeBuilder = (commentsFetched: CommentType[]) => {
		const commentMap: { [key: number]: CommentTreeType } = {};
		const roots: CommentTreeType[] = [];

		commentsFetched.forEach((comment) => {
			commentMap[comment.id] = { ...comment, children: [], depth: 0 };
		});

		commentsFetched.forEach((comment) => {
			if (comment.parent_id !== null) {
				const parent = commentMap[comment.parent_id];
				if (parent && parent.depth < MAX_DEPTH) {
					commentMap[comment.id].depth = parent.depth + 1;
					parent.children?.push(commentMap[comment.id]);
				}
			} else {
				roots.push(commentMap[comment.id]);
			}
		});
		setIsCommentsFetched(() => true)
		return roots;
	};

	useEffect(() => {
		setIsPageLoaded(() => true);
		axios
			.get(`${API_URL}/comment/get-all`, {
				params: {
					post_id: post?.id,
				},
			})
			.then((res) => {
				const tree = commentTreeBuilder(res.data);
				setCommentTree(() => tree);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const CommentNode: React.FC<{ comment: CommentTreeType }> = ({ comment }) => {
		const childBorderStyle: string | number = comment.depth > 0 ? `1px solid ${theme.palette.secondary.main}` : 0;
		const childPaddingStyle: number = comment.depth > 0 ? 0.5 : 0;
		return (
			<Box sx={{ marginLeft: `${comment.depth * 10}px`,  marginTop: mValue, borderLeft: childBorderStyle, paddingLeft: childPaddingStyle}}>
				<Box>
					<Typography variant='subtitle2'>@{comment.username}:</Typography> {comment.comment}
				</Box>
				{comment.children &&
					comment.children.length > 0 &&
					comment.children.map((child) => (
						<CommentNode
							key={child.id}
							comment={child}
						/>
					))}
			</Box>
		);
	};

	return (
		<>
			<Container>
				<Box sx={{ p: mValue }}>
					<Typography
						variant='h6'
						component='h3'
						align='center'
					>
						Comments
					</Typography>
					{isPageLoaded && isCommentsFetched ? (
						commentTree.length > 0 ? (
							commentTree.map((comment: CommentTreeType) => (
								<CommentNode
									key={comment.id}
									comment={comment}
								/>
							))
						) : (
							<Box>No comments yet...</Box>
						)
					) : (
						<Box sx={{display: 'flex', justifyContent: 'center'}}>
							<CircularProgress />
						</Box>
					)}
				</Box>
			</Container>
		</>
	);
};

export default CommentSection;
