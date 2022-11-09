// import { AccountProfile } from '../components/account/account-profile';
// import { AccountProfileDetails } from '../components/account/account-profile-details';
// import { DashboardLayout } from '../components/dashboard-layout';
import React, { useEffect, useState, useContext } from 'react';
import {
    Avatar,
    Box,
    Container,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Divider,
    Grid,
    TextField,
    Typography,
    Select,
    MenuItem
} from '@mui/material';
import {getEmployeeByEDIPI, updateEmployeeApi} from "../publics/actions/employee-api"
import { connect } from 'redux-bundler-react';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';
import {registrationDropDownItems} from "./config/constants"
import {LoadingCircle} from './tools/tools';
import { AlertContext } from "./context/AlertProvider";
import Notification from "./tools/Notification";
import {LoadingButton} from '@mui/lab';
import {Close as CloseIcon, Save as SaveIcon} from '@mui/icons-material';
import { green, grey } from '@mui/material/colors';
import {diff} from "lodash"
import { Formik, useFormik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const buttonClasses = {
  fab: {
    margin: 2,
  },
  absolute: {
    position: 'absolute',
    //top: theme.spacing(2),
    right: 3,
    //right: '0',
    //marginTop:'10px'
  },
  fabGreen: {
    color: "common.white",
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
    //height:'50px',
    width:'20%',
    //marginTop: '50px',
    //marginBottom:'50px'
  },
  fabGrey: {
    color: "common.white",
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[600],
    },
    //height:'50px',
    width:'20%',
    //marginTop: '50px',
    //marginBottom:'50px'
  },
}

const ObjectDifference = (obj1, obj2, notInclude=null) => {
  
  // Make sure an object to compare is provided
  if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
    return obj1;
  }

  //
  // Variables
  //

  var diffs = {};
  var key;


  //
  // Methods
  //

  /**
   * Check if two arrays are equal
   * @param  {Array}   arr1 The first array
   * @param  {Array}   arr2 The second array
   * @return {Boolean}      If true, both arrays are equal
   */
  var arraysMatch = function (arr1, arr2) {

    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    // Otherwise, return true
    return true;

  };

  /**
   * Compare two items and push non-matches to object
   * @param  {*}      item1 The first item
   * @param  {*}      item2 The second item
   * @param  {String} key   The key in our object
   */
  var compare = function (item1, item2, key) {

    // Get the object type
    var type1 = Object.prototype.toString.call(item1);
    var type2 = Object.prototype.toString.call(item2);

    // If type2 is undefined it has been removed
    if (type2 === '[object Undefined]') {
      diffs[key] = null;
      return;
    }

    // If items are different types
    if (type1 !== type2) {
      diffs[key] = item2;
      return;
    }

    // If an object, compare recursively
    if (type1 === '[object Object]') {
      var objDiff = diff(item1, item2);
      if (Object.keys(objDiff).length > 0) {
        diffs[key] = objDiff;
      }
      return;
    }

    // If an array, compare
    if (type1 === '[object Array]') {
      if (!arraysMatch(item1, item2)) {
        diffs[key] = item2;
      }
      return;
    }

    // Else if it's a function, convert to a string and compare
    // Otherwise, just compare
    if (type1 === '[object Function]') {
      if (item1.toString() !== item2.toString()) {
        diffs[key] = item2;
      }
    } else {
      if (item1 !== item2 ) {
        diffs[key] = item2;
      }
    }

  };


  //
  // Compare our objects
  //

  // Loop through the first object
  for (key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if(key != notInclude){
        compare(obj1[key], obj2[key], key);
      }
    }
  }

  // Loop through the second object and find missing items
  for (key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (!obj1[key] && obj1[key] !== obj2[key] && (key != notInclude)) {
        diffs[key] = obj2[key];
      }
    }
  }

  // Return the object of differences
  return diffs;

}
// const user = {
// avatar: '/static/images/avatars/avatar_6.png',
// city: 'Los Angeles',
// country: 'USA',
// jobTitle: 'Senior Developer',
// name: 'Katarina Smith',
// timezone: 'GTM-7'
// };

// const states = [
//     {
//       value: 'alabama',
//       label: 'Alabama'
//     },
//     {
//       value: 'new-york',
//       label: 'New York'
//     },
//     {
//       value: 'san-francisco',
//       label: 'San Francisco'
//     }
//   ];
  
const AccountProfile = ({user, setUser}) => (
<Card>
    <CardContent>
    <Box
        sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
        }}
    >
        <Avatar
        // src={user.avatar}
        sx={{
            height: 64,
            mb: 2,
            width: 64
        }}
        />
        <Typography
        color="textPrimary"
        gutterBottom
        variant="h5"
        >
        {`${user.first_name} ${user.last_name}`}
        </Typography>
        <Typography
        color="textSecondary"
        variant="body2"
        >
        {`CE${user.district_symbol}-${user.office_symbol_alias}`}
        </Typography>
        <Typography
        color="textSecondary"
        variant="body2"
        >
        Application Employee ID: {user.id}
        </Typography>
    </Box>
    </CardContent>
    {/* <Divider />
    <CardActions>
    <Button
        color="primary"
        fullWidth
        variant="text"
    >
        Upload picture
    </Button>
    </CardActions> */}
</Card>
);

