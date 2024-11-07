import { useState } from 'react';

import { Box, Container, Paper, Divider, TextField, Typography, Button, Alert } from '@mui/material';
import { AlternateEmail, Google, GitHub } from '@mui/icons-material';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUpFormSchema } from '../libs/schemas';

import axios from 'axios';
import Cookies from 'js-cookie';

interface SignUpFormErrorResponse {
	[key: string]: string[];
}

const SignUpForm = () => {
	const mbValue: number = 2;
	const API_URL: string = import.meta.env.VITE_API_URL;

	const [signUpFormErrorMessage, setSignUpFormErrorMessage] = useState<SignUpFormErrorResponse | null>(null);
	const [apiNoConnectionMessage, setApiNoConnectionMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const handleSignUpFormSubmit = (values: z.infer<typeof signUpFormSchema>) => {
		setSignUpFormErrorMessage(() => null);
		setApiNoConnectionMessage(() => null);
		axios
			.post(`${API_URL}/signup`, {
				username: values.username,
				email: values.email,
				password: values.password,
			})
			.then((res) => {
				console.debug('SignUp Form Submit Success Object:', res);
				const TOKEN: string = `Bearer ${res.data.token.plainTextToken}`;
				Cookies.set('CDJAuth', TOKEN, { sameSite: 'strict', expires: 365 });
			})
			.catch((err) => {
				if (err.response) {
					console.error(`From Submit Error Data:`, err.response.data.errors);
					console.error(`From Submit Error Status:`, err.response.status);
					if (err.response.status === 404) {
						setApiNoConnectionMessage(() => 'API route not found: 404')
					}
					console.error(`From Submit Error Headers:`, err.response.headers);
					setSignUpFormErrorMessage(() => err.response.data.errors);
				} else if (err.request) {
					console.error(`Form Submit No Response`, err.request);
					setApiNoConnectionMessage(() => 'API server not responding');
				} else {
					console.error(`Form Submit Error Message`, err.message);
				}
				console.error(`Form Submit Error Config:`, err.config);
			});
	};

	console.log(signUpFormErrorMessage);

	return (
		<>
			<Box
				component={`main`}
				sx={{ mt: 4 }}
			>
				<Container maxWidth='sm'>
					<Typography
						variant='h6'
						component='h2'
						align='center'
						sx={{ mb: mbValue }}
					>
						Sign Up
					</Typography>
					<Paper
						component={'form'}
						variant='outlined'
						square={false}
						onSubmit={handleSubmit(handleSignUpFormSubmit)}
					>
						<Container sx={{ display: 'flex', pt: 4, mb: mbValue }}>
							<Box>
								<AlternateEmail
									color='primary'
									sx={{ mt: 1, mr: 0.5 }}
								/>
							</Box>
							<Box>
								<TextField
									fullWidth
									size='small'
									label='Username'
									{...register('username')}
									helperText={errors.username ? errors.username.message : 'Choose your Username'}
									error={!!errors.username}
									sx={{ mb: mbValue }}
								/>
								<TextField
									fullWidth
									size='small'
									id='email'
									label='Email'
									{...register('email')}
									helperText={errors.email ? errors.email?.message : 'Enter your Email'}
									error={!!errors.email}
									sx={{ mb: mbValue }}
								/>
								<TextField
									fullWidth
									size='small'
									id='password'
									label='Password'
									type='password'
									{...register('password')}
									helperText={errors.password ? errors.password.message : 'Enter your Password'}
									error={!!errors.password}
									sx={{ mb: mbValue }}
								/>
								<TextField
									fullWidth
									size='small'
									id='confirmPassword'
									label='Confirm Password'
									type='password'
									{...register('confirmPassword')}
									helperText={errors.confirmPassword ? errors.confirmPassword.message : 'Enter your Password again'}
									error={!!errors.confirmPassword}
								/>
							</Box>
						</Container>
						{apiNoConnectionMessage && (
							<Alert
								severity='error'
								sx={{ mb: mbValue, mx: 2 }}
							>
								{apiNoConnectionMessage}
							</Alert>
						)}
						{signUpFormErrorMessage && (
							<Alert
								severity='error'
								sx={{ mb: mbValue, mx: 2 }}
							>
								{Object.keys(signUpFormErrorMessage).map((key) => (
									<Box key={key}>
										{' '}
										{signUpFormErrorMessage[key].map((message, key) => (
											<Box key={key}>{message}</Box>
										))}{' '}
									</Box>
								))}
							</Alert>
						)}
						<Divider
							variant='middle'
							sx={{ mb: mbValue }}
						/>
						<Box sx={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: mbValue }}>
							<Button
								size='large'
								variant='contained'
								type='submit'
							>
								Sign Up
							</Button>
						</Box>
						<Divider
							variant='middle'
							sx={{ mb: mbValue }}
						/>
						<Box sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: mbValue }}>
							<Button
								size='large'
								variant='contained'
								startIcon={<Google />}
								sx={{ mb: mbValue }}
								href={`${API_URL}/auth/google/redirect`}
							>
								Sign Up using Google
							</Button>
							<Button
								size='large'
								variant='contained'
								startIcon={<GitHub />}
								href={`${API_URL}/auth/github/redirect`}
							>
								Sign Up using GitHub
							</Button>
						</Box>
					</Paper>
				</Container>
			</Box>
		</>
	);
};

export default SignUpForm;
