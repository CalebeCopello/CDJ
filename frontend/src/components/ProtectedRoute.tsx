import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useIsUserSigned from '../hooks/useIsUserSigned';

import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = (props: { children: ReactNode }) => {
	const { isUserInfoloaded, isUserSigned } = useIsUserSigned();

	if (!isUserInfoloaded) {
		return (
			<Box display={'flex'}>
				<CircularProgress />
			</Box>
		);
	}
	if (!isUserSigned) {
		return (
			<Navigate
				to='/signin'
				replace
			/>
		);
	}
	return props.children;
};

export default ProtectedRoute;
