import { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { Box, AppBar, Toolbar, Typography, InputBase, IconButton, Button, Stack, useTheme, Menu, MenuItem } from '@mui/material';
import { AccountCircle, MoreVert, Search } from '@mui/icons-material';

import { Logo } from '../assets/Logo';

const NavgationBar = () => {
	const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

	const [anchorMobileMenu, setAnchorMobileMenu] = useState<null | HTMLElement>(null);
	const openMobileMenu = Boolean(anchorMobileMenu);
	const closeMobileMenu = () => {
		setAnchorMobileMenu(null);
	};
	const handleClickMobileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorMobileMenu(e.currentTarget);
	};

	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();

	//Debugging like a noob
	// console.log(theme);
	// console.log(location);

	return (
		<>
			<Box
				sx={{ flexGrow: 1 }}
				component={`header`}
			>
				<AppBar
					position='static'
					sx={{ borderRadius: 1 }}
				>
					<Toolbar>
						<IconButton disabled={location.pathname === '/'} onClick={() => navigate('/')}>
							<Logo
								fill={theme.palette.background.default}
								sx={{ fontSize: 46 }}
							/>
						</IconButton>
						<Typography
							variant='h6'
							component={`div`}
							sx={{ display: { xs: 'none', md: 'block' } }}
						>
							Copello's Developer Journal
						</Typography>
						<Typography
							variant='h6'
							component={`div`}
							sx={{ display: { xs: 'block', md: 'none' } }}
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
								<Search />
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
									<Box sx={{ display: { xs: 'block', md: 'none' } }}>
										<IconButton
											color='inherit'
											id='mobile-menu-button'
											aria-controls={openMobileMenu ? 'mobile-menu' : undefined}
											aria-haspopup='true'
											aria-expanded={openMobileMenu ? 'true' : undefined}
											onClick={handleClickMobileMenu}
										>
											<MoreVert />
										</IconButton>
										<Menu
											id='mobile-menu'
											anchorEl={anchorMobileMenu}
											open={openMobileMenu}
											onClose={closeMobileMenu}
											MenuListProps={{
												'aria-labelledby': 'mobile-menu-button',
											}}
										>
											<MenuItem
												onClick={() => {
													closeMobileMenu();
													navigate(`/signup`);
												}}
												disabled={location.pathname === '/signup'}
												>
												Sign Up
											</MenuItem>
											<MenuItem
												onClick={() => {
													closeMobileMenu();
													navigate(`/signin`);
												}}
												disabled={location.pathname === '/signin'}
											>
												Sign In
											</MenuItem>
										</Menu>
									</Box>
									<Stack
										spacing={2}
										direction={`row`}
										sx={{ display: { xs: 'none', md: 'block' } }}
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
											onClick={() => navigate(`/signin`)}
											disabled={location.pathname === '/signin'}
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
