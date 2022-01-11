import React from 'react';
import {BrowserRouter, Switch ,Route, Redirect} from "react-router-dom";
import {routes} from './config/routes'
import axios from 'axios';
import { connect } from 'redux-bundler-react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBarHeader from './AppBarHeader';
import "./styles/GlobalStyles.css";

export default function App(props) {
	
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = React.useMemo(
	() =>
	createMuiTheme({
		palette: {
			type: prefersDarkMode ? 'dark' : 'light',
		},
		}),
	[prefersDarkMode],
	);

	// const {doFetchUserLevel} = props

	// doFetchUserLevel()
	// console.log(props)
	axios.defaults.baseURL = process.env.REACT_APP_API;

	// <ThemeProvider theme={theme}>
	// 	<CssBaseline/>
	// 	<Routes />
  	// </ThemeProvider>


	  return (
	<ThemeProvider theme={theme}>
	<CssBaseline/>
	{
		<BrowserRouter basename={process.env.REACT_APP_BASENAME}>
			<div className='flex-wrapper'>
			<AppBarHeader/>
			<div className='content'>
			<Switch>
			{/* <Route
				exact
				path={'/'}
				render={() => <Redirect to={'/equipment'} />}
			/> */}
				{routes}
			<Route render={() => <Redirect to={'/404'} />}/>
			</Switch>
			</div>
			<div className="footer"><span style={{fontWeight:'bold'}}>Inventory App</span> &#8226; <span style={{color:'rgb(50,50,50)'}}>Version 0.1.0</span> &#8226; <span style={{color:'rgb(100,50,50)'}}>Controlled Unclassified Information</span></div>
			</div>
		</BrowserRouter>
	}
	</ThemeProvider>
	)

	// return (
		
	// );
}

// export default connect(
// 	'selectUser',
// 	'doFetchUserLevel',
// 	App);
