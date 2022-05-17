import { Button } from "@material-ui/core";
import React from "react";
import { connect } from 'redux-bundler-react';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ApprovalFormStep1ExpressUI = ({handleUseExisting,handleNewEmployee,selection,setSelection,employees,setOpenPopup,registrationRow,employeeRow,setEmployeeRow,hraRow,setHraRow,registeredUserRow,setRegisteredUserRow,employeesLoaded,setEmployeesLoaded}) => {

    return(
            <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#1c1c1c'}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:'0.75em',fontWeight:'600',color:'white',paddingLeft:'0.25em'}}>
                        Select Employee
                    </div>
                    <div className='assign-registration-close' style={{display:'flex',cursor:'pointer',padding:'0.25em'}} onClick={()=>setOpenPopup(false)}>
                        <CloseIcon style={{color:'white',fontSize:'1em'}}/>
                    </div>
                </div>
                <div style={{display:'flex',padding:'1em',justifyContent:'center'}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        {employees[0].id !== '' ? <>
                        <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'1.1em',fontWeight:'600',color:'#225dd4'}}>
                            Select Best Match
                        </div>
                        <div style={{display:'flex',flexDirection:'column',backgroundColor:'white'}}>
                            <div style={{display:'flex',flexDirection:'column',maxHeight:'16em',overflowY:'auto',minWidth:'20em'}}>
                            
                                {employees.map((employee,index)=>{
                                   return (
                                    <div 
                                    className='select-employee-card-hra disable-select' 
                                    onClick={()=>{setSelection(index+1)}} 
                                    style={{display:'flex',flexDirection:'column',border:selection === (index + 1) ? '1px solid #ff4d00':'1px solid rgba(255,255,255,0)',padding:'0.25em'}}>
                                        
                                        <div style={{display:'flex'}}>
                                            <div>
                                                <AccountCircleIcon style={{fontSize:'2.75em',color:'rgb(150,150,150)',marginRight:'0.1em'}}/>
                                            </div>
                                            <div>
                                            <div style={{display:'flex',textTransform:'uppercase',fontWeight:'600',fontSize:'1.1em',color:'text.primary'}}>
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
                                      
                                        
                                    </div>
                                   )
                                })}
                                
                            </div>
                        </div>
                        
                        <div style={{display:'flex',justifyContent:'center',fontSize:'1em',fontWeight:'600',margin:'0.25em',color:'rgb(100,100,100)'}}>
                            -OR-
                        </div>
                        </> :(
                            <div style={{display:'flex',justifyContent:'center',color:'rgb(75,0,0)',padding:'0.5em',paddingBottom:'1em'}}>
                            No existing employees found
                            </div>
                        )
                        }
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'1.1em',fontWeight:'600',color:'#225dd4',marginBottom:'0.1em'}}>    
                                Create New Employee
                            </div>
                            <div style={{display:'flex',flexDirection:'column',backgroundColor:'white',minWidth:'20em'}}>
                                    <div 
                                    className='select-employee-card-hra disable-select' 
                                    onClick={()=>{setSelection(0)}} 
                                    style={{display:'flex',flexDirection:'column',border:selection === 0 ? '1px solid #ff4d00':'1px solid rgba(255,255,255,0)',padding:'0.25em'}}>
                                        
                                        <div style={{display:'flex'}}>
                                            <div>
                                                <AddCircleOutlineIcon style={{fontSize:'2.75em',color:'rgb(150,150,150)',marginRight:'0.1em'}}/>
                                            </div>
                                            <div>
                                            <div style={{display:'flex',textTransform:'uppercase',fontWeight:'600',fontSize:'1.1em',color:'text.primary'}}>
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
                                      
                                        
                                    </div>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',paddingBottom:'1em',paddingLeft:'1em',paddingRight:'1em',paddingTop:'0em'}}>
                    <Button onClick={()=>{setOpenPopup(false)}} variant='contained' size='small'>
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

