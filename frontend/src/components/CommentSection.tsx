import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { PostType, CommentType } from '../libs/types';
import { Box, Button, CircularProgress, Container, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { Reply, ThumbUpOffAlt, ThumbDownOffAlt, ThumbUpAlt, ThumbDownAlt } from '@mui/icons-material';
import { useTheme } from '@mui/material';

import dayjs from 'dayjs';
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

	const theme = useTheme();

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
		setIsCommentsFetched(() => true);
		return roots;
	};

	useEffect(() => {
		axios
			.get(`${API_URL}/comment/get-all`, {
				params: {
					post_id: post?.id,
				},
			})
			.then((res) => {
				if (res.data.message !== 'no comments') {
					const tree = commentTreeBuilder(res.data);
					setCommentTree(() => tree);
				}
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setIsPageLoaded(() => true);
			});
	}, []);

	const CommentNode: React.FC<{ comment: CommentTreeType }> = ({ comment }) => {
		const childBorderStyle: string | number = comment.depth > 0 ? `1px solid ${theme.palette.secondary.main}` : 0;
		const childPaddingStyle: number = comment.depth > 0 ? 1 : 0;
		const childDisplay: string = comment.depth >= MAX_DEPTH ? 'none' : 'flex';
		return (
			<Box sx={{ marginLeft: `${comment.depth * 10}px`, borderLeft: childBorderStyle, paddingLeft: childPaddingStyle }}>
				<Box>
					<Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between"  }}>
						<Typography variant='subtitle2'>@{comment.username}</Typography>
						<Tooltip title={`Published at: ${dayjs(post?.created_at).format('YYYY-MMM-DD')}`}>
							<Typography variant='subtitle2'>StartDate: {dayjs(comment.created_at).format('YYMM.DD @ hh:mm')}:</Typography>
							</Tooltip>
					</Box>
					<Box sx={{ border: `1px solid ${theme.palette.secondary.main}`, borderRadius: 1, p: 0.5 }}>
						<Box sx={{ marginBottom: 1 }}>{comment.comment}</Box>
						<Box sx={{ display: 'flex' }}>
							<IconButton
								aria-label='like'
								size='small'
							>
								<ThumbUpOffAlt />
							</IconButton>
							<IconButton
								aria-label='dislike'
								size='small'
							>
								<ThumbDownOffAlt />
							</IconButton>
							<Button
								size='small'
								startIcon={<Reply />}
								sx={{ display: childDisplay }}
							>
								Reply
							</Button>
						</Box>
					</Box>
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

					{isPageLoaded ? (
						isCommentsFetched ? (
							commentTree.map((comment: CommentTreeType) => (
								<CommentNode
									key={comment.id}
									comment={comment}
								/>
							))
						) : (
							<Box>
								<Typography
									variant='body2'
									align='center'
								>
									No comments yet :(
								</Typography>
							</Box>
						)
					) : (
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<CircularProgress />
						</Box>
					)}
				</Box>
			</Container>
		</>
	);
};

export default CommentSection;
