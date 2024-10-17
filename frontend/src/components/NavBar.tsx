import { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { Box, AppBar, Toolbar, Typography, InputBase, IconButton, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { Logo } from '../assets/Logo';

const NavgationBar = () => {
	const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

	const navigate = useNavigate();
	const location = useLocation();

	console.log(location);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar
					position='static'
					sx={{ borderRadius: 1 }}
				>
					<Toolbar>
						<IconButton>
							<Logo
								fill={`#fff`}
								sx={{ mr: 1, fontSize: 46 }}
								onClick={() => navigate('/')}
							/>
						</IconButton>
						<Typography
							variant='h6'
							component={`div`}
							sx={{ display: { xs: 'none', sm: 'block' } }}
						>
							Copello's Developer Journal
						</Typography>
						<Typography
							variant='h6'
							component={`div`}
							sx={{ display: { xs: 'block', sm: 'none' } }}
						>
							CDJ
						</Typography>
						<Box
							component={`div`}
							display={`flex`}
							sx={{ px: 1, ml: 2, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}
						>
							<Box
								position={`absolute`}
								component={`div`}
								sx={{ mt: 0.5 }}
							>
								<SearchIcon />
							</Box>
							<InputBase
								placeholder='Search...'
								aria-label='search'
								sx={{ pl: 4 }}
							/>
						</Box>
						<Box flexGrow={`1`} />
						<Box>
							{isUserLogged ? (
								<IconButton
									size='large'
									aria-label={`user's account`}
									color='inherit'
								>
									<AccountCircle />
								</IconButton>
							) : (
								<>
									<Stack
										spacing={2}
										direction={`row`}
									>
										<Button
											variant='outlined'
											color='inherit'
											onClick={() => navigate(`/signup`)}
											disabled={location.pathname === '/signup'}
										>
											Sign Up
										</Button>
										<Button
											variant='outlined'
											color='inherit'
										>
											Sign In
										</Button>
									</Stack>
								</>
							)}
						</Box>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default NavgationBar;
