//MUI-V5-COMPLETE.
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography,Button,TextField,IconButton } from '@mui/material'
import {LoadingButton} from '@mui/lab';
import React, {useState} from 'react'
import {Close as CloseIcon, Save as SaveIcon} from '@mui/icons-material';
import {notificationsUpdateRegisteredUserApi} from '../publics/actions/registered-users-api'
import {Switch, FormGroup, FormControlLabel} from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { connect } from 'redux-bundler-react';

const buttonClasses = {
    fab: {
      margin: 2,
    },
    absolute: {
      position: 'absolute',
      //top: theme.spacing(2),
      right: 3,
      //right: '0',
      //marginTop:'10px'
    },
    fabGreen: {
      color: "common.white",
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
      //height:'50px',
      width:'20%',
      //marginTop: '50px',
      //marginBottom:'50px'
    },
    fabGrey: {
      color: "common.white",
      backgroundColor: grey[500],
      '&:hover': {
        backgroundColor: grey[600],
      },
      //height:'50px',
      width:'20%',
      //marginTop: '50px',
      //marginBottom:'50px'
    },
  }

const NotificationsPopup = ({title,openPopup,setOpenPopup,setSnackBar, userToken}) => {

    const [notificationsActive, setNotificationsActive] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("notifications");
        const initialValue = JSON.parse(saved);
        return initialValue || false;
    });
    const [submitButton, setSubmitButton] = React.useState({
        active:false,
        send:false,
      });

    //const plusButtonClasses = plusButtonStyles();

    const toggleSwitch = (event) => {
        setNotificationsActive(prev => !prev)
    };

    const handleChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
    }

    const handleSubmit = async () => {
        setSubmitButton({...submitButton, send: true})

        await notificationsUpdateRegisteredUserApi(notificationsActive, userToken).then((response) => response.data).then((data) => {
            const {error} = data

            if(!error){
                localStorage.setItem("notifications", notificationsActive)
                setSubmitButton({...submitButton, send: false, active: false})
                setOpenPopup(false)
                setSnackBar({open:true,message:data.message,severity:'success'})
            }else{
                setSubmitButton({...submitButton, send: false, active: false})
                setSnackBar({open:true,message:data.message,severity:'error'})
            }

            
        }).catch(function (error) {
            setSubmitButton({...submitButton, send: false, active: false})
            setSnackBar({open:true,message:"Error Updating Notifications!",severity:'error'})
        });
    }

    React.useEffect(() => {
        const saved = localStorage.getItem("notifications");
        const initialValue = JSON.parse(saved);

        setSubmitButton({...submitButton, active: notificationsActive != initialValue}) 
    }, [notificationsActive]);
    
    return(
        <Dialog open={openPopup} fullWidth maxWidth="xs">
            <DialogTitle>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1,alignSelf:'center',textTransform:'uppercase',fontSize:'1rem'}}>{title}</Typography>
                    <IconButton
          onClick={()=>setOpenPopup(false)}
            sx={{
                alignSelf:'center',
              display: {
                //xs: 'inline-flex',
                //lg: 'none'
                '&:focus': {
                  outline: 'none',
                }
              }
            }}
          >
            <CloseIcon/>
          </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <FormGroup style={{width:'100%'}} name="problemForm" onChange={(e)=>handleChange(e)}>
                    <FormControlLabel
                        control={<Switch color="primary" checked={notificationsActive} onChange={toggleSwitch} />}
                        label={notificationsActive ? "ON" : "OFF"}
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <LoadingButton startIcon={<SaveIcon />} loadingPosition="start" onClick={handleSubmit} sx={ submitButton.active ? buttonClasses.fabGreen : buttonClasses.fabGrey} {...((!submitButton.active || submitButton.send) && {disabled:true})} {...((submitButton.send) && {loading:true})}> 
                Save
                </LoadingButton>
            </DialogActions>  
        </Dialog>
    )
}

export default connect(
    'selectUserToken',
    NotificationsPopup);