import { Dialog } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import ApprovalFormStep1 from "./ApprovalFormStep1";
import ApprovalFormStep2 from "./ApprovalFormStep2";
import ApprovalFormStep3 from "./ApprovalFormStep3";
import ApprovalFormStep4 from "./ApprovalFormStep4";
import ApprovalFormStep98 from "./ApprovalFormStep98";
import ApprovalFormStep99 from "./ApprovalFormStep99";
import { LoadingCircle } from "../../tools/tools";

const ApprovalFormContainer = (props) => {

    const {openPopup,setOpenPopup,registrationRow,handleTableDelete,step,setStep,result,setResult} = props

    const [formData,setFormData] = useState(() =>{
        registrationRow.user_level = registrationRow.user_type_label === 'HRA' ? 'HRA Level 1' : 'Regular Level 1'
        return registrationRow
    })

    // Loading variable for this component
    const [loading,setLoading] = useState(false)

    const handleChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {...formData}

        newFormData[fieldName] = fieldValue

        setFormData(newFormData)
    }

    const handleSubmit = () => {

        if(formData.user_level === 'HRA Level 1' || formData.user_level === 'HRA Level 2' ){
            setStep(3)
        } else {
            setStep(4)
        }

    }

    return(
        <Dialog open={openPopup} >
            <div style={{position:'relative'}}>
            {loading &&
            <div style={{position:'absolute',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',top:0,bottom:0,left:0,right:0,backgroundColor:'rgba(255,255,255,0.75)'}}>
                <LoadingCircle />
            </div>}
            <div style={{display:'flex',flexDirection:'column',padding:'10px'}}>
                {step === 1 &&
                <ApprovalFormStep1
                    formData={formData} 
                    handleSubmit={handleSubmit} 
                    handleChange={handleChange} 
                    setOpenPopup={setOpenPopup}
                />
                }
                {step === 2 &&
                <ApprovalFormStep2 
                    formData={formData} 
                    handleSubmit={handleSubmit} 
                    handleChange={handleChange} 
                    setOpenPopup={setOpenPopup}
                />
                }
                {step === 3 &&
                <ApprovalFormStep3
                    setStep={setStep}
                />
                }
                {step === 4 &&
                <ApprovalFormStep4
                    formData={formData}
                    registrationRow={registrationRow} 
                    setStep={setStep} 
                    setOpenPopup={setOpenPopup}
                />
                }


                {/* Steps 98-99 are the Delete steps */}
                {step === 98 &&
                <ApprovalFormStep98
                    registrationRow={registrationRow}
                    handleTableDelete={handleTableDelete}
                    setLoading={setLoading}
                    loading={loading}
                    setOpenPopup={setOpenPopup}
                />}
                {step === 99 &&
                <ApprovalFormStep99
                    setLoading={setLoading}
                    loading={loading}
                    setOpenPopup={setOpenPopup}
                    setStep={setStep}
                    result={result}
                    setResult={setResult}
                />}
            </div>
            </div>
        </Dialog>
    )
}

export default ApprovalFormContainer;
