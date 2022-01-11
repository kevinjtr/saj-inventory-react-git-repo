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

function App(props) {
	const {user} = props
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = React.useMemo(
	() =>
	createMuiTheme({
		palette: {
			type: !prefersDarkMode ? 'dark' : 'light',
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
			<AppBarHeader/>
			<Switch>
			<Route
				exact
				path={'/'}
				render={() => user ? <Redirect to={'/Home'}/> : <Redirect to={'/login'}/>}
			/>
				{routes}
			<Route render={() => <Redirect to={'/404'} />}/>
			</Switch>
		</BrowserRouter>
	}
	</ThemeProvider>
	)

	// return (
		
	// );
}

export default connect(
	'selectUser',
	App);