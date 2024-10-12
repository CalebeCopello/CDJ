import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
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
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
