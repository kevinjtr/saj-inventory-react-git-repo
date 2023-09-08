import { Button } from "@mui/material";
import React from "react";
import { connect } from 'redux-bundler-react';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
    display:'flex',
    flexDirection:'column',
    padding:'0.25em',
    "&:hover": {
        cursor:'pointer',
        color: theme.palette.background.default,
        backgroundColor: theme.palette.action.active
    },
}));

const ApprovalFormStep1ExpressUI = ({handleUseExisting,handleNewEmployee,selection,setSelection,employees,setOpenPopup,registrationRow,employeeRow,setEmployeeRow,hraRow,setHraRow,registeredUserRow,setRegisteredUserRow,employeesLoaded,setEmployeesLoaded}) => {

    //Styles
    const theme = useTheme();

    const backgroundStyles = {
		c1: theme.palette.mode == "dark" ? theme.palette.background.default : '#1c1c1c',
        white: theme.palette.mode == "dark" ? theme.palette.background.default : 'white',
	}

    // const selectStyles = {
	// 	"&:hover": {
    //         cursor:'pointer',
    //         color: theme.palette.text.disabled,
    //         backgroundColor:theme.palette.action.active
    //     },
	// }

    return(
            <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'space-between',backgroundColor: backgroundStyles.c1}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:'1.5em',fontWeight:'600',color:'white',paddingLeft:'0.25em'}}>
                        Select Employee
                    </div>
                    <div className='assign-registration-close' style={{display:'flex',cursor:'pointer',padding:'0.25em'}} onClick={()=>setOpenPopup(false)}>
                        <CloseIcon style={{color:'white',fontSize:'2.5em'}}/>
                    </div>
                </div>
                <div style={{display:'flex',padding:'1em',justifyContent:'center'}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        {employees[0].id !== '' ? <>
                        <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'1.5em',fontWeight:'600',color: theme.palette.mode == "dark" ? theme.palette.text.primary : '#225dd4'}}>
                            Select Best Match
                        </div>
                        <div style={{display:'flex',flexDirection:'column',backgroundColor:backgroundStyles.white}}>
                            <div style={{display:'flex',flexDirection:'column',maxHeight:'16em',overflowY:'auto',minWidth:'20em'}}>
                            
                                {employees.map((employee,index)=>{
                                   return (
                                    <StyledBox 
                                    onClick={()=>{setSelection(index+1)}} 
                                    style={{border: selection === (index + 1) ? '1px solid #ff4d00':'1px solid rgba(255,255,255,0)'}}>
                                        
                                        <div style={{display:'flex'}}>
                                            <div>
                                                <AccountCircleIcon style={{fontSize:'2.75em',color:'rgb(150,150,150)',marginRight:'0.1em'}}/>
                                            </div>
                                            <div>
                                            <div style={{display:'flex',textTransform:'uppercase',fontWeight:'600',fontSize:'1.1em',color:"inherit"}}>
                                                {employee.first_name} {employee.last_name}
                                            </div>
                                            <div style={{display:'flex',fontSize:'0.9em',fontWeight:'600',color:'rgb(175,175,175)'}}>
                                                {employee.division_symbol}
                                                {employee.division_symbol && employee.district_symbol && '-'}
                                                {employee.district_symbol}
                                                {(employee.district_symbol || employee.division_symbol) && employee.office_symbol_alias && '-'}
                                                {employee.office_symbol_alias}
                                            </div>
                                            </div>
                                        </div>
                                    </StyledBox>
                                   )
                                })}
                                
                            </div>
                        </div>
                        <div style={{display:'flex',justifyContent:'center',fontSize:'1.25em',fontWeight:'600',margin:'0.25em',color: theme.palette.mode == "dark" ? theme.palette.text.primary : 'rgb(100,100,100)'}}>
                            -OR-
                        </div>
                        </> :(
                            <div style={{display:'flex',justifyContent:'center',color: theme.palette.mode == "dark" ? theme.palette.text.primary : 'rgb(75,0,0)',padding:'0.5em',paddingBottom:'1em'}}>
                            No existing employees found
                            </div>
                        )
                        }
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'1.5em',fontWeight:'600',color: theme.palette.mode == "dark" ? theme.palette.text.primary : '#225dd4', marginBottom:'0.1em'}}>    
                                Create New Employee
                            </div>
                            <div style={{display:'flex',flexDirection:'column',backgroundColor:backgroundStyles.white,minWidth:'20em'}}>
                                    <StyledBox 
                                    onClick={()=>{setSelection(0)}} 
                                    style={{border:selection === 0 ? '1px solid #ff4d00':'1px solid rgba(255,255,255,0)'}}>
                                        <div style={{display:'flex'}}>
                                            <div>
                                                <AddCircleOutlineIcon style={{fontSize:'2.75em',color:'rgb(150,150,150)',marginRight:'0.1em'}}/>
                                            </div>
                                            <div>
                                            <div style={{display:'flex',textTransform:'uppercase',fontWeight:'600',fontSize:'1.1em'}}>
                                                {registrationRow.first_name} {registrationRow.last_name}
                                            </div>
                                            <div style={{display:'flex',fontSize:'0.9em',fontWeight:'600',color:'rgb(175,175,175)'}}>
                                                {registrationRow.division_symbol}
                                                {registrationRow.division_symbol && registrationRow.district_symbol && '-'}
                                                {registrationRow.district_symbol}
                                                {(registrationRow.district_symbol || registrationRow.division_symbol) && registrationRow.office_symbol_alias && '-'}
                                                {registrationRow.office_symbol_alias}
                                            </div>
                                            </div>
                                        </div>
                                    </StyledBox>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',paddingBottom:'1em',paddingLeft:'1em',paddingRight:'1em',paddingTop:'0em'}}>
                    <Button onClick={()=>{setOpenPopup(false)}} variant='outlined' size='small'>
                        Cancel
                    </Button>
                    <Button variant='contained' size='small' color='primary' disabled={(selection < 0)} onClick={()=>{selection >= 1 ? handleUseExisting(selection-1,false):handleNewEmployee(false)}}>
                        Grant Access
                    </Button>
                </div>
            </div>
    )
}

export default connect(
    'selectUserToken',
    ApprovalFormStep1ExpressUI);

