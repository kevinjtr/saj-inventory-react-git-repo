import { Button } from "@material-ui/core";
import React from "react";


const ApprovalFormStep98 = (props) => {

     // Step 98 is the Delete (Yes/Cancel) prompt

    const {registrationRow, handleTableDelete, setOpenPopup,setLoading, loading} = props

    return(
        <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
            <div style={{fontSize:'1.4em'}}>Mark this record as deleted?</div>
            <div>
                <div style={{paddingTop:'25px',paddingBottom:'25px',display:'flex'}}>
                <div style={{display:'flex',flexDirection:'column',paddingRight:'25px'}}>
                    <div style={{width:'20%',whiteSpace:'nowrap',fontWeight:'bold'}}>EDIPI</div>
                    <div style={{width:'20%',whiteSpace:'nowrap'}}>{registrationRow.edipi}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',paddingRight:'25px'}}>
                    <div style={{width:'20%',whiteSpace:'nowrap',fontWeight:'bold'}}>Full Name</div>
                    <div style={{width:'20%',whiteSpace:'nowrap'}}>{registrationRow.first_name + " " + registrationRow.last_name}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',paddingRight:'25px'}}>
                    <div style={{width:'20%',whiteSpace:'nowrap',fontWeight:'bold'}}>Division</div>
                    <div style={{width:'20%',whiteSpace:'nowrap'}}>{registrationRow.division_symbol}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',paddingRight:'25px'}}>
                    <div style={{width:'20%',whiteSpace:'nowrap',fontWeight:'bold'}}>District</div>
                    <div style={{width:'20%',whiteSpace:'nowrap'}}>{registrationRow.district_symbol}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <div style={{width:'20%',whiteSpace:'nowrap',fontWeight:'bold'}}>Level Requested</div>
                    <div style={{width:'20%',whiteSpace:'nowrap'}}>{registrationRow.user_type_label} {registrationRow.hras && <>({registrationRow.hras})</>}</div>
                </div>
            </div>
            </div>
            <div>
            <Button style={{marginRight:'10px'}} variant='contained' color='primary' disabled={loading} onClick={()=>{setLoading(true);handleTableDelete(registrationRow.id)}}>Yes</Button>
            <Button style={{marginLeft:'10px'}} variant='contained' disabled={loading} onClick={()=>setOpenPopup(false)}>Cancel</Button>
            </div>
            
        </div>
    )
}

export default ApprovalFormStep98
