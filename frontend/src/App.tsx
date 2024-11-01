import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ProtectedRoute from './components/ProtectedRoute';

import Home from './screens/Home';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import User from './screens/User';

function App() {
	return (
		<>
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
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
