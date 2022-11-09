//MUI-V5-COMPLETE.
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography,Button,TextField,IconButton } from '@mui/material'
import {LoadingButton} from '@mui/lab';
import React, {useState} from 'react'
import {Close as CloseIcon, Send as SendIcon} from '@mui/icons-material';
import { blue, grey, green } from '@mui/material/colors';
import {addProblemReportApi} from '../publics/actions/problem-report'

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
    fabBlue: {
        //color: "common.white",
        // backgroundColor: blue[500],
        // '&:hover': {
        //   backgroundColor: blue[600],
        // },
        //height:'50px',
        width:'20%',
        //marginTop: '50px',
        //marginBottom:'50px'
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

const ProblemReportPopup = ({title,openPopup,setOpenPopup,setSnackBar}) => {

    const[message,setMessage] = useState({message:'',error:''});
    const[screenshot,setScreenshot] = useState({name:'',type:'',size:'',error:''});
    const [submitButton, setSubmitButton] = React.useState({
        active:false,
        send:false,
      });

    const handleChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');

        if(fieldName === 'message'){
            const value = event.target.value;
            validateMessage(value)
        }

        if(fieldName === 'screenshot'){
            const file = event.target.files[0];
            validateScreenshot(file)
        }
    }

    const validateMessage = (value) =>{

        const newMessage = {...message}
        newMessage.message = value;

        if(value.trim() === ''){
            newMessage.error = true
            setMessage(newMessage)
            return false
        }
        else{
            newMessage.error = false
            setMessage(newMessage)
            return true
        }
        
    }

    const validateScreenshot = (file) => {

        const newScreenshot = {...screenshot}

        if(typeof file !== 'undefined'){
            if(file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg" && file.type !== "image/gif"){
                newScreenshot.error = 'Invalid image type (jpg/jpeg/png/gif only)'
            }else if(file.size > 10000000) {
                newScreenshot.error = 'Image is too large (10mb limit)'
            }else{
                newScreenshot.name = file.name;
                newScreenshot.type = file.type;
                newScreenshot.size = file.size;
                newScreenshot.error = '';
            }
        } else{
            newScreenshot.name = '';
            newScreenshot.type = '';
            newScreenshot.size = '';
            newScreenshot.error = '';
        }

        setScreenshot(newScreenshot)
    }

    const handleRemoveScreenshot = () => {
        setScreenshot({name:'',type:'',size:'',error:''})
    }

    const handleSubmit = () => {
        // Only submit message for now (add screenshot functionality at future time)
        if(validateMessage(message.message))
        {
            const newProblem = {message: message.message}

            handleAdd(newProblem);
        }

    }

    const handleAdd = async (newProblem) => {
        //setLoading(true)

        let result = {}
        
        setSubmitButton({...submitButton, send: true})
        await addProblemReportApi({newData: newProblem}).then((response) => response.data).then((data) => {
            result = data
        }).catch(function (error) {
            result = {status:400,error:true,message:error.message}
        });
        
        if(!result.error){
            setOpenPopup(false)
            setSnackBar({open:true,message:result.message,severity:'success'})
            setMessage({message:'',error:''})
            setScreenshot({name:'',type:'',size:'',error:''})
            setSubmitButton({...submitButton, send: false, active: false})
        } else {
            setSnackBar({open:true,message:result.message,severity:'error'})
            setSubmitButton({...submitButton, send: false})
        }

    }

    React.useEffect(() => {
        if(message.message.length > 5){
            setSubmitButton({...submitButton, active: true}) 
        }else{
            setSubmitButton({...submitButton, active: false}) 
        }
        
    }, [message]);

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
            <form style={{width:'100%'}} name="problemForm" onChange={(e)=>handleChange(e)}>
                    
                    <TextField error={message.error} {...((message.error) && {helperText:"A message is required."})} multiline label="Description" value={message.message} rows={6} maxRows={6} variant="outlined" fullWidth required size="small" name="message" ></TextField>
                    <div style={{fontSize:'0.6rem',color:'red',height:'25px', display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    {/* {message.error} */}
                    </div>
                    {/* <div style={{display:'flex'}}>
                        <div style={{height:'20px',fontSize:'0.75rem',fontWeight:'bold',marginBottom:'5px',display:'flex',flexDirection:'column',justifyContent:'center'}}>Screenshot</div>
                        <div style={{height:'20px',fontSize:'0.6rem',alignSelf:'flex-end',marginBottom:'1px'}}>&nbsp;(optional)</div>
                    </div> */}


                    {/* {screenshot.name === '' ? (
                    <div style={{display:'flex'}}>
                        <div>
                        <Button variant="outlined" color="primary" component="label" size="small" >
                            <AttachFileIcon style={{fontSize:'0.85rem',marginBottom:'1px'}}/>
                            &nbsp;Attach
                            <input accept="image/*" type="file" name="screenshot" hidden />
                        </Button>
                        </div>
                        <div style={{fontSize:'0.6rem',color:'red',display:'flex',flexDirection:'column',justifyContent:'center',marginLeft:'5px'}}>
                        {screenshot.error}
                        </div>      
                    </div>
                    ) : (
                        <div>
                            {screenshot.name}&nbsp;
                            ({screenshot.size} bytes)&nbsp;&nbsp;
                            <Button variant="outlined" color="secondary" component="label" size="small" onClick={handleRemoveScreenshot} style={{fontSize:'0.5rem',height:'20px',width:'50px'}} >
                            <CloseIcon style={{fontSize:'0.85rem',marginBottom:'1px'}}/>
                            &nbsp;Remove
                            
                        </Button>
                        </div>)

                    } */}
                </form> 
            </DialogContent>
            <DialogActions>
                {/* <Button variant='contained' color="primary" size="small" onClick={(e)=>handleSubmit(e)}>Send</Button> */}

                <LoadingButton variant="contained" endIcon={<SendIcon />} loadingPosition="end" size="small" onClick={handleSubmit} sx={ submitButton.active ? buttonClasses.fabBlue : buttonClasses.fabGrey} {...((!submitButton.active || submitButton.send) && {disabled:true})} {...((submitButton.send) && {loading:true})}> 
                Send
                </LoadingButton>
            </DialogActions>
            
        </Dialog>
    )
}

export default ProblemReportPopup