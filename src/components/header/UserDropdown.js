import React, { useState } from 'react'
import { Snackbar, Alert,ClickAwayListener,Box, Button,Tooltip, Modal } from '@mui/material/';
import {Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon,
	Brightness7 as Brightness7Icon, Brightness4 as Brightness4Icon,
Error as ErrorIcon, Logout as LogoutIcon} from '@mui/icons-material';
import ProblemReportPopup from '../ProblemReportPopup'
import NotificationsPopup from '../NotificationsPopup'
import { connect } from 'redux-bundler-react';
import {Link} from "react-router-dom";

const UserDropDown = ({userIsLoggedIn, showUserDropdown, setShowUserDropdown, userName, userLevelName, userDarkMode, userDistrictOffice, doLogout, doToggleDarkMode}) => {
	const [openProblem,setOpenProblem] = useState(false);
	const [openNotifications,setOpenNotifications] = useState(false);
	const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'warning'})

	return (
		<Modal hideBackdrop 
		disableScrollLock={true}
		open={showUserDropdown}>
		<ClickAwayListener onClickAway={()=>setShowUserDropdown(false)}>
			<div style={{alignItems:"center",position:'absolute', fontSize:'15px', borderRadius:'4px', width:'350px',right:'25px',top:'52px',border:`1px solid ${userDarkMode ? '#404040' : 'rgb(230,230,230)'}`,backgroundColor:userDarkMode ? '#404040' : 'rgb(255,255,255)',zIndex:'1200',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
				<div style={{borderBottom:`1px solid ${userDarkMode ? '#404040' : 'rgb(230,230,230)'}`,padding:'10px',display:'flex',flexDirection:'column'}}>
					<div style={{textAlign:'center', marginBottom: 2}}><AccountCircleIcon style={{fontSize:'72px',color:`rgb(230,230,230)`}}/></div>
					<div style={{textAlign:'center', marginBottom: 2}}>{userName}</div>
					<div style={{textAlign:'center', marginBottom: 2}}>{userLevelName}</div>
					{userDistrictOffice ? <div style={{textAlign:'center', marginBottom: 2}}>{userDistrictOffice}</div> : null}
					<Tooltip title="Manage your Account">
						<Link to="/account" style={{textDecoration:'none'}}>
						<Button sx={{ my: 1,
						 paddingLeft:"5px",
						 color:"text.primary",
						 height: "28px",
						 width: "235px",
						 fontSize:"12px",
						 outlineColor: "#555",
						 border:"1px solid",
						 borderTopRightRadius: "18px",
						 borderBottomRightRadius: "18px",
						 borderTopLeftRadius: "18px",
						 borderBottomLeftRadius: "18px",
						 //borderLeft: "1px",
						 padding: "0px 12px 0 12px",
						'&:focus': {
							outline: 'none',
							}}} onClick={()=>setShowUserDropdown(false)}>
							Manage my Account
						</Button>
						</Link>
					</Tooltip>
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
						<Button sx={{ mr: 1, width:'115px',
							'&:focus': {
								outline: 'none',
								}}} 
							onClick={() => {
								if(userIsLoggedIn) doLogout()
							}} 
							>
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
		</Modal>
	);
}

export default connect(
	'selectUserIsLoggedIn',
	'selectUserName',
	'selectUserLevelName',
	'selectUserDarkMode',
	'doLogout',
	'doToggleDarkMode',
	'selectUserDistrictOffice',
	UserDropDown); 
