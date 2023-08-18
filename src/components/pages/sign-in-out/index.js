import React, { useState, useEffect } from 'react'
import Signup from './Signup'
import "../../../components/styles/SignInStyles.css";
import PersonIcon from '@mui/icons-material/Person';
import { CircularProgress } from '@mui/material/';
import { connect } from 'redux-bundler-react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material/'
import Alert from '@mui/lab/Alert';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CodeIcon from '@mui/icons-material/Code';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import WarningIcon from '@mui/icons-material/Warning';
import { blue } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.common.white,
    backgroundColor: blue[900],
    '&:hover': {
      backgroundColor: blue[800],
    },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: '#e57373',
    borderRadius: '5px'
}));

const StyledWarningIcon = styled(WarningIcon)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
}));

//const SignInOut = ({doLogin, userIsLoggedIn, history, userIsLoggingIn, userLoginFailure, userLoginMessage}) =>{
function SignInOut  ({doLogin, userIsLoggedIn, history, userIsLoggingIn, userLoginFailure, userLoginMessage})  {
    const [selectedTab, setSelectedTab] = useState(1); // 1 = show sign in buttons, 2 = show new account form
    const [registrationResult, setRegistrationResult] = useState(false)
    const [loading,setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [maintenance, setMaintenance] = useState("")
    //const [isSubmitting,setIsSubmitting] = useState(false)

    const handleLoading = () => {
        setLoading(true);
    }

    // Return to signin buttons and set registration result
    const hideNewAccountForm = (result) => {

        setRegistrationResult([result])
        setLoading(false)

        if(!result.error){
            setSelectedTab(1)
        }

        //console.log(result)
        // setRegistrationResult([result])
        
        // setLoading(false)
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
                {/* <img style={{height:'40%',width:'40%',position:'absolute',right:10,bottom:'10%'}}src={"inv-2.svg"} />
                {messages.length > 0 ? (
          <div className='updates-maintenance-message-container' style={{display:'flex',bottom:'15%',position:'absolute'}}>
            <List className={classes.list} 
            subheader={<ListSubheader className={classes.listHeader} style={{fontSize:'28px'}} component="div" id="nested-list-subheader">Coming Soon</ListSubheader>}>
            {messages}
            </List>
            </div>
          ) : null} */}
                {maintenance ? (
                    <StyledAppBar position="static">
                    <Toolbar>
                    <StyledWarningIcon edge="start" color="inherit" aria-label="menu"/>
                      <StyledTypography variant="h6">
                      {maintenance}
                      </StyledTypography>
                    </Toolbar>
                  </StyledAppBar>
                ) : null}
            <div className='signin-page-container' style={{display:'flex',justifyContent:'center'}}>
                {userLoginFailure ? <div styles={{ width: '100%', marginTop: 2 }}>
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
                        {/* .login-register-button {
  text-align: center;
  padding: 10px;
  align-self: center;
  color: rgb(226, 226, 226);
  height: 35px;
  width: 200px;
  border-radius: 5px;
  line-height: normal;
  text-transform: uppercase;
  font-size: 11px;
  cursor: pointer;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.5),
    0px -1px 0px rgba(0, 0, 0, 0.7);
  background-image: linear-gradient(rgb(18, 63, 129), rgb(0, 31, 77));
}

.login-register-button:hover {
  background-image: linear-gradient(rgb(18, 63, 129), rgb(18, 63, 129));
}

.login-register-button:active {
  background-image: linear-gradient(rgb(0, 31, 77), rgb(0, 31, 77));
} */}


                        <div style={{fontWeight:'bold',marginBottom:'5px',marginTop:'20px'}}>New User</div>
                        <StyledButton onClick={handleNewAccountClick}>Create New Account</StyledButton>
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
            <div className="new-account-message" style={{display:'flex',alignItems: "center"}}>
                {!registrationResult[0].error ? <CheckCircleOutlineIcon style={{color: "#00e676"}}/> : <ErrorOutlineIcon style={{color: "#ff1744"}}/>}
                <div style={{paddingLeft:'5px',fontSize:'0.75rem',fontWeight:'bold'}}>{message}</div>
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