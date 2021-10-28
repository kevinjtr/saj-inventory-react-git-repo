import React, { Component } from 'react';
import { register } from '../publics/actions/users';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import logo from '../login.svg';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
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
import Header from './Header'
import InputLabel from '@material-ui/core/InputLabel';
import * as Yup from 'yup'



export default function Register(){
	//Validation
	const validationSchema = Yup.object({
		first_name: Yup.string().required("Required"),
		last_name: Yup.string().required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        work_phone: Yup.number().typeError("Enter valid phone number").required('Required'),
		division: Yup.string().required("Required"),
		district: Yup.string().required("Required"),
		office_symbol: Yup.string().required("Required"),
		user_type: Yup.string().required("Required")
    });
	
	//Format Data
	function formatPhoneNumber(phoneNumberString) {
		var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		if (match) {
		  return '(' + match[1] + ') ' + match[2] + '-' + match[3];
		}
		return null;
	  }
	  
	//Variables Declarations
	// const initialValues = {
	// 	first_name: '',
	// 	last_name: '',
	// 	email: '',
	// 	work_phone: '',
	// 	division:'',
	// 	district: '',
	// 	office_symbol: '',
	// 	user_type: ''
	// }

		const formik = useFormik({
		  initialValues: {
				first_name: '',
				last_name: '',
				email: '',
				work_phone: '',
				division:'',
				district: '',
				office_symbol: '',
				user_type: ''
			},
		  validationSchema: validationSchema,
		  onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		  }});	  

	

	//Styles Declarations
	const dropDownClasses = dropDownStyles (); 

	const gridStyles = makeStyles((theme) => ({
		root: {
		  flexGrow: 1,
		},
		paper: {
		  padding: theme.spacing(2),
		  textAlign: 'center',
		  color: theme.palette.text.secondary,
		},
		options: {
			flexGrow: 1,
			textAlign: 'center',
		  },
	  }));

	const classesGrid = gridStyles();

	//Hooks Declarations
	const [divisionSelection, setDivision] = React.useState("");

	const divisionSelectionChange = (event) =>{
	 setDivision(event.target.value);
	}
	
	const [officeSelection, setOffice] = React.useState("");
	  
	const officeSelectionChange = (event) =>{
	 setOffice(event.target.value);
	}
	
	const [districtSelection, setDistrict] = React.useState("");
	  
	const districtSelectionChange = (event) =>{
	 setDistrict(event.target.value);
	}
	
	const [userSelection, setUser] = React.useState("");
	  
	const userSelectionChange = (event) =>{
	 setUser(event.target.value);
	}
	
	const mapStateToProps = (state) => {
		return {
			users: state.users
		};
	};
	
	const [DivisionItems, setDivisionItems] = React.useState([]);
	//will run once.
	React.useEffect(() => {
	  //setLoading(true)
		  console.log('Division')
		  api.get(`register/division`,{}).then((response) => response.data).then((data) => {
		  console.log(data)
		  if(data.status != 400){
			setDivisionItems(data.data.map(( properties ) => ({ label: properties.name, value: properties.id })));
	
		  }
		  console.log(DivisionItems);
		}).catch(function (error) {
			setDivisionItems([])
		}) 
	  }, []); 
	
	  const divisionDropDownItems = DivisionItems.map((c, i)=>{
		console.log(c);
		return(
		 
		  <MenuItem value={c.value} name= {c.label} >
		  {c.value + '.' + c.label}
		  </MenuItem>
	
		)
		})
	
	
	
	const [districtItems, setDistrictItems] = React.useState([]);
	//will run once.
	React.useEffect(() => {
	  //setLoading(true)
		  console.log('District')
		  api.get(`register/district`,{}).then((response) => response.data).then((data) => {
		  console.log(data)
		  if(data.status != 400){
			setDistrictItems(data.data.map(( properties ) => ({ label: properties.name, value: properties.id })));
	
		  }
		  console.log(districtItems);
		}).catch(function (error) {
			setDistrictItems([])
		}) 
	  }, []); 
	
	  const districtDropDownItems = districtItems.map((c, i)=>{
		console.log(c);
		return(
		 
		  <MenuItem value={c.value} name= {c.label} >
		  {c.value + '.' + c.label}
		  </MenuItem>
	
		)
		})
	
	
	const [officeItems, setOfficeItems] = React.useState([]);
	//will run once.
	React.useEffect(() => {
	  //setLoading(true)
		  console.log('Office Symbol')
		  api.get(`register/officeSymbol`,{}).then((response) => response.data).then((data) => {
		  console.log(data)
		  if(data.status != 400){
			setOfficeItems(data.data.map(( properties ) => ({ label: properties.name, value: properties.id })));
	
		  }
		  console.log(officeItems);
		}).catch(function (error) {
			setOfficeItems([])
		}) 
	  }, []); 
	
	  const officeSymbolDropDownItems = officeItems.map((c, i)=>{
		console.log(c);
		return(
		 
		  <MenuItem value={c.value} name= {c.label} >
		  {c.value + '.' + c.label}
		  </MenuItem>
	
		)
		})
	
		const [userItems, setUserItems] = React.useState([]);
	//will run once.
	React.useEffect(() => {
	  //setLoading(true)
		  console.log('Office Symbol')
		  api.get(`register/userType`,{}).then((response) => response.data).then((data) => {
		  console.log(data)
		  if(data.status != 400){
			setUserItems(data.data.map(( properties ) => ({ label: properties.name, value: properties.id })));
	
		  }
		  console.log(userItems);
		}).catch(function (error) {
			setUserItems([])
		}) 
	  }, []); 
	
	  const userTypeDropDownItems = userItems.map((c, i)=>{
		console.log(c);
		return(
		 
		  <MenuItem value={c.value} name= {c.label} >
		  {c.value + '.' + c.label}
		  </MenuItem>
	
		)
		})
	
	
	return (
		<>
		<Header/>
		<Grid>
			<form  onSubmit={formik.handleSubmit}>
			<div className={classesGrid.paper}>
				<div textAlign='center'>
					<h2>Register</h2>
				</div>
				<br/>
				<br/>
				<Grid container spacing={3}>
					<Grid item xs={4}>
						<InputLabel>First Name</InputLabel>
						<TextField
							id="first-name"
							key="first-name"
							name="first_name"
							value={formik.values.first_name}
							onChange={formik.handleChange}
							error={formik.touched.first_name && Boolean(formik.errors.first_name)}
							helperText={formik.touched.first_name && formik.errors.first_name}
							style={{ width: 300 }}/>
					</Grid>
					<Grid item xs={4}>
						<InputLabel>Last Name</InputLabel>
						<TextField
							id="last-name"
							key="last-name"
							name="last_name"
							value={formik.values.last_name}
							onChange={formik.handleChange}
							error={formik.touched.last_name && Boolean(formik.errors.last_name)}
							helperText={formik.touched.last_name && formik.errors.last_name}
							style={{ width: 300 }} />
					</Grid>
					<Grid item xs={4}>
					<InputLabel>Email</InputLabel>
					<TextField
						id="email"
						key="email"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						style={{ width: 300 }} />
				</Grid>
				<Grid item xs={4}>
					<InputLabel>Work Phone Number</InputLabel>
					<TextField
						id="work-phone-number"
						key="work-phone-number"
						name="work_phone"
						value={formik.values.work_phone}
						onChange={formik.handleChange}
						error={formik.touched.work_phone && Boolean(formik.errors.work_phone)}
						helperText={formik.touched.work_phone && formik.errors.work_phone}
						style={{ width: 300 }} />
				</Grid>
				<Grid item xs={4}>
					<InputLabel>Division</InputLabel>
					<FormControl className={dropDownClasses.formControl}>
					<Select
						id="Division"
						name="division"
						value={divisionSelection}
						onChange={divisionSelectionChange}
						error={formik.touched.division && Boolean(formik.errors.division)}
						helperText={formik.touched.division && formik.errors.division}
						style={{ width: 300 }}
					>	
					{divisionDropDownItems}
					</Select>			
					</FormControl>
				</Grid>
				<Grid item xs={4}>
					<InputLabel>District</InputLabel>
					<FormControl className={dropDownClasses.formControl}>
					<Select
					  id="District"
					  name="district"
					  value={districtSelection}
					  onChange={districtSelectionChange}
					  error={formik.touched.district && Boolean(formik.errors.district)}
					  helperText={formik.touched.district && formik.errors.district}
					  style={{ width: 300 }}
					>
					{districtDropDownItems}
					</Select>
					</FormControl>
				</Grid>
				<Grid item xs={4}>
					<InputLabel>Office Symbol</InputLabel>
					<FormControl className={dropDownClasses.formControl}>
					<Select
					  id="Office_Symbol"
					  name="office_symbol"
					  value={officeSelection}
					  onChange={divisionSelectionChange}
					  error={formik.touched.office_symbol && Boolean(formik.errors.office_symbol)}
					  helperText={formik.touched.office_symbol && formik.errors.office_symbol}
					  style={{ width: 300 }}
					>
					{officeSymbolDropDownItems}
					</Select>
				</FormControl>
				</Grid>
				<Grid item xs={4}>
					<InputLabel>User Type</InputLabel>
					<FormControl className={dropDownClasses.formControl}>
					<Select
					  id="User_Type"
					  name="user_type"
					  value={userSelection}
					  onChange={userSelectionChange}
					  error={formik.touched.user_type && Boolean(formik.errors.user_type)}
					  helperText={formik.touched.user_type && formik.errors.user_type}
					  style={{ width: 300 }}
					>
					{userTypeDropDownItems}
					</Select>
				</FormControl>
				<br/>
				<br/>
				<br/>
				<Button type="submit"  variant="contained">Submit</Button>
				</Grid>
				<br/>

				</Grid>
			</div>

				  {/* <FormControl component="fieldset">
					<FormLabel component="legend">User Type</FormLabel>
					<RadioGroup row aria-label="position" name="position" defaultValue={requested_action} onChange={(event)=>setSelectedForm( {...selectedForm,requested_action:event.target.value} )}>
					  <FormControlLabel id="radio-HRA" key="radio-HRA" value="Hand Reciept Account Holder" control={<Radio color="primary" />} label="Hand Reciept Account Holder" />
					  <FormControlLabel id="radio-" key="radio-" value="Transfer" control={<Radio color="primary" />} label="Transfer" />
					  <FormControlLabel id="radio-end" key="radio-end" value="Repair" control={<Radio color="primary" />} label="Repair" />
					</RadioGroup>
				  </FormControl> */}
			</form>
		</Grid>
		</>
	)
	
}