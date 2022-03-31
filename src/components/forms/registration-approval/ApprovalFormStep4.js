import { Dialog, Button } from "@material-ui/core";
import React, {useState} from "react";

const ApprovalFormStep4 = (props) => {

    const {registrationRow, formData,setOpenPopup,setStep} = props

    return(
        <div>
            The below record will be created in the registered user table:
            

            {registrationRow.user_type_label.substring(0,3) === 'HRA' && formData.user_level.substring(0,3) !== 'HRA' && 
            <div style={{fontSize:'0.8em',color:'#360600'}}>
                <div><strong>Note:</strong> User requested {registrationRow.user_type_label} user level but will be assigned as {formData.user_level}.  No HRA number will be assigned.</div>
            </div>
            }
            <div style={{paddingTop:'25px',paddingBottom:'25px',display:'flex'}}>
                <div style={{display:'flex',flexDirection:'column',paddingRight:'25px'}}>
                    <div style={{width:'25%',whiteSpace:'nowrap',fontWeight:'bold'}}>EDIPI</div>
                    <div style={{width:'25%',whiteSpace:'nowrap'}}>{formData.edipi}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',paddingRight:'25px'}}>
                    <div style={{width:'25%',whiteSpace:'nowrap',fontWeight:'bold'}}>Full Name</div>
                    <div style={{width:'25%',whiteSpace:'nowrap'}}>{formData.first_name + " " + formData.last_name}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',paddingRight:'25px'}}>
                    <div style={{width:'25%',whiteSpace:'nowrap',fontWeight:'bold'}}>Employee ID</div>
                    <div style={{width:'25%',whiteSpace:'nowrap'}}>1198</div>
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <div style={{width:'25%',whiteSpace:'nowrap',fontWeight:'bold'}}>User Level</div>
                    <div style={{width:'25%',whiteSpace:'nowrap'}}>{formData.user_type_label}</div>
                </div>
            </div>

                <div style={{display:'flex',paddingTop:'5px'}}>
            <div style={{paddingRight:'3px',flexGrow:1}}>
                    <Button variant='contained' color='primary' style={{width:'100%'}} onClick={()=>setOpenPopup(false)}>
                        Confirm
                    </Button>
                </div>
                <div style={{paddingLeft:'3px',flexGrow:1}}>
                    <Button variant='contained' style={{width:'100%'}} onClick={()=>setStep(1)}>
                        Cancel
                    </Button>
                </div>
                </div>

        
            </div>
    )
}

export default ApprovalFormStep4
