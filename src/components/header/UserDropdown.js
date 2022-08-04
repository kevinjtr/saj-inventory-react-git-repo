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

const UserDropDown = ({setShowUserDropdown, userName, userLevelName, userDarkMode}) => {
	console.log(userLevelName)
	const [openProblem,setOpenProblem] = useState(false);
	const [openNotifications,setOpenNotifications] = useState(false);
	const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'warning'})
	
	return (
		<ClickAwayListener onClickAway={()=>setShowUserDropdown(false)}>
			<div style={{position:'absolute', fontSize:'15px', borderRadius:'4px', width:'200px',right:'10px',top:'35px',border:`1px solid ${userDarkMode ? '#404040' : 'rgb(230,230,230)'}`,backgroundColor:userDarkMode ? '#404040' : 'rgb(255,255,255)',zIndex:'1200',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
				<div style={{borderBottom:`1px solid ${userDarkMode ? '#404040' : 'rgb(230,230,230)'},padding:'10px',display:'flex',flexDirection:'column`}}>
					<div style={{textAlign:'center'}}><AccountCircle style={{fontSize:'48px',color:`rgb(230,230,230)`}}/></div>
					<div style={{textAlign:'center'}}>{userName}</div>
					<div style={{textAlign:'center'}}>{userLevelName}</div>
				</div>
				{/* <br/>
				<br/> */}
				{/* <div style={{padding:'10px',paddingTop:'25px',paddingBottom:'25px',display:'flex',alignSelf:'center'}}>
					<div style={{textAlign:'center'}}></div>
					<div style={{paddingLeft:'5px',textAlign:'center',fontSize:'0.65rem',fontStyle:'italic',display:'flex',flexDirection:'column',justifyContent:'center'}}>You have no notifications</div>
				</div> */}
				<div>
					<button onClick={()=>setOpenNotifications(true)} style={{backgroundColor:'rgba(0,0,0,0)',border:'0px',borderTop:'1px solid rgb(230,230,230)',width:'100%',fontSize:'0.75rem',color:'rgb(125,125,125)',padding:'5px',outline:'0px'}}>
						<NotificationsIcon style={{fontSize:'0.85rem',color: userDarkMode ? '#fff' : 'rgb(125,125,125)',marginBottom:'3px',marginRight:'5px'}}/>
						<a style={{color: userDarkMode ? '#fff' : 'rgb(125,125,125)', fontSize:'14px'}}>Email Notifications</a>
					</button>
				</div>
				<div>
					<button onClick={()=>setOpenProblem(true)} style={{backgroundColor:'rgba(0,0,0,0)',border:'0px',borderTop:'1px solid rgb(230,230,230)',width:'100%',fontSize:'0.75rem',color:'rgb(125,125,125)',padding:'5px',outline:'0px'}}>
						<ErrorIcon style={{fontSize:'0.85rem',color: userDarkMode ? '#fff' : 'rgb(125,125,125)',marginBottom:'3px',marginRight:'5px'}}/>
						<a style={{color: userDarkMode ? '#fff' : 'rgb(125,125,125)', fontSize:'14px'}}>Submit Feedback</a>
					</button>
				</div>
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
	'selectUserName',
	'selectUserLevelName',
	'selectUserDarkMode',
	UserDropDown); 
