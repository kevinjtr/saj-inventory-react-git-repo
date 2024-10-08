import { Button } from "@mui/material";
import React from "react";
import { connect } from 'redux-bundler-react';
import { useTheme } from '@mui/material/styles';

const ApprovalFormStep4 = (props) => {

    // Step 4 is only called if an existing matching EDIPI is found in the registered users table.  
    // If a matching EDIPI is found, the user is alerted and the assign registration process is aborted.

    const {setOpenPopup,registeredUserRow,user} = props

    //Styles
    const theme = useTheme();

    const bColor = {
		c1: theme.palette.mode == "dark" ? theme.palette.background.default : '#1c1c1c',
        c9: theme.palette.mode == "dark" ? theme.palette.background.default : '#c9deff',
        white: theme.palette.mode == "dark" ? theme.palette.background.default : 'white',
        rgb235: theme.palette.mode == "dark" ? theme.palette.background.default : 'rgb(235,235,235)',
        rgb240: theme.palette.mode == "dark" ? theme.palette.background.default : 'rgb(240,240,240)',
        rgb245: theme.palette.mode == "dark" ? theme.palette.background.default : 'rgb(245,245,245)',
        rgb255: theme.palette.mode == "dark" ? theme.palette.background.default : 'rgb(255,255,255)',
        rgba09:theme.palette.mode == "dark" ? theme.palette.background.default : 'rgba(0,0,0,0.9)',
	}
    
    return(
        <div style={{display:'flex',flexDirection:'column',textAlign:'center',padding:'1em'}}>
            <div style={{fontWeight:'600',color:'rgb(75,0,0)'}}>
                Unable to assign registration
            </div>
            <div style={{fontSize:'0.9'}}>
                The CAC number for this user has already been registered in the Inventory App.
            </div>
            {user === 'admin' && 
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:'1em'}}>
                <div>
                    <div style={{fontWeight:'600',textTransform:'uppercase',fontSize:'0.8em',backgroundColor:bColor.c9}}>
                        Existing Registered User
                    </div>
                    <div>
                        <table style={{tableLayout:'fixed',backgroundColor:bColor.white,fontSize:'0.9em',textAlign:'left',borderCollapse:'collapse',borderTop:'0',whiteSpace:'nowrap'}}>
                            <tr style={{backgroundColor:bColor.rgb240}}>
                                <th style={{width:'7em'}}>
                                    Full Name
                                </th>
                                <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>
                                    {registeredUserRow.full_name}
                                </td>
                            </tr>
                            <tr>
                                <th style={{width:'7em'}}>
                                    EDIPI
                                </th>
                                <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>
                                    {registeredUserRow.edipi}            
                                </td>
                            </tr>
                            <tr style={{backgroundColor:bColor.rgb240}}>
                                <th style={{width:'7em'}}>
                                    Employee Id
                                </th>
                                <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>
                                    {registeredUserRow.employee_id}
                                </td>
                            </tr>
                            <tr >
                                <th style={{width:'7em'}}>
                                    User Level
                                </th>
                                <td style={{display:'block',overflow:'hidden',whitespace:'nowrap',textOverflow:'ellipsis'}}>
                                    {registeredUserRow.user_level}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            }
            <div style={{marginTop:'1em'}}>
                <Button size='small' variant='contained' color='primary' onClick={()=>setOpenPopup(false)}>
                    Ok
                </Button>
            </div>
        </div>
    )
}

export default connect(
    'selectUserToken',
    'selectUser',
    ApprovalFormStep4);
