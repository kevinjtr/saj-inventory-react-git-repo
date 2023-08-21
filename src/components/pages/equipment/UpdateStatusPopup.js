import {updateEquipmentApi} from '../../../publics/actions/equipment-api'
import {findIndex} from 'lodash'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography,Select,MenuItem,TextField,IconButton, FormControl, InputLabel } from '@mui/material/'
import {LoadingButton} from '@mui/lab';
import React, {useState} from 'react'
import {Close as CloseIcon, Save as SaveIcon} from '@mui/icons-material';
import { green, grey } from '@mui/material/colors';
import { connect } from 'redux-bundler-react';
import toast from 'react-hot-toast';

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

const UpdateStatusPopup = ({openPopup,setOpenPopup, rowData, equipments, setEquipments, userToken}) => {
    
    const[message,setMessage] = useState(() => {
      if(rowData.status){
        if(rowData.status.includes("Other")){
          const split_text = rowData.status.split(" - ")
          if(split_text.length > 0){
            return {text: split_text[1],error:''}
          }
        }
      }

      return {text: '',error:''}
    }
      
    );
    
    const[status, setStatus] = useState(rowData.status ? (rowData.status.includes("Other") ? "Other" : rowData.status) : "");
    const [submitButton, setSubmitButton] = React.useState({
        active:false,
        send:false,
      });
    //const {title,openPopup,setOpenPopup,setSnackBar} = props;
    const handleSubmit = async () => {
        const new_status = status === "Other" ? `${status} - ${message.text}` : status
        //const rowData = {changes:{'0':{newData:{...rowData, status: new_status, status_date: new Date() }, oldData:rowData}}}
        const changes = {changes:{'0':{newData:{...rowData, status: new_status, status_date: new Date() }, oldData:rowData}}}

        let errorFound = true
        setSubmitButton(prev => ({...prev, send: true}))

        await updateEquipmentApi(changes, userToken)
        .then((response) => response.data).then((data) => {
          const {tabChanges, error} = data
          errorFound = error
    
          if(error){
            setSubmitButton(prev => ({...prev, send: false, active: false}))
            toast.error('Could not complete action')
          }else {
            let equipments_copy = {...equipments}
    
            for(const tab_number in tabChanges){
              for(const eq_change of tabChanges[tab_number]){
                let equipments_tab_copy = [...equipments_copy[tab_number]]
                const idx = findIndex(equipments_tab_copy,function(eq){return eq.bar_tag_num == eq_change.bar_tag_num})
    
                if(idx != -1){
                  equipments_tab_copy[idx] = eq_change
                  console.log(equipments_tab_copy[idx])
                  equipments_copy = {...equipments_copy,[tab_number]: equipments_tab_copy}
                }
              }
            }
            setSubmitButton(prev => ({...prev, send: false, active: false}))
            setEquipments(equipments_copy)
            toast.success('Action was completed')
            setOpenPopup(false)
          }        
    
        }).catch(function (error) {
          console.log(error)
          setSubmitButton(prev => ({...prev, send: false, active: false}))
          toast.error('Could not complete action')
        });
    
        return(errorFound)
    }

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
                        setMessage(prev => ({...prev, error: true}))
                        //message.error = `A message is required`
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

    // const handleSubmit = async () => {      
    //     //console.log("You've hit the handleSubmit method")
    //     //rowData.status = status;
    //     //const current = new Date();
    //     //const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
    //     //rowData.status_date = date;
    //     //const updateStatus = {rowData}
    //     //console.log(updateStatus);

    //     const new_status = status === "Other" ? `${status} - ${message.text}` : status
    //     const updateStatus = {changes:{'0':{newData:{...rowData, status: new_status, status_date: new Date() }, oldData:rowData}}}

    //     const errorFound = await handleUpdate(updateStatus);

    //     if(!errorFound){
    //         setOpenPopup(false)

    //         //setSnackBar({open:true,message:resul,severity:'success'})
    //         //setMessage({message:'',error:''})
    //     } else {
    //         //setMessage({...message})
    //         //setSnackBar({open:true,message:result.message,severity:'error'})
    //     }
    // }
    const ValidateOtherInput = () => {
      if(status == "Other" && message.text.length >= 3){
        const split_text = message.text?.split(" - ")
        
        if(!split_text) 
          return false

        if(split_text.length > 0)
          return message.text != split_text[1]

        return split_text[0] != message.text
      }
    }


    React.useEffect(() => {

      if(!submitButton.send){
        if(status){
          if(ValidateOtherInput()){
              setSubmitButton({...submitButton, active: true})  
          }else if(status != "Other" && status != rowData.status){
              setSubmitButton({...submitButton, active: true})
          }else {
              setSubmitButton({...submitButton, active: false})
          }
              
        }else if(submitButton.active){
          setSubmitButton({...submitButton, active: false}) 
        }
      }
    }, [status]);

    React.useEffect(() => {
      console.log(message)
      if(!submitButton.send){
        if(ValidateOtherInput()){
          setSubmitButton({...submitButton, active: true})  
        }else if(submitButton.active){
          setSubmitButton({...submitButton, active: false}) 
        }
      }

    }, [message]);

    return(
            <Dialog open={openPopup} fullWidth maxWidth="xs">
                <DialogTitle>
                    <div style={{display:'flex'}}>
                        <Typography variant="h6" component="div" style={{flexGrow:1,alignSelf:'center',textTransform:'uppercase',fontSize:'1rem'}}>update equipment status</Typography>
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
                <form style={{width:'100%'}} name="updateForm" onChange={(e)=>handleChange(e)}>
                <FormControl >
                <InputLabel id="select-status">Status</InputLabel>
                <Select
                  displayEmpty
                  sx={{minWidth:160}}
                  name="status"
                  id="status"
                  label="Status"
                  value={status}
                  onChange={handleChange}
                  >
                    <MenuItem defaultValue value={"Still Possess"}>Still Possess</MenuItem>
                    <MenuItem value={"Gave Back To HRA Holder"}>Gave Back To HRA Holder</MenuItem>
                    <MenuItem value={"Lost"}>Lost</MenuItem>
                    <MenuItem value={"Stolen"}>Stolen</MenuItem>
                    <MenuItem value={"Excessed"}>Excessed</MenuItem>
                    <MenuItem value={"Other"}>Other - Describe Situation Below</MenuItem>
                </Select>
                </FormControl>
                <br/>
                <br/>
                <br/>
                    {status === "Other" ?  <TextField error={message.error} multiline label="Description *"  inputProps={{maxlength: 30}} 
                    helperText={`${message.text.length}/ 30`} 
                    value={message.text} variant="outlined" fullWidth size="small" id="message" name="message" 
                    onChange={(e) => setMessage({...message, text: e.target.value, error: e.target.value.length < 3})} >
                    </TextField> : null} 
                        <div style={{fontSize:'0.6rem',color:'red',height:'25px', display:'flex',flexDirection:'column',justifyContent:'center'}}>
                        {/* {message.error} */}
                        </div>
                    </form> 
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
    UpdateStatusPopup);