import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

import ProtectedRoute from './components/ProtectedRoute';

import Home from './screens/Home';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import User from './screens/User';
import AddPost from './screens/AddPost';

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route
							path='/'
							element={<Home />}
						/>
						<Route
							path='/signup'
							element={<SignUp />}
						/>
						<Route
							path='/signin'
							element={<SignIn />}
						/>
						<Route
							path='/user'
							element={<ProtectedRoute children={<User />} />}
						/>
						<Route
							path='/addpost'
							element={<ProtectedRoute children={<AddPost />} />}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}

export default App;
