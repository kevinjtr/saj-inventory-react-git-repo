import React, { useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import { Snackbar, Alert } from '@mui/material';
import ProblemReportPopup from '../ProblemReportPopup.js'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { connect } from 'redux-bundler-react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const UserDropDown = ({prefersDarkMode, darkModeBackgroundColor, setShowUserDropdown, userName,userIsLoggedIn,doLogout}) => {
	
	const [openProblem,setOpenProblem] = useState(false);
	const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'warning'})
	
	return (
		<ClickAwayListener onClickAway={()=>setShowUserDropdown(false)}>
			<div style={{boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)',position:'absolute', minWidth:'150px',right:'10px',top:'35px',border:'1px solid rgb(230,230,230)',backgroundColor:'rgb(255,255,255)',zIndex:'1200',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
				<div style={{borderBottom:'1px solid rgb(230,230,230)',padding:'10px',display:'flex',flexDirection:'column'}}>
					<div style={{textAlign:'center'}}><AccountCircle style={{fontSize:'48px',color:'rgb(230,230,230)'}}/></div>
					<div style={{textAlign:'center',whiteSpace:'nowrap',color:'rgb(50,50,50)'}}>{userName}</div>
				</div>
				<div className='user-dropdown-buttons'>
					<button onClick={()=>{setOpenProblem(true)}} style={{cursor:'pointer',textAlign:'left',backgroundColor:'rgba(0,0,0,0)',border:'0px',width:'100%',fontSize:'0.75rem',color:'rgb(125,125,125)',padding:'5px',paddingLeft:'10px',outline:'0px'}}>
						<ErrorIcon style={{fontSize:'0.85rem',color:'rgb(125,125,125)',marginBottom:'-2px',marginRight:'5px'}}/>
						Report a problem
					</button>
				</div>
				<div className='user-dropdown-buttons'>
					<button onClick={()=> {if(userIsLoggedIn){setShowUserDropdown(false);doLogout()}}} style={{cursor:'pointer',textAlign:'left',backgroundColor:'rgba(0,0,0,0)',border:'0px',borderTop:'1px solid rgb(230,230,230)',width:'100%',fontSize:'0.75rem',color:'rgb(125,125,125)',padding:'5px',paddingLeft:'10px',outline:'0px'}}>
						<LogoutIcon style={{fontSize:'0.85rem',color:'rgb(125,125,125)',marginBottom:'-2px',marginRight:'5px'}}/>
						Log out
					</button>
				</div>
				<ProblemReportPopup title="Report a problem" openPopup={openProblem} setOpenPopup={setOpenProblem} setSnackBar={setSnackBar}/>
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
	'doLogout',
	UserDropDown); 
