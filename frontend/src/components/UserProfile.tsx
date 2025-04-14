import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Container, Paper, Box, Typography, Tooltip, Divider, Link, useTheme, Button } from '@mui/material';
import { ThumbUpAlt, ThumbDownAlt } from '@mui/icons-material';

import { startDate } from '../utils/starDate';
import { UserInfoType, CommentInfoType, LikesInfoType } from '../libs/types';

interface UserLikesComponentType {
	userLikes: LikesInfoType[];
	userInfo: UserInfoType;
	mValue: number;
}

const UserLikesComponent: React.FC<UserLikesComponentType> = ({ userLikes, userInfo, mValue }) => {
	const [limit, setLimit] = useState<number>(5);

	useEffect(() => {}, [limit]);

	const addLimit = () => {
		setLimit((prev) => prev + 5);
	};

	return (
		<>
			{userLikes.map((like: LikesInfoType, index: number) => (
				<Box key={index}>
					{index < limit && (
						<Box>
							{index === 0 ? '' : <Divider sx={{ my: mValue / mValue }} />}
							<Typography
								gutterBottom
								variant='body2'
							>
								{like.like.value === 1 ? (
									<Tooltip
										title='Liked'
										arrow
									>
										<ThumbUpAlt
											fontSize='small'
											sx={{ verticalAlign: 'middle' }}
										/>
									</Tooltip>
								) : (
									<Tooltip
										title='disliked'
										arrow
									>
										<ThumbDownAlt
											fontSize='small'
											sx={{ verticalAlign: 'middle' }}
										/>
									</Tooltip>
								)}{' '}
								@
								{userInfo?.username === like.comment.username ? (
									<Typography
										variant='body2'
										gutterBottom
										display={'inline'}
									>
										{like.comment.username}
									</Typography>
								) : (
									<Link
										component={ReactRouterLink}
										to={`/user/view/${like.comment.username}`}
										underline='hover'
									>
										{like.comment.username}
									</Link>
								)}{' '}
								comment on{' '}
								<Link
									component={ReactRouterLink}
									to={`/post/view/${like.post.slug}`}
									underline='hover'
								>
									{like.post.title}
								</Link>{' '}
								post by
								<Link
									component={ReactRouterLink}
									to={`/user/view/${like.post.username}`}
									underline='hover'
									sx={{ ml: 0.5 }}
								>
									{like.post.username}
								</Link>{' '}
								at Stardate {startDate(like.like.date, true, true)}
							</Typography>
						</Box>
					)}
				</Box>
			))}
			<Button variant='contained' fullWidth sx={{mt: mValue}} onClick={addLimit} disabled={limit >= userLikes.length}>Load More</Button>
		</>
	);
};

const UserProfile = () => {
	const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
	const [userComments, setUserComments] = useState<CommentInfoType[] | null>(null);
	const [userLikes, setUserLikes] = useState<LikesInfoType[] | null>(null);
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState<boolean>(false);

	const API_URL: string = import.meta.env.VITE_API_URL;
	const TOKEN: string | undefined = Cookies.get('CDJAuth');
	const mValue: number = 2;
	const theme = useTheme();

	useEffect(() => {
		setIsUserInfoLoaded(() => true);
		axios
			.get(`${API_URL}/user/self`, {
				headers: {
					Authorization: TOKEN,
				},
			})
			.then((res) => {
				console.log(res.data);
				setUserInfo(() => res.data.userInfo);
				setUserComments(() => res.data.commentsInfo);
				setUserLikes(() => res.data.likesInfo);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<>
			<Container sx={{ mt: mValue }}>
				{isUserInfoLoaded && userInfo && (
					<Paper
						elevation={1}
						sx={{ p: mValue, mb: mValue }}
					>
						<Typography
							variant='body2'
							gutterBottom
						>
							Username: {userInfo.username}
						</Typography>
						<Typography
							variant='body2'
							gutterBottom
						>
							Role: {userInfo.is_admin ? 'Admin' : 'Normal'}
						</Typography>
						<Typography
							variant='body2'
							gutterBottom
						>
							Email: {userInfo.email}
						</Typography>
						<Box sx={{ display: 'flex' }}>
							<Typography
								variant='body2'
								sx={{ display: 'flex' }}
							>
								Created at Stardate:{' '}
							</Typography>
							<Tooltip
								title={startDate(userInfo.created_at, false)}
								arrow
							>
								<Typography
									variant='body2'
									sx={{ ml: 1 }}
								>
									{startDate(userInfo.created_at, true, true)}
								</Typography>
							</Tooltip>
						</Box>
					</Paper>
				)}
				<Paper
					elevation={1}
					sx={{ p: mValue / mValue, mb: mValue }}
				>
					{userComments ? (
						userComments.map((comment: CommentInfoType, index: number) => (
							<Box key={index}>
								{index === 0 ? '' : <Divider sx={{ my: 1 }} />}
								<Paper
									elevation={2}
									sx={{ p: mValue / mValue }}
								>
									<Box sx={{ display: 'flex' }}>
										<Typography
											variant='body1'
											gutterBottom
										>
											You {comment.reply.username ? `replied ` : `commented`}
										</Typography>
										{comment.reply.username && (
											<Link
												component={ReactRouterLink}
												to={`/user/view/${comment.reply.username}`}
												underline='hover'
												sx={{ ml: 0.5 }}
											>
												{comment.reply.username}
											</Link>
										)}
									</Box>
									<Box sx={{ border: `1px solid ${theme.palette.secondary.main}`, borderRadius: 1, p: 0.5 }}>{comment.comment.value}</Box>
									<Typography
										variant='body2'
										align='justify'
										sx={{ mt: mValue / mValue }}
									>
										on{' '}
										<Link
											component={ReactRouterLink}
											to={`/post/view/${comment.post.slug}`}
											underline='hover'
										>
											{comment.post.title}
										</Link>{' '}
										at {startDate(comment.post.date, true, true)} from{' '}
										<Link
											component={ReactRouterLink}
											to={`/user/view/${comment.post.username}`}
											underline='hover'
										>
											{comment.post.username}
										</Link>{' '}
									</Typography>
								</Paper>
							</Box>
						))
					) : (
						<Typography
							variant='body2'
							align='center'
						>{`You have no comments yet :(`}</Typography>
					)}
				</Paper>
				<Paper
					elevation={1}
					sx={{ p: mValue / mValue, mb: mValue }}
				>
					{userLikes ? (
						<UserLikesComponent
							userLikes={userLikes}
							userInfo={userInfo}
							mValue={mValue}
						/>
					) : (
						<Typography
							variant='body2'
							align='center'
						>{`You have no reactions yet :~`}</Typography>
					)}
				</Paper>
			</Container>
		</>
	);
};

export default UserProfile;
