import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useIsUserSigned = () => {
	const [isUserInfoloaded, setIsUserInfoloaded] = useState<boolean>(false);
	const [isUserSigned, setIsUserSigned] = useState<boolean>(false);

	useEffect(() => {
		const URL: string = import.meta.env.VITE_API_URL;
		const TOKEN: string | undefined = Cookies.get('CDJAuth');
		axios
			.get(`${URL}/user/signed`, {
				headers: {
					Authorization: TOKEN,
				},
			})
			.then(() => {
				setIsUserSigned(() => true);
			})
			.catch(() => {
				setIsUserSigned(() => false);
			})
			.finally(() => {
				setIsUserInfoloaded(() => true);
			});
	}, []);
	return { isUserInfoloaded, isUserSigned };
};

export default useIsUserSigned;
