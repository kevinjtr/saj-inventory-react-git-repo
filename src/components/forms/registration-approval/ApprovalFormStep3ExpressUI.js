import { Dialog, Button, CircularProgress } from "@material-ui/core";
import React, {useEffect} from "react";
import { connect } from 'redux-bundler-react';

const ApprovalFormStep3ExpressUI = (props) => {

    const {
        userToken,
        setStep,
        employeeRow,
        hraRow,
        registeredUserRow,
        registrationRow,
        setOpenPopup,
        matchingHRA,
        setRegisteredUserRow,
        setHraRow,
        setEmployeeRow,
        resetRegistrations,
        loading,
        handleExecute,
        addRegisteredUserStatus,
        addEmployeeStatus,
        deleteRegistrationStatus,
        setLoading
    } = props

    useEffect(async ()=>{
        handleExecute()
    },[]);

    return(
        <>
            {loading ? (
            <div style={{display:'flex',padding:'1em'}}>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    <CircularProgress size={20} />
                </div>
                <div style={{paddingLeft:'1em',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                {addEmployeeStatus === 'Executing' && 'Adding employee...'}
                {addRegisteredUserStatus === 'Executing' && 'Adding registered user...'}
                {deleteRegistrationStatus === 'Executing' && 'Finalizing...'}
                </div>
            </div>):(
            <>
            <div style={{display:'flex',flexDirection:'column',padding:'1em'}}>
                <div style={{paddingLeft:'1em',display:'flex',flexDirection:'column', fontSize:'16px',justifyContent:'center',paddingBottom:'1em'}}>
                Employee has been granted regular user access.
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Button variant='contained' size='small' color='primary' onClick={()=>{setOpenPopup(false)}}>Ok</Button>
                </div>
            </div>
            </>
            )
            }
        </>
    )
}

export default connect(
    'selectUserToken',
    ApprovalFormStep3ExpressUI);
