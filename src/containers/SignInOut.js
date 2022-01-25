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

const SignInOut = ({doLogin, userIsLoggedIn, history, userIsLoggingIn, userLoginFailure}) => {

    // State for the configuration of tabs
    const [selectedTab, setSelectedTab] = useState(0); // 0 = no tabs, 1 = tabs with sign in tab selected, 2 = tabs with new account tab selected
    const [registrationResult, setRegistrationResult] = useState(false)

    // State of the report problem form
    const [showProblemForm, setShowProblemForm] = useState(0); // 0 = hide form, 1 = show form, 2 = hide form and show success message
    const [problems, setProblems] = useState([]);

    // Temporary Authentication from Local Storage
    const [localUser, setLocalUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem("LocalUser"))
        return storedUser || { firstName: '', lastName: '', level: '' }
    })

    const [loading,setLoading] = useState(false)

    //const [isSubmitting,setIsSubmitting] = useState(false)

    //Styling
    const alertClass = alertStyles();

    const handleLoading = () => {
        setLoading(true);
    }

    // Temporary action for sign-in, write user to local storage
    const handleSignInClick = () => {
        localStorage.setItem('LocalUser', JSON.stringify({ firstName: 'Jon', lastName: 'Freed', level: 'admin', time: new Date() }))
        window.location.reload();
    }

    const hideProblemForm = (status) => {
        if (status === 'success') {
            setShowProblemForm(2)
            setTimeout(() => { setShowProblemForm(0) }, 3000)
        }
        else
            setShowProblemForm(0)
    }

    // Hide tabs and display account creation success message
    const hideNewAccountForm = (result) => {
        setRegistrationResult([result])
        
        setSelectedTab(0)
        setLoading(false)
    }

    const handleAddProblem = (newProblem) => {
        const newProblems = [...problems, newProblem]
        setProblems(newProblems)
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



    // const handleButtonClick = (e) => {
    //     e.preventDefault()
    // }
    

    // Since problems state is updated asynchronously, apply useEffect to set local storage
    useEffect(() => { localStorage.setItem('Problems', JSON.stringify(problems)) }, [problems])

    return (
        <div className='page-container' style={{display:'flex',justifyContent:'center'}}>
        <div className="login-container">
       {userLoginFailure ? <div className={alertClass.root}>
            <Alert variant="outlined" severity="error">
                Login Failed
            </Alert>
        </div> : null}
            <div className="login-right-column">
                <div className="login-panel">

                    {loading && <div className="login-panel-disabled"><div className="login-panel-loading"><CircularProgress size={20} color={'white'} /> &nbsp;&nbsp; Creating account...</div></div>}

                    {registrationResult && <RegistrationMessage registrationResult={registrationResult} />}
                    
                    {selectedTab > 0 && 
                            <div className="login-tabs-container">
                                <div className={selectedTab === 1 ? "login-tabs-login-selected" : "login-tabs-login"} onClick={() => setSelectedTab(1)}>Sign in </div>
                                <div className={selectedTab === 2 ? "login-tabs-register-selected" : "login-tabs-register"} onClick={() => setSelectedTab(2)}>New Account </div>
                            </div>
                    }

                    {selectedTab <= 1 &&
                        <>
                        {/* Check if user is logged in */}
                        {/* {localUser.level === '' ? ( */}
                            <div className="login-buttons-container">
                            
                                {selectedTab === 0 && <div className="login-title">Sign in</div>}

                                {/* Smart Card Button */}

                                                {/* <Formik onSubmit={onSmartcardButtonSubmit}>
                                                    { */}
                                                        <div className="login-cac-button-container">
                                                            <Button onClick={onSmartcardButtonSubmit} className="login-cac-button" type='submit' color='primary' variant="contained" disabled={userIsLoggingIn} fullWidth>
                                                            <div className='login-cac-button-icon-container' style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                                                                <div style={{height:'34px',width:'26px',border:'2px solid white',borderRadius:'3px',alignSelf:'center',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                                                    <PersonIcon style={{fontSize:'14px'}}/>
                                                                    <div style={{width:'18px',height:'13px',display:'flex',justifyContent:'space-between',alignSelf:'center'}}>
                                                                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}><div style={{height:'4px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div><div style={{height:'7px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div></div>
                                                                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}><div style={{height:'7px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div><div style={{height:'4px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div></div>
                                                                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}><div style={{height:'4px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div><div style={{height:'7px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div></div>
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
                                                    {/* }
                                                </Formik> */}
                                {/* <div className="login-cac-button" onClick={handleSignInClick}>
                                    <div className='login-cac-button-icon-container' style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                                        <div style={{height:'34px',width:'26px',border:'2px solid white',borderRadius:'3px',alignSelf:'center',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                            <PersonIcon style={{fontSize:'14px'}}/>
                                            <div style={{width:'18px',height:'13px',display:'flex',justifyContent:'space-between',alignSelf:'center'}}>
                                                <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}><div style={{height:'4px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div><div style={{height:'7px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div></div>
                                                <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}><div style={{height:'7px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div><div style={{height:'4px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div></div>
                                                <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}><div style={{height:'4px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div><div style={{height:'7px',width:'4px',backgroundColor:'white',borderRadius:'1px'}}></div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='login-cac-button-text-container'>
                                        <div className='login-cac-button-text-row1'>Smart Card</div>
                                        <div className='login-cac-button-text-row2'>Access</div>
                                    </div>
                                </div> */}

                                {/* New Account Button */}
                                <div className="login-register-button" onClick={handleNewAccountClick}>New Account</div>

                                {/* Report Problem Link */}
                                {showProblemForm === 0 && <div className="report-problem-button"><span className="report-problem-button-span" onClick={() => setShowProblemForm(1)}><OutlinedFlagSharpIcon className="report-problem-button-icon" /> Trouble signing in?</span></div>}

                                {/* Report Problem Form */}
                                {showProblemForm === 1 && <ReportProblem handleAddProblem={handleAddProblem} hideProblemForm={hideProblemForm} />}

                                {/* Report Problem Message */}
                                {showProblemForm === 2 && <><div className="report-problem-button"></div><div style={{textAlign:'center'}}><div className="report-problem-message"><CheckIcon className="report-problem-message-icon" />&nbsp;&nbsp;Problem has been reported</div></div></>}

                            </div>   
                        {/*) 
                        
                         : (     
                            <div className="user-info-container">
                                <table style={{ fontSize: '11px', marginLeft: '25px', marginBottom: '25px' }}>
                                    <thead><th>Local Storage User Info</th></thead>
                                    <tbody>
                                        <tr><td>User Level:</td><td>{localUser.level}</td></tr>
                                        <tr><td>First Name:</td><td>{localUser.firstName}</td></tr>
                                        <tr><td>Last Name:</td><td>{localUser.lastName}</td></tr>
                                        <tr><td>Time of Login:</td><td>{localUser.time}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                        } */}

                        </>
                    }

                    {/*If the new account tab is selected, show the sign up form*/}
                    {selectedTab === 2 && <Signup hideNewAccountForm={hideNewAccountForm} handleLoading={handleLoading}/> }
                </div>
            </div>

            <div className="login-left-column">
                <div className="login-image-panel">
                    <div className="testing-image"><img src="usace-inventory.png" alt="image" style={{ height: "100px", opacity: "0.75" }} /></div>
                </div>
                <div className="login-alert-panel">
                    <div className="login-alert-title">System Info</div>
                    <div className="login-alert-item">System is current and no maintenance is scheduled at this time.</div>
                </div>
            </div>
        </div>
        </div>
    )
}

// Message to be returned after a user submits registration form
const RegistrationMessage = ({registrationResult}) =>{

    // If single message returned
    if(typeof(registrationResult[0].message) === 'string'){
    return(
        <div className="new-account-message">
            <div style={{fontSize:'0.65rem',fontWeight:'bold'}}>{registrationResult[0].message}</div>
            <div style={{fontSize:'0.55rem'}}>{registrationResult[0].error ? 'There is an error' : 'There are no errors'  }</div>
        </div>
    )
    }

    // If multiple messages returned
    if(typeof(registrationResult[0].message) === 'object'){
        return(
            <div className="new-account-message">
                <div style={{fontSize:'0.55rem'}}>Object containing HRAs and messages:</div>
                <div style={{fontSize:'0.65rem',fontWeight:'bold'}}>{JSON.stringify(registrationResult[0].message)}</div>
                <div style={{fontSize:'0.55rem'}}>{registrationResult[0].error ? 'There is an error' : 'There are no errors'  }</div>
            </div>
    )
    }
}

export default connect(
    'selectUserIsLoggedIn',
    'doLogin',
    'doFetchLogin',
    'selectUserIsLoggingIn',
    'selectUserLoginFailure',
	SignInOut);