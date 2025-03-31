import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

import axios from 'axios';

import NavBar from '../components/NavBar';
import ProfileView from '../components/ProfileView';
import { UserInfoType, UserCommentsType, UserLikesType } from '../libs/types';

function Profile() {
	const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
	const [userComments, setUserComments] = useState<UserCommentsType[] | null>(null);
	const [userLikes, setUserLikes] = useState<UserLikesType[] | null>(null);
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState<boolean>(false);

	const { slug } = useParams();

	const API_URL: string = import.meta.env.VITE_API_URL;
	const mValue: number = 2;

	useEffect(() => {
		axios
			.get(`${API_URL}/user/info/${slug}`)
			.then((res) => {
				setIsUserInfoLoaded(() => true);
				setUserInfo(() => res.data.user);
				setUserComments(() => res.data.comments);
				setUserLikes(() => res.data.likes);
			})
			.catch((err) => {
				console.error('Error:', err);
				console.error('Error Message:', err.response.data);
			});
	}, [slug]);

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
					<ProfileView
						userInfo={userInfo}
						userComments={userComments}
						userLikes={userLikes}
					/>
				) : (
					<Box>
						<Typography
							variant='h4'
							align='center'
						>{`User not found :(`}</Typography>
					</Box>
				)}
			</Stack>
		</>
	);
}

export default Profile;
