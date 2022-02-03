import {routes_tabs} from './config/routes'
import React, { useState } from 'react'
import { connect } from 'redux-bundler-react';
import { AppBar, Grid, Box, Tabs, IconButton, Badge, Alert, Snackbar} from '@mui/material';
import { Route } from 'react-router-dom';
import getsitelogo from '../../src/img/getsitelogo.png';
import ErrorIcon from '@mui/icons-material/Error';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import "./styles/AppBarStyles.css";
import LogoutButton from './LogoutButton';
import ProblemReportPopup from './ProblemReportPopup.js'

function Header(props) {
	const {user, userIsLoggedIn, doLogout, userAccess} = props;
	const [openProblem,setOpenProblem] = useState(false);
	const [snackBar,setSnackBar] = useState({open:false,message:'',severity:'warning'})

	return (
		<Route path="/" render={(history) => (
			<AppBar className="appbar-main" position="static" elevation={0}>
				<Grid container sx={{justifyContent:"space-between",flexWrap:"nowrap",paddingLeft:"15px",paddingRight:"10px",position:"relative",height:"45px",borderBottom:"1px solid rgba(0,0,0,0.25)",boxShadow:"inset 0 -1px 4px -2px gray",}}>
				<img src={getsitelogo} style={{position:"absolute",transform:"rotate(-15deg)",opacity:"0.15",height:"125px",width:"auto",top:"-20px",left:"50px",zIndex:"1"}} />
				
				<Grid item sx={{display:"flex",flexDirection:"row",flexShrink:"0",zIndex:"2",position:"relative"}}>  
					<div style={{display:"flex", flexDirection:"column", justifyContent:"center",backgroundColor:"rgba(204,218,255,0)",border:"1px solid rgba(204,218,255,0)",height:"30px",marginTop:"auto",marginBottom:"auto"}}>
						<div style={{fontSize:"0.6rem", color:"rgba(0,0,0,1)", paddingLeft:"5px", fontWeight:"bold",textShadow:"0 0 2px #878787"}}>US Army Corps of Engineers</div>
						<div style={{fontSize:"0.6rem", letterSpacing:"0.13rem", color:"rgba(75,75,75,1)", paddingLeft:"5px", fontWeight:"bold",textShadow:"0 0 2px #878787"}}>Jacksonville District</div>
					</div>
					<div style={{display:"flex", flexDirection:"column", justifyContent:"center",height:"30px",marginTop:"auto",marginBottom:"auto",marginLeft:"5px"}}><p style={{textTransform:"uppercase", letterSpacing:"0.15rem", fontSize:"1.8rem", color:"rgba(50,50,50,1)", fontWeight:"bold",textShadow:"0 0 1px #000",backgroundImage:'url("../../src/img/appbarBackground.jfif")',backgroundClip:'text'}}>Inventory</p></div>
                </Grid>
				{userIsLoggedIn && <Grid item sx={{display:"flex",justifyContent:"flex-end",zIndex:"2",position:"relative"}} >
					<IconButton sx={{height:'40px',width:'40px',marginTop:'auto',marginBottom:'auto','&:active':{outline:'0px',border:'none'},'&:focus':{outline:'0px',border:'none'}}} style={{color:"gray"}}>
						<Badge variant="dot" color="primary" >
							<NotificationsNoneIcon fontSize="small" />
						</Badge>
					</IconButton>
					<IconButton onClick={()=>setOpenProblem(true)} sx={{height:'40px',width:'40px',marginTop:'auto',marginBottom:'auto','&:active':{outline:'0px',border:'none'},'&:focus':{outline:'0px',border:'none'}}} style={{color:"gray"}}>
						<ErrorIcon fontSize="small"/>
					</IconButton>
					<IconButton sx={{height:'40px',width:'40px',marginTop:'auto',marginBottom:'auto','&:active':{outline:'0px',border:'none'},'&:focus':{outline:'0px',border:'none'}}}>
						<AccountCircle fontSize="small" />
					</IconButton>
					
                </Grid>}
				</Grid>
				{userIsLoggedIn && 
				<Box className="appbar-tabs">
					<Tabs 
						variant="scrollable"
						scrollButtons="auto"
						allowScrollButtonsMobile
						value={history.location.pathname}
						TabIndicatorProps={{sx:{backgroundColor:"rgba(230,0,0,0.75)", height:"0.10rem"}}}
						textColor="inherit"
						style={{height:"25px", minHeight:"25px",color:"black"}}
					>
						{routes_tabs(userAccess).tabs}
					</Tabs>
					<LogoutButton/>
				</Box>}
				<ProblemReportPopup title="Report a problem" openPopup={openProblem} setOpenPopup={setOpenProblem} setSnackBar={setSnackBar}/>
				<Snackbar open={snackBar.open} anchorOrigin={{vertical:'top',horizontal:'center'}} autoHideDuration={3000} onClose={()=>setSnackBar({open:false,message:'',severity:''})}>
					<Alert severity={snackBar.severity}>{snackBar.message}</Alert>
				</Snackbar>
			</AppBar>
			)} 
			/>
	
	);
}

export default connect(
	'selectUser',
	'selectUserAccess',
	'selectUserIsLoggedIn',
	'doLogout',
	Header);
