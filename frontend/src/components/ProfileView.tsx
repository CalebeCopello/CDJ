import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Box, Tooltip, Typography, Paper, Container, Link, Divider, useTheme } from '@mui/material';
import { ThumbUpAlt, ThumbDownAlt } from '@mui/icons-material';

import { UserCommentsType, UserInfoType, UserLikesType } from '../libs/types';
import { startDate } from '../utils/starDate';

interface VireProfileProp {
	userInfo: UserInfoType;
	userComments: UserCommentsType;
	userLikes: UserLikesType;
}

const ProfileView: React.FC<VireProfileProp> = ({ userInfo, userComments, userLikes }) => {
	const theme = useTheme();
	const mValue: number = 2;

	return (
		<>
			<Container>
				{userInfo && (
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
							sx={{ display: 'flex' }}
						>
							Created at Stardate:{' '}
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
						</Typography>
					</Paper>
				)}
				<Typography
					component={'h2'}
					variant='h5'
					align='center'
					gutterBottom
				>
					Comments
				</Typography>
				<Paper
					elevation={1}
					sx={{ p: mValue / mValue, mb: mValue }}
				>
					{userComments
						? userComments?.map((comment: UserCommentsType, index: number) => (
								<Box key={index}>
									{index === 0 ? '' : <Divider sx={{ my: 1 }} />}
									<Paper
										elevation={2}
										sx={{ p: mValue / mValue }}
									>
										<Typography
											variant='body1'
											gutterBottom
										>
											@{userInfo?.username} commented:
										</Typography>
										<Box sx={{ border: `1px solid ${theme.palette.secondary.main}`, borderRadius: 1, p: 0.5 }}>{comment.comment}</Box>
										<Typography
											variant='body2'
											align='justify'
											sx={{ mt: mValue / mValue }}
										>
											on{' '}
											<Link
												component={ReactRouterLink}
												to={`/post/view/${comment.slug}`}
												underline='hover'
											>
												{comment.post}
											</Link>{' '}
											at {startDate(comment.date, true, true)}
										</Typography>
									</Paper>
								</Box>
						  ))
						: 'no comments'}
				</Paper>
				<Typography
					component={'h2'}
					variant='h5'
					align='center'
					gutterBottom
				>
					Reactions
				</Typography>
				<Paper
					elevation={1}
					sx={{ p: mValue / mValue, mb: mValue }}
				>
					{userLikes
						? userLikes.map((like: UserLikesType, index: number) => (
								<Box key={index}>
									{index === 0 ? '' : <Divider sx={{ my: mValue / mValue }} />}
									<Box>
										<Typography
											gutterBottom
											variant='body2'
										>
											@{userInfo?.username}{' '}
											{like.value === 1 ? (
												<ThumbUpAlt
													fontSize='small'
													sx={{ verticalAlign: 'middle' }}
												/>
											) : (
												<ThumbDownAlt
													fontSize='small'
													sx={{ verticalAlign: 'middle' }}
												/>
											)}{' '}
											@<Link
												component={ReactRouterLink}
												to={`/user/view/${like.username}`}
												underline='hover'
											>
												{like.username}
											</Link>{' '}
											comment on{' '}
											<Link
												component={ReactRouterLink}
												to={`/post/view/${like.slug}`}
												underline='hover'
											>
												{like.post}
											</Link>{' '}
											Stardate {startDate(like.date, true, true)}
										</Typography>
									</Box>
								</Box>
						  ))
						: 'no likes'}
				</Paper>
			</Container>
		</>
	);
};

export default ProfileView;
