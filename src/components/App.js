import React from 'react';
import {BrowserRouter, Switch ,Route, Redirect} from "react-router-dom";
import {routes} from './config/routes'
import axios from 'axios';
import { connect } from 'redux-bundler-react';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme();

export default function App(props) {
	// const {doFetchUserLevel} = props

	// doFetchUserLevel()
	// console.log(props)
	axios.defaults.baseURL = process.env.REACT_APP_API;

	return <ThemeProvider theme={theme}>{
		<BrowserRouter basename={process.env.REACT_APP_BASENAME}>
			<Switch>
			{/* <Route
				exact
				path={'/'}
				render={() => <Redirect to={'/equipment'} />}
			/> */}
				{routes}
			<Route render={() => <Redirect to={'/404'} />}/>
			</Switch>
		</BrowserRouter>
	}</ThemeProvider>;

	// return (
		
	// );
}

// export default connect(
// 	'selectUser',
// 	'doFetchUserLevel',
// 	App);
