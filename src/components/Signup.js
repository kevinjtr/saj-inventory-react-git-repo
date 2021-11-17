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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const [DivisionItems, setDivisionItems] = React.useState([]);
	const [districtItems, setDistrictItems] = React.useState([]);
	const [officeItems, setOfficeItems] = React.useState([]);
	const [userItems, setUserItems] = React.useState([]);

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

	React.useEffect(() => {
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
    //setLoading(true)
    await api.post(`register/add`,{params: {newData: formValues}}).then((response) => response.data).then((data) => {
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
		const HRAFormField = () => { 
			return(
				<div>
					<InputLabel>HRA Numbers</InputLabel>
					<TextField
						fullWidth
						id="hras"
						name="hras"
						value={formik.values.hras}
						onChange={formik.handleChange}
						error={formik.touched.work_phone && Boolean(formik.errors.hras)}
						helperText={formik.touched.work_phone && formik.errors.hras}
						 />
                     <br/>
                     <br/>
				</div>)
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
			hras: '',
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
                <Grid align='left'>
                    <form onKeyDown={onKeyDown} onSubmit={formik.handleSubmit}>
                    <br/>
                    <br/>
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
                    <br/>
                    <br/>
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
                    <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                    </Button>
                </form>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Signup;