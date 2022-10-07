import React, { useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Snackbar, Alert } from '@mui/material';
import ProblemReportPopup from '../ProblemReportPopup.js'
import NotificationsPopup from '../NotificationsPopup'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { connect } from 'redux-bundler-react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {DARK_MODE_BACKGROUND_COLOR} from "../config/constants"
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Avatar, Badge, Box, Button, Toolbar, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const UserDropDown = ({userIsLoggedIn, setShowUserDropdown, userName, userLevelName, userDarkMode, doLogout, doToggleDarkMode}) => {
	const [openProblem,setOpenProblem] = useState(false);
	const [openNotifications,setOpenNotifications] = useState(false);
	const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'warning'})
	const theme = useTheme();

	return (
		<ClickAwayListener onClickAway={()=>setShowUserDropdown(false)}>
			<div style={{position:'absolute', fontSize:'15px', borderRadius:'4px', width:'200px',right:'25px',top:'52px',border:`1px solid ${userDarkMode ? '#404040' : 'rgb(230,230,230)'}`,backgroundColor:userDarkMode ? '#404040' : 'rgb(255,255,255)',zIndex:'1200',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
				<div style={{borderBottom:`1px solid ${userDarkMode ? '#404040' : 'rgb(230,230,230)'}`,padding:'10px',display:'flex',flexDirection:'column'}}>
					<div style={{textAlign:'center'}}><AccountCircle style={{fontSize:'48px',color:`rgb(230,230,230)`}}/></div>
					<div style={{textAlign:'center'}}>{userName}</div>
					<div style={{textAlign:'center'}}>{userLevelName}</div>
				</div>
				<Box sx={{backgroundColor:'rgba(0,0,0,0)',border:'0px',borderTop:'1px solid rgb(230,230,230)',width:'100%',fontSize:'0.75rem',color:'rgb(125,125,125)',padding:'5px',outline:'0px',paddingTop:'10px',paddingBottom:'10px'}}>
					<Button title={userDarkMode ? "Enable Light Mode" : "Enable Dark Mode"} sx={{ mr: 1, width:'100%',
						'&:focus': {
							outline: 'none',
							}}} onClick={()=>doToggleDarkMode()}>
						{userDarkMode ? 
						<Brightness7Icon style={{fontSize:'1rem',color: userDarkMode ? '#fff' : 'rgb(125,125,125)',marginBottom:'3px',marginRight:'5px'}}/> :
						<Brightness4Icon style={{fontSize:'1rem',color: userDarkMode ? '#fff' : 'rgb(125,125,125)',marginBottom:'3px',marginRight:'5px'}}/>}
						<a style={{color: userDarkMode ? '#fff' : 'rgb(125,125,125)', fontSize:'.75rem'}}>{userDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}</a>
					</Button>
				</Box>
				<Box sx={{backgroundColor:'rgba(0,0,0,0)',border:'0px',borderTop:'1px solid rgb(230,230,230)',width:'100%',fontSize:'0.75rem',color:'rgb(125,125,125)',padding:'5px',outline:'0px',paddingTop:'10px',paddingBottom:'10px'}}>
					<Button title="Email Notifications" sx={{ mr: 1, width:'100%',
						'&:focus': {
							outline: 'none',
							}}} onClick={()=>setOpenNotifications(true)}>
						<NotificationsIcon style={{fontSize:'1rem',color: userDarkMode ? '#fff' : 'rgb(125,125,125)',marginBottom:'3px',marginRight:'5px'}}/>
						<a style={{color: userDarkMode ? '#fff' : 'rgb(125,125,125)', fontSize:'.75rem'}}>Email Notifications</a>
					</Button>
				</Box>
				<Box sx={{backgroundColor:'rgba(0,0,0,0)',border:'0px',borderTop:'1px solid rgb(230,230,230)',width:'100%',fontSize:'0.75rem',color:'rgb(125,125,125)',padding:'5px',outline:'0px',paddingTop:'10px',paddingBottom:'10px'}}>
					<Button title="Submit Feedback" sx={{ mr: 1, width:'100%',
						'&:focus': {
							outline: 'none',
							}}} onClick={()=>setOpenProblem(true)}>
						<ErrorIcon style={{fontSize:'1rem',color: userDarkMode ? '#fff' : 'rgb(125,125,125)',marginBottom:'3px',marginRight:'5px'}}/>
						<a style={{color: userDarkMode ? '#fff' : 'rgb(125,125,125)', fontSize:'.75rem'}}>Submit Feedback</a>
					</Button>
				</Box>
				<Box sx={{backgroundColor:'rgba(0,0,0,0)',border:'0px',borderTop:'1px solid rgb(230,230,230)',width:'100%',fontSize:'0.75rem',color:'rgb(125,125,125)',padding:'5px',outline:'0px',paddingTop:'10px',paddingBottom:'10px',textAlign:'center'}}>
					<Tooltip title="Sign Out">
						<Button sx={{ mr: 1, width:'100%',
						'&:focus': {
							outline: 'none',
							}}} onClick={()=> {if(userIsLoggedIn) doLogout()}} >
							<LogoutIcon fontSize="small" />
							<Box sx={{display:'flex',flexDirection:'row',alignItems:'center',textAlign:'center',fontSize:'.75rem',ml:1}}>
								Sign Out
							</Box>
						</Button>
					</Tooltip>
				</Box>
				<ProblemReportPopup title="Submit Feedback" openPopup={openProblem} setOpenPopup={setOpenProblem} setSnackBar={setSnackBar}/>
				<NotificationsPopup title="Email Notifications" openPopup={openNotifications} setOpenPopup={setOpenNotifications} setSnackBar={setSnackBar}/>
				<Snackbar open={snackBar.open} anchorOrigin={{vertical:'top',horizontal:'center'}} autoHideDuration={3000} onClose={()=>setSnackBar({open:false,message:'',severity:''})}>
					<Alert severity={snackBar.severity}>{snackBar.message}</Alert>
				</Snackbar>
			</div>
		</ClickAwayListener>
	);
}

export default connect(
	'selectUserIsLoggedIn',
	'selectUserName',
	'selectUserLevelName',
	'selectUserDarkMode',
	'doLogout',
	'doToggleDarkMode',
	UserDropDown); 
