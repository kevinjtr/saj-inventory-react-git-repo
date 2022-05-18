import React, { useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import { Snackbar, Alert } from '@mui/material';
import ProblemReportPopup from '../ProblemReportPopup.js'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { connect } from 'redux-bundler-react';
import AccountCircle from '@material-ui/icons/AccountCircle';

const UserDropDown = ({prefersDarkMode, darkModeBackgroundColor, setShowUserDropdown, userName}) => {
	
	const [openProblem,setOpenProblem] = useState(false);
	const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'warning'})
	
	return (
		<ClickAwayListener onClickAway={()=>setShowUserDropdown(false)}>
			<div style={{position:'absolute', width:'200px',right:'10px',top:'35px',border:'1px solid rgb(230,230,230)',backgroundColor:'rgb(255,255,255)',zIndex:'1200',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
				<div style={{borderBottom:'1px solid rgb(230,230,230)',padding:'10px',display:'flex',flexDirection:'column'}}>
					<div style={{textAlign:'center'}}><AccountCircle style={{fontSize:'48px',color:'rgb(230,230,230)'}}/></div>
					<div style={{textAlign:'center'}}>{userName}</div>
				</div>
				<br/>
				<br/>
				{/* <div style={{padding:'10px',paddingTop:'25px',paddingBottom:'25px',display:'flex',alignSelf:'center'}}>
					<div style={{textAlign:'center'}}></div>
					<div style={{paddingLeft:'5px',textAlign:'center',fontSize:'0.65rem',fontStyle:'italic',display:'flex',flexDirection:'column',justifyContent:'center'}}>You have no notifications</div>
				</div> */}
				<div>
					<button onClick={()=>setOpenProblem(true)} style={{backgroundColor:'rgba(0,0,0,0)',border:'0px',borderTop:'1px solid rgb(230,230,230)',width:'100%',fontSize:'0.75rem',color:'rgb(125,125,125)',padding:'5px',outline:'0px'}}>
						<ErrorIcon style={{fontSize:'0.85rem',color:'rgb(125,125,125)',marginBottom:'3px',marginRight:'5px'}}/>
						Submit Feedback
					</button>
				</div>
				<ProblemReportPopup title="Submit Feedback" openPopup={openProblem} setOpenPopup={setOpenProblem} setSnackBar={setSnackBar}/>
				<Snackbar open={snackBar.open} anchorOrigin={{vertical:'top',horizontal:'center'}} autoHideDuration={3000} onClose={()=>setSnackBar({open:false,message:'',severity:''})}>
					<Alert severity={snackBar.severity}>{snackBar.message}</Alert>
				</Snackbar>
			</div>
		</ClickAwayListener>
	);
}

export default connect(
	'selectUserName',
	UserDropDown); 
