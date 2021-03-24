import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './eng4900.css';

import Card4844 from '../Card4844';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Paper from '@material-ui/core/Paper';

import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import SearchIcon from '@material-ui/icons/Search';


import api from '../../axios/Api';

const plusButtonStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    alignSelf: 'flex-end'
  },
}));

//import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
//import CheckBoxIcon from '@material-ui/icons/CheckBox';
//import Favorite from '@material-ui/icons/Favorite';
//import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const textFieldSizes = {
    input1: {
      height: 50
    },
    input2: {
      height: 200,
      fontSize: "3em"
    }
  };

const texFieldStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  options: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      textAlign: 'center',
    },
  },
}));

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

const itemMenuStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const phoneTextFieldStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const AvatarStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      height:20,
      width:20
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));
  
  function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
  
  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };
  
  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };


export default function FormPropsTextFields() {

    const componentDidMount = async () => {
		
		// );
		// console.log(this.state);
	};
    //text fields
  const classesTextField = texFieldStyles();


  const handle4844sChange = (event) => {
    setEng4844s(event.target.value);
  };

  const classesItemMenu = itemMenuStyles();
  const [reqAction, setReqAction] = React.useState('');

  const handleItemMenuChange = (event) => {
    setReqAction(event.target.value);
  };

 

  // dates
const [selectedDate, setSelectedDate] = React.useState(new Date());

const handleDateChange = (date) => {
  setSelectedDate(date);
};
//phone numbers
  const classesPhoneTextField = phoneTextFieldStyles();
  const [values, setValues] = React.useState({
    textmaskghr: '(   )    -    ',
    textmasklhr: '(   )    -    ',
    numberformat: '1320',
  });

  const handlePhoneTextFieldChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  //check box 

  const [state, setState] = React.useState({
    issue: false,
    transfer: false,
    repair: false,
    excess: false,
    foi: false,
    temporaryLoan: false
  });

  const handleCheckBoxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [eng4844s, setEng4844s] = React.useState([]);

  //grids
  const classesGrid = gridStyles();

  //simpleMenu

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //menu items


 


 //Avatars

 const avatarClasses = AvatarStyles();

 const disableFields = {
     PBO: true,
     logistics: true,
     HRA: false,
     user: false
 }

 //plus button

 const plusButtonClasses = plusButtonStyles();

 const handle4844Search = () => {

  console.log('4844ByHraCall')
		api.post(`eng4844/search`,{}).then((response) => response.data).then((data) => {
      console.log(data)
      setEng4844s(data.status != 400 ? data.data : data)
			// this.setState({
			// 	equipments: data.status != 400 ? data.values: data,
			// 	setequipment: data
			// });
			//console.log(this.state.equipment.values);
			// console.log(this.props, this.state);
    }).catch(function (error) {
      setEng4844s([])
    });
    
  
  // const tempProps = {...props};
  //  const searchResult = await tempProps.getEquipmentByHraID(hraId)
  //  if(!searchResult.error){
  //   equipments = searchResult.data
  //  }
 }


// const eng4900s = [{hraName:"Anderson, Thomas",
// category: "hard disk drive",
// date_added: "2020-11-18T18:49:24.000Z",
// date_updated: "2020-11-18T18:49:27.000Z",
// description: "Seagate",
// id: 2,
// image: "eng4900.png",
// barTags:["77701","77702","77703"],
// product_name: "External Hard Drive",
// quantity: 9},
// {hraName:"Smith, John",
// category: "laptop",
// date_added: null,
// date_updated: "2020-11-30T19:33:52.000Z",
// description: null,
// id: 1,
// image: "eng4900.png",
// barTags:["66601","66602","66603"],
// product_name: "iphone",
// quantity: 5},
// {hraName:"Gates, Richard",
// category: "hard disk drive",
// date_added: null,
// date_updated: "2020-11-24T20:45:02.000Z",
// description: null,
// id: 3,
// image: "eng4900.png",
// barTags:["55501","55502","55503"],
// product_name: "laptopcilla",
// quantity: 56}]

function CardProduct(form){
	return (
    <div className="container" style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '21px' }}>
    <div className="col-md-12 card" style={{ textAlign: 'left', margin: 10 }}>
          <div style={{display:'inline'}}>
          {/* <img src={product.image} alt="" style={{height:"25%",width:"25%",display:'inline'}} /> */}
      <h4 style={{ marginTop: '20px' }}>ENG44844 - Doc Num:</h4>
              <h4 >{form[0].DOCUMENT_NUM}</h4>
          </div>
          
      <hr />
      
              <small>Acquisition Date: {form[0].ACQUISITION_DATE}</small>
      <small>Nomenclature: {form[0].NOMENCLATURE}</small>
      <small>Serial Number: {form[0].SERIAL_NUM}</small>
              {/* <small>Bar Tags: </small>
              <small>{btPrint} </small> */}
      <div className="row" style={{ margin: 3,marginTop:'10px' }}>
        {/* <Link to={'/edit/' + product.id} style={{ margin: 3,marginTop:'10px' }}>
          <input type="submit" value="View" className="btn btn-primary" />
        </Link> */}
        {/* <Link onClick={deleteConfirm} style={{ margin: 2 }}>
          <input type="submit" value="Edit" className="btn btn-warning" />
        </Link> */}
      </div>
      <br />
    </div>
  </div>
	);
}

const cards = eng4844s.map((form) => {
    return CardProduct(form);
});

let showForm = false

console.log(eng4844s)

  return (
    <div>
        <div style={{textAlign: 'center'}}>
      <h2 >Find ENG 4844</h2>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
                Open Menu - Search
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Open Menu - Search</MenuItem>
                <MenuItem onClick={handleMenuClose}>Open Menu - Update</MenuItem>
                <MenuItem onClick={handleMenuClose}>Open Menu - Create</MenuItem>
            </Menu>
            
      </div>
      <div style={{textAlign: 'center'}}>
      
    </div>
    <div style={{textAlign: 'center'}}>
        <form className={classesTextField.root} noValidate autoComplete="off">
            <div className={classesGrid.options}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                            <TextField id="outlined-search" label="Search by HRA" type="search" variant="outlined"/> 
                            <TextField id="outlined-search" label="Search by Bar Tag" type="search" variant="outlined" /> 
                            <FormControl variant="outlined" className={classesItemMenu.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={""}
                        //onChange={handleChange}
                        label="Sort By"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Sort By - HRA NAME</MenuItem>
                        <MenuItem value={20}>Sort By - HOLDER NAME</MenuItem>
                        <MenuItem value={30}>Sort By - BARTAG NUMBER</MenuItem>
                        <MenuItem value={40}>Sort By - HRA NUMBER</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton aria-label="search" color="primary" onClick={handle4844Search}>
                            <SearchIcon style={{ fontSize: 40 }}/>
                    </IconButton>
                    </Grid>
                </Grid>
            </div>
        </form>
    </div>

    {cards ? <div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <h3 style={{ justifyContent: 'center' }}>List Of 4844s and 4844-1s</h3>
        <div className="card-title">
            <div style={{ justifyContent: 'center' }}>{cards}</div>
        </div>
    </div> : null}
    </div>
  );
}
