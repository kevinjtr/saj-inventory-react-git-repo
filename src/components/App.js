import {BrowserRouter, Switch ,Route, Redirect} from "react-router-dom";
import {routes} from './config/routes'
import axios from 'axios';
import { connect } from 'redux-bundler-react';
import CssBaseline from '@mui/material/CssBaseline';
import LogInAppBarHeader from './LogInAppBarHeader';
import "./styles/GlobalStyles.css";
import {DARK_MODE_BACKGROUND_COLOR} from "./config/constants"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  DashboardLayout  from './navbar/dashboard-layout';
import { AlertContextProvider } from "./context/AlertProvider";
import { Toaster } from 'react-hot-toast';

function App(props) {
	const {userIsLoggedIn, userIsLoggingOut, userAccess, userDarkMode} = props
	const theme =  createTheme({
		palette: {
			mode: userDarkMode ? 'dark' : 'light',
		},
	  });

	axios.defaults.baseURL = process.env.REACT_APP_API;

	const DisplayData = (isLoggedIn) => {

		if(isLoggedIn){
			return(
				
				<DashboardLayout>
					<AlertContextProvider>
						<div {...(userDarkMode && {style:{background:DARK_MODE_BACKGROUND_COLOR}})}className='content'>
							<Switch>
								<Route
									exact
									path={'/'}
									render={() => userIsLoggedIn ? <Redirect to={'/dashboard'}/> : (userIsLoggingOut ? <Redirect to={'/logout'} /> :  <Redirect to={'/login'} />)  }
								/>
									{routes}
								<Route render={() => <Redirect to={'/404'} />}/>
							</Switch>
						</div>
					</AlertContextProvider>
				</DashboardLayout>
				
					
			)
					
		}

		return(
			<>
				<LogInAppBarHeader/>
				<div {...(userDarkMode && {style:{background:DARK_MODE_BACKGROUND_COLOR}})}className='content'>
				<Switch>
				<Route
					exact
					path={'/'}
					render={() => userIsLoggedIn ? <Redirect to={'/dashboard'}/> : (userIsLoggingOut ? <Redirect to={'/logout'} /> :  <Redirect to={'/login'} />)  }
				/>
					{routes}
				<Route render={() => <Redirect to={'/404'} />}/>
				</Switch>
				</div>
				<div className="footer"><span style={{color:'rgb(50,50,50)'}}>Version {process.env.REACT_APP_VERSION}</span> &#8226; <span style={{color:'rgb(100,50,50)'}}>Controlled Unclassified Information</span></div>
			</>
		)
	}

	  return (<>
		<Toaster
			toastOptions={{
				style: {
				zIndex: 999999 // For toasts
				},
				duration: 5000,
			}}
			
		/>
		<ThemeProvider theme={theme}>
		
		<CssBaseline/>
			<BrowserRouter basename={process.env.REACT_APP_BASENAME}>
				<div className='flex-wrapper'>
				{DisplayData(userIsLoggedIn)}
				</div>
			</BrowserRouter>
		</ThemeProvider> 
	</>)
}

export default connect(
	'selectUserAccess',
	'selectUserIsLoggedIn',
	'selectUserIsLoggingOut',
	'selectUserDarkMode',
	App);