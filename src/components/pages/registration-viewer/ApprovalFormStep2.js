import { Dialog, Button, CircularProgress } from "@mui/material";
import React, {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import { getAllHrasIdApi } from '../../../publics/actions/hra-api';
import { connect } from 'redux-bundler-react';
import { useTheme } from '@mui/material/styles';

const ApprovalFormStep2 = (props) => {

    const {userToken,registrationRow,handleSubmit,setOpenPopup,setStep,hraRow,setHraRow,registeredUserRow,setRegisteredUserRow,employeeRow,setMatchingHRA,matchingHRA} = props

    const [loading,setLoading] = useState(false)
    const [hraError,setHraError] = useState(0)

    //Styles
    const theme = useTheme();

    const bColor = {
		c1: theme.palette.mode == "dark" ? theme.palette.background.default : '#1c1c1c',
        white: theme.palette.mode == "dark" ? theme.palette.background.default : 'white',
        rgb240: theme.palette.mode == "dark" ? theme.palette.background.default : 'rgb(240,240,240)',
        rgb245: theme.palette.mode == "dark" ? theme.palette.background.default : 'rgb(245,245,245)',
        rgb255: theme.palette.mode == "dark" ? theme.palette.background.default : 'rgb(255,255,255)',
        rgba09:theme.palette.mode == "dark" ? theme.palette.background.default : 'rgba(0,0,0,0.9)'
	}

    const handleValidateHra = async () => {

        setMatchingHRA(false)
        setHraError(0)

        if(registeredUserRow.user_level === '11' || registeredUserRow.user_level === '12'){
            if(hraRow.hra_num === ''){
                setHraError(1)
            } else {

                setLoading(true)
            
                const match = await getAllHrasIdApi(userToken).then((response) => response.data).then((data) => {
                    return data.data.find((match) => {
                        return (
                            match.hra_num === parseInt(hraRow.hra_num)
                        )
                    })
                })

                if(typeof match !== 'undefined'){
                    if(match.employee_id && (hraRow.employee_id === match.employee_id)){
                        setMatchingHRA(true)
                        setStep(3)
                    } else {
                        setHraError(2)
                        setLoading(false)
                    }
                } else {
                    setStep(3)
                }
            }

        } else {
            setStep(3)
        }

    }

    const handleChangeHra = (event) => {
        
        event.preventDefault();

        setMatchingHRA(false);

        const newHraRow = {...hraRow}
        newHraRow.hra_num = event.target.value.replace(/[^0-9]/g,"")
        setHraRow(newHraRow)

    }

    const handleChangeUserLevel = (event) => {
        
        event.preventDefault();
        
        const newRegisteredUserRow = {...registeredUserRow}
        newRegisteredUserRow.user_level = event.target.value
        setRegisteredUserRow(newRegisteredUserRow)

    }

    return(
        <>
            {loading ? (
            <div style={{display:'flex',padding:'1em'}}>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    <CircularProgress size={20} />
                </div>
                <div style={{paddingLeft:'1em',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    Searching HRA table...
                </div>
            </div>
            ):(
            <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'space-between',backgroundColor:bColor.c1}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:'1.5em',fontWeight:'600',color:'white',paddingLeft:'0.25em'}}>Set User Level</div>
                    <div className='assign-registration-close' style={{display:'flex',cursor:'pointer',padding:'0.25em'}} onClick={()=>setOpenPopup(false)}>
                        <CloseIcon style={{color:'white',fontSize:'2.5em'}}/>
                    </div>
                </div>
                <div style={{padding:'1em',backgroundColor:bColor.rgb245, fontSize:'1.5em'}}>
                <div style={{display:'flex',flexDirection:'column',padding:'1em',backgroundColor:bColor.white,border:'1px solid rgb(225,225,225)',borderRadius:'1em',boxShadow: '0px 4px 6px 0px rgba(0,0,0,0.2)',whiteSpace:'nowrap'}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                        <div style={{marginLeft:'0.5em',width:'7em',fontWeight:'bold'}}>
                            Name
                        </div>
                        <div>
                            {registeredUserRow.full_name}
                        </div>
                    </div>
                    <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                        <div style={{marginLeft:'0.5em',width:'7em',fontWeight:'bold'}}>
                            Employee ID
                        </div>
                        <div>
                            {registeredUserRow.employee_id ? registeredUserRow.employee_id : 'TBD'}
                        </div>
                    </div>
                    <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                        <div style={{marginLeft:'0.5em',width:'7em',fontWeight:'bold'}}>
                            EDIPI
                        </div>
                        <div>
                            {registeredUserRow.edipi}
                        </div>
                    </div>
                    <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                        <div style={{marginLeft:'0.5em',width:'7em',fontWeight:'bold',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                            User Level
                        </div>
                        <div>
                            <select 
                            onChange={handleChangeUserLevel} 
                            value={registeredUserRow.user_level} 
                            style={{width:'10em',height:'1.75em',fontSize:'1.25em',textAlign:'center',outline:'0',padding:'0',borderRadius:'0.5em',border:'1px solid gray',marginRight:'1em'}}
                            >
                                <option value='1'>Admin</option>
                                <option value='7'>Regular Level 1</option>
                                <option value='8'>Regular Level 2</option>
                                <option value='9'>Regular Level 3</option>
                                <option value='10'>Regular Level 4</option>
                                <option value='11'>HRA Level 1</option>
                                <option value='12'>HRA Level 2</option>
                            </select>
                        </div>
                    </div>

                    {(registeredUserRow.user_level === '11' || registeredUserRow.user_level === '12') &&
                    <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                        <div style={{marginLeft:'0.5em',width:'7em',fontWeight:'bold',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                            HRA No.
                        </div>
                        <div>
                            <input 
                            type="text" 
                            onChange={handleChangeHra} 
                            maxlength="3" 
                            style={{marginRight:'1em',width:'10em',height:'1.75em',fontSize:'1.25em',textAlign:'center',outline:'0',padding:'0',borderRadius:'0.5em',border:'1px solid gray'}} 
                            value={hraRow.hra_num} 
                            name="hras" 
                            disabled={(registeredUserRow.user_level === '11' || registeredUserRow.user_level === '12') ? false:true} 
                            />
                        </div>
                    </div>
                    }

                    {(hraError > 0 && (registeredUserRow.user_level === '11' || registeredUserRow.user_level === '12')) && 
                    <div style={{display:'flex',textAlign:'center',justifyContent:'center',color: theme.palette.mode == "dark" ? "orange" :'red',fontSize:'1.5em',flexGrow:1}}>
                        {hraError === 1 && 
                        <>HRA number is required</>
                        }
                        {hraError === 2 && 
                        <>This HRA number is tied to a different employee. <br /> Please enter a new HRA number.</>
                        }
                    </div>
                    }
                
                    </div>
                    </div>
                    <div style={{display:'flex',paddingTop:'1em',justifyContent:'space-between'}}>
                        <Button variant='contained' size='small' onClick={()=>setStep(1)} style={{marginRight:'0.5em'}}>
                            Back
                        </Button>
                        <Button onClick={()=>handleValidateHra()} variant='contained' size='small' color='primary' style={{marginLeft:'0.5em'}} >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default connect(
    'selectUserToken',
    ApprovalFormStep2);
