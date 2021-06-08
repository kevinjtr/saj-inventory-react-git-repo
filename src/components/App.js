import React from 'react';
import {BrowserRouter, Switch ,Route, Link} from "react-router-dom";
import {routes} from './config/routes'
import axios from 'axios';

function App() {
	console.log(process.env)
	axios.defaults.baseURL = process.env.REACT_APP_API;
	return (
		<BrowserRouter basename={process.env.REACT_APP_BASENAME}>
			{routes}
		</BrowserRouter>
	);
}

export default App;
