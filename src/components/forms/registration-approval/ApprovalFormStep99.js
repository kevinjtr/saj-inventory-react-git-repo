import { Button } from "@material-ui/core";
import React from "react";


const ApprovalFormStep99 = (props) => {

     // Step 98 is the Delete (Yes/Cancel) prompt

    const {setOpenPopup,setLoading,loading,setStep,result,setResult} = props

    setLoading(false)

    return(
        <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
            <div style={{fontSize:'1.4em'}}>{result.error ? 'There was an error' : 'Registration record has been deleted' }</div>
            
            <div>
            <Button style={{margin:'10px',marginBottom:'0'}} variant='contained' color='primary' disabled={loading} onClick={()=>{setOpenPopup(false);setStep(0);setResult({})}}>Ok</Button>
            </div>
            
        </div>
    )
}

export default ApprovalFormStep99
