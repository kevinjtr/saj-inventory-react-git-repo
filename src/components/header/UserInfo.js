import React, { useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import { Snackbar, Alert } from '@mui/material';
import ProblemReportPopup from '../ProblemReportPopup.js'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { connect } from 'redux-bundler-react';
import AccountCircle from '@material-ui/icons/AccountCircle';

const UserInfo = ({setShowUserInfo, userName}) => {
	
	const [openProblem,setOpenProblem] = useState(false);
	const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'warning'})

	return (
		<ClickAwayListener onClickAway={()=>setShowUserInfo(false)}>
			<div style={{position:'absolute', height:'200px',width:'200px',right:'10px',top:'35px',border:'1px solid rgb(230,230,230)',backgroundColor:'rgb(255,255,255)',zIndex:'2',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
				<div style={{borderBottom:'1px solid rgb(230,230,230)',padding:'10px',display:'flex',flexDirection:'column'}}>
					<div style={{textAlign:'center'}}><AccountCircle style={{fontSize:'48px',color:'rgb(230,230,230)'}}/></div>
					<div style={{textAlign:'center'}}>{userName}</div>
				</div>
				<div>
					<button onClick={()=>setOpenProblem(true)} style={{backgroundColor:'rgba(0,0,0,0)',border:'0px',borderTop:'1px solid rgb(230,230,230)',width:'100%',fontSize:'0.75rem',color:'rgb(125,125,125)',padding:'5px',outline:'0px'}}>
						<ErrorIcon style={{fontSize:'0.85rem',color:'rgb(125,125,125)',marginBottom:'3px',marginRight:'5px'}}/>
						Report a problem
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
	'selectUserName',
	UserInfo); 
