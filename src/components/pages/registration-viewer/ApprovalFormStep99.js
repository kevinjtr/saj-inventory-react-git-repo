import { Button } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


const ApprovalFormStep99 = (props) => {

    const {setOpenPopup,setLoading,loading,setStep,result,setResult} = props

    setLoading(false)

    return(
        <div style={{display:'flex',flexDirection:'column',textAlign:'center',padding:'1em'}}>
            <div style={{fontSize:'1.4em'}}>
                {result.error ?
                <div style={{display:'flex'}}>
                    <div>
                        <CancelOutlinedIcon style={{color:'rgb(255,150,150)',fontSize:'2em',marginTop:'0.2em',marginRight:'0.2em'}}/>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                        There was an error
                    </div>
                </div>
                :
                <div style={{display:'flex'}}>
                    <div>
                        <CheckCircleOutlineIcon style={{color:'rgb(150,255,150)',fontSize:'2em',marginTop:'0.2em',marginRight:'0.2em'}}/>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                        Registration has been deleted
                    </div>
                </div>}
            </div>
            <div>
            <Button style={{marginTop:'0.5em'}} size='small' variant='contained' color='primary' disabled={loading} onClick={()=>{setOpenPopup(false);setStep(0);setResult({})}}>
                Ok
            </Button>
            </div>
            
        </div>
    )
}

export default ApprovalFormStep99
