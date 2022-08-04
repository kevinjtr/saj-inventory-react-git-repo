import { Dialog, Button, CircularProgress } from "@material-ui/core";
import React, {useState,useEffect} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { addEmployee2Api } from '../../../publics/actions/employee-api';
import { addHraApi } from '../../../publics/actions/hra-api';
import { addRegisteredUserApi } from "../../../publics/actions/registered-users-api";
import { destroyRegistrationApi } from '../../../publics/actions/register-api';
import { connect } from 'redux-bundler-react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { LoadingCircle } from "../../tools/tools";


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
