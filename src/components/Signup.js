import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik'
import { FormHelperText } from '@material-ui/core'
import * as yup from 'yup'
import MenuItem from '@material-ui/core/MenuItem';
import api from '../axios/Api';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ChipInput from 'material-ui-chip-input';
import { Row,  Col } from 'react-bootstrap';
import {registrationDropDownItems} from './config/constants'
import findIndex from 'lodash/findIndex'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Signup = () => {
    const paperStyle = { padding: 20, width: 450, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const [dropDownData,setDropDownData] = React.useState()
    const [DivisionItems, setDivisionItems] = React.useState([]);
	const [districtItems, setDistrictItems] = React.useState([]);
	const [officeItems, setOfficeItems] = React.useState([]);
	const [userItems, setUserItems] = React.useState([]);
    const [inputChips,setInputChips] = React.useState([]);
    const [districtDropDownItems,setDistrictDropDownItems] = React.useState([]);

	const divisionDropDownItems = registrationDropDownItems.division.map((c, i)=>{
      
		return(
		 
		  <MenuItem id={c.symbol} key={c.symbol} value={c.value} name={c.label} >
		  { c.label}
		  </MenuItem>
	
		)
		})
        
		//let districtDropDownItems = []
        // registrationDropDownItems.district.map((c, i)=>{
		// 	return(
			 
		// 	  <MenuItem value={c.value} name= {c.symbol} >
        //       {c.label}
		// 	  </MenuItem>
		
		// 	)
		// })

		const officeSymbolDropDownItems = registrationDropDownItems.officeSymbol.map((c, i)=>{
			return(
			 
			  <MenuItem value={c.value} name= {c.label} >
			  {c.label}
			  </MenuItem>
		
			)
			})

			const userTypeDropDownItems = registrationDropDownItems.userType.map((c, i)=>{
				console.log(c);
				return(
				 
				  <MenuItem value={c.value} name= {c.label} >
				  {c.label}
				  </MenuItem>
			
				)
				})


	const [divisionSelection, setDivision] = React.useState("");

	const divisionSelectionChange = (event) =>{
	 setDivision(event.target.value);
	}

	const [districtSelection, setDistrict] = React.useState("");
	  
	const districtSelectionChange = (event) =>{
	 setDistrict(event.target.value);
	}

	const [officeSelection, setOffice] = React.useState("");
	  
	const officeSelectionChange = (event) =>{
	 setOffice(event.target.value);
	}

	const [userSelection, setUser] = React.useState("");
	  
	const userSelectionChange = (event) =>{
	 setUser(event.target.value);
	}





// Handle Chip Input
function handleChipInput (e) {
    if(formik.values.hras.length < 3){
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
	//return ((chip.length === 3) && (Number.isInteger(chip)))
};
// Add Chip
function handleChipAdd (chip) {
    formik.setFieldValue('hras',[...formik.values.hras,chip])
};

// Delete Chip
function handleChipDelete (c, index) {
    const dataDelete = [...formik.values.hras]
    dataDelete.splice(index,1)
    formik.setFieldValue('hras',[...dataDelete])
};

//preventing submit on enter
function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13){
      keyEvent.preventDefault();
    }
  } 

  // api posting method
const handleAdd = async (formValues) => {
			
    //alert(JSON.stringify(formValues, null, 2));
    let result = {}
    //console.log('equipmentbyHraCall')
    await api.post(`register/add`,{params: {newData: formValues}}).then((response) => response.data).then((data) => {
        result = data
        console.log(data)
    }).catch(function (error) {
    });

    return result

}
const HRAFormField = () => {
    return(
        <div>
            <InputLabel>HRA Numbers</InputLabel>
            <ChipInput
                required={formik.values.hras.length > 0 ? false : true}
                fullWidth
                id="hras"
                name="hras"
                value={formik.values.hras}
                onBeforeAdd={(chip) => onBeforeChipAdd(chip)}
                onAdd={(chip) => handleChipAdd(chip)}
                onDelete={(c, index) => handleChipDelete(c,index)}
                onInput={(e) => handleChipInput(e)}
                helperText="Please hit enter after each HRA number you type"
                //error={formik.touched.work_phone && Boolean(formik.errors.hras)}
                //helperText={formik.touched.work_phone && formik.errors.hras}
            />
        </div>)
} 

const filteredDistricts = (e) => {

    const division_value = e.target.value
    const idx = findIndex(registrationDropDownItems.division,function(d){ return d.value === division_value})


    if(idx !== -1){
        const {symbol} =registrationDropDownItems.division[idx]
        const ddItems = registrationDropDownItems.district[symbol].map((c, i)=>{
			return(
			 
			  <MenuItem value={c.value} name={c.symbol} >
              {c.label}
			  </MenuItem>
		
			)
		})

        setDistrictDropDownItems([...ddItems])
        //console.log(districtDropDownItems)
        return
    }

    setDistrictDropDownItems([])
    
    //     return(
         
    //       <MenuItem value={c.value} name= {c.label} >
    //       {c.label}
    //       </MenuItem>
    
    //     )
    // })
}

		const validationSchema = yup.object({
			first_name: yup
				.string("Required")
				.required("Required"),
			last_name: yup
				.string("Required")
				.required("Required"),
            title: yup
				.string("Required")
				.required("Required"),
			email: yup
				.string("Required")
				.email("Enter valid email")
				.required("Required"),
			work_phone: yup
				.string("Required")
				.matches(phoneRegExp, "Enter valid phone number")
				.typeError("Enter valid phone number")
                .required("Required"),
			division: yup
				.mixed()
				.notOneOf(divisionDropDownItems)
				.required("Required"),
			district: yup
				.mixed()
				.notOneOf(districtDropDownItems)
				.required("Required"),
			office_symbol: yup
				.mixed()
				.notOneOf(officeSymbolDropDownItems)
				.required("Required"),
			user_type: yup
				.mixed()
				.notOneOf(userTypeDropDownItems)
				.required("Required"),
		  });

	const formik = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
            title: '',
			email: '',
            work_phone: '',
			division: '',
			district: '',
			office_symbol: '',
			user_type: '',
			hras: [],
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
		  alert(JSON.stringify(values, null, 2));
          handleAdd(values);
		},
	  });

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                </Grid>
                <Grid align='center'>
                    <form onKeyDown={onKeyDown} onSubmit={formik.handleSubmit}>
                    <br/>
                    <br/>
                    <Row>
                    <Col style={{columnGap: "5px"}}>
                    <InputLabel>First Name</InputLabel>
                    <TextField
                        fullWidth
                        id="first_name"
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                    />
                    <br/>
                    <br/>
                    <InputLabel>Last Name</InputLabel>
                    <TextField
                        fullWidth
                        id="last_name"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && formik.errors.last_name}
                    />
                    <br/>
                    <br/>
                    <InputLabel>Title</InputLabel>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <br/>
                    <br/>
                    <InputLabel>Email</InputLabel>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <br/>
                    <br/>
                    <InputLabel>Work Phone Number</InputLabel>
                    <TextField
                        fullWidth
                        id="work_phone"
                        name="work_phone"
                        value={formik.values.work_phone}
                        onChange={formik.handleChange}
                        error={formik.touched.work_phone && Boolean(formik.errors.work_phone)}
                        helperText={formik.touched.work_phone && formik.errors.work_phone}
                    />
                    <br/>
                    <br/>
                    </Col>
                    <Col>
                    <InputLabel>Division</InputLabel>
                    <Select
                        fullWidth
                        id="division"
                        name="division"
                        value={formik.values.division}
                        onChange={(e)=>{formik.handleChange(e);filteredDistricts(e);}}
                       // onChange={"formik.handleChange; filteredDistricts(divisionDropDownItems.)"}
                        //onm={filteredDistricts(divisionDropDownItems.userSelection.label)}
                        error={formik.touched.division && Boolean(formik.errors.division)}
                        helperText={formik.touched.division && formik.errors.division}
                        >	
                        {divisionDropDownItems}
                    </Select>
                    <br/>
                    <br/>
                    <InputLabel>District</InputLabel>
                    <Select
                        fullWidth
                        id="district"
                        name="district"
                        disabled={formik.values.division === ''}
                        value={formik.values.district}
                        onChange={formik.handleChange}
                        error={formik.touched.district && Boolean(formik.errors.district)}
                        helperText={formik.touched.district && formik.errors.district}
                        >	
                        {districtDropDownItems}
                    </Select>
                    <br/>
                    <br/>
                    <InputLabel>Office Symbol</InputLabel>
                    <Select
                        fullWidth
                        id="office_symbol"
                        name="office_symbol"
                        value={formik.values.office_symbol}
                        onChange={formik.handleChange}
                        error={formik.touched.office_symbol && Boolean(formik.errors.office_symbol)}
                        helperText={formik.touched.office_symbol && formik.errors.office_symbol}
                        >	
                        {officeSymbolDropDownItems}
                    </Select>
                    <br/>
                    <br/>
                    <InputLabel>User Type</InputLabel>
                    <Select
                        fullWidth
                        id="user_type"
                        name="user_type"
                        value={formik.values.user_type}
                        onChange={formik.handleChange}
                        error={formik.touched.user_type && Boolean(formik.errors.user_type)}
                        helperText={formik.touched.user_type && formik.errors.user_type}
                        >	
                        {userTypeDropDownItems}
                    </Select>
                    <br/>
                    <br/>
                    {formik.values.user_type === 2 ? HRAFormField() : null}
                    <br/>
                    <br/>
                    <br/>
                    </Col>
                    </Row>
                    <Row>
                    <Button color="primary" variant="contained" fullWidth type="submit" align="center">
                    Submit
                    </Button>
                    </Row>
                </form>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Signup;