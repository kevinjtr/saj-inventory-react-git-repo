import React, { useState, useEffect } from 'react'
import Signup from '../components/Signup'
import "../components/styles/SignInStyles.css";
import PersonIcon from '@mui/icons-material/Person';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'redux-bundler-react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import {alertStyles} from '../components/styles/material-ui'
import Alert from '@material-ui/lab/Alert';
//import {getAllMessagesApi} from '../publics/actions/updates-maintenance-messages-api'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import CodeIcon from '@material-ui/icons/Code';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WarningIcon from '@material-ui/icons/Warning';
import NiceSlideShow from "./NiceSlideShow";
import { amber } from '@material-ui/core/colors';

const alertNavBarStyles = makeStyles((theme) => ({
    fabGreen: {
      
      },
  }));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    width: '100%',
    maxWidth: 360,
    background: 'rgb(245, 245, 245)',
    borderRadius: '25px'
    //backgroundColor: theme.palette.background.paper,
  },
  listHeader: {
    width: '100%',
    maxWidth: 360,
    background: 'rgb(245, 245, 245)',
    borderRadius: '25px 25px 0px 0px'
    //backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    flexGrow: 1,
    //color: theme.palette.common.white,
      backgroundColor: '#e57373',
      borderRadius: '5px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

//const SignInOut = ({doLogin, userIsLoggedIn, history, userIsLoggingIn, userLoginFailure, userLoginMessage}) =>{
function SignInOut  ({doLogin, userIsLoggedIn, history, userIsLoggingIn, userLoginFailure, userLoginMessage})  {
    const [selectedTab, setSelectedTab] = useState(1); // 1 = show sign in buttons, 2 = show new account form
    const [registrationResult, setRegistrationResult] = useState(false)
    const [loading,setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [maintenance, setMaintenance] = useState("")
    //const [isSubmitting,setIsSubmitting] = useState(false)

    //Styling
    const alertClass = alertStyles();
    const classes = useStyles();

    const handleLoading = () => {
        setLoading(true);
    }

    // Return to signin buttons and set registration result
    const hideNewAccountForm = (result) => {
        setRegistrationResult([result])
        setSelectedTab(1)
        setLoading(false)
    }

    const handleNewAccountClick = () => {
        setRegistrationResult(false)
        setSelectedTab(2)
    }

    const onSmartcardButtonSubmit = async (e) => {
        //setIsSubmitting(true)
        e.preventDefault()
        doLogin()

        //setTimeout(() => {setIsSubmitting(false) }, 10000)
        
        // .then(()=>{

  
        // }).error(()=>{
        //     props.setSubmitting(false)
        // })
    }

    //  const GetMaintenanceMessages = async() => {
    //     await getAllMessagesApi().then((response) => response.data).then((data) => {
    //         console.log(data)
    //         const messages_to_update = data.data.map(m => <li>{m}</li>)
    //         setMessages(messages_to_update)
    //     })
    // }

    //Effects
    React.useEffect(() => {
        fetch("./messages.json")
        .then((res) => res.json())
        .then((data) => {
            const li_items = data.comingsoon.map(msg => 
                <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <CodeIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={msg} />
        </ListItem>
        )
            setMessages(li_items)

            if(data.maintenance){
                setMaintenance(data.maintenance)
            }
        });

        

    }, []);//will run once.

    return (
        <div>
                <img style={{height:'40%',width:'40%',position:'absolute',right:10,bottom:'10%'}}src={"inv-2.svg"} />
                {messages.length > 0 ? (
          <div className='updates-maintenance-message-container' style={{display:'flex',left:'5',bottom:'15%',position:'absolute'}}>
            <List className={classes.list} 
            subheader={<ListSubheader className={classes.listHeader} style={{fontSize:'28px'}} component="div" id="nested-list-subheader">Coming Soon</ListSubheader>}>
            {messages}
            </List>
            </div>
          ) : null}
                {maintenance ? (
                    <AppBar className={classes.appbar} position="static">
                    <Toolbar>
                    <WarningIcon edge="start" className={classes.menuButton} color="inherit" aria-label="menu"/>
                      <Typography variant="h6" className={classes.title}>
                      {maintenance}
                      </Typography>
                    </Toolbar>
                  </AppBar>
                ) : null}
            <div className='signin-page-container' style={{display:'flex',justifyContent:'center'}}>
                {userLoginFailure ? <div className={alertClass.root}>
                                        <Alert variant="outlined" severity="error">
                                            {`Login Failed${userLoginMessage ? ` - ${userLoginMessage}` : ""}`}
                                        </Alert>
                                    </div> : null}
                {registrationResult && <RegistrationMessage registrationResult={registrationResult} />}
                {/* <NiceSlideShow style={{position:'absolute',width:'25%'}}/> */}
                <div className="signin-box">
                    {loading && <div className="login-panel-disabled"><div className="login-panel-loading"><CircularProgress size={20} color={'white'} /> &nbsp;&nbsp; Please wait...</div></div>}
   
                    <div className='signin-box-logo'><img src="usace-inventory.png" alt="image" style={{ height: "75px"}} /></div>
                    {selectedTab === 1 &&
                    <div className="signin-buttons-container">

                        <div style={{fontWeight:'bold',marginBottom:'5px',marginTop:'20px'}}>Sign In</div>

                        <div className="login-cac-button-container">
                            <Button onClick={onSmartcardButtonSubmit} className="login-cac-button" type='submit' color='primary' variant="contained" disabled={userIsLoggingIn} fullWidth>
                                <div className='login-cac-button-icon-container' style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                                    <div className="cac-icon-outline" style={userIsLoggingIn ? {border:'2px solid rgba(255,255,255,0.2)'}:{}}>
                                        <PersonIcon style={{fontSize:'14px'}}/>
                                            <div style={{width:'18px',height:'13px',display:'flex',justifyContent:'space-between',alignSelf:'center'}}>
                                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}><div className='cac-icon-element-1' style={userIsLoggingIn ? {backgroundColor:'rgba(255,255,255,0.2)'}:{}}></div><div className='cac-icon-element-2' style={userIsLoggingIn ? {backgroundColor:'rgba(255,255,255,0.2)'}:{}}></div></div>
                                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}><div className='cac-icon-element-2' style={userIsLoggingIn ? {backgroundColor:'rgba(255,255,255,0.2)'}:{}}></div><div className='cac-icon-element-1' style={userIsLoggingIn ? {backgroundColor:'rgba(255,255,255,0.2)'}:{}}></div></div>
                                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}><div className='cac-icon-element-1' style={userIsLoggingIn ? {backgroundColor:'rgba(255,255,255,0.2)'}:{}}></div><div className='cac-icon-element-2' style={userIsLoggingIn ? {backgroundColor:'rgba(255,255,255,0.2)'}:{}}></div></div>
                                            </div>
                                        </div>
                                </div>
                            <div className='login-cac-button-text-container'>
                                {userIsLoggingIn ? (
                                    <div className='login-cac-button-text-row1'>Loading</div>
                                        ) : (
                                        <>
                                    <div className='login-cac-button-text-row1'>Smart Card</div>
                                    <div className='login-cac-button-text-row2'>Access</div>
                                        </>
                                    )}
                                </div>
                            </Button>
                        </div>
                                                    
                        {/* <div style={{fontWeight:'bold',marginBottom:'5px',marginTop:'20px'}}>New User</div>
                        <div className="login-register-button" onClick={handleNewAccountClick}>Create New Account</div> */}
                    </div>   
                    }

                    {selectedTab === 2 && 
                        <Signup hideNewAccountForm={hideNewAccountForm} handleLoading={handleLoading} setSelectedTab={setSelectedTab}/>
                    }
                </div>
            </div>
         <br/>
         <br/>
     </div>
    )
}


   // Message to be returned after a user submits registration form
   const RegistrationMessage = ({registrationResult}) =>{

    let message = ""

    if(typeof(registrationResult[0].message) === 'string'){
        message = registrationResult[0].message
    }

    if(typeof(registrationResult[0].message) === 'object'){
        const keys = Object.keys(registrationResult[0].message)

        message = "Your registration request has been submitted and is now pending approval."
        
        keys.forEach((key, index) => {
            if(registrationResult[0].message[key] === 'HRA user rights granted'){
                message = "Your registration request has been approved and you may now log in using CAC authentication."
            }
        })
    }
     
    return(
            <div className="new-account-message">
                <div style={{fontSize:'0.65rem',fontWeight:'bold'}}>{message}</div>
            </div>
    )
    
}

export default connect(
    'selectUserIsLoggedIn',
    'doLogin',
    'doFetchLogin',
    'selectUserIsLoggingIn',
    'selectUserLoginFailure',
    'selectUserLoginMessage',
	SignInOut);