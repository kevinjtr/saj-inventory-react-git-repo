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
import ChipInput from 'material-ui-chip-input'
import { values } from 'lodash';


export default function Register(){

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
	const [districtItems, setDistrictItems] = React.useState([]);
	const [officeItems, setOfficeItems] = React.useState([]);
	const [userItems, setUserItems] = React.useState([]);
	//will run once.
	React.useEffect(() => {
	  //setLoading(true)
		  api.get(`register/registrationDropDownData`,{}).then((response) => response.data).then((data) => {
		  console.log(data)
		  if(data.status !== 400){
			setDivisionItems(data.data.division.map(( properties ) => ({ label: properties.name, value: properties.id })));
			setDistrictItems(data.data.district.map(( properties ) => ({ label: properties.name, value: properties.id })));
			setOfficeItems(data.data.officeSymbol.map(( properties ) => ({ label: properties.name, value: properties.id })));
			setUserItems(data.data.userType.map(( properties ) => ({ label: properties.name, value: properties.id })));
		}
		}).catch(function (error) {
			setDivisionItems([])
			setDistrictItems([])
			setOfficeItems([])
			setUserItems([])
		}) 
	  }, []); 
	
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


	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

	//Validation
	const validationSchema = Yup.object({
		first_name: Yup.string().required("Required"),
		last_name: Yup.string().required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        work_phone: Yup.string().matches(phoneRegExp, "Enter valid phone number").typeError("Enter valid phone number").required('Required'),
		division: Yup.mixed().notOneOf(divisionDropDownItems).required("Required"),
		district: Yup.mixed().notOneOf(districtDropDownItems).required("Required"),
		office_symbol: Yup.mixed().notOneOf(officeSymbolDropDownItems).required("Required"),
		user_type: Yup.mixed().notOneOf(userTypeDropDownItems).required("Required"),
		hras: Yup.string().required("Required")
    });

	
	const formik = useFormik({
		initialValues: {
			  first_name: '',
			  last_name: '',
			  email: '',
			  work_phone: '',
			  division:'',
			  district: '',
			  office_symbol: '',
			  user_type: '',
			  hras:''
		  },
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(formik.values, null, 2));
			console.log('button was clicked.');
		//   alert(JSON.stringify(values, null, 2));
		//   console.log(values);
		}
		});
		
		/* const onButtonSubmit = () => {
			alert(JSON.stringify(formik.values, null, 2));
			console.log('button was clicked.');
		}; */

		const HRAFormField = () => { 
			return(
				<Grid item xs={4}>
					<InputLabel>HRA Numbers</InputLabel>
					<TextField
						id="hras"
						key="hras"
						name="hras"
						value={formik.values.hras}
						onChange={formik.handleChange}
						error={formik.touched.work_phone && Boolean(formik.errors.hras)}
						helperText={formik.touched.work_phone && formik.errors.hras}
						style={{ width: 300 }} />
				</Grid>)
		}
	    const formValues = formik.values;

		const handleAdd = async (formValues) => {
			alert(JSON.stringify(formValues, null, 2));
			let result = {}
			//console.log('equipmentbyHraCall')
			//setLoading(true)
			await api.post(`register/addi`,{params: {changes: formValues}}).then((response) => response.data).then((data) => {
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
		
		}
	
	return (
		<>
		<Header/>
		<Grid>
		<form onSubmit={formik.handleSubmit}>
			<div className={classesGrid.paper}>
				<div textAlign='center'>
					<h2>Register</h2>
					<br/>
					<br/>
					<h5 style={{ color: 'red' }} >Please note all fields are required.</h5>
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
						value={formik.values.division}
						onChange={formik.handleChange}
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
					  value={formik.values.district}
					  onChange={formik.handleChange}
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
					  value={formik.values.office_symbol}
					  onChange={formik.handleChange}
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
					  value={formik.values.user_type}
					  onChange={formik.handleChange}
					  error={formik.touched.user_type && Boolean(formik.errors.user_type)}
					  helperText={formik.touched.user_type && formik.errors.user_type}
					  style={{ width: 300 }}
					>
					{userTypeDropDownItems}
					</Select>
				</FormControl>
				</Grid>
				{formik.values.user_type === 2 ? HRAFormField() : null}
				</Grid>
				<br/>
				<br/>
				<br/>
				<Button type="submit" name="a-button" variant="contained" onClick="handleAdd()">Submit</Button>
			</div>
			</form>
		</Grid>
		</>
		
	)
	
}