import { Box, Container, Paper, Divider, TextField, Typography, Button } from '@mui/material';
import { Google, GitHub } from '@mui/icons-material';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signInFormSchema } from '../libs/schemas';

import axios from 'axios';
import Cookies from 'js-cookie';

const SignInForm = () => {
	const mbValue: number = 2;
	const API_URL = import.meta.env.VITE_API_URL;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const handleSignInFormSubmit = (values: z.infer<typeof signInFormSchema>) => {
		axios
			.post(`${API_URL}/signin`, {
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
					console.error(`From Submit Error Data:`, err.response);
					console.error(`From Submit Error Status:`, err.response.status);
					console.error(`From Submit Error Headers:`, err.response.headers);
				} else if (err.request) {
					console.error(`Form Submit No Response`, err.request);
				} else {
					console.error(`Form Submit Error Message`, err.message);
				}
				console.error(`Form Submit Error Config:`, err.config);
			});
	};

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
						Sign In
					</Typography>
					<Paper
						component={'form'}
						variant='outlined'
						square={false}
						onSubmit={handleSubmit(handleSignInFormSubmit)}
					>
						<Container sx={{ pt: 4, mb: mbValue }}>
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
						</Container>
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
								Sign In
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
							>
								Sign In using Google
							</Button>
							<Button
								size='large'
								variant='contained'
								startIcon={<GitHub />}
							>
								Sign In using GitHub
							</Button>
						</Box>
					</Paper>
				</Container>
			</Box>
		</>
	);
};

export default SignInForm;