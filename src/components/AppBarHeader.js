import {routes_tabs} from './config/routes'
import React, { useState } from 'react'
import { connect } from 'redux-bundler-react';
import { AppBar, Grid, Box, Tabs, IconButton, Badge} from '@mui/material';
import { Route } from 'react-router-dom';
import getsitelogo from '../../src/img/getsitelogo.png';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AccountCircle from '@material-ui/icons/AccountCircle';

function Header(props) {
	const {user} = props

	const [logIn, setLogIn] = useState(false);

	return (
		<Route path="/" render={(history) => (
			<AppBar position="static" elevation="0" sx={{backgroundColor:"rgba(255,255,255,1)",overflow:"hidden",marginBottom:"15px"}}>
				<Grid container sx={{justifyContent:"space-between",flexWrap:"nowrap",paddingLeft:"15px",paddingRight:"10px",position:"relative",height:"45px"}}>
				<img src={getsitelogo} style={{position:"absolute",transform:"rotate(-15deg)",opacity:"0.15",height:"125px",width:"auto",top:"-20px",left:"50px",zIndex:"1"}} />
				
				<Grid item sx={{display:"flex",flexDirection:"row",flexShrink:"0",zIndex:"2",position:"relative"}}>   
					<div style={{display:"flex", flexDirection:"column", justifyContent:"center",backgroundColor:"rgba(204,218,255,0)",border:"1px solid rgba(204,218,255,0)",height:"30px",marginTop:"auto",marginBottom:"auto"}}>
						<div style={{fontSize:"0.6rem", color:"rgba(0,0,0,1)", paddingLeft:"5px", fontWeight:"bold",textShadow:"0 0 2px #878787"}}>US Army Corps of Engineers</div>
						<div style={{fontSize:"0.6rem", letterSpacing:"0.13rem", color:"rgba(75,75,75,1)", paddingLeft:"5px", fontWeight:"bold",textShadow:"0 0 2px #878787"}}>Jacksonville District</div>
					</div>
					<div style={{display:"flex", flexDirection:"column", justifyContent:"center",backgroundColor:"rgba(255,255,255,0)",border:"1px solid rgba(0,0,0,0)", height:"30px",marginTop:"auto",marginBottom:"auto",marginLeft:"5px"}}><p style={{textTransform:"uppercase", letterSpacing:"0.15rem", fontSize:"1.8rem", color:"rgba(50,50,50,1)", fontWeight:"bold",textShadow:"0 0 1px #000",backgroundImage:'url("../../src/img/appbarBackground.jfif")',backgroundClip:'text'}}>Inventory</p></div>
                </Grid>
				<Grid item sx={{display:"flex",justifyContent:"flex-end",zIndex:"2",position:"relative"}} >
                    {logIn && <><IconButton sx={{height:'40px',width:'40px',marginTop:'auto',marginBottom:'auto','&:active':{outline:'0px',border:'none'},'&:focus':{outline:'0px',border:'none'}}} style={{color:"gray"}}>
						<Badge variant="dot" color="primary" >
							<NotificationsNoneIcon fontSize="small" />
						</Badge>
					</IconButton>
					<IconButton sx={{height:'40px',width:'40px',marginTop:'auto',marginBottom:'auto','&:active':{outline:'0px',border:'none'},'&:focus':{outline:'0px',border:'none'}}} style={{color:"gray"}}>
						<BedtimeOutlinedIcon fontSize="small"/>
					</IconButton></>}
					<IconButton sx={{height:'40px',width:'40px',marginTop:'auto',marginBottom:'auto','&:active':{outline:'0px',border:'none'},'&:focus':{outline:'0px',border:'none'}}} style={logIn ? {color:"#ff2626"}:{color:"gray"}} onClick={() => setLogIn(prev => !prev)}>
						<AccountCircle fontSize="small" />
					</IconButton>
                </Grid>
				</Grid>
				<Box sx={{backgroundColor:"rgba(245, 245, 245,0.75)",borderBottom:"1px solid rgba(0,0,0,0.25)",borderTop:"1px solid rgba(0,0,0,0.25)",zIndex:"2",height: "30px"}}>
					<Tabs 
						variant="scrollable"
						scrollsButtons="auto"
						allowScrollButtonsMobile
						value={history.location.pathname}
						TabIndicatorProps={{sx:{backgroundColor:"#ff2626", height:"0.15rem",color:"rgb(0,0,0)"}}}
						textColor="rgb(0,0,0)"
						style={{height:"29px;", minHeight:"29px",color:"black"}}
					>
						{routes_tabs(user)}
					</Tabs>
				</Box>
			</AppBar>
			)} 
			/>
	
	);
}

export default connect(
	'selectUser',
	Header);
