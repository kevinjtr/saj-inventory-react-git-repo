import React from 'react';
import {BrowserRouter, Switch ,Route, Link} from "react-router-dom";
import {routes} from './config/routes'
import axios from 'axios';

function App() {
	axios.defaults.baseURL = 'http://localhost:8080';
	return (
		<BrowserRouter>
			{routes}
		</BrowserRouter>
	);
}

export default App;
