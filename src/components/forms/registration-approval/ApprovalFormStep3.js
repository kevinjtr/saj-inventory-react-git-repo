import { Dialog, Button } from "@material-ui/core";
import React, {useState} from "react";

const ApprovalFormStep3 = (props) => {

    const {setStep} = props

    return(
        <div>
            <div>No HRA record exists, would you like to create a new HRA record?</div>
            <Button variant='contained' color='primary' onClick={()=>setStep(3)}>Yes</Button>
            <Button variant='contained' onClick={()=>setStep(1)}>Cancel</Button>
        </div>
    )
}

export default ApprovalFormStep3
