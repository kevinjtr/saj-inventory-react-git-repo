import { Button } from "@material-ui/core";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';


const ApprovalFormStep98 = (props) => {

     // Step 98 is the Delete (Yes/Cancel) prompt

    const {registrationRow, handleTableDelete, setOpenPopup,setLoading, loading} = props

    return(
        <div style={{display:'flex',flexDirection:'column',overflowX:'auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#1c1c1c'}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:'0.75em',fontWeight:'600',color:'white',paddingLeft:'0.25em'}}>
                        Confirm Delete
                    </div>
                    <div className='assign-registration-close' style={{display:'flex',cursor:'pointer',padding:'0.25em'}} onClick={()=>setOpenPopup(false)}>
                        <CloseIcon style={{color:'white',fontSize:'1em'}}/>
                    </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',padding:'1em',backgroundColor:'rgb(245,245,245)'}}>
            <div style={{width:'18em',display:'flex',flexDirection:'column',border:'1px solid rgb(225,225,225)',backgroundColor:'rgb(255,255,255)',padding:'1em',borderRadius:'1em',boxShadow: '0px 4px 6px 0px rgba(0,0,0,0.2)'}}>
                <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'1.25em',fontWeight:'600',color:'#225dd4'}}>    
                    Delete Registration
                </div>
                <div style={{fontSize:'1em',color:'gray',textAlign:'center',marginBottom:'1em'}}>record will be marked as deleted</div>
                    <table style={{tableLayout:'fixed',width:'100%',backgroundColor:'white',fontSize:'0.75em',textAlign:'left',borderCollapse:'collapse',borderTop:'0',whiteSpace:'nowrap'}}>
                        <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                            <th style={{width:'7em'}}>First Name</th>
                            <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>
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
                                    <th style={{width:'7em'}}>Last Name</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>
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
                                <tr>
                                    <th style={{width:'7em'}}>EDIPI</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.edipi}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th style={{width:'7em'}}>Office</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.office_symbol_alias}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'7em'}}>Title</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.title}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th style={{width:'7em'}}>Work Phone</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.work_phone}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'7em'}}>Email</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.email}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th style={{width:'7em'}}>Division</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.division_name}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'7em'}}>District</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.district_name}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th style={{width:'7em'}}>User Type</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.user_type_label}</td>
                                </tr>
                                <tr>
                                    <th style={{width:'7em'}}>Hras</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.hras}</td>
                                </tr>
                                <tr style={{backgroundColor:'rgb(240,240,240)'}}>
                                    <th style={{width:'7em'}}>Status</th>
                                    <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>{registrationRow.status_comment}</td>
                                </tr>
                            </table>
                        </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'1em'}}>
                <Button style={{marginRight:'0.5em'}} fullWidth size='small' variant='contained' disabled={loading} onClick={()=>setOpenPopup(false)}>
                    Cancel
                </Button>
                <Button style={{marginLeft:'0.5em'}} fullWidth size='small' variant='contained' color='primary' disabled={loading} onClick={()=>{setLoading(true);handleTableDelete(registrationRow.id)}}>
                    Confirm
                </Button>
            </div>
            
        </div>
        </div>
    )
}

export default ApprovalFormStep98
