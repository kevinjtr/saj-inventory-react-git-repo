import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, Button, IconButton, Toolbar, Tooltip } from '@mui/material';
import {Menu as MenuIcon, Person as UsersIcon, Notifications as NotificationsIcon} from '@mui/icons-material';
//import SearchIcon from '@mui/icons-material/Search';
//import { Bell as BellIcon } from '../icons/bell';
//import { UserCircle as UserCircleIcon } from '../icons/user-circle';
//import { Users as UsersIcon } from '../icons/users';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import Brightness7Icon from '@material-ui/icons/Brightness7';
// import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useTheme } from '@mui/material/styles'
import UserDropdown from '../header/UserDropdown';
import {Link} from "react-router-dom"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory } from "react-router-dom";
//import { connect } from 'redux-bundler-react';

// const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
//   enableColorOnDark,
//   backgroundColor: theme.palette.background.paper,
//   //boxShadow: theme.shadows[3]
// }));

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, mdUp, toggleForceMdUp, lgUp, doToggleDarkMode, ...other } = props;
  const [showUserDropdown,setShowUserDropdown] = useState(false)
  const history = useHistory();

  return (
    <>
      <AppBar
     
        sx={{
          backgroundColor: 'background.default',
          // left: {
          //   lg: 280
          // },
          width: {
            lg: '100%'
          },
          height: 56
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 56,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
          onClick={mdUp || lgUp ? toggleForceMdUp : onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                //lg: 'none'
                '&:focus': {
                  outline: 'none',
                }
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          
            <Box sx={{display:"flex",alignItems:"center"}}>
            <Button onClick={() => history.push("/")} sx={{
                display: {
                  //xs: 'inline-flex',
                  left: 15,
                  //lg: 'none'
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:hover': {
                    background: 'none',
                  },
                }
              }}>
              <img src="usace-inventory.png" alt="image" style={{height: "36px"}} />
            </Button>
            </Box>
          
          {/* <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          <Box sx={{ flexGrow: 1 }} />
          {/* <Tooltip title={theme.palette.mode == "dark" ? "Enable Light Mode" : "Enable Dark Mode"}>
            <IconButton sx={{ mr: 1,
            '&:focus': {
                  outline: 'none',
                }}} onClick={()=>doToggleDarkMode()}>
                {theme.palette.mode == "dark" ? <Brightness7Icon title="Enable Light Mode" fontSize="small" /> : <Brightness4Icon title="Enable Dark Mode" fontSize="small"/>}

            </IconButton>
          </Tooltip> */}
            {/* <Tooltip title="Notifications">
            <IconButton  aria-label={notificationsLabel(100)}
            //onClick={()=>setShowUserDropdown(prevState => !prevState)} 
            sx={{ height:40, width:40, mr: 1.5,
            '&:focus': {
                  outline: 'none',
                } }}>
            <Badge badgeContent={100} color="secondary">
              <NotificationsIcon fontSize="small" sx={{height:24, width:24}}/>
            </Badge>
            </IconButton>
          </Tooltip> */}
          <Tooltip title="User">
            <Button onClick={()=>setShowUserDropdown(prevState => !prevState)} sx={{ height:40, width:40, mr: 1,
            '&:focus': {
                  outline: 'none',
                } }}>
              <UsersIcon color="action" fontSize="small" sx={{height:24, width:24}}/>
              <ArrowDropDownIcon color="action"/>
            </Button>
          </Tooltip>


          {/* {userIsLoggedIn && (
					<Grid item sx={{display:"flex",justifyContent:"flex-end",zIndex:"2",position:"relative",gap:'10px',alignItems:'center'}} >
						<Button title={`${mode_options[theme.palette.mode]} Mode`} onClick={()=>doToggleDarkMode()} style={{outline:'0'}}>
						{theme.palette.mode == "dark" ? <Brightness7Icon  style={{color:'rgb(100,100,100)',height:'20px',width:'20px'}}/> : <Brightness4Icon title="Enable Dark Mode" style={{color:'rgb(100,100,100)',height:'20px',width:'20px'}}/>}
						</Button>
						<Button title="User Information" onClick={()=>setShowUserDropdown(true)} style={{border:'0px',outline:'0'}} >
							<AccountCircle style={{color:'rgb(100,100,100)',fontSize:'20px'}} />
							<ArrowDropDownIcon style={{color:'rgb(100,100,100)',fontSize:'20px'}}/>
						</Button>
					</Grid>
				)} */}


          {/* <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> */}
        </Toolbar>
      </AppBar>
      {showUserDropdown && <UserDropdown showUserDropdown={showUserDropdown} showUserDropdown={showUserDropdown} setShowUserDropdown={setShowUserDropdown}/>}
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};

// export default connect(
// 	'selectUser',
// 	'selectUserAccess',
// 	'selectUserIsLoggedIn',
// 	'doLogout',
// 	'selectUserDarkMode',
// 	'doToggleDarkMode',
// 	DashboardNavbar);