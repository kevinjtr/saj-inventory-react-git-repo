import { Dialog, DialogActions, DialogContent, DialogTitle, Typography,Button,TextField, Select } from '@material-ui/core'
import React, {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {updateEquipmentApi} from '../publics/actions/equipment-api' 
import MenuItem from 'material-ui/MenuItem';
//import { Select } from '@material-ui/core';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createTheme } from '@mui/material/styles';
import { Message } from '@mui/icons-material';


const UpdateStatusPopup = ({openPopup,setOpenPopup,setSnackBar, rowData, handleUpdate}) => {

    const[message,setMessage] = useState({text:'',error:''});
    const[status, setStatus] = useState("Still Possess");
    //const {title,openPopup,setOpenPopup,setSnackBar} = props;
  
    const handleChange = (event) => {
        event.preventDefault();
        
        const fieldName = event.target.name;

        if(fieldName === 'status'){
            const value = event.target.value;
            //let newValue = {...status}
           if(value === "Still Possess"){
               setStatus(value)
           }
           else if(value === "Gave Back To HRA Holder"){
                setStatus(value)
            }
            else if(value === "Lost"){
                setStatus(value)
            }
            else if(value === "Stolen"){
                setStatus(value)
            }
            else if(value === "Excessed"){
                setStatus(value)
             }
           else if(value === "Other"){
                setStatus(value)
                if(fieldName === "message"){
                    if(message.text.trim() === ''){
                        message.error = `A message is required`
                        return false
                    }
                }
            }             
        }
    
       
    }

    /* const validateMessage = (value) =>{

        console.log('validating message...')
        let newMessage = {...message}
        //newMessage.text = value;

        if(value.trim() === ''){
            newMessage.error = `A message is required`
            setMessage(newMessage)
            return false
        }
        else{
            newMessage.error = ''
            newMessage.text = 'Other - ' + newMessage.text;
            setMessage(newMessage)
            setStatus(newMessage.text);
            console.log(status)
            return true
        }
        
    } */

    const handleSubmit = async () => {      
        console.log("You've hit the handleSubmit method")
        //rowData.status = status;
        //const current = new Date();
        //const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        //rowData.status_date = date;
        //const updateStatus = {rowData}
        //console.log(updateStatus);

        const new_status = status === "Other" ? `${status} - ${message.text}` : status

        const updateStatus = {changes:{'0':{newData:{...rowData, status: new_status, status_date: new Date() }, oldData:rowData}}}

        const errorFound = await handleUpdate(updateStatus);

        if(!errorFound){
            setOpenPopup(false)

            //setSnackBar({open:true,message:resul,severity:'success'})
            //setMessage({message:'',error:''})
        } else {
            setMessage({...message})
            //setSnackBar({open:true,message:result.message,severity:'error'})
        }
    }


/* React.useEffect(() => {
    console.log(message,status)
}, [message]); */

    return(
        <MuiThemeProvider>
            <Dialog open={openPopup} fullWidth maxWidth="xs">
                <DialogTitle>
                    <div style={{display:'flex'}}>
                        <Typography variant="h6" component="div" style={{flexGrow:1,alignSelf:'center',textTransform:'uppercase',fontSize:'1rem'}}>update equipment status</Typography>
                        <CloseIcon onClick={()=>setOpenPopup(false)} style={{alignSelf:'center',color:'red',cursor:'pointer'}}/>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                <form style={{width:'100%'}} name="updateForm" onChange={(e)=>handleChange(e)}>
                <Select
                    name="status"
                    id="status"
                    value={status}
                    required
                    label="Status"
                    onChange={handleChange}
                >
                    <MenuItem defaultValue value={"Still Possess"}>Still Possess</MenuItem>
                    <MenuItem value={"Gave Back To HRA Holder"}>Gave Back To HRA Holder</MenuItem>
                    <MenuItem value={"Lost"}>Lost</MenuItem>
                    <MenuItem value={"Stolen"}>Stolen</MenuItem>
                    <MenuItem value={"Excessed"}>Excessed</MenuItem>
                    <MenuItem value={"Other"}>Other - Describe Situation Below</MenuItem>
                </Select>
                <br/>
                <br/>
                <br/>
                    {status === "Other" ?  <TextField multiline label="Description *"  inputProps={{maxlength: 30}} helperText={`${message.text.length}/ 30`} value={message.text} variant="outlined" fullWidth size="small" id="message" name="message" onChange={(e) => setMessage({...message, text: e.target.value})} ></TextField> : null} 
                        <div style={{fontSize:'0.6rem',color:'red',height:'25px', display:'flex',flexDirection:'column',justifyContent:'center'}}>
                        {message.error}
                        </div>
                    </form> 
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color="primary" size="small" onClick={(e)=>handleSubmit(e)}>Update</Button>
                </DialogActions>
                
            </Dialog>
        </MuiThemeProvider>
    )
}

export default UpdateStatusPopup