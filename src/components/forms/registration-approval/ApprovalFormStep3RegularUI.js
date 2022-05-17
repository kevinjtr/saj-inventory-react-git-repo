import { Dialog, Button, CircularProgress } from "@material-ui/core";
import React, {useState} from "react";
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


const ApprovalFormStep3RegularUI = (props) => {

    const {
        setStep,
        employeeRow,
        hraRow,
        registeredUserRow,
        registrationRow,
        setOpenPopup,
        matchingHRA,
        loading,
        executed,
        setActionTab,
        actionTab,
        addEmployeeStatus,
        matchingEmployee,
        addHraStatus,
        addRegisteredUserStatus,
        deleteRegistrationStatus,
        handleExecute
    } = props
    
    return(
        <div style={{display:'flex',flexDirection:'column'}}>

            <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#1c1c1c'}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:'0.75em',fontWeight:'600',color:'white',paddingLeft:'0.25em'}}>Confirm Actions</div>

                    <div className="assign-registration-close" style={{display:'flex',cursor:'pointer',padding:'0.25em'}} onClick={()=>(loading && !executed) ? '':setOpenPopup(false)}>
                        <CloseIcon style={{color:'white',fontSize:'1em'}}/>
                    </div>
            </div>

            <div style={{display:'flex',flexDirection:'column',padding:'1em',backgroundColor:'rgb(245,245,245)',height:'34em'}}>
                <div onClick={()=>{setActionTab(actionTab === 1 ? 0:1)}} className="assign-registration-paper" style={{marginBottom:'0.5em',border:addEmployeeStatus === 'Executing' ? '1px solid #ff4d00':''}}>
                    <div style={{display:'flex'}}>
                        <div style={{display:'flex',width:'18em',height:'3em'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'3.5em'}}>
                                    {addEmployeeStatus === 'Pending' && <PendingOutlinedIcon style={{color:'rgb(200,200,200)',fontSize:'3em'}}/>}
                                    {addEmployeeStatus === 'Executing' && <CircularProgress size={30}/>}
                                    {addEmployeeStatus === 'Error' && <CancelOutlinedIcon style={{color:'rgb(255,150,150)',fontSize:'3em'}}/>}
                                    {addEmployeeStatus === 'Complete' && <CheckCircleOutlineIcon style={{color:'rgb(150,255,150)',fontSize:'3em'}}/>}
                            </div>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginLeft:'0.5em'}}>
                                <div style={{fontWeight:'600'}}>   
                                    Create Employee
                                </div>
                                <div style={{fontSize:'0.9em',color:'rgb(100,100,100)'}}>
                                    {addEmployeeStatus}
                                    {matchingEmployee && ' (match found)'}
                                </div>
                            </div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',whiteSpace:'nowrap',width:'12em'}}>
                            <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em'}}>Table</div>
                            <div style={{display:'inline-block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis',fontSize:'0.85em'}}>Employee</div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',whiteSpace:'nowrap',width:'6em'}}>
                            <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em'}}>Action</div>
                            <div style={{fontSize:'0.85em'}}>{matchingEmployee ? 'None':'Add'}</div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',color:'#225dd4'}}>
                            <div style={{display:'flex'}}>
                                <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>Details</div>
                                <div>
                                    {actionTab === 1 ? 
                                    <ArrowDropUpIcon style={{marginTop:'0.1em'}}/>
                                    :
                                    <ArrowDropDownIcon style={{marginTop:'0.1em'}}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display:actionTab === 1 ? 'flex':'none',flexDirection:'column',border:'1px solid rgb(225,225,225)',marginTop:'0.5em'}}>
                        <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em',backgroundColor:'#c9deff'}}>Record</div>
                        <div style={{display:'flex',flexDirection:'column',fontSize:'0.75em'}}>
                            <table style={{tableLayout:'fixed',whiteSpace:'nowrap',borderCollapse:'collapse',textAlign:'left'}}>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>First Name</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{employeeRow.first_name}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>Last Name</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{employeeRow.last_name}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>Employee Id</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{employeeRow.id ? employeeRow.id:'TBD'}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>Title</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{employeeRow.title}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>Office Symbol</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{employeeRow.office_symbol_alias}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>Work Phone</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{employeeRow.work_phone}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>Email</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{employeeRow.email}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>Division</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{employeeRow.division_name}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>District</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{employeeRow.district_name}</td>
                                </tr>
                            </table>
                        </div>
                    </div>



                </div>

                






                {(registeredUserRow.user_level === '11' || registeredUserRow.user_level === '12') &&
                <div onClick={()=>{setActionTab(actionTab === 2 ? 0:2)}} className="assign-registration-paper" style={{marginBottom:'0.5em',border:addHraStatus === 'Executing' ? '1px solid #ff4d00':''}}> 
                    <div style={{display:'flex'}}>
                    <div style={{display:'flex',width:'18em',height:'3em'}}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'3.5em'}}>
                                {addHraStatus === 'Pending' && <PendingOutlinedIcon style={{color:'rgb(200,200,200)',fontSize:'3em'}}/>}
                                {addHraStatus === 'Executing' && <CircularProgress size={30}/>}
                                {addHraStatus === 'Error' && <CancelOutlinedIcon style={{color:'rgb(255,150,150)',fontSize:'3em'}}/>}
                                {addHraStatus === 'Complete' && <CheckCircleOutlineIcon style={{color:'rgb(150,255,150)',fontSize:'3em'}}/>}
                        </div>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginLeft:'0.5em'}}>
                            <div style={{fontWeight:'600'}}>
                                Create HRA
                            </div>
                            <div style={{fontSize:'0.9em',color:'rgb(100,100,100)'}}>
                                {addHraStatus}
                                {matchingHRA && ' (match found)'}
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',whiteSpace:'nowrap',width:'12em'}}>
                        <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em'}}>Table</div>
                        <div style={{display:'inline-block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis',fontSize:'0.85em'}}>HRA</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',whiteSpace:'nowrap',width:'6em'}}>
                        <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em'}}>Action</div>
                        <div style={{fontSize:'0.85em'}}>{matchingHRA ? 'None':'Add'}</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',color:'#225dd4'}}>
                        <div style={{display:'flex'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>Details</div>
                            <div>
                                {actionTab === 2 ? 
                                <ArrowDropUpIcon style={{marginTop:'0.1em'}}/>
                                :
                                <ArrowDropDownIcon style={{marginTop:'0.1em'}}/>
                                }
                            </div>
                        </div>
                    </div>
                    </div>
                    <div style={{display:actionTab === 2 ? 'flex':'none',flexDirection:'column',border:'1px solid rgb(225,225,225)',marginTop:'0.5em'}}>
                        <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em',backgroundColor:'#c9deff'}}>Record</div>
                        <div style={{display:'flex',flexDirection:'column',fontSize:'0.75em'}}>
                            <table style={{tableLayout:'fixed',whiteSpace:'nowrap',borderCollapse:'collapse',textAlign:'left'}}>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>Name</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{hraRow.name}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>Employee Id</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{hraRow.employee_id ? hraRow.employee_id:'TBD'}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>HRA Num</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{hraRow.hra_num}</td>
                                </tr>
                            </table>
                        </div>
                        </div>




                </div>}

                


                <div onClick={()=>{setActionTab(actionTab === 3 ? 0:3)}} className="assign-registration-paper" style={{marginBottom:'0.5em',border:addRegisteredUserStatus === 'Executing' ? '1px solid #ff4d00':''}}> 
                <div style={{display:'flex'}}>
                    <div style={{display:'flex',width:'18em',height:'3em'}}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'3.5em'}}>
                                {addRegisteredUserStatus === 'Pending' && <PendingOutlinedIcon style={{color:'rgb(200,200,200)',fontSize:'3em'}}/>}
                                {addRegisteredUserStatus === 'Executing' && <CircularProgress size={30}/>}
                                {addRegisteredUserStatus === 'Error' && <CancelOutlinedIcon style={{color:'rgb(255,150,150)',fontSize:'3em'}}/>}
                                {addRegisteredUserStatus === 'Complete' && <CheckCircleOutlineIcon style={{color:'rgb(150,255,150)',fontSize:'3em'}}/>}
                        </div>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginLeft:'0.5em'}}>
                            <div style={{fontWeight:'600'}}>
                                Create Registered User
                            </div>
                            <div style={{fontSize:'0.9em',color:'rgb(100,100,100)'}}>
                                {addRegisteredUserStatus}
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',whiteSpace:'nowrap',width:'12em'}}>
                        <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em'}}>Table</div>
                        <div style={{display:'inline-block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis',fontSize:'0.85em'}}>Registered Users</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',whiteSpace:'nowrap',width:'6em'}}>
                        <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em'}}>Action</div>
                        <div style={{fontSize:'0.85em'}}>Add</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',color:'#225dd4'}}>
                        <div style={{display:'flex'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>Details</div>
                            <div>
                                {actionTab === 3 ? 
                                <ArrowDropUpIcon style={{marginTop:'0.1em'}}/>
                                :
                                <ArrowDropDownIcon style={{marginTop:'0.1em'}}/>
                                }
                            </div>
                        </div>
                    </div>
                    </div>
                    {(registrationRow.user_type_label === 'HRA' && registeredUserRow.user_level !== '11' && registeredUserRow.user_level !== '12') &&
                    <div style={{marginTop:'0.5em',border:'1px solid #592e2e', color:'#592e2e',borderRadius:'1em',padding:'0.5em',paddingTop:'0.25em',paddingBottom:'0.25em',fontSize:'0.75em'}}>
                        Note: Employee registered as HRA but has been assigned non-hra user level. No HRA number will be assigned.
                    </div>
                    }
                    <div style={{display:actionTab === 3 ? 'flex':'none',flexDirection:'column',border:'1px solid rgb(225,225,225)',marginTop:'0.5em'}}>
                        <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em',backgroundColor:'#c9deff'}}>Record</div>
                        <div style={{display:'flex',flexDirection:'column',fontSize:'0.75em'}}>
                            <table style={{tableLayout:'fixed',whiteSpace:'nowrap',borderCollapse:'collapse',textAlign:'left'}}>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>Full Name</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registeredUserRow.full_name}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>EDIPI</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registeredUserRow.edipi}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>Employee Id</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registeredUserRow.employee_id ? registeredUserRow.employee_id:'TBD'}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>User Level</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registeredUserRow.user_level}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                </div>

                









                <div onClick={()=>{setActionTab(actionTab === 4 ? 0:4)}} className="assign-registration-paper" style={{marginBottom:'0.5em',border:deleteRegistrationStatus === 'Executing' ? '1px solid #ff4d00':''}}> 
                <div style={{display:'flex'}}>
                    <div style={{display:'flex',width:'18em',height:'3em'}}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'3.5em'}}>
                                {deleteRegistrationStatus === 'Pending' && <PendingOutlinedIcon style={{color:'rgb(200,200,200)',fontSize:'3em'}}/>}
                                {deleteRegistrationStatus === 'Executing' && <CircularProgress size={30}/>}
                                {deleteRegistrationStatus === 'Error' && <CancelOutlinedIcon style={{color:'rgb(255,150,150)',fontSize:'3em'}}/>}
                                {deleteRegistrationStatus === 'Complete' && <CheckCircleOutlineIcon style={{color:'rgb(150,255,150)',fontSize:'3em'}}/>}
                        </div>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginLeft:'0.5em'}}>
                            <div style={{fontWeight:'600'}}>
                                Delete Registration
                            </div>
                            <div style={{fontSize:'0.9em',color:'rgb(100,100,100)'}}>
                                {deleteRegistrationStatus}
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',whiteSpace:'nowrap',width:'12em'}}>
                        <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em'}}>Table</div>
                        <div style={{display:'inline-block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis',fontSize:'0.85em'}}>Employee Registration</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',whiteSpace:'nowrap',width:'6em'}}>
                        <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em'}}>Action</div>
                        <div style={{fontSize:'0.85em'}}>Delete</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',color:'#225dd4'}}>
                        <div style={{display:'flex'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>Details</div>
                            <div>
                                {actionTab === 4 ? 
                                <ArrowDropUpIcon style={{marginTop:'0.1em'}}/>
                                :
                                <ArrowDropDownIcon style={{marginTop:'0.1em'}}/>
                                }
                            </div>
                        </div>
                    </div>
                    </div>
                    <div style={{display:actionTab === 4 ? 'flex':'none',flexDirection:'column',border:'1px solid rgb(225,225,225)',whiteSpace:'nowrap',marginTop:'0.5em'}}>
                        <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.75em',backgroundColor:'#c9deff'}}>Record</div>
                        <div style={{display:'flex',flexDirection:'column',fontSize:'0.75em'}}>
                            <table style={{tableLayout:'fixed',borderCollapse:'collapse',textAlign:'left'}}>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>First Name</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.first_name}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>Last Name</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.last_name}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>Title</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.title}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>Office Symbol</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.office_symbol_alias}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>Work Phone</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.work_phone}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>Division</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.division_name}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>District</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.district_name}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>Email</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.email}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>User Type</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.user_type_label}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'8em'}}>Hras</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.hras}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(235,235,235)'}}>
                                    <th style={{width:'8em'}}>Status</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.status_comment}</td>
                                </tr>
                            </table>
                        </div>
                        </div>
                </div>

                

            
            
            </div>
            <div style={{display:'flex',justifyContent:executed ? 'flex-end':'space-between',padding:'1em',paddingTop:'0em',backgroundColor:'rgb(245,245,245)'}}>
                {!executed && <Button variant='contained' size='small' onClick={()=>setStep(2)} style={{fontSize:'0.85em'}} disabled={loading}>Back</Button>}
                {executed ? 
                <Button variant='contained' size='small' color='primary' onClick={()=>{setOpenPopup(false)}} style={{fontSize:'0.85em'}}>Close</Button>
                :
                <Button variant='contained' size='small' color='primary' onClick={()=>handleExecute()} style={{fontSize:'0.85em'}} disabled={loading}>Confirm Actions</Button>
                }
                
            </div>

            
        </div>
    )
}

export default connect(
    'selectUserToken',
    ApprovalFormStep3RegularUI);
