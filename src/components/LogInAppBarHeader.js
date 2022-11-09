import {routes_tabs} from './config/routes'
import React, { useState } from 'react'
import { connect } from 'redux-bundler-react';
import { AppBar, Grid, Box, Tabs } from '@mui/material';
import { Route } from 'react-router-dom';
import getsitelogo from '../../src/img/getsitelogo.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import "./styles/AppBarStyles.css";
import LogoutButton from './LogoutButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
//import UserDropdown from './header/UserDropdown';
import {Button} from '@material-ui/core'
//import {DARK_MODE_BACKGROUND_COLOR} from "./config/constants"
import { useTheme } from '@mui/material/styles'

function Header({user, userIsLoggedIn, userAccess, userDarkMode, doToggleDarkMode}) {
	const [showUserDropdown,setShowUserDropdown] = useState(false)

	const theme = useTheme();

	const mode_options = {
		"light": "Dark",
		"dark": "Light"
	}

	const appbarStyles = {
		main:{
			backgroundColor: theme.palette.mode == "dark" ? theme.palette.background.default : "rgb(238, 236, 236)",
			overflow:'hidden',
		},
		tabs:{
			backgroundColor: theme.palette.mode == "dark" ? theme.palette.background.default : "rgba(215, 220, 219, 0.7)",
			borderBottom: theme.palette.mode == "dark" ? '1px solid rgba(255, 255, 255,0.25)' : '1px solid rgba(0,0,0,0.25)',
			zIndex: '2',
			height: '25px',
			display: 'flex',
			justifyContent: 'space-between',
		}
	}
	
	return (
		<Route path="/" render={(history) => (
			<><AppBar style={appbarStyles.main} position="static" elevation={0}>
				<Grid container sx={{justifyContent:"space-between",flexWrap:"nowrap",paddingLeft:"15px",paddingRight:"10px",position:"relative",height:"45px",borderBottom:"1px solid rgba(0,0,0,0.25)",boxShadow:"inset 0 -1px 4px -2px gray",}}>
				<img src={getsitelogo} style={{position:"absolute",transform:"rotate(-15deg)",opacity:"0.15",height:"125px",width:"auto",top:"-20px",left:"50px",zIndex:"1"}} />
				
				<Grid item sx={{display:"flex",flexDirection:"row",flexShrink:"0",zIndex:"2",position:"relative"}}>  
					<div style={{display:"flex", flexDirection:"column", justifyContent:"center",backgroundColor:"rgba(204,218,255,0)",border:"1px solid rgba(204,218,255,0)",height:"30px",marginTop:"auto",marginBottom:"auto"}}>
						<div style={{fontSize:"0.6rem", color:theme.palette.text.secondary, paddingLeft:"5px", fontWeight:"bold",textShadow:"0 0 2px #878787"}}>US Army Corps of Engineers</div>
						<div style={{fontSize:"0.6rem", letterSpacing:"0.13rem", color:theme.palette.text.secondary, paddingLeft:"5px", fontWeight:"bold",textShadow:"0 0 2px #878787"}}>Jacksonville District</div>
					</div>
					<div style={{display:"flex", flexDirection:"column", justifyContent:"center",height:"30px",marginTop:"auto",marginBottom:"auto",marginLeft:"5px", alignContent:'center'}}>
						<p style={{textTransform:"uppercase", letterSpacing:"0.15rem", fontSize:"1.8rem", color:theme.palette.text.secondary, fontWeight:"bold",textShadow:"0 0 1px #000",backgroundClip:'text'}}>Inventory Beta</p>
					</div>
                </Grid>
				{userIsLoggedIn && (
					<Grid item sx={{display:"flex",justifyContent:"flex-end",zIndex:"2",position:"relative",gap:'10px',alignItems:'center'}} >
						<Button title={`${mode_options[theme.palette.mode]} Mode`} onClick={()=>doToggleDarkMode()} style={{outline:'0'}}>
						{userDarkMode ? <Brightness7Icon  style={{color:'rgb(100,100,100)',height:'20px',width:'20px'}}/> : <Brightness4Icon title="Enable Dark Mode" style={{color:'rgb(100,100,100)',height:'20px',width:'20px'}}/>}
						</Button>
						<Button title="User Information" onClick={()=>setShowUserDropdown(true)} style={{border:'0px',outline:'0'}} >
							<AccountCircle style={{color:'rgb(100,100,100)',fontSize:'20px'}} />
							<ArrowDropDownIcon style={{color:'rgb(100,100,100)',fontSize:'20px'}}/>
						</Button>
					</Grid>
				)}
				</Grid>
				{userIsLoggedIn && 
				<Box style={appbarStyles.tabs}>
					<Tabs 
						variant="scrollable"
						scrollButtons="auto"
						allowScrollButtonsMobile
						value={history.location.pathname}
						TabIndicatorProps={{sx:{backgroundColor:"rgba(230,0,0,0.75)", height:"0.10rem"}}}
						//textColor="inherit"
						style={{height:"25px", minHeight:"25px"}}
					>
						{routes_tabs(userAccess, theme, {style: {fontSize: '14px', fontWeight: 'bold'}}).tabs}
					</Tabs>
					<LogoutButton/>
				</Box>}
			</AppBar>
			{/* {showUserDropdown && <UserDropdown setShowUserDropdown={setShowUserDropdown}/>} */}
			</>
			)} 
			/>
	);
}

export default connect(
	'selectUser',
	'selectUserAccess',
	'selectUserIsLoggedIn',
	'doLogout',
	'selectUserDarkMode',
	'doToggleDarkMode',
	Header);
