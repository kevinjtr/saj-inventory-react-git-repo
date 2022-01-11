import React, {useState} from 'react'


const ReportProblem = ({handleAddProblem,hideProblemForm}) => {
    
    // Problem Form States
    const[formData,setFormData] = useState([
        {fieldName:'problemText',fieldLabel:'Problem Description',fieldValue:'',fieldType:'text',required:true,fieldError:''},
        {fieldName:'email',fieldLabel:'Email',fieldValue:'',fieldType:'email',required:true,fieldError:''},
        {fieldName:'date',fieldLabel:'Date',fieldValue:'',fieldType:'date',required:false,fieldError:''},
        {fieldName:'type',fieldLabel:'Type',fieldValue:'signin',fieldType:'text',required:true,fieldError:''},
        {fieldName:'hasAttachment',fieldLabel:'Attachment',fieldValue:'',fieldType:'other',required:false,fieldError:''},
        {fieldName:'attachmentName',fieldLabel:'Filename',fieldValue:'',fieldType:'other',required:false,fieldError:''}
    ])

    const [submitted,setSubmitted] = useState(false)

    // Handle form changes, validate form data
    const handleChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        
        const newFormData = [...formData]

        const index = newFormData.findIndex((field)=>field.fieldName === fieldName)        
        newFormData[index].fieldValue = fieldValue;

        validateFormData(newFormData);
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const validateFormData = (formData) =>{

        formData.forEach((field)=>{

            if(field.required === true){
                if(field.fieldValue.trim() === ''){
                    field.fieldError = `${field.fieldLabel} is required`
                    return
                }
                else{
                    field.fieldError = ''
                }
            }

            if(field.fieldType === 'email'){
                if(!validateEmail(field.fieldValue.trim())){
                    field.fieldError = 'Enter a valid email'
                }
                else{
                    field.fieldError = ''
                }
            }
        })

        setFormData(formData)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()

        setSubmitted(true)

        validateFormData(formData)
        
        let valid = true

        formData.forEach((field)=>{
            if(field.fieldError !== ''){
                valid = false;
            }
        })

        if(valid === true){
            const newProblem = {
                problemText: formData.find(({ fieldName }) => fieldName === 'problemText' ).fieldValue,
                email: formData.find(({ fieldName }) => fieldName === 'email' ).fieldValue,
                date: new Date(),
                type: formData.find(({ fieldName }) => fieldName === 'type' ).fieldValue,
                hasAttachment: formData.find(({ fieldName }) => fieldName === 'hasAttachment' ).fieldValue,
                attachmentName: formData.find(({ fieldName }) => fieldName === 'attachmentName' ).fieldValue
            }

            handleAddProblem(newProblem)

            hideProblemForm('success')
        }
            
    }

    return(
            <div className="signin-form-container">
                <form onSubmit={handleSubmit} id="problemForm">
                    <div className="report-problem-title">Report a problem</div>
                        <div className="signin-form-row">
                            <div className="signin-form-item-full">
                                <label>Your Email</label>
                                <input 
                                    type="text"
                                    name="email"
                                    form="problemForm"
                                    onChange={handleChange}
                                    style={formData.find(({ fieldName }) => fieldName === 'email' ).fieldError !== '' && submitted === true ? {border:"1px solid rgba(255,0,0,0.75)"} : null}
                                ></input>
                                <div className="input-error">{formData.find(({ fieldName }) => fieldName === 'email' ).fieldError !== '' && submitted === true ? formData.find(({ fieldName }) => fieldName === 'email' ).fieldError:null}</div>
                            </div>
                        </div>
                        <div className="signin-form-row">
                            <div className="signin-form-item-full">
                                <label>Problem Description</label>
                                <textarea
                                    name="problemText"
                                    form="problemForm"
                                    onChange={handleChange}
                                    style={formData.find(({ fieldName }) => fieldName === 'problemText' ).fieldError !== '' && submitted === true ? {border:"1px solid rgba(255,0,0,0.75)"} : null}
                                />
                                <div className="input-error">{formData.find(({ fieldName }) => fieldName === 'problemText' ).fieldError !== '' && submitted === true ? formData.find(({ fieldName }) => fieldName === 'problemText' ).fieldError:null}</div>
                            </div>
                    </div>
                    <div className="signin-form-button-row">
                        <button type="submit" form="problemForm" className="signin-form-button" style={{marginRight:"10px"}}>Submit Problem</button>
                        <button type="button" className="signin-form-button" onClick={hideProblemForm}>Cancel</button>
                    </div>
                </form>  
            </div>
    )
}

export default ReportProblem