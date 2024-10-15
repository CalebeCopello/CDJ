import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


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
