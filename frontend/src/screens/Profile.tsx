import { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';

import { Box, Stack, Tooltip, Typography, Paper, Container, Link, Divider, useTheme } from '@mui/material';
import { ThumbUpAlt, ThumbDownAlt } from '@mui/icons-material';

import axios from 'axios';

import NavBar from '../components/NavBar';
import { UserInfoType, UserCommentsType, UserLikesType } from '../libs/types';
import { startDate } from '../utils/starDate';

function Profile() {
	const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
	const [userComments, setUserComments] = useState<UserCommentsType[] | null>(null);
	const [userLikes, setUserLikes] = useState<UserLikesType[] | null>(null);
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState<boolean>(false);

	const theme = useTheme();

	const { slug } = useParams();

	const API_URL: string = import.meta.env.VITE_API_URL;
	const mValue: number = 2;

	useEffect(() => {
		axios
			.get(`${API_URL}/user/info/${slug}`)
			.then((res) => {
				setIsUserInfoLoaded(() => true);
				console.log(res.data);
				setUserInfo(() => res.data.user);
				setUserComments(() => res.data.comments);
				setUserLikes(() => res.data.likes);
			})
			.catch((err) => {
				console.error('Error:', err);
				console.error('Error Message:', err.response.data);
			});
	}, []);

	return (
		<>
			<Box>
				<NavBar />
			</Box>
			<Stack component={'main'}>
				<Typography
					component={'h1'}
					variant='h4'
					align='center'
					noWrap
					sx={{ mt: mValue }}
					gutterBottom
				>
					<Box
						component={`span`}
						fontWeight='fontWeightMedium'
						sx={{ mr: 2 }}
					>
						{slug}'s
					</Box>
					Profile
				</Typography>
				{isUserInfoLoaded ? (
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
											<>
												{index === 0 ? '' : <Divider sx={{ my: 1 }} />}
												<Paper
													elevation={2}
													sx={{ p: mValue / mValue }}
												>
													<Typography
														variant='body1'
														align='center'
														gutterBottom
													>
														{userInfo?.username} commented:
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
											</>
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
											<Box>
												{index === 0 ? '' : <Divider sx={{ my: mValue / mValue }} />}
												<Box>
													<Typography
														gutterBottom
														variant='body2'
													>
														{userInfo?.username}{' '}
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
														{like.username} comment on {like.post} on {startDate(like.date, true, true)}
													</Typography>
												</Box>
											</Box>
									  ))
									: 'no likes'}
							</Paper>
						</Container>
					</>
				) : (
					<Box>
						<Typography
							variant='h4'
							align='center'
						>{`Not found :(`}</Typography>
					</Box>
				)}
			</Stack>
		</>
	);
}

export default Profile;