const AccountProfileDetails = ({userToken, user, setUser, triggerNotification, submitButton, setSubmitButton}) => {
  const [values, setValues] = useState({...user});

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
			.matches(/^[0-9]*$/, "Enter valid phone number")
      .min(4, 'Minimum 4 digits')
      .max(10, 'Maximum 10 digits')
			.typeError("Enter valid phone number").required('Required'),
    office_location_id: yup
			.mixed()
			.notOneOf(registrationDropDownItems.officeLocation)
			.required("Required"),
	  });

	const formik = useFormik({
		initialValues: {
			...user
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
      triggerNotification()
      //console.log("here")
		    //alert(JSON.stringify(values, null, 2));
		    //handleAdd(values);
		},
	  });

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  const handleSubmit = async () => {
    setSubmitButton({...submitButton, send: true})

    await updateEmployeeApi({changes:{'0':{newData:[values], oldData:[user]}}}, userToken).then((response) => response.data).then((data) => {
        const {error} = data

        if(!error){
            setSubmitButton({...submitButton, send: false, active: false})
        }else{
            setSubmitButton({...submitButton, send: false, active: false})
        }
        
    }).catch(function (error) {
        setSubmitButton({...submitButton, send: false, active: false})
    });
  }

  // useEffect(() => {
  //   const dif_obj = ObjectDifference(values,user)

  //   console.log(dif_obj)

  //   if(Object.keys(dif_obj).length > 0){
  //     setSubmitButton(prev => ({...prev,active:true}))
  //   }else{
  //     setSubmitButton(prev => ({...prev,active:false}))
  //   }

  // },[values])

  return (
    <form onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
			          helperText={formik.touched.first_name && formik.errors.first_name}
                label="First name"
                name="first_name"
                onChange={formik.handleChange}
                required
                value={formik.values.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
			          helperText={formik.touched.last_name && formik.errors.last_name}
                label="Last name"
                name="last_name"
                onChange={formik.handleChange}
                required
                value={formik.values.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                error={formik.touched.title && Boolean(formik.errors.title)}
			          helperText={formik.touched.title && formik.errors.title}
                label="Title"
                name="title"
                onChange={formik.handleChange}
                required
                value={formik.values.title}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={formik.touched.work_phone && Boolean(formik.errors.work_phone)}
                helperText={formik.touched.work_phone && formik.errors.work_phone}
                fullWidth
                label="Work phone"
                name="work_phone"
                onChange={formik.handleChange}
                type="number"
                value={formik.values.work_phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={formik.handleChange}
                required
                value={formik.values.email}
                variant="outlined"
                error={formik.touched.email && Boolean(formik.errors.email)}
			          helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Select
                fullWidth
                label="Office Location"
                name="office_location_id"
                onChange={formik.handleChange}
                autoWidth
                error={formik.touched.office_location_id && Boolean(formik.errors.office_location_id)}
			          helperText={formik.touched.office_location_id && formik.errors.office_location_id}
                // SelectProps={{ native: true }}
                value={formik.values.office_location_id}
                variant="outlined"
                MenuProps={MenuProps}
              >
                {registrationDropDownItems.officeLocation.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                  // <option
                  //   key={option.id}
                  //   value={option.id}
                  // >
                  //   {option.name}
                  // </option>
                ))}
              </Select>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <LoadingButton startIcon={<SaveIcon />} loadingPosition="start" type="submit" sx={ formik.dirty ? buttonClasses.fabGreen : buttonClasses.fabGrey} {...((!(formik.dirty) || submitButton.send) && {disabled:true})} {...((submitButton.send) && {loading:true})}> 
          Save
          </LoadingButton>
          {/* <Button
          onClick={triggerNotification}
            color="primary"
            variant="contained"
          >
            Save details
          </Button> */}
        </Box>
      </Card>
    </form>
  );
};

const Account = ({userToken}) => {

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitButton, setSubmitButton] = React.useState({
    active:false,
    send:false,
  });

  const { actions } = useContext(AlertContext);
  const alertTypes = ["success", "warning", "info", "error"];
  const selectedType =
    alertTypes[Math.floor(Math.random() * alertTypes.length)];

  const triggerNotification = () => {
    actions.addAlert({
      text: "Notification text",
      title: ` Clicked on ${selectedType}`,
      type: selectedType,
      id: Date.now()
    });
  };

  useEffect(() => {
    actions.clearAlert();
    setLoading(true)

    getEmployeeByEDIPI(userToken).then((response) => response.data).then((data) => data.data).then((employee) => {
      if(Object.keys(employee).length > 0){
        console.log(employee)
        setUser(employee)
      }

      setLoading(false)

      }).catch(function (error) {
        setLoading(false)
          //setLoading(false)
          //setRegistrations([])
      })

  },[])

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3,textAlign:"center" }}
            variant="h4"
          >
            Account
          </Typography>
          <Grid
            container
            spacing={3}
          >
            {loading ? (
              <Grid
                item
                sx={{textAlign:"center",width:"100%"}}
              >
              <LoadingCircle/>
              </Grid>
            ) : (
              <>
                <Grid
                  item
                  lg={4}
                  md={6}
                  xs={12}
                >
                {Object.keys(user).length > 0 ? <AccountProfile user={user} setUser={setUser} /> : null}
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={6}
                  xs={12}
                >
                  {Object.keys(user).length > 0 ? <AccountProfileDetails userToken={userToken} user={user} setUser={setUser} triggerNotification={triggerNotification} submitButton={submitButton} setSubmitButton={setSubmitButton} /> : null}
                  
                </Grid>
                </>
            )}

          </Grid>
        </Container>
      </Box>
      <Notification />
    </>
  )
}

export default connect(
	'selectUserToken',
	Account);  
