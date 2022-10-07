import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, Button, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
//import SearchIcon from '@mui/icons-material/Search';
//import { Bell as BellIcon } from '../icons/bell';
//import { UserCircle as UserCircleIcon } from '../icons/user-circle';
//import { Users as UsersIcon } from '../icons/users';
import UsersIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useTheme } from '@mui/material/styles'
import UserDropdown from '../header/UserDropdown';
//import { connect } from 'redux-bundler-react';

// const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
//   enableColorOnDark,
//   backgroundColor: theme.palette.background.paper,
//   //boxShadow: theme.shadows[3]
// }));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, mdUp, toggleForceMdUp, lgUp, doToggleDarkMode, ...other } = props;
  const [showUserDropdown,setShowUserDropdown] = useState(false)
  const theme = useTheme();

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
            px: 2
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
          <Button
          sx={{
            display: {
              xs: 'inline-flex',
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
              <img src="usace-inventory.png" alt="image" style={{height: "40px"}} />
            </Button>
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

          <Tooltip title="User">
            <IconButton sx={{ ml: 1, mr: 1,
            '&:focus': {
                  outline: 'none',
                } }}>
              <UsersIcon fontSize="small" onClick={()=>setShowUserDropdown(prevState => !prevState)}/>
            </IconButton>
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
      {showUserDropdown && <UserDropdown setShowUserDropdown={setShowUserDropdown}/>}
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