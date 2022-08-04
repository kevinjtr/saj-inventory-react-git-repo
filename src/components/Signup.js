import React, {useState, useEffect} from 'react'
import api from '../axios/Api';
import ChipInput from 'material-ui-chip-input';
import {registrationDropDownItems} from './config/constants'
import findIndex from 'lodash/findIndex'
import {registerUserApi} from '../publics/actions/register-api'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import AdornedButton from '../containers/AdornedButton'

const buttonStyles = makeStyles((theme) => ({
    fabLightBlue: {
      color: theme.palette.common.white,
      backgroundColor: blue[400],
      '&:hover': {
        backgroundColor: blue[500],
      },
      //height:'50px',
      //width:'20%',
      //marginTop: '50px',
      //marginBottom:'50px'
    },
  }));

const Signup = ({hideNewAccountForm, handleLoading,setSelectedTab}) => {

    // Create state array for registration form data
    const[formData,setFormData] = useState([
        {fieldName:'firstName',fieldLabel:'First Name',fieldValue:'',fieldType:'text',required:true,fieldError:''},
        {fieldName:'lastName',fieldLabel:'Last Name',fieldValue:'',fieldType:'text',required:true,fieldError:''},
        {fieldName:'email',fieldLabel:'Email',fieldValue:'',fieldType:'email',required:true,fieldError:''},
        {fieldName:'title',fieldLabel:'Job Title',fieldValue:'',fieldType:'text',required:true,fieldError:''},
        {fieldName:'workPhone',fieldLabel:'Work Phone',fieldValue:'',fieldType:'phone',required:true,fieldError:''},
        {fieldName:'division',fieldLabel:'Division',fieldValue:'',fieldType:'select',required:true,fieldError:''},
        {fieldName:'district',fieldLabel:'District',fieldValue:'',fieldType:'select',required:true,fieldError:''},
        {fieldName:'officeSymbol',fieldLabel:'Office Symbol',fieldValue:'',fieldType:'select',required:true,fieldError:''},
        {fieldName:'userType',fieldLabel:'User Type',fieldValue:'',fieldType:'select',required:true,fieldError:''},
        {fieldName:'hras',fieldLabel:'HRA',fieldValue:[],fieldType:'chip',required:true,fieldError:''},
        {fieldName:'office_location_id',fieldLabel:'Office Location',fieldValue:'',fieldType:'select',required:false,fieldError:''}
    ]);

    // Create shortcuts for the registration form data array
    const firstName = formData.find(({ fieldName }) => fieldName === 'firstName' );
    const lastName = formData.find(({ fieldName }) => fieldName === 'lastName' );
    const email = formData.find(({ fieldName }) => fieldName === 'email' );
    const title = formData.find(({ fieldName }) => fieldName === 'title' );
    const workPhone = formData.find(({ fieldName }) => fieldName === 'workPhone' );
    const division = formData.find(({ fieldName }) => fieldName === 'division' );
    const district = formData.find(({ fieldName }) => fieldName === 'district' );
    const officeSymbol = formData.find(({ fieldName }) => fieldName === 'officeSymbol' );
    const userType = formData.find(({ fieldName }) => fieldName === 'userType' );
    const hras = formData.find(({ fieldName }) => fieldName === 'hras' );
    const office_location_id = formData.find(({ fieldName }) => fieldName === 'office_location_id' );

    // Create state variables for chip input
    const [showChip,setShowChip] = useState(false)
    const [myChips,setMyChips] = useState([])
    const [officeLocationError,setOfficeLocationError] = useState('')

    const [submitted,setSubmitted] = useState(false)
    const [submitButton, setSubmitButton] = React.useState({
        active:false,
        send:false,
      });

    const textFieldstyles = {
        label: {fontSize:'16px'},
        textField: {fontSize:'15px'},
        error: {fontSize: '14px'},
        select: {fontSize:'15px',height:'30px'},
    }

    const buttonClasses = buttonStyles();

    // Handle registration form changes, call validate form data
    const handleChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
            
        const newFormData = [...formData]
    
        const index = newFormData.findIndex((field)=>field.fieldName === fieldName)        
        newFormData[index].fieldValue = fieldValue;

        // Reset district and office_location boxes
        if(fieldName === 'division'){
            newFormData.find(({ fieldName }) => fieldName === 'district' ).fieldValue = '';
            newFormData.find(({fieldName}) => fieldName === 'office_location_id').fieldValue=''
            setOfficeLocationDDItems([])
            setOfficeLocationError('')
        }
        //Show chip input if user type is HRA
        else if(fieldName ==='userType' && fieldValue === '2'){
            setShowChip(true)
        }
        //Hide chip input if user type is not HRA
        else if(fieldName ==='userType' && fieldValue !== '2'){
            setShowChip(false)
        } 
        // Reset office locations
        else if (fieldName === 'district'){
            newFormData.find(({fieldName}) => fieldName === 'office_location_id').fieldValue=''
            setOfficeLocationError('')
        } else if (fieldName === 'office_location_id'){
            setOfficeLocationError('')
        }
        
        validateFormData(newFormData);

    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePhone = (phone) => {
        return String(phone)
            .toLowerCase()
            .match(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
            );
    };
    
    const validateFormData = (formData) =>{

        formData.forEach((field)=>{
                     
            if(field.required === true && typeof(field.fieldValue) === 'string'){
                field.fieldError = field.fieldValue.trim() === '' ? `${field.fieldLabel} is required.` : '';
            }

            if(field.fieldType === 'email'){
                field.fieldError = validateEmail(field.fieldValue.trim()) ? '' : 'Enter a valid email';
            }

            if(field.fieldType === 'phone'){
                field.fieldError = validatePhone(field.fieldValue.trim()) ? '' : 'Enter a valid phone number.';
            }

            if(field.fieldName === 'hras'){
                field.fieldError = field.fieldValue.length === 0 ? 'An HRA number is required':''
            }
        
            // If show chip is disabled, ignore error on hras
            if(!showChip && field.fieldName === 'hras'){
                field.fieldError = ''
            }

        })

        setFormData(formData)

        let valid = true;

        formData.forEach((field)=>{
            if(field.fieldError !== ''){
                valid = false
            }
        })

        if(officeLocationDDItems.length !== 0 && !parseInt(office_location_id.fieldValue)){
            valid =false
            setOfficeLocationError('Office location is required')
        }

        return valid
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setSubmitted(true);

        if(validateFormData(formData) && officeLocationError === ''){
            const newAccount = {
                first_name: firstName.fieldValue,
                last_name: lastName.fieldValue,
                email: email.fieldValue,
                title: title.fieldValue,
                work_phone: workPhone.fieldValue,
                division: division.fieldValue,
                district: district.fieldValue,
                office_symbol: officeSymbol.fieldValue,
                user_type: parseInt(userType.fieldValue),
                hras: hras.fieldValue,
                office_location_id: office_location_id.fieldValue
        }


        handleAdd(newAccount);
        
        }
    }

        // api posting method
    const handleAdd = async (formValues) => {

            handleLoading()
            //alert(JSON.stringify(formValues, null, 2));
            let result = {}

            await registerUserApi(formValues)
            //await api.post(`register/add`,{params: {newData: formValues}})
            .then((response) => response.data).then((data) => {
                
                result = data
                setSubmitButton((prev) => ({...prev, send:false}))
                //console.log(data)
                //console.log([data])
                //console.log([data][0])
            }).catch(function (error) {
                setSubmitButton((prev) => ({...prev, send:false}))
            });

            hideNewAccountForm(result);
    
            return result
    
    }

    const [districtDropDownItems,setDistrictDropDownItems] = useState([]);
    const [officeLocationDDItems,setOfficeLocationDDItems] = useState([]);

	const divisionDropDownItems = registrationDropDownItems.division.map((c, i)=>{
		return( 
            <option id={c.symbol} key={c.symbol} value={c.value} name={c.label} title={c.label} > {c.label}</option> 
        )})

	const officeSymbolDropDownItems = registrationDropDownItems.officeSymbol.map((c, i)=>{
		return(
			<option value={c.value} name= {c.label} > {c.label} </option>
		)})

	const userTypeDropDownItems = registrationDropDownItems.userType.map((c, i)=>{
		return(
			<option value={c.value} name= {c.label} > {c.label} </option>
		)})

    // Handle Chip Input
    function handleChipInput (e) {
        if(myChips.length < 3){
            e.target.value = e.target.value.replace(/[^0-9]/g, '')

            if (e.target.value.length > 3) {
                e.target.value = e.target.value.substring(0,3)
            } 
            return;
        }

        e.target.value = ''
    };

    // Handle Chip Input
    function onBeforeChipAdd (chip) {
        return (chip.length === 3)
    };
    // Add Chip
    function handleChipAdd (chip) {
        const chipAdd = [...myChips]
        chipAdd.push(chip)
        setMyChips(chipAdd)
    };

    // Delete Chip
    const handleChipDelete = (c, index) => {
        const chipDelete = [...myChips]
        chipDelete.splice(index,1)
        setMyChips(chipDelete)
    };

    useEffect(() => { 
        const newFormData = [...formData]
        newFormData.find(({ fieldName }) => fieldName === 'hras' ).fieldValue = myChips;
        validateFormData(newFormData)
     }, [myChips])

    //preventing submit on enter
    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13){
        keyEvent.preventDefault();
        }
    } 

    useEffect(()=>{
        if(officeLocationDDItems.length === 0){
            setOfficeLocationError('')
        }
    },[officeLocationDDItems])



    const filteredDistricts = (e) => {

        const division_value = parseInt(e.target.value)

        const idx = findIndex(registrationDropDownItems.division,function(d){return d.value === division_value})

        if(idx !== -1){
            const {symbol} =registrationDropDownItems.division[idx]
            const ddItems = registrationDropDownItems.district[symbol].map((c, i)=>{
                return(
                
                <option value={c.symbol} name={c.symbol} >
                {c.label}
                </option>
            
                )
            })

            setDistrictDropDownItems([...ddItems])
            return
            
        }

        setDistrictDropDownItems([])
        
    }

    const filteredOfficeLocations = (e) => {

        // District value is a string symbol
        const district_value = e.target.value

        const division_id = parseInt(division.fieldValue)

        
        //console.log(division_id)

        // Get index using district symbol
        const idx = findIndex(registrationDropDownItems.districts,function(d){return d.symbol === district_value})

        //console.log(idx)

        if(idx !== -1){

            // Get district id using index
            const {id:district_id} =registrationDropDownItems.districts[idx]
            //console.log(district_id)
            const ddItems = registrationDropDownItems.officeLocation.filter((o)=>{ 
                return (o.division === division_id && o.district === district_id)}).map((c, i)=>{
                    //console.log(c)
                    return(
                        <option value={c.id} name={c.name} >
                            {c.name}
                        </option>
                    )
              
            })

            //console.log(ddItems)

            setOfficeLocationDDItems([...ddItems])

            //console.log(office_location_id.fieldValue)
            
            return
            
        }

        setOfficeLocationDDItems([])
        
    }

    return (
        <div className="signin-form-container">
            <div style={{fontSize:'12px',cursor:'pointer'}} onClick={()=>setSelectedTab(1)}>
                
                <Button color="primary" size="small"><ArrowBackIosIcon style={{fontSize:'11px'}}/>Sign In</Button>
            </div>
            <div style={{fontWeight:'bold',marginBottom:'10px',marginTop:'5px'}}>Create New Account</div>        
            <form onKeyDown={onKeyDown} onSubmit={handleSubmit}>
                <div className="signin-form-row">
                    <div className="signin-form-item">
                    <label for="firstName" style={textFieldstyles.label}>First Name</label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName"
                        value={firstName.fieldValue}
                        style={{...textFieldstyles.textField, ...(firstName.fieldError !== '' && submitted === true && {border: "1px solid rgba(255,0,0,0.75)"})} }
                        onChange={handleChange} 
                    ></input>
                    <div className="input-error" style={textFieldstyles.error}>{firstName.fieldError !== '' && submitted === true ? firstName.fieldError:null}</div>
                    </div>
                    <div className="signin-form-item">
                    <label for="lastName" style={textFieldstyles.label}>Last Name</label>
                    <input 
                        type="text" 
                        id="lastName"
                        name="lastName"
                        value={lastName.fieldValue}
                        style={{...textFieldstyles.textField, ...(lastName.fieldError !== '' && submitted === true && {border: "1px solid rgba(255,0,0,0.75)"})} }
                        onChange={handleChange} 
                    ></input>
                    <div className="input-error" style={textFieldstyles.error}>{lastName.fieldError !== '' && submitted === true ? lastName.fieldError:null}</div>
                    </div>
                </div>
                <div className="signin-form-row">
                    <div className="signin-form-item-full">
                    <label for="email" style={textFieldstyles.label}>Email</label>
                    <input 
                        type="text" 
                        id="email"
                        name="email"
                        value={email.fieldValue}
                        style={{...textFieldstyles.textField, ...(email.fieldError !== '' && submitted === true && {border: "1px solid rgba(255,0,0,0.75)"})} }
                        onChange={handleChange} 
                    ></input>
                    <div className="input-error" style={textFieldstyles.error} >{email.fieldError !== '' && submitted === true ? email.fieldError:null}</div>
                    </div>
                </div>
                <div className="signin-form-row">
                    <div className="signin-form-item">
                    <label for="title" style={textFieldstyles.label}>Job Title</label>
                    <input 
                        type="text" 
                        id="title"
                        name="title"
                        value={title.fieldValue}
                        style={{...textFieldstyles.textField, ...(title.fieldError !== '' && submitted === true && {border: "1px solid rgba(255,0,0,0.75)"})} }
                        onChange={handleChange} 
                    ></input>
                    <div className="input-error" style={textFieldstyles.error}>{title.fieldError !== '' && submitted === true ? title.fieldError:null}</div>
                    </div>
                    <div className="signin-form-item">
                    <label for="work_phone" style={textFieldstyles.label}>Work Phone</label>
                    <input 
                        type="text" 
                        id="workPhone"
                        name="workPhone"
                        maxlength="12"
                        value={workPhone.fieldValue}
                        style={{...textFieldstyles.textField, ...(workPhone.fieldError !== '' && submitted === true && {border: "1px solid rgba(255,0,0,0.75)"})} }
                        onChange={handleChange} 
                    ></input>
                    <div className="input-error" style={textFieldstyles.error}>{workPhone.fieldError !== '' && submitted === true ? workPhone.fieldError:null}</div>
                    </div>
                </div>

                <div className="signin-form-row">
                    <div className="signin-form-item">
                    <label for="division" style={textFieldstyles.label}>Division</label>
                    <select  
                        id="division"
                        name="division"
                        value={division.fieldValue}
                        style={{...textFieldstyles.select, ...(division.fieldError !== '' && submitted === true && {border: "1px solid rgba(255,0,0,0.75)"})} }
                        onChange={(e)=>{handleChange(e);filteredDistricts(e)}}
                        ><option selected disabled hidden style={{display:'none'}}></option>{divisionDropDownItems}</select>
                    <div className="input-error" style={textFieldstyles.error}>{division.fieldError !== '' && submitted === true ? division.fieldError:null}</div>
                    </div>
                    <div className="signin-form-item">
                    <label for="district" style={textFieldstyles.label}>District</label>
                    <select 
                        id="district"
                        name="district"
                        value={district.fieldValue}
                        disabled={division.fieldValue === ''}
                        onChange={(e)=>{handleChange(e);filteredOfficeLocations(e)}} 
                        style={{...textFieldstyles.select, ...(district.fieldError !== '' && submitted === true && {border: "1px solid rgba(255,0,0,0.75)"})} }
                        ><option selected disabled hidden style={{display:'none'}}></option>{districtDropDownItems}</select>
                    <div className="input-error" style={textFieldstyles.error}>{district.fieldError !== '' && submitted === true ? district.fieldError:null}</div>
                    </div>
                    </div> 
            
                    
                    <div 
                       
                        className="signin-form-row"
                    >
                        
                        <div className="signin-form-item-full">
                        <label for="office_location_id" style={textFieldstyles.label}>Office Location</label>
                            <select
                            id="office_location_id"
                            name="office_location_id"
                            value={office_location_id.fieldValue}
                            onChange={handleChange}
                            disabled={officeLocationDDItems.length === 0}
                            style={{...textFieldstyles.select, ...(officeLocationError !== '' && submitted === true && {border: "1px solid rgba(255,0,0,0.75)"})} }
                            >
                                <option selected disabled hidden style={{display:'none'}}></option>
                                {officeLocationDDItems}
                            </select>
                            <div className="input-error">{officeLocationError !== '' && submitted === true ? officeLocationError:null}</div>
                        </div>
                    </div>
                    

                    <div className="signin-form-row">
                    <div className="signin-form-item">
                    <label for="office_symbol" style={textFieldstyles.label}>Office Symbol</label>
                    <select 
                        id="officeSymbol"
                        name="officeSymbol"
                        value={officeSymbol.fieldValue}
                        onChange={handleChange} 
                        style={{...textFieldstyles.select, ...(officeSymbol.fieldError !== '' && submitted === true && {border: "1px solid rgba(255,0,0,0.75)"})} }
                        ><option selected disabled hidden style={{display:'none'}}></option>{officeSymbolDropDownItems}</select>
                    <div className="input-error" style={textFieldstyles.error}>{officeSymbol.fieldError !== '' && submitted === true ? officeSymbol.fieldError:null}</div>
                    </div>
                    <div className="signin-form-item">
                    <label for="user_type" style={textFieldstyles.label}>User Type</label>
                    <select 
                        id="userType"
                        name="userType"
                        value={userType.fieldValue}
                        onChange={handleChange}
                        style={{...textFieldstyles.select, ...(userType.fieldError !== '' && submitted === true && {border: "1px solid rgba(255,0,0,0.75)"})} }
                    ><option selected disabled hidden style={{display:'none'}}></option>{userTypeDropDownItems}</select>
                    <div className="input-error" style={textFieldstyles.error}>{userType.fieldError !== '' && submitted === true ? userType.fieldError:null}</div>
                    </div>
                    </div>

                    {showChip && 
                    <>
                    
                        <div className='signin-form-row'>
                            
                            <div className='signin-form-item-full'>
                                <label>HRA Numbers</label>
                                <ChipInput
                                    fullWidth
                                    placeholder='Type HRA number and press enter to add'
                                    className='new-account-chip'
                                    value={myChips}
                                    onAdd={(chip) => handleChipAdd(chip)}
                                    onDelete={(chip,index) => handleChipDelete(chip,index)}
                                    blurBehavior='clear'
                                    onBeforeAdd={(chip) => onBeforeChipAdd(chip)}                                    
                                    onInput={(e) => handleChipInput(e)}   
                                    disableUnderline={true}                
                                />
                                <div className="input-error">{hras.fieldError !== '' && submitted === true ? hras.fieldError:null}</div>

                            </div>   
                        </div>
                        </>
                    }    

                    <div className='signin-form-button-row'>
                    <Button style={{fontSize:'16px',width:"160px",height:"40px"}} type="submit" className={buttonClasses.fabLightBlue} {...(submitButton.send && {disabled:true})}> 
                    Submit
                    </Button>

                    {/* <Button disabled={} className={buttonClasses.fabLightBlue} >
                    Submit
                    </Button> */}
                    </div>
                    
                </form>
                </div>
    )
}

export default Signup;