import NavgationBar from './NavBar';

import { Box, Container, Paper, Divider, TextField, Typography, Button } from '@mui/material';
import { AlternateEmail, Google, GitHub } from '@mui/icons-material';

const SignUpForm = () => {
	const mbValue: number = 2;
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
									id='username'
									label='User Name'
									helperText='Choose your User Name'
									sx={{ mb: mbValue }}
								/>
								<TextField
									fullWidth
									size='small'
									id='email'
									label='Email'
									helperText='Enter your Email'
									sx={{ mb: mbValue }}
								/>
								<TextField
									fullWidth
									size='small'
									id='password'
									label='Password'
									type='password'
									helperText='Enter your Password'
									sx={{ mb: mbValue }}
								/>
								<TextField
									fullWidth
									size='small'
									id='confirmPassword'
									label='Confirm Password'
									type='password'
									helperText='Enter your Password again'
									
								/>
							</Box>
						</Container>
						<Divider variant='middle' sx={{ mb: mbValue }} />
						<Box sx={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: mbValue }}>
							<Button size='large' variant='contained'>Sign In</Button>
						</Box>
						<Divider variant='middle' sx={{ mb: mbValue }} />
						<Box sx={{ margin: 'auto', display: 'flex', flexDirection: "column" , justifyContent: 'center', alignItems: 'center', mb: mbValue }}>
							<Button size='large' variant='contained' startIcon={<Google />} sx={{ mb: mbValue }}>Sign In using Google</Button>
							<Button size='large' variant='contained' startIcon={<GitHub />}>Sign In using GitHub</Button>
						</Box>

					</Paper>
				</Container>
			</Box>
		</>
	);
};

export default SignUpForm;
