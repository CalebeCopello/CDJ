import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { Container } from '@mui/material';

import { UserInfoType } from '../libs/types';

const UserSettingsComponennt = () => {
	const [userInfo, setUserInfo] = useState<UserInfoType>();
	const API_URL: string = import.meta.env.VITE_API_URL;
	const TOKEN: string | undefined = Cookies.get('CDJAuth');

	useEffect(() => {
		axios
			.get(`${API_URL}/user/signed`, {
				headers: {
					Authorization: TOKEN,
				},
			})
			.then((res) => {
                setUserInfo(() => res.data)
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	return (
		<>
			<Container>'user setting component'</Container>
		</>
	);
};

export default UserSettingsComponennt;
