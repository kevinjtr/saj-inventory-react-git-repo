import {routes_tabs} from './config/routes'
import React, { useState } from 'react'
import { connect } from 'redux-bundler-react';
import { Tabs } from '@mui/material';
import { Route } from 'react-router-dom';
import getsitelogo from '../../src/img/getsitelogo.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import InventoryIcon from '@mui/icons-material/Inventory';
import UserDropdown from './header/UserDropdown';
import {Button} from '@material-ui/core'

function Header(props) {
	const {user, userIsLoggedIn, userAccess, darkModeBackgroundColor, prefersDarkMode, setPrefersDarkMode,doLogout, userName} = props;
	const [showUserDropdown,setShowUserDropdown] = useState(false)

	//,backgroundImage:'url("../../src/img/appbarBackground.jfif")'
	return (
		<Route path="/" render={(history) => (
			<>
			{userIsLoggedIn && 
			<div style={{display:'flex',backgroundColor:'#1f1d1d',overflow:'hidden',height:'32px',boxShadow:'0 4px 2px -2px rgb(150,150,150)',zIndex:'2'}}>
				<div style={{display:'flex',paddingLeft:'10px'}}>

					<div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}><InventoryIcon style={{fontSize:'1.6em',color:'#a38d53'}}/></div>
					<div style={{display:'flex',flexDirection:'column',justifyContent:'center',textTransform:'uppercase',lineHeight:'0.8em',fontSize:'1.8em',fontWeight:'900',paddingLeft:'5px'}}>
						<div style={{height:'0.8em',color:'#edebe6'}}>Inventory</div>
					</div>
				</div>
				<div style={{flexGrow:1,display:'flex',overflow:'hidden',marginLeft:'25px'}}>

					<Tabs 
						variant="scrollable"
						scrollButtons="auto"
						allowScrollButtonsMobile
						value={history.location.pathname}
						TabIndicatorProps={{style:{backgroundColor:"#3f51b5", height:"0.15rem"}}}
						textColor="inherit"
						style={{height:"32px", minHeight:"32px",color:'white'}}
					>
						{routes_tabs(userAccess).tabs}
					</Tabs>
				</div>
				<div>
					<Button style={{outline:'0'}}>
							<BrightnessLowIcon onClick={()=>setPrefersDarkMode(!prefersDarkMode)} style={{color:'#000000',height:'20px',width:'20px'}} />
					</Button>
				</div>
					<div onClick={()=>setShowUserDropdown(true)} style={{display:'flex',flexDirection:'column',justifyContent:'center',marginRight:'10px',cursor:'pointer'}}>
						<div style={{display:'flex',backgroundColor:'rgba(255,255,255,0.1)',borderRadius:'5px',border:'1px solid #4a4844'}}>
							<div style={{marginRight:'3px',display:'flex',flexDirection:'column',justifyContent:'center'}}><AccountCircle style={{color:'#bfbcb8',fontSize:'20px'}} /></div>
							<div style={{whiteSpace:'nowrap',fontSize:'0.75em',display:'flex',flexDirection:'column',justifyContent:'center',color:'white',paddingTop:'2px'}}>{userName}</div>
							<div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}><ArrowDropDownIcon style={{color:'#bfbcb8',fontSize:'20px'}}/></div>
						</div>
					</div>
				
			</div>
			}{showUserDropdown && <UserDropdown prefersDarkMode={prefersDarkMode} darkModeBackgroundColor={darkModeBackgroundColor} setShowUserDropdown={setShowUserDropdown} />}
			</>
			)} 

			
			/>
	);
}

export default connect(
	'selectUserName',
	'selectUser',
	'selectUserAccess',
	'selectUserIsLoggedIn',
	'doLogout',
	Header);
