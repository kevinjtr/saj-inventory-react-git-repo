import React from 'react';
import {BrowserRouter, Switch ,Route, Redirect} from "react-router-dom";
import {routes_tabs} from './config/routes'

import axios from 'axios';
import { connect } from 'redux-bundler-react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBarHeader from './AppBarHeader';
import "./styles/GlobalStyles.css";
import LogoutConfirm from './LogoutConfirm'
import { LocalHospitalTwoTone } from '@material-ui/icons';
import {DARK_MODE_BACKGROUND_COLOR} from "./config/constants"
import { ThemeProvider as ThemeProviderV5 , createTheme as createThemeV5 } from '@mui/material/styles';
import { DashboardLayout } from './navbar/dashboard-layout';
//import appinfo from 'app-info.json'

function App(props) {
	const {userIsLoggedIn, userIsLoggingOut, userAccess, userDarkMode} = props
	const theme = createTheme({
			palette: {
				type: userDarkMode ? 'dark' : 'light',
			},
	})

	const themeV5 =  createThemeV5({
		palette: {
			mode: userDarkMode ? 'dark' : 'light',
		},
	  });

	axios.defaults.baseURL = process.env.REACT_APP_API;

	const DisplayData = (isLoggedIn) => {

		if(isLoggedIn){
			return(
					<DashboardLayout>
						<div {...(userDarkMode && {style:{background:DARK_MODE_BACKGROUND_COLOR}})}className='content'>
						<Switch>
						<Route
							exact
							path={'/'}
							render={() => userIsLoggedIn ? <Redirect to={'/Home'}/> : (userIsLoggingOut ? <Redirect to={'/logout'} /> :  <Redirect to={'/login'} />)  }
						/>
							{routes_tabs(userAccess, themeV5).routes}
						<Route render={() => <Redirect to={'/404'} />}/>
						</Switch>
						</div>
					</DashboardLayout>
			)
					
		}

		return(
			<>
				<AppBarHeader/>
				<div {...(userDarkMode && {style:{background:DARK_MODE_BACKGROUND_COLOR}})}className='content'>
				<Switch>
				<Route
					exact
					path={'/'}
					render={() => userIsLoggedIn ? <Redirect to={'/Home'}/> : (userIsLoggingOut ? <Redirect to={'/logout'} /> :  <Redirect to={'/login'} />)  }
				/>
					{routes_tabs(userAccess, themeV5).routes}
				<Route render={() => <Redirect to={'/404'} />}/>
				</Switch>
				</div>
				<div className="footer"><span style={{fontWeight:'bold',color:'rgb(50,50,50)'}}>Inventory App Beta</span> &#8226; <span style={{color:'rgb(50,50,50)'}}>Version {process.env.REACT_APP_VERSION}</span> &#8226; <span style={{color:'rgb(100,50,50)'}}>Controlled Unclassified Information</span></div>
			</>
		)
	}

	  return (
		<ThemeProviderV5 theme={themeV5}>
			<ThemeProvider theme={theme}>
			<CssBaseline/>
			
				<BrowserRouter basename={process.env.REACT_APP_BASENAME}>
					<div className='flex-wrapper'>
					{DisplayData(userIsLoggedIn)}
					</div>
				</BrowserRouter>
			
			</ThemeProvider> 
		</ThemeProviderV5>
	)
}

export default connect(
	'selectUserAccess',
	'selectUserIsLoggedIn',
	'selectUserIsLoggingOut',
	'selectUserDarkMode',
	App);