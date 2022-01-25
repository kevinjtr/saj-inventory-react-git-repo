import React, { Component } from 'react';
import { register } from '../publics/actions/users';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import logo from '../login.svg';
import { Grid,  TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, useFormik, Field, Form, ErrorMessage } from 'formik'
import { FormHelperText } from '@material-ui/core'
import api from '../axios/Api';
import MenuItem from '@material-ui/core/MenuItem';
import { dropDownStyles } from './styles/material-ui';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import * as yup from 'yup'
import ChipInput from 'material-ui-chip-input';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { values } from 'lodash';
import {registerUserApi} from '../publics/actions/register-api'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  
export default function Register(){
	
	const [DivisionItems, setDivisionItems] = React.useState([]);
	const [districtItems, setDistrictItems] = React.useState([]);
	const [officeItems, setOfficeItems] = React.useState([]);
	const [userItems, setUserItems] = React.useState([]);
	const [divisionSelection, setDivision] = React.useState("");
	const [districtSelection, setDistrict] = React.useState("");
	const [officeSelection, setOffice] = React.useState("");
	const [userSelection, setUser] = React.useState("");

	const divisionDropDownItems = DivisionItems.map((c, i)=>{
		return(
		 
		  <MenuItem value={c.value} name= {c.label} >
		  { c.label}
		  </MenuItem>
	
		)
		})

	const districtDropDownItems = districtItems.map((c, i)=>{
	return(
		
		<MenuItem value={c.value} name= {c.label} >
		{ c.label}
		</MenuItem>

	)
	})

	const officeSymbolDropDownItems = officeItems.map((c, i)=>{
	return(
		
		<MenuItem value={c.value} name= {c.label} >
		{c.label}
		</MenuItem>

	)
	})

	const userTypeDropDownItems = userItems.map((c, i)=>{
		console.log(c);
		return(
			
			<MenuItem value={c.value} name= {c.label} >
			{c.label}
			</MenuItem>

		)
	})
	
	const divisionSelectionChange = (event) =>{
	 setDivision(event.target.value);
	}
	  
	const districtSelectionChange = (event) =>{
	 setDistrict(event.target.value);
	}

	const officeSelectionChange = (event) =>{
	 setOffice(event.target.value);
	}

	const userSelectionChange = (event) =>{
	 setUser(event.target.value);
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
			.required("Required")
			.matches(phoneRegExp, "Enter valid phone number")
			.typeError("Enter valid phone number").required('Required'),
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
		// hras: yup
		// 	.array().of(yup.number())
		// 	.required()
		// 	.when('hraS', {
		// 		is: 2, // alternatively: (val) => val == true
		// 	})
	  });

	const formik = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
			title: '',
			email: '',
			work_phone: '',
			division: '',
			district: '' ,
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

	// React.useEffect(() => {
	// 		api.get(`register/registrationDropDownData`,{}).then((response) => response.data).then((data) => {
	// 		console.log(data)
	// 		if(data.status !== 400){
	// 			setDivisionItems(data.data.division.map(( properties ) => ({ label: properties.name, value: properties.id })));
	// 			setDistrictItems(data.data.district.map(( properties ) => ({ label: properties.name, value: properties.id })));
	// 			setOfficeItems(data.data.officeSymbol.map(( properties ) => ({ label: properties.name, value: properties.id })));
	// 			setUserItems(data.data.userType.map(( properties ) => ({ label: properties.name, value: properties.id })));
	// 		}
	// 		}).catch(function (error) {
	// 			setDivisionItems([])
	// 			setDistrictItems([])
	// 			setOfficeItems([])
	// 			setUserItems([])
	// 		}) 
	// }, []); 

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

	//Stops the form from submitting when the user hits enter
	function onKeyDown(keyEvent) {
		if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
		keyEvent.preventDefault();
		}
	}

	// api posting method
	const handleAdd = async (formValues) => {
		
		//alert(JSON.stringify(formValues, null, 2));
		let result = {}
		//console.log('equipmentbyHraCall')
		//setLoading(true)
		await registerUserApi(formValues)
		// api.post(`register/add`,{params: {newData: formValues}})
		.then((response) => response.data).then((data) => {
			result = data
			console.log(data)
			//setLoading(false)
			//setEquipments(data.status != 400 ? data.data : data)
			// this.setState({
			// 	equipments: data.status != 400 ? data.values: data,
			// 	setequipment: data
			// });
			//console.log(this.state.equipment.values);
			// console.log(this.props, this.state);
		}).catch(function (error) {
			//setLoading(false)
			//setEquipments([])
		});

		return result

	};

	const HRAFormField = () => {
		return(
			<div>
				<InputLabel>HRA Numbers</InputLabel>
				<ChipInput
					fullWidth
					id="hras"
					name="hras"
					value={formik.values.hras}
					onAdd={(chip) => handleChipAdd(chip)}
					onDelete={(c, index) => handleChipDelete(c,index)}
					onInput={(e) => handleChipInput(e)}
					//error={formik.touched.work_phone && Boolean(formik.errors.hras)}
					//helperText={formik.touched.work_phone && formik.errors.hras}
				/>
			</div>)
	} 
	
	return (
		<div>
		<form onKeyDown={onKeyDown} onSubmit={formik.handleSubmit}>
		<h2>Register</h2>
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
		  <InputLabel>Division</InputLabel>
		  <Select
		  	fullWidth
			id="division"
			name="division"
			value={formik.values.division}
			onChange={formik.handleChange}
			error={formik.touched.division && Boolean(formik.errors.division)}
			helperText={formik.touched.division && formik.errors.division}
			>	
			{divisionDropDownItems}
		  </Select>
		  <InputLabel>District</InputLabel>
		  <Select
		  	fullWidth
			id="district"
			name="district"
			value={formik.values.district}
			onChange={formik.handleChange}
			error={formik.touched.district && Boolean(formik.errors.district)}
			helperText={formik.touched.district && formik.errors.district}
			>	
			{districtDropDownItems}
		  </Select>
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
		  {formik.values.user_type === 2 ? HRAFormField() : null}
		   <Button color="primary" variant="contained" fullWidth type="submit">
          	Submit
           </Button>
      </form>
    </div>
	
	);
	
}
