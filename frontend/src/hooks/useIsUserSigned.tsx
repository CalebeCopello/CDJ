import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { UserInfoType } from '../libs/types';

const useIsUserSigned = () => {
	const [isUserInfoloaded, setIsUserInfoloaded] = useState<boolean>(false);
	const [isUserSigned, setIsUserSigned] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<UserInfoType>()

	useEffect(() => {
		const URL: string = import.meta.env.VITE_API_URL;
		const TOKEN: string | undefined = Cookies.get('CDJAuth');
		axios
			.get(`${URL}/user/signed`, {
				headers: {
					Authorization: TOKEN,
				},
			})
			.then((res) => {
				setUserInfo(() => res.data);
				setIsUserSigned(() => true);
			})
			.catch(() => {
				setIsUserSigned(() => false);
			})
			.finally(() => {
				setIsUserInfoloaded(() => true);
			});
	}, []);
	return { isUserInfoloaded, isUserSigned, userInfo };
};

export default useIsUserSigned;
