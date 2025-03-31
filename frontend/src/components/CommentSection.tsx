import React, { useState, useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Box, Button, CircularProgress, Container, IconButton, TextField, Tooltip, Typography, useTheme, Link } from '@mui/material';
import { Reply, ThumbUpAlt, ThumbUpOffAlt, ThumbDownAlt, ThumbDownOffAlt } from '@mui/icons-material';

import axios from 'axios';
import Cookies from 'js-cookie';

import { PostType, CommentType, LikesType } from '../libs/types';
import useIsUserSigned from '../hooks/useIsUserSigned';
import { startDate } from '../utils/starDate';

interface PostViewProp {
	post: PostType;
}

interface CommentTreeType extends CommentType {
	children: CommentType[];
	depth: number;
}

interface CommentBoxProps {
	parent_id?: number;
	comment?: string;
}

const CommentSection: React.FC<PostViewProp> = ({ post }) => {
	const theme = useTheme();
	const { isUserSigned, userInfo } = useIsUserSigned();

	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
	const [pageReload, setPageReload] = useState<boolean>(false);
	const [isCommentsFetched, setIsCommentsFetched] = useState<boolean>(false);
	const [commentTree, setCommentTree] = useState<CommentTreeType[]>([]);
	const [commentRaw, setCommentRaw] = useState<CommentType | undefined>();
	const [commentLike, setCommentLike] = useState<LikesType[]>([]);

	const MAX_DEPTH: number = 3;
	const API_URL: string = import.meta.env.VITE_API_URL;
	const TOKEN = Cookies.get('CDJAuth');
	const mValue: number = 2;

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

	const commentLikesFetch = (raw: CommentType | undefined) => {
		const arrayIds: Array<number> = [];
		let likes: LikesType[] = [];
		Object(raw).map((comment: CommentType) => arrayIds.push(comment.id));
		axios
			.get(`${API_URL}/like/get`, {
				params: {
					comments: arrayIds,
				},
			})
			.then((res) => {
				likes = res.data;
				setCommentLike(() => likes);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		setPageReload(() => false);
		axios
			.get(`${API_URL}/comment/get-all`, {
				params: {
					post_id: post?.id,
				},
			})
			.then((res) => {
				if (res.data.message !== 'no comments') {
					setCommentRaw(() => res.data);
					commentLikesFetch(res.data);
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
	}, [pageReload]);

	const CommentNode: React.FC<{ comment: CommentTreeType }> = ({ comment }) => {
		const childBorderStyle: string | number = comment.depth > 0 ? `1px solid ${theme.palette.secondary.main}` : 0;
		const childPaddingStyle: number = comment.depth > 0 ? 1 : 0;
		const childDisplay: string = comment.depth >= MAX_DEPTH ? 'none' : 'flex';
		const [reply, setReply] = useState<boolean>(false);

		return (
			<Box sx={{ marginLeft: `${comment.depth * 10}px`, borderLeft: childBorderStyle, paddingLeft: childPaddingStyle }}>
				<Box>
					<Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
						<Typography variant='subtitle2'>
							@
							<Link
								component={ReactRouterLink}
								to={`/user/view/${comment.username}`}
								underline='hover'
							>
								{comment.username}
							</Link>
						</Typography>
						<Tooltip title={`Commented at: ${startDate(comment?.created_at, false)}`}>
							<Typography variant='subtitle2'>StartDate: {startDate(comment?.created_at, true, true)}:</Typography>
						</Tooltip>
					</Box>
					<Box sx={{ border: `1px solid ${theme.palette.secondary.main}`, borderRadius: 1, p: 0.5 }}>
						<Box sx={{ marginBottom: 1, whiteSpace: 'pre-wrap' }}>{comment.comment}</Box>
						<Box sx={{ display: 'flex' }}>
							<LikeCommentNode id={comment.id} />
							<Button
								size='small'
								startIcon={<Reply />}
								sx={{ display: childDisplay }}
								onClick={() => setReply(() => !reply)}
							>
								Reply
							</Button>
						</Box>
						{reply && <CommentBox parent_id={comment.id} />}
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

	const LikeCommentNode: React.FC<{ id: number }> = ({ id }) => {
		if (isPageLoaded) {
			let selfLikedValue: number = 0;
			let likeValue: number = 0;
			const likes = commentLike[id];
			likes?.forEach((e: LikesType) => {
				if (e.user_id == userInfo?.id) selfLikedValue = e.like_value;
				likeValue += e.like_value;
			});
			return (
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton
						aria-label='like'
						size='small'
						onClick={() => handleLikes(1, id)}
					>
						{selfLikedValue == 1 ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
					</IconButton>
					<Typography>{likeValue}</Typography>
					<IconButton
						aria-label='dislike'
						size='small'
						onClick={() => handleLikes(-1, id)}
					>
						{selfLikedValue == -1 ? <ThumbDownAlt /> : <ThumbDownOffAlt />}
					</IconButton>
				</Box>
			);
		}
	};

	const CommentBox: React.FC<CommentBoxProps> = ({ parent_id }) => {
		const [comment, setComment] = useState<string | undefined>();

		const postComment = (parent_id?: CommentBoxProps['parent_id'], comment?: CommentBoxProps['comment']) => {
			axios
				.post(
					`${API_URL}/comment/create`,
					{
						post_id: post.id,
						comment: comment,
						parent_id: parent_id,
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: TOKEN,
						},
					}
				)
				.then(() => {
					setIsPageLoaded(() => false);
					setPageReload(() => true);
				})
				.catch((err) => {
					console.error(err);
				});
		};
		return (
			<Box sx={{ my: mValue }}>
				<Box>
					<TextField
						id='comment'
						value={comment}
						label={parent_id ? 'Add a Reply' : 'Add a Comment'}
						variant='outlined'
						disabled={!isUserSigned}
						fullWidth
						multiline
						sx={{ mb: 1 }}
						onChange={(e) => setComment(e.target.value)}
					/>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'end' }}>
					<Button
						variant='outlined'
						color='error'
						onClick={() => setComment(() => ' ')}
						sx={{ mr: mValue }}
					>
						Cancel
					</Button>
					<Button
						variant='outlined'
						onClick={() => postComment(parent_id, comment)}
						disabled={comment && comment?.trim().length > 0 ? false : true}
					>
						{parent_id ? 'Reply' : 'Comment'}
					</Button>
				</Box>
			</Box>
		);
	};

	const handleLikes = (value: number, id: number) => {
		axios
			.post(
				`${API_URL}/like/change`,
				{
					like_value: value,
					comment_id: id,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: TOKEN,
					},
				}
			)
			.then(() => {
				commentLikesFetch(commentRaw);
			})
			.catch((err) => {
				console.error(err);
			});
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
					<CommentBox />
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
