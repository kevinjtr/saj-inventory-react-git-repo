import React, { useState, useEffect } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import OutlinedFlagSharpIcon from '@mui/icons-material/OutlinedFlagSharp';
import "../components/styles/SignInStyles.css";
import ReportProblem from '../components/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import { CircularProgress } from '@material-ui/core';
import CheckIcon from '@mui/icons-material/Check';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { connect } from 'redux-bundler-react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import {alertStyles} from '../components/styles/material-ui'
import Alert from '@material-ui/lab/Alert';

const SignInOut = ({doLogin, userIsLoggedIn, history, userIsLoggingIn, userLoginFailure, userLoginMessage}) => {

    const [selectedTab, setSelectedTab] = useState(1); // 1 = show sign in buttons, 2 = show new account form
    const [registrationResult, setRegistrationResult] = useState(false)

    const [loading,setLoading] = useState(false)

    //const [isSubmitting,setIsSubmitting] = useState(false)

    //Styling
    const alertClass = alertStyles();

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
    
    return (
        <div className='signin-page-container' style={{display:'flex',justifyContent:'center'}}>
            {userLoginFailure ? <div className={alertClass.root}>
                                    <Alert variant="outlined" severity="error">
                                        {`Login Failed${userLoginMessage ? ` - ${userLoginMessage}` : ""}`}
                                    </Alert>
                                </div> : null}
            {registrationResult && <RegistrationMessage registrationResult={registrationResult} />}
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
                                                
                    <div style={{fontWeight:'bold',marginBottom:'5px',marginTop:'20px'}}>New User</div>

                    <div className="login-register-button" onClick={handleNewAccountClick}>Create New Account</div>
                </div>   
                }

                {selectedTab === 2 && 
                    <Signup hideNewAccountForm={hideNewAccountForm} handleLoading={handleLoading} setSelectedTab={setSelectedTab}/>
                }
            </div>
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