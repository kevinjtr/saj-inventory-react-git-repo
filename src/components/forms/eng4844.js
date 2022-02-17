import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Card4900 from '../Card4900';

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
import axios from 'axios';

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
const dropDownStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
})); 

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
  const dropDownClasses = dropDownStyles (); 
  const ENG4844Data = {

    id: "",
    dateCreated: "",
    documentNum: "",
    acquisitionDate: "",
    purchaseOrderNum: "",
    vendor: "",
    costAccount: "",
    remarks: "",
    barTagNum: "",
    catalogNum: "",
    oldTagNum: "",
    barTagHistoryId: "",
    serialNum: "",
    location: "",
    room: "",
    HRA: "",
    authorization: "",
    funding: "",
    condition: "",
    utilization: "",
    value: "",
    accessoryNomenclature: "",
    accessoryValue: "",
    majorNoun: "",
    nomenclature: "",
    manufacturer: "",
    partNum: "",
    model: "",
    color: "",
    length: "",
    lengthUnits: "",
    width: "",
    widthUnits: "",
    height: "",
    heightUnits: "",
    classification: "",
    reportableItemControlCode: "",
    equipmentControlCode: "",
    lineItemNum: "",
    logisticsControlCode: "",
    pilferableCode: "",
    noun_nomenclature:"",
    catalog_num_1:"",
    value_1:""

}
    const componentDidMount = async () => {
		
		// );
		// console.log(this.state);
	};
    //text fields
  const classesTextField = texFieldStyles();

  const classesItemMenu = itemMenuStyles();
  const [reqAction, setReqAction] = React.useState('');

  const handleItemMenuChange = (event) => {
    setReqAction(event.target.value);
  };

  const [numOfBarTags, setNumOfBarTags] = React.useState(1);

  const handleBarTagMenuChange = (event) => {
    setNumOfBarTags(event.target.value);
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

  //grids
  const classesGrid = gridStyles();

  //simpleMenu

  const [anchorEl, setAnchorEl, bothButton, button44841] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleButtonBothClick = (event) => {
    bothButton(true);
  }

  const handleButton48441Click = (event) => {
    button44841(true);
  }
  
  const [formSelection, setForm] = React.useState("4844");

  const handleFormMenuChange = (event) => {
    setForm(event.target.value);
  };

  const [fundingSelection, setFunding] = React.useState("");
  
 const fundingSelectionChange = (event) =>{
  setFunding(event.target.value);
 }

 const [reportableSelection, setReportable] = React.useState("");
  
 const reportableSelectionChange = (event) =>{
  setReportable(event.target.value);
 }
  
      
  const formView = (n) => {
    const returnSelection = null;
    if(formSelection == "4844"){
      return(
        <div> 
          <div style={{textAlign: 'center'}}>
            <h2 >ENG 4844 Form</h2>
            <br/>
          </div>
          <form className={classesTextField.root} noValidate autoComplete="off">
             <div className={classesGrid.root}>
                <Grid container spacing={3}>
                 {form4844()}
                 </Grid>
           </div>
          </form>
        </div>
      );
    }
    else if(formSelection == "48441"){
      return(
        <div> 
          <div style={{textAlign: 'center'}}>
            <h2 >ENG 4844-1 Form</h2>
            <br/>
          </div>
          <form className={classesTextField.root} noValidate autoComplete="off">
             <div className={classesGrid.root}>
                <Grid container spacing={3}>
                 {form4844_1()}
                 </Grid>
           </div>
          </form>
        </div>
      );
    }
    else{
      return(
        <div>
        <div style={{textAlign: 'center'}}>
          <h2 >ENG 4844 Form</h2>
          <br/>
        </div>
            <form className={classesTextField.root} noValidate autoComplete="off">
            <div className={classesGrid.root}>
             <Grid container spacing={3}>
                {form4844()}
                <br/>
                <br/>
              </Grid>
                <div style={{textAlign: 'center'}}>
                  <br/>
                  <br/>
                  <h2 >ENG 4844-1 Form</h2>
                  <br/>
                </div>
                <Grid container spacing={3}>
                {form4844_1()}
                </Grid>
             </div>
           </form>
       </div>
      );
    }
  }
 //Avatars

 const avatarClasses = AvatarStyles();

 const disableFields = {
  Signature: true
 }

 //plus button

 const plusButtonClasses = plusButtonStyles();

 const form4844 = () => {
    return(
        <>
      <Grid item xs={6}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="1. Document Number"
       style={{ width: 640 }}
       value={ENG4844Data.documentNum}
     />
       </Paper>
     </Grid>
       <Grid item xs={6}>
            <Paper className={classesGrid.paper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline"
                label="2. Acquisition Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                style={{ width: 640 }}
                />
            </MuiPickersUtilsProvider>
            </Paper>
     </Grid>
     <Grid item xs={12}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="3. Purchase Order Number"
       style={{ width: 1600 }}
       value={ENG4844Data.purchaseOrderNum}
     />
       </Paper>
     </Grid>
     <Grid item xs={12}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="4. From (Vendor)"
       style={{ width: 1600 }}
       value={ENG4844Data.vendor}
     />
       </Paper>
     </Grid>
     <Grid item xs={12}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="5. Cost Account"
       style={{ width: 1600 }}
       value={ENG4844Data.costAccount}
     />
       </Paper>
     </Grid>
     <Grid item xs={12}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="6. Remarks"
       style={{ width: 1600 }}
       value={ENG4844Data.remarks}
     />
       </Paper>
     </Grid>
     <Grid item xs={4}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="7. Bar Tag Number"
       style={{ width: 300 }}
       value={ENG4844Data.barTagNum}
     />
       </Paper>
     </Grid>
     <Grid item xs={4}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="8. Catalog Number (NSN or MCN)"
       style={{ width: 300 }}
       value={ENG4844Data.catalogNum}
     />
       </Paper>
     </Grid>
     <Grid item xs={4}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="9. Old Tag Number"
       style={{ width: 300 }}
       value={ENG4844Data.oldTagNum}
     />
       </Paper>
     </Grid>
     <Grid item xs={12}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="10. Noun/Nomenclature"
       style={{ width: 1600 }}
       value={ENG4844Data.noun_nomenclature}
     />
       </Paper>
     </Grid>
     <Grid item xs={12}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="11. Serial Number"
       style={{ width: 1600 }}
       value={ENG4844Data.serialNum}
     />
       </Paper>
     </Grid>
     <Grid item xs={4}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="12. Location"
       style={{ width: 300 }}
       value={ENG4844Data.location}
     />
       </Paper>
     </Grid>
     <Grid item xs={4}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="13. Room"
       style={{ width: 300 }}
       value={ENG4844Data.room}
     />
       </Paper>
     </Grid>
     <Grid item xs={4}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="14. HRA"
       style={{ width: 300 }}
       value={ENG4844Data.HRA}
     />
       </Paper>
     </Grid>
     <Grid item xs={4}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="15. Authorization"
       style={{ width: 300 }}
       value={ENG4844Data.authorization}
     />
       </Paper>
     </Grid>
     <Grid item xs={4}>
       <Paper className={classesGrid.paper}>
       <FormControl className={dropDownClasses.formControl}>
        <InputLabel id="demo-simple-select-label">16. Funding</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="16. Funding"
          value={fundingSelection}
          onChange={fundingSelectionChange}
          style={{ width: 300 }}
        >
        {fundingDropDownItems}
        </Select>
      </FormControl> {/* This needs to be a drop down populated from the database*/}
       </Paper>
     </Grid>
     <Grid item xs={4}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="17. Condition"
       style={{ width: 300 }}
       value={ENG4844Data.condition}
     />{/* This needs to be a drop down populated from the database*/}
       </Paper>
     </Grid>
     <Grid item xs={6}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="18. Utilization"
       style={{ width: 640}}
       value={ENG4844Data.utilization}
     />{/* This needs to be a drop down populated from the database*/}
      </Paper>
     </Grid>
     <Grid item xs={6}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="19. Value"
       style={{ width: 640 }}
       value={ENG4844Data.value}
     />
       </Paper>
     </Grid>
     <Grid item xs={12}>
       <Paper className={classesGrid.paper}>
        <p>20. Add Accessories</p>
       </Paper>
     </Grid>
     <Grid item xs={12}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="21. Nomenclature"
       style={{ width: 1600 }}
       value={ENG4844Data.accessoryNomenclature}
     />
       </Paper>
     </Grid>
     <Grid item xs={12}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="22. Value"
       style={{ width: 1600 }}
       value={ENG4844Data.accessoryValue}
     />
       </Paper>
     </Grid>
     <Grid item xs={12}>
       <Paper className={classesGrid.paper}>
        <p>23. I acknowledge receipt of the above.</p>
       </Paper>
     </Grid>
     <Grid item xs={4}>
            <Paper className={classesGrid.paper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline"
                label="a. Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
            </MuiPickersUtilsProvider>
            </Paper>
     </Grid>
     <Grid item xs={4}>
       <Paper className={classesGrid.paper}>
       <TextField
       label="b. Name (Last, First MI) and Title"
       style={{ width: 300 }}
     />
       </Paper>
     </Grid>
     <Grid item xs={4}>
     <Paper className={classesGrid.paper}>
     <TextField
       label="c. Hand Receipt Holder's Signature"
       style={{ width: 250 }}
       InputProps={{
         readOnly: disableFields.Signature,
       }}
       {...(disableFields.Signature && {variant:"filled"})}
     />
     </Paper>
     </Grid>
     </>
    )
}

{/*Start of ENG4844-1*/}
const form4844_1 = () => {
  return(
      <>
    <Grid item xs={12}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="1. Catalog Number )NSN or Management Control Number"
     style={{ width: 1600 }}
     value={ENG4844Data.catalog_num_1}
   />
     </Paper>
   </Grid>
   <Grid item xs={12}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="2. Major Noun"
     style={{ width: 1600 }}
     value={ENG4844Data.majorNoun}
   />
     </Paper>
   </Grid>
   <Grid item xs={12}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="3. Nomenclature"
     style={{ width: 1600 }}
     value={ENG4844Data.nomenclature}
   />
     </Paper>
   </Grid>
   <Grid item xs={12}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="4. Manufacturer"
     style={{ width: 1600 }}
     value={ENG4844Data.manufacturer}
   />
     </Paper>
   </Grid>
   <Grid item xs={12}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="5. Part Number"
     style={{ width: 1600 }}
     value={ENG4844Data.partNum}
   />
     </Paper>
   </Grid>
   <Grid item xs={6}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="6. Model"
     style={{ width: 640 }}
     value={ENG4844Data.model}
   />
     </Paper>
   </Grid>
   <Grid item xs={6}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="7. Color"
     style={{ width: 640 }}
     value={ENG4844Data.color}
   />
     </Paper>
   </Grid>
   <Grid item xs={4}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="8. Length"
     style={{ width: 300 }}
     value={ENG4844Data.length}
   />
     </Paper>
   </Grid>
   <Grid item xs={4}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="9. Width"
     style={{ width: 300 }}
     value={ENG4844Data.width}
   />
     </Paper>
   </Grid>
   <Grid item xs={4}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="10. Height"
     style={{ width: 300 }}
     value={ENG4844Data.height}
   />
     </Paper>
   </Grid>
   <Grid item xs={6}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="11. Value"
     style={{ width: 640 }}
     value={ENG4844Data.value_1}
   />
     </Paper>
   </Grid>
   <Grid item xs={6}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="12. Classification"
     style={{ width: 640 }}
     value={ENG4844Data.classification}
   />{/* This needs to be a drop down populated from the database*/}
     </Paper>
   </Grid>
   <Grid item xs={6}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="13. Pilerable Code"
     style={{ width: 640 }}
     value={ENG4844Data.pilferableCode}
   />{/* This needs to be a drop down populated from the database*/}
     </Paper>
   </Grid>
   <Grid item xs={6}>
   <Paper className={classesGrid.paper}>
       <FormControl className={dropDownClasses.formControl}>
        <InputLabel id="demo-simple-select-label">14. Reportable Item Control Code</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="14. Reportable Item Control Code"
          value={reportableSelection}
          onChange={reportableSelectionChange}
          style={{ width: 640 }}
        >
        {reportableDropDownItems}
        </Select>
      </FormControl> {/* This needs to be a drop down populated from the database*/}
       </Paper>
   </Grid>
   <Grid item xs={6}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="15. Equipment Control Code, See AR 738-750 For Code"
     style={{ width: 640 }}
     value={ENG4844Data.equipmentControlCode}
   />
     </Paper>
   </Grid>
   <Grid item xs={6}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="16. Line Item Number (LIN), See SB 700-20 For Code"
     style={{ width: 640 }}
     value={ENG4844Data.lineItemNum}
   />
     </Paper>
   </Grid>
   <Grid item xs={12}>
     <Paper className={classesGrid.paper}>
     <TextField
     label="17. Logistics Control Code (LCC)"
     style={{ width: 1600 }}
     value={ENG4844Data.logisticsControlCode}
   />{/* This needs to be a drop down populated from the database*/}
    </Paper>
   </Grid>
   </>
  )
}

const eng4900s = [{hraName:"Anderson, Thomas",
category: "hard disk drive",
date_added: "2020-11-18T18:49:24.000Z",
date_updated: "2020-11-18T18:49:27.000Z",
description: "Seagate",
id: 2,
image: "eng4900.png",
barTags:["77701","77702","77703"],
product_name: "External Hard Drive",
quantity: 9},
{hraName:"Smith, John",
category: "laptop",
date_added: null,
date_updated: "2020-11-30T19:33:52.000Z",
description: null,
id: 1,
image: "eng4900.png",
barTags:["66601","66602","66603"],
product_name: "iphone",
quantity: 5},
{hraName:"Gates, Richard",
category: "hard disk drive",
date_added: null,
date_updated: "2020-11-24T20:45:02.000Z",
description: null,
id: 3,
image: "eng4900.png",
barTags:["55501","55502","55503"],
product_name: "laptopcilla",
quantity: 56}]

const renderData = eng4900s.map((product) => {
    return <Card4900 product={product} key={product.id} refresh={componentDidMount} />;
});
const [items, setItems] = React.useState([]);
//will run once.
React.useEffect(() => {
  //setLoading(true)
      console.log('4844Fundingall')
      api.get(`eng4844/funding`,{}).then((response) => response.data).then((data) => {
      console.log(data)
      if(data.status != 400){
        setItems(data.data.map(( properties ) => ({ label: properties.name, value: properties.id })));

      }
      console.log(items);
    }).catch(function (error) {
      setItems([])
    }) 
  }, []); 

  const fundingDropDownItems = items.map((c, i)=>{
    console.log(c);
    return(
     
      <MenuItem value={c.value} name= {c.label} >
      {c.value + '.' + c.label}
      </MenuItem>

    )
    })

    const [reportableItems, setReportableItems] = React.useState([]);
//will run once.
React.useEffect(() => {
  //setLoading(true)
      console.log('4844Reportable')
      api.get(`eng4844/reportableControlCode`,{}).then((response) => response.data).then((data) => {
      console.log(data)
      if(data.status != 400){
        setReportableItems(data.data.map(( properties ) => ({ label: properties.name, value: properties.id })));

      }
      console.log(reportableItems);
    }).catch(function (error) {
      setReportableItems([])
    }) 
  }, []); 

  const reportableDropDownItems = reportableItems.map((c, i)=>{
    console.log(c);
    return(
     
      <MenuItem value={c.value} name= {c.label} >
      {c.value + '.' + c.label}
      </MenuItem>

    )
    })


  return (
    <div>
      <br/>
      <Grid container style={{ padding: 20 }}>
     <Paper className={classesGrid.paper}>
     <FormControl className={classesItemMenu.formControl}>
             <InputLabel id="demo-simple-select-label-bt">Forms to view</InputLabel>
             <Select
             labelId="demo-simple-select-label-bt"
             id="demo-simple-select-bt"
             value={formSelection}
             onChange={handleFormMenuChange}
             >
             <MenuItem value={"4844"}>ENG 4844</MenuItem>
             <MenuItem value={"48441"}>ENG 4844-1</MenuItem>
             <MenuItem value={"Both"}>Both Forms</MenuItem>
             </Select>
     </FormControl>
     </Paper>
      </Grid>
      {formView(formSelection)}
       {/* <div>
        <div style={{textAlign: 'center'}}>
          <h2 >Eng 4844 Form</h2>
          <br/>
        </div>
            <form className={classesTextField.root} noValidate autoComplete="off">
            <div className={classesGrid.root}>
             <Grid container spacing={3}>
                {form4844()}
               <br/>
                <br/>
                <div style={{textAlign: 'center'}}>
                    <h2 >Eng 4844-1 Form</h2>
                </div>
                {form4844_1()}
              </Grid>
             </div>
       </form>
       </div>
        <div style={{textAlign: 'center'}}>
      <h2 >Eng 4844 Form</h2>
      <br/>*/}
     {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
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
                    <IconButton aria-label="search" color="primary">
                            <SearchIcon style={{ fontSize: 40 }}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        </form>
    </div>

    <div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
       {/* <h3 style={{ justifyContent: 'center' }}>List Of Available 4900s</h3>
      }  <div className="card-title">
            <div style={{ justifyContent: 'center' }}>{renderData}</div>
  </div>*/}
 
   {/* <form className={classesTextField.root} noValidate autoComplete="off">
      
      <div className={classesGrid.root}>
      <Grid container spacing={3}>
         {form4844()}
         <br/>
         <br/>
         <div style={{textAlign: 'center'}}>
            <h2 >Eng 4844-1 Form</h2>
         </div>
         {form4844_1()}
      </Grid>
      </div>
</form>*/}
    {/*<Tooltip title="Add" aria-label="add">
        <Fab color="secondary" className={plusButtonClasses.absolute}>
          <AddIcon />
        </Fab>
</Tooltip>*/}
    </div>
  );
}