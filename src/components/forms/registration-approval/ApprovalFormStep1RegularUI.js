import { Button } from "@material-ui/core";
import React from "react";
import { connect } from 'redux-bundler-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

const ApprovalFormStep1RegularUI = ({handlePrev,handleNext,handleUseExisting,handleNewEmployee,matchSelection,setMatchSelection,selection,setSelection,employees,setEmployees,setOpenPopup,setStep,userToken,registrationRow,employeeRow,setEmployeeRow,hraRow,setHraRow,registeredUserRow,setRegisteredUserRow,employeesLoaded,setEmployeesLoaded}) => {

    return(
        <>
           <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#1c1c1c'}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:'0.75em',fontWeight:'600',color:'white',paddingLeft:'0.25em'}}>Select Employee (a)</div>
                    <div className='assign-registration-close' style={{display:'flex',cursor:'pointer',padding:'0.25em'}} onClick={()=>setOpenPopup(false)}>
                        <CloseIcon style={{color:'white',fontSize:'1em'}}/>
                    </div>
                </div>
                <div style={{display:'flex',padding:'1em',justifyContent:'center',backgroundColor:'rgb(245,245,245)'}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-end',paddingLeft:'1em',paddingRight:'1em'}}>
                        {employees[0].id == '' && <div style={{border:'1px solid rgb(225,225,225)',display:'flex',flexDirection:'column',textAlign:'center',backgroundColor:'rgb(255,255,255)',padding:'1em',marginBottom:'1em',borderRadius:'1em',boxShadow: '0px 4px 6px 0px rgba(0,0,0,0.2)'}}>
                            <div style={{color:'red'}}>
                                No matches were found in the employee table.
                            </div>
                            <div style={{fontSize:'0.85em',color:'gray'}}>
                                (employee matches may exist under a different name)
                            </div>
                        </div>}
                        {/*<div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em',backgroundColor:'#c9deff',border:'1px solid rgb(225,225,225)',borderBottom:'0'}}>Registration Record</div>*/}
                        <div className='select-employee-card disable-select' onClick={()=>{setSelection(0)}} style={{display:'flex',flexDirection:'column',border:'1px solid rgb(225,225,225)',outline:selection === 0 ? '2px solid #ff4d00':'',backgroundColor:'rgb(255,255,255)',padding:'1em',borderRadius:'1em',boxShadow: '0px 4px 6px 0px rgba(0,0,0,0.2)'}}>
                            <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'1.1em',fontWeight:'600',color:'#225dd4'}}>    
                                    Create New Employee
                            </div>
                            <div style={{fontSize:'0.9em',color:'gray',textAlign:'center',marginBottom:'1em'}}>with user registration input</div>
                            <table style={{backgroundColor:'white',fontSize:'0.75em',textAlign:'left',borderCollapse:'collapse',borderTop:'0',whiteSpace:'nowrap'}}>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th>First Name</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>
                                        <div style={{display:'flex'}}>
                                            <div>
                                                {registrationRow.first_name}&nbsp;
                                            </div>
                                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:'0.85em'}}>
                                                (CAC:&nbsp;{registrationRow.first_name_cac})
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>
                                        <div style={{display:'flex'}}>
                                            <div>
                                                {registrationRow.last_name}&nbsp;
                                            </div>
                                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:'0.85em'}}>
                                                (CAC:&nbsp;{registrationRow.last_name_cac})
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th>Employee ID</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>TBD</td>
                                </tr>
                                <tr>
                                    <th>EDIPI</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{registrationRow.edipi}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th>Office</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{registrationRow.office_symbol_alias}</td>
                                </tr>
                                <tr>
                                    <th>Title</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{registrationRow.title}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th>Work Phone</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{registrationRow.work_phone}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{registrationRow.email}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th>Division</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{registrationRow.division_name}</td>
                                </tr>
                                <tr>
                                    <th>District</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{registrationRow.district_name}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    {employees[0].id !== '' &&
                    <div style={{position:'relative',display:'flex',flexDirection:'column',paddingLeft:'1em',paddingRight:'1em'}}>
                        <div style={{border:'1px solid rgb(225,225,225)',display:'flex',flexDirection:'column',textAlign:'center',backgroundColor:'rgb(255,255,255)',padding:'1em',borderRadius:'1em',marginBottom:'1em',boxShadow: '0px 4px 6px 0px rgba(0,0,0,0.2)'}}>
                            <div style={{color:'red'}}>
                                {employees.length} employee match{employees.length > 1 && 'es'} found
                            </div>
                            <div style={{fontSize:'0.85em',color:'gray'}}>
                                (additional matches may exist)
                            </div>
                        </div>

                        

                        
                        {employees.length > 1 &&
                        <>
                        <div className='disable-select' style={{color:'rgb(200,200,200)',paddingLeft:'0.5em',paddingRight:'0.5em',lineHeight:'1em',fontSize:'0.9',position:"absolute",top:'5.15em',alignSelf:'center',backgroundColor:'rgba(0,0,0,0.9)',border:'1px solid rgb(25,25,25)',borderRadius:'0.5em'}}>
                            Match {matchSelection + 1} of {employees.length} 
                        </div>
                        {matchSelection > 0 &&
                        <div className='employee-match-arrows' onClick={(e)=>{e.stopPropagation();handlePrev()}} style={{color:'rgb(200,200,200)',cursor:'pointer',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',position:'absolute',left:'0em',top:'60%',backgroundColor:'rgba(0,0,0,0.9)',height:'2em',width:'2em',borderRadius:'2em',border:'1px solid rgb(25,25,25)'}}>
                                <ArrowBackIcon style={{fontSize:'1.5em'}}  />
                        </div>}
                        {((matchSelection + 1) < employees.length) &&
                        <div className='employee-match-arrows' onClick={(e)=>{e.stopPropagation();handleNext()}} style={{color:'rgb(200,200,200)',cursor:'pointer',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',position:'absolute',right:'0em',top:'60%',backgroundColor:'rgba(0,0,0,0.9)',height:'2em',width:'2em',borderRadius:'2em',border:'1px solid rgb(25,25,25)'}}>
                                <ArrowForwardIcon style={{fontSize:'1.5em'}} />
                        </div>}
                        </>}
                        <div className='select-employee-card disable-select' onClick={()=>{setSelection(1)}} style={{display:'flex',flexDirection:'column',border:'1px solid rgb(225,225,225)',outline:selection === 1 ? '2px solid #ff4d00':'',backgroundColor:'rgb(255,255,255)',padding:'1em',borderRadius:'1em',boxShadow: '0px 4px 6px 0px rgba(0,0,0,0.2)'}}>
                            <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'1.1em',fontWeight:'600',color:'#225dd4'}}>
                                Use Existing Employee
                            </div>
                            <div style={{fontSize:'0.9em',color:'gray',textAlign:'center',marginBottom:'1em'}}>
                                from employee table
                            </div>
                            <table style={{backgroundColor:'white',fontSize:'0.75em',textAlign:'left',borderCollapse:'collapse',borderTop:'0',whiteSpace:'nowrap'}}>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th>First Name</th>
                                    {employees[0].id !== '' && <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{employees[matchSelection].first_name}</td>}
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    {employees[0].id !== '' && <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{employees[matchSelection].last_name}</td>}
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th>Employee ID</th>
                                    {employees[0].id !== '' && <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{employees[matchSelection].id}</td>}
                                </tr>
                                <tr>
                                    <th>EDIPI</th>
                                    {employees[0].id !== '' && <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{employees[matchSelection].edipi}</td>}
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th>Office</th>
                                    {employees[0].id !== '' && <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{employees[matchSelection].office_symbol_alias}</td>}
                                </tr>
                                <tr>
                                    <th>Title</th>
                                    {employees[0].id !== '' && <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{employees[matchSelection].title}</td>}
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th>Work Phone</th>
                                    {employees[0].id !== '' && <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{employees[matchSelection].work_phone}</td>}
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    {employees[0].id !== '' && <td style={{overflow:'hidden',whitespace:'nowrap',width:'100px',display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{employees[matchSelection].email}</td>}
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th>Division</th>
                                    {employees[0].id !== '' && <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{employees[matchSelection].division_name}</td>}
                                </tr>
                                <tr>
                                    <th>District</th>
                                    {employees[0].id !== '' && <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',width:'18em',textOverflow:'ellipsis'}}>{employees[matchSelection].district_name}</td>}
                                </tr>
                            </table>
                        </div>
                        
                    </div>}
                
                
                </div>
                <div style={{display:'flex',justifyContent:'space-between',paddingBottom:'1em',paddingLeft:'2em',paddingRight:'2em',paddingTop:'0em',backgroundColor:'rgb(245,245,245)'}}>
                    <Button onClick={()=>{setOpenPopup(false)}} variant='contained' size='small'>Cancel</Button>
                    <Button variant='contained' size='small' color='primary' onClick={()=>{selection === 1 ? handleUseExisting(matchSelection,true):handleNewEmployee(true)}} disabled={(selection !== 0 && selection !== 1)}>Next</Button>
                </div>
            </div>
        </>
    )
}

export default connect(
    'selectUserToken',
    ApprovalFormStep1RegularUI);

