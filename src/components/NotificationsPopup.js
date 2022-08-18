import { Dialog, DialogActions, DialogContent, DialogTitle, Typography,Button,TextField } from '@material-ui/core'
import React, {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {notificationsUpdateRegisteredUserApi} from '../publics/actions/registered-users-api'
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {getHraFormApi} from '../publics/actions/hra-api'
import { connect } from 'redux-bundler-react';
import AdornedButton from '../containers/AdornedButton'
import { green,grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'

const plusButtonStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      //top: theme.spacing(2),
      right: theme.spacing(3),
      //right: '0',
      //marginTop:'10px'
    },
    fabGreen: {
      color: theme.palette.common.white,
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
      color: theme.palette.common.white,
      backgroundColor: grey[500],
      '&:hover': {
        backgroundColor: grey[600],
      },
      //height:'50px',
      width:'20%',
      //marginTop: '50px',
      //marginBottom:'50px'
    },
  }));

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

    const plusButtonClasses = plusButtonStyles();

    const toggleSwitch = (event) => {
        setNotificationsActive(!notificationsActive)
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
                    <CloseIcon onClick={()=>setOpenPopup(false)} style={{alignSelf:'center',color:'red',cursor:'pointer'}}/>
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
                <AdornedButton onClick={handleSubmit} className={ submitButton.active ? clsx(plusButtonClasses.fabGreen) : clsx(plusButtonClasses.fabGrey)} {...((!submitButton.active || submitButton.send) && {disabled:true})} {...((submitButton.send) && {loading:true})}> 
                Save
                </AdornedButton>
            </DialogActions>  
        </Dialog>
    )
}

export default connect(
    'selectUserToken',
    NotificationsPopup);