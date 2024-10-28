import NavgationBar from './NavBar';

import { Box, Container, Paper, Divider, TextField, Typography, Button } from '@mui/material';
import { AlternateEmail, Google, GitHub } from '@mui/icons-material';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z
	.object({
		username: z
			.string()
			.min(3, { message: 'The Username must be at lest 3 characters long' })
			.max(20, { message: 'The Username must not be longer than 20 characters long' })
			.regex(/^[a-zA-Z0-9_-]+$/, { message: 'The Username can only contain letters, numbers, hyphens, and underscores' })
			.trim(),
		email: z.string().email({ message: 'The Email is required' }).trim().toLowerCase(),
		password: z.string().min(4, { message: 'The Password must be 4 or more characters long' }).max(20, { message: 'Password must be at most 20 characters long' }),
		confirmPassword: z.string().min(4, { message: 'The Password must be 4 or more characters long' }).max(20, { message: 'Password must be at most 20 characters long' }),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{ message: 'Passwords do not match', path: ['confirmPassword'] }
	);

const SignUpForm = () => {
	const mbValue: number = 2;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});
	const handleSignUpFormSubmit = (values: z.infer<typeof formSchema>) => {
		console.log('testing');
		console.log(values);
	};

	return (
		<>
			<NavgationBar />
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
						<Container sx={{ display: 'flex', pt: 2, mb: mbValue }}>
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

export default SignUpForm;
