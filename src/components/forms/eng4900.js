import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './eng4900.css';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import MaterialTable from 'material-table'
import {tableIcons} from '../material-table/config'
import Pdf from './eng4900-26-2.pdf';

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
        onValueChange={(phoneNumbers) => {
          onChange({
            target: {
              name: props.name,
              value: phoneNumbers.value,
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
  
  //Constants Declarations.
  //const requestedActions = ["Issue","Transfer","Repair","Excess","FOI"]
  const reqActionsReset = {
    Issue: false,
    Transfer: false,
    Repair: false,
    Excess: false,
    Foi: false,
    TemporaryLoan: false
  };
    
  //Variables Declarations.
  let showForm = false

  //Styles Declarations.
  const classesTextField = texFieldStyles();
  const classesItemMenu = itemMenuStyles();
  const classesPhoneTextField = phoneTextFieldStyles();
  const classesGrid = gridStyles();
  const avatarClasses = AvatarStyles();
  const plusButtonClasses = plusButtonStyles();

  //Hooks Declarations.
  const [eng4900s, setEng4900s] = React.useState([]);
  const [eng4900sTableFormat, setEng4900sTableFormat] = React.useState([]);
  const [numOfBarTags, setNumOfBarTags] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [phoneNumbers, setPhoneNumbers] = React.useState({
    gaining_hra_work_phone: '(   )    -    ',
    losing_hra_work_phone: '(   )    -    ',
    numberformat: '1320',
  });
  const [reqActions, setReqActions] = React.useState({
    Issue: false,
    Transfer: false,
    Repair: false,
    Excess: false,
    Foi: false,
    TemporaryLoan: false
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id_, setId] = React.useState('');
  const [selectedForm, setSelectedForm] = React.useState(null);
  const [searchView, setSearchView] = React.useState('card-view');
  
  //Events Declarations.
  const handle4900sChange = (event) => {
    setEng4900s(event.target.value);
  };

  // const handleItemMenuChange = (event) => {
  //   setReqAction(event.target.value);
  // };

  const handleBarTagMenuChange = (event) => {
    setNumOfBarTags(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePhoneTextFieldChange = (event) => {
    setPhoneNumbers({
      ...phoneNumbers,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckBoxChange = (event) => {
    setReqActions({ ...reqActions, [event.target.name]: event.target.checked });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleIdChange = (event) => {
    setId(event.target.value);
    // if(event.target.value == ''){
    //   setIncludes({...includes_,  [event.target.name]: 'includes'})
    // }
  };

  const handleViewFormFromCard = (event) => {
    const eId = (event.target.id).split('-')[1]
    setSelectedForm(eng4900s[eId]);
    setPhoneNumbers({
      ...phoneNumbers,
      ["losing_hra_work_phone"]: eng4900s[eId][0].losing_hra_work_phone,
      ["gaining_hra_work_phone"]: eng4900s[eId][0].gaining_hra_work_phone,
    });
    // if(event.target.value == ''){
    //   setIncludes({...includes_,  [event.target.name]: 'includes'})
    // }
  };

  const handleSearchViewChange = (event) => {
    setSearchView(event.target.value);
    // if(event.target.value == ''){
    //   setIncludes({...includes_,  [event.target.name]: 'includes'})
    // }
  };

  

  //Function Declarations.
  const bartagsData = (f) => {

    console.log(f)
    const returnArray = [];
    const keys = Object.keys(f);

    for(let i=0; i<keys.length;i++){
      const b_key = i+1
        returnArray.push(
            <>
            <Grid item xs={12}>
                <Paper className={classesGrid.paper}>
                <Avatar className={avatarClasses.orange}>{i+1}</Avatar>
                    <TextField
                    id={`item_no_${b_key}`}
                    key={`item_no_${b_key}`}
                    label={"Item No. " + b_key}
                    style={{ width: 200 }}
                    />
                    <TextField
                    id={`bar_tag_no_${b_key}`}
                    key={`bar_tag_no_${b_key}`}
                    label={"Bar Tag No. " + b_key}
                    value={f[i].bar_tag_num ? f[i].bar_tag_num : ""}
                    style={{ width: 200 }}
                    />
                    <TextField
                    id={`catalog_${b_key}`}
                    key={`catalog_${b_key}`}
                    label={"Catalog " + b_key}
                    value={f[i].catalog_num}
                    style={{ width: 200 }}
                    />
                    <TextField
                    id={`nomenclature_${b_key}`}
                    key={`nomenclature_${b_key}`}
                    label={"Nomenclature (include make, model) " + b_key}
                    value={f[i].item_type ? f[i].item_type : ""}
                    style={{ width: 200 }}
                    />
                    {/* </Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className={classesGrid.paper}>
                    <Avatar className={avatarClasses.orange}>{i+1}</Avatar> */}
                    <TextField
                    id={`cond_code_${b_key}`}
                    key={`cond_code_${b_key}`}
                    label={"Cond Code " + b_key}
                    value={f[i].condition ? f[i].condition : ""}
                    style={{ width: 150 }}
                    />
                    <TextField
                    id={`serial_number_${b_key}`}
                    key={`serial_number_${b_key}`}
                    label={"Serial Number " + b_key}
                    value={f[i].serial_num ? f[i].serial_num : ""}
                    style={{ width: 150 }}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id={`date-picker-inline-acq-date-${b_key}`}
                        key={`date-picker-inline-acq-date-${b_key}`}
                        label={"ACQ. Date " + b_key}
                        value={f[i].acquisition_date ? f[i].acquisition_date : ""}
                        //onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        style={{ width: 150 }}/>
                    </MuiPickersUtilsProvider>
                    {/* <TextField
                    id={`acq_date_${i}`}
                    key={`acq_date_${i}`}
                    label={"ACQ. Date " + (i+1)}
                    value={f[i].acquisition_date ? f[i].acquisition_date : ""}
                    style={{ width: 150 }}
                    /> */}
                    <TextField
                    id={`acq_price_${b_key}`}
                    key={`acq_price_${b_key}`}
                    label={"ACQ. Price " + b_key}
                    value={f[i].acquisition_price ? f[i].acquisition_price : ""}
                    style={{ width: 150 }}
                    />
                    <TextField
                    id={`document_number_${b_key}`}
                    key={`document_number_${b_key}`}
                    label={"Document Number/Control ID# " + b_key}
                    value={f[i].document_num ? f[i].document_num : ""}
                    style={{ width: 175 }}
                    />
                </Paper>
            </Grid>
        </>
        );
    }
    return(returnArray)
}


  const menuItemsBarTags = () => {
      const returnArray = []
      for(let i=0; i < 10;i++){
          returnArray.push(<><MenuItem value={i}>{i}</MenuItem></>)
      }
      return(returnArray);
  }

  const handle4900Search = async () => {

    setSelectedForm(null)
    console.log('4900SearchCall')
      await api.post(`eng4900/search`,{fields:{id:id_}}).then((response) => response.data).then((data) => {
        console.log(data.data)
        setEng4900s(data.status != 400 ? data.data : [])

        for (var key in data.data) {
          if (data.data.hasOwnProperty(key)) {
            data.data[key] = Object.assign({}, data.data[key]);
          }
        }

        console.log(Object.values(data.data))
        setEng4900sTableFormat(data.status != 400 ? Object.values(data.data) : [])
        
        //setEng4900sTableFormat(eng4900s.map(form => Object.assign({}, form)))
        
        // this.setState({
        // 	equipments: data.status != 400 ? data.values: data,
        // 	setequipment: data
        // });
        //console.log(this.state.equipment.values);
        // console.log(this.props, this.state);
      }).catch(function (error) {
        setEng4900s([])
      });
  }

  const form = (f) => {

    const {form_id, requested_action, individual_ror_prop,
      losing_hra_num, losing_hra_first_name, losing_hra_last_name, losing_hra_os_alias,
      gaining_hra_num, gaining_hra_first_name, gaining_hra_last_name, gaining_hra_os_alias,
    } = f[0]

    console.log(f[0])
    // const lwp = f[0].losing_hra_work_phone
    // const gwp = f[0].gaining_hra_work_phone
    
    // if(lwp){
    //   setPhoneNumbers({
    //     ...phoneNumbers,
    //     ["losing_hra_work_phone"]: `(${lwp[0]}${lwp[1]}${lwp[2]}) ${lwp[3]}${lwp[4]}${lwp[5]}-${lwp[6]}${lwp[7]}${lwp[8]}${lwp[9]}`,
    //   });
    // }

    // if(gwp){
    //   setPhoneNumbers({
    //     ...phoneNumbers,
    //     ["gaining_hra_work_phone"]: `(${gwp[0]}${gwp[1]}${gwp[2]}) ${gwp[3]}${gwp[4]}${gwp[5]}-${gwp[6]}${gwp[7]}${gwp[8]}${gwp[9]}`,
    //   }); 
    // }
    
      return(
          <>
        <Grid item xs={12}>
          <Paper className={classesGrid.paper}>
            <p>{`Form - ${form_id}`}</p>
            <FormControl component="fieldset">
              <FormLabel component="legend">Requested Action:</FormLabel>
              <RadioGroup row aria-label="position" name="position" defaultValue={requested_action}>
                <FormControlLabel id="radio-issue" key="radio-issue" value="Issue" control={<Radio color="primary" />} label="Issue" />
                <FormControlLabel id="radio-transfer" key="radio-transfer" value="Transfer" control={<Radio color="primary" />} label="Transfer" />
                <FormControlLabel id="radio-end" key="radio-end" value="Repair" control={<Radio color="primary" />} label="Repair" />
                <FormControlLabel id="radio-excess" key="radio-excess" value="Excess" control={<Radio color="primary" />} label="Excess" />
                <FormControlLabel id="radio-foi" key="radio-foi" value="FOI" control={<Radio color="primary" />} label="FOI" />
              </RadioGroup>
            </FormControl>
            <FormControlLabel
                control={<Checkbox color="primary" id="check-temporary-loan" key="check-temporary-loan" checked={reqActions["TemporaryLoan"]} onChange={handleCheckBoxChange} name="TemporaryLoan" />}
                label="Temporary Loan"/> 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline-expiration-date"
                key="date-picker-inline-expiration-date"
                label="Expiration Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}/>
            </MuiPickersUtilsProvider>
        </Paper>
      </Grid>
      
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <p>LOSING HAND RECEIPT HOLDER</p>
          <TextField
            id="standard-helperText-l-name"
            key="standard-helperText-l-name"
            label="2a. Name"
            value={losing_hra_first_name + ' ' + losing_hra_last_name}
            style={{ width: 300 }}/>
          <TextField
            id="standard-helperText-l-os"
            key="standard-helperText-l-os"
            label="b. Office Symbol"
            value={losing_hra_os_alias}
            style={{ width: 300 }}/>
          <TextField
            id="standard-helperText-l-hra-num"
            key="standard-helperText-l-hra-num"
            label="c. Hand Receipt Account Number"
            value={losing_hra_num}
            style={{ width: 300 }}/>
          <FormControl>
            <InputLabel htmlFor="formatted-text-mask-input">d. Work Phone Number</InputLabel>
            <Input 
              style={{ height: 40,width:300 }}
              value={phoneNumbers.losing_hra_work_phone}
              onChange={handlePhoneTextFieldChange}
              name="losing_hra_work_phone"
              id="formatted-text-mask-input-l-work-phone"
              key="formatted-text-mask-input-l-work-phone"
              inputComponent={TextMaskCustom}/>
          </FormControl>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <p>GAINING HAND RECEIPT HOLDER</p>
          <TextField
            id="standard-helperText-g-name"
            key="standard-helperText-g-name"
            label="3a. Name"
            value={gaining_hra_first_name + ' ' + gaining_hra_last_name}
            style={{ width: 300 }}/>
          <TextField
            id="standard-helperText-g-os"
            key="standard-helperText-g-os"
            label="b. Office Symbol"
            value={gaining_hra_os_alias}
            style={{ width: 300 }}/>
          <TextField
            id="standard-helperText-g-hra-num"
            key="standard-helperText-g-hra-num"
            label="c. Hand Receipt Account Number"
            value={gaining_hra_num}
            style={{ width: 300 }}/>
          <FormControl>
            <InputLabel htmlFor="formatted-text-mask-input">d. Work Phone Number</InputLabel>
              <Input 
                style={{ height: 40,width:300 }}
                value={phoneNumbers.gaining_hra_work_phone}
                onChange={handlePhoneTextFieldChange}
                name="gaining_hra_work_phone"
                id="formatted-text-mask-input-g-work-phone"
                key="formatted-text-mask-input-g-work-phone"
                inputComponent={TextMaskCustom}/>
          </FormControl>
        </Paper>
      </Grid>
      {/* <Grid item xs={12}>
        <Paper className={classesGrid.paper}>
          <FormControl className={classesItemMenu.formControl}>
            <InputLabel id="demo-simple-select-label-bt">Number of Equipment Items</InputLabel>
              <Select
              labelId="demo-simple-select-label-bt"
              id="demo-simple-select-bt"
              value={numOfBarTags}
              onChange={handleBarTagMenuChange}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
          </FormControl>
        </Paper>
      </Grid> */}
      {bartagsData(f)}
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-ror-prop"
            key="standard-helperText-ror-prop"
            label="13a. Individual/Vendor Removing or Recieving Property"
            value={individual_ror_prop ? individual_ror_prop : ""}
            style={{ width: 600 }}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-ror-prop-sign-date"
            key="standard-helperText-ror-prop-sign-date"
            label="b. Date"
            style={{ width: 120 }}/>
          <TextField
            id="standard-helperText-ror-prop-sign"
            key="standard-helperText-ror-prop-sign"
            label="c. Signature"
            style={{ width: 120 }}/>
      </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-l-hra-sign"
            key="standard-helperText-l-hra-sign"
            label="14a. Losing HRH Signature"
            style={{ width: 300 }}/>
          <TextField
            id="standard-helperText-l-hra-sign-date"
            key="standard-helperText-l-hra-sign-date"
            label="b. Date"
            style={{ width: 120 }}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-g-hra-sign"
            key="standard-helperText-g-hra-sign"
            label="15a. Gaining HRH Signature"
            style={{ width: 300 }}/>
          <TextField
            id="standard-helperText-g-hra-sign-date"
            key="standard-helperText-g-hra-sign-date"
            label="b. Date"
            style={{ width: 120 }}/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classesGrid.paper}>
          <p>Transfer (PBO use only)</p>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-l-command"
            key="standard-helperText-l-command"
            label="16a. Losing Command"
            style={{ width: 250 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
          <TextField
            id="standard-helperText-l-uic"
            key="standard-helperText-l-uic"
            label="b. UIC"
            style={{ width: 120 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-g-command"
            key="standard-helperText-g-command"
            label="17a. Gaining Command"
            style={{ width: 250 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
          <TextField
            id="standard-helperText-g-uic"
            key="standard-helperText-g-uic"
            label="b. UIC"
            style={{ width: 120 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
        <TextField
          id="standard-helperText-ship-from"
          key="standard-helperText-ship-from"
          label="c. Ship From"
          style={{ width: 120 }}
          InputProps={{
            readOnly: disableFields.PBO,
          }}
          {...(disableFields.PBO && {variant:"filled"})}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-ship-to"
            key="standard-helperText-ship-to"
            label="c. Ship To:"
            style={{ width: 120 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-l-pbo"
            key="standard-helperText-l-pbo"
            label="d. PBO"
            style={{ width: 120 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-g-pbo"
            key="standard-helperText-g-pbo"
            label="d. PBO"
            style={{ width: 120 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-l-command-sign"
            key="standard-helperText-l-command-sign"
            label="e. Losing Command Signature"
            style={{ width: 300 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
          <TextField
            id="standard-helperText-l-command-sign-date"
            key="standard-helperText-l-command-sign-date"
            label="f. Date"
            style={{ width: 120 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-g-command-sign"
            key="standard-helperText-g-command-sign"
            label="e. Gaining Command Signature"
            style={{ width: 300 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
          <TextField
            id="standard-helperText-g-command-sign-date"
            key="standard-helperText-g-command-sign-date"
            label="f. Date"
            style={{ width: 120 }}
            InputProps={{
              readOnly: disableFields.PBO,
            }}
            {...(disableFields.PBO && {variant:"filled"})}/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classesGrid.paper}>
          <p>Logistics (supply use only)</p>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
          <TextField
            id="standard-helperText-received-by"
            key="standard-helperText-received-by"
            label="18a. Received By"
            style={{ width: 300 }}
            InputProps={{
              readOnly: disableFields.logistics,
            }}
            {...(disableFields.logistics && {variant:"filled"})}/>
          <TextField
            id="standard-helperText-received-by-date"
            key="standard-helperText-received-by-date"
            label="b. Date"
            style={{ width: 120 }}
            InputProps={{
              readOnly: disableFields.logistics,
            }}
            {...(disableFields.logistics && {variant:"filled"})}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
        <TextField
          id="standard-helperText-posted-by"
          key="standard-helperText-posted-by"
          label="19a. Posted By"
          style={{ width: 300 }}
          InputProps={{
            readOnly: disableFields.logistics,
          }}
          {...(disableFields.logistics && {variant:"filled"})}/>
        <TextField
          id="standard-helperText-posted-by-date"
          key="standard-helperText-posted-by-date"
          label="b. Date"
          style={{ width: 120 }}
          InputProps={{
            readOnly: disableFields.logistics,
          }}
          {...(disableFields.logistics && {variant:"filled"})}/>
        </Paper>
      </Grid>
      </>
      )
  }

  function CardProduct(form){
    
    const {form_id,folder_link} = form[0]
    let bartags = ''

    Object.keys(form).map(function(key) {
      bartags = bartags + (bartags ? ', ':'') + form[key].bar_tag_num
    });

    return (
      <div  id={"container-"+form_id} key={"container-"+form_id} className="container" style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '21px' }}>
        <div id={"card-"+form_id} key={"card-"+form_id} className="col-md-12 card" style={{ textAlign: 'left', margin: 10 }}>
              <div style={{display:'inline'}}>
                <h4 style={{ marginTop: '20px' }}>ENG4900: {form_id}</h4>
              </div>
              {/* <div style={{display:'inline',textAlign:'center'}}>
                  { <img src={'./ENG4900.PNG'} alt="" style={{height:"100%",width:"100%",display:'inline'}} />}
              </div>            */}
          <hr />
          
          <h6>Bar Tags Quantity: {form.length}</h6>
          <small>Losing HRA: {form[0].losing_hra_num + ' - ' + form[0].losing_hra_first_name + ' ' + form[0].losing_hra_last_name }</small>
          <small>Gaining HRA: {form[0].gaining_hra_num + ' - ' + form[0].gaining_hra_first_name + ' ' + form[0].gaining_hra_last_name}</small>
          <small>Bar Tags: {bartags}</small>
                  {/* <small>Bar Tags: </small>
                  <small>{btPrint} </small> */}
          <div id={"row-"+form_id} key={"row-"+form_id} className="row" style={{ margin: 3,marginTop:'10px' }}>
              {!folder_link ? <input id={"bnt-"+form_id} key={"bnt-"+form_id} type="submit" value="View" className="btn btn-primary" onClick={handleViewFormFromCard}/> : null}
              {folder_link ? <a id={"bnt-pdf-"+form_id} key={"bnt-pdf-"+form_id} href = {Pdf} target = "_blank" type="submit" value="Pdf" className="btn btn-danger">PDF</a> : null}
            {/* <Link onClick={deleteConfirm} style={{ margin: 2 }}>
              <input type="submit" value="Edit" className="btn btn-warning" />
            </Link> */}
          </div>
          <br />
        </div>
      </div>
    );
  }

  const materialTableSelect = () => {
  
    
    let columns = [
      { title: 'Form ID', field: '0.form_id' },
      { title: 'Bar Tags', field: "0.bar_tag_num",editable: 'never'},
      { title: 'Losing HRA', field: "0.losing_hra_num",editable: 'never' },
      { title: 'Gaining HRA', field: "0.gaining_hra_num",editable: 'never' },
    ]
  
    return(
      <div style={{ maxWidth: '100%',paddingTop:'25px' }}>
          <MaterialTable
          icons={tableIcons}
            columns={columns}
            data={eng4900sTableFormat}
            options={{
              exportButton: true,
              exportAllData: true,
              headerStyle: {
                backgroundColor: "#969696",
                color: "#FFF",
                fontWeight: 'bold',
            }
            }}
            title=""
          />
    </div>
    )
    }

  //Render Variables
  const textFieldsLosingHandConfig1 = [
    {label:'2a. Name', width:300},
    {label:'b. Office Symbol', width:300},
    {label:'c. Hand Receipt Account Number', width:300},
  ]

  const textFieldsGainingHandConfig1 = [
    {label:'a. Name', width:300},
    {label:'b. Office Symbol', width:300},
    {label:'c. Hand Receipt Account Number', width:300},
  ]

  const textFieldsGainingHandConfig2 = [
    {label:'13a. Individual/Vendor Removing or Recieving Property', width:600},

  ]

  const textFieldsGainingHandConfig3 = [
    {label:'b. Date', width:120},
    {label:'c. Signature', width:120},
  ]

  const textFieldsGainingHandConfig4 = [
    {label:'13a. Individual/Vendor Removing or Recieving Property', width:600},

  ]

  const textFieldsGainingHandConfig5 = [
    {label:'14a. Losing HRH Signature', width:300},
    {label:'b. Date', width:120},
  ]

  const textFieldsGainingHandConfig6 = [
    {label:'15a. Gaining HRH Signature', width:300},
    {label:'b. Date', width:120},
  ]

  const textFieldsGainingHandConfig7 = [
    {label:'16a. Losing Command', width:250},
    {label:'b. UIC', width:120
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }},
    // {...(disableFields.PBO && {variant:"filled"})}}
    }
  ]

  const textFieldsGainingHandConfig8 = [
    {label:'17a. Gaining Command', width:250
    // style={{ width: 250 }}
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
  
  },
    {label:'b. UIC', width:120
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
    }
  ]

  const textFieldsGainingHandConfig9 = [
    {label:'c. Ship From', width:120
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
    }
  ]

  const textFieldsGainingHandConfig10 = [
    {label:'c. Ship To:', width:120
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
    }
  ]

  const textFieldsGainingHandConfig11 = [
    {label:'c. Ship To:', width:120
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
    }
  ]

  const textFieldsGainingHandConfig12 = [
    {label:'d. PBO', width:120
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
    }
  ]

  const textFieldsGainingHandConfig13 = [
    {label:'d. PBO', width:120
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
    }
  ]

  const textFieldsGainingHandConfig14 = [
    {label:'e. Losing Command Signature', width:300
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
    },
    {label:'f. Date', width:120
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
    }
  ]

  const textFieldsGainingHandConfig15 = [
    {label:'e. Gaining Command Signature', width:300
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
    },
    {label:'f. Date', width:120
    // InputProps={{
    //   readOnly: disableFields.PBO,
    // }}
    // {...(disableFields.PBO && {variant:"filled"})}
    }
  ]

  const textFieldsGainingHandConfig16 = [
    {label:'18a. Received By', width:300
    // InputProps={{
    //   readOnly: disableFields.logistics,
    // }}
    // {...(disableFields.logistics && {variant:"filled"})}
    },
    {label:'b. Date', width:120
    // InputProps={{
    //   readOnly: disableFields.logistics,
    // }}
    // {...(disableFields.logistics && {variant:"filled"})}
    }
  ]

  const textFieldsGainingHandConfig17 = [
    {label:'19a. Posted By', width:300
    // InputProps={{
    //   readOnly: disableFields.logistics,
    // }}
    // {...(disableFields.logistics && {variant:"filled"})}
    },
    {label:'b. Date', width:120
    // InputProps={{
    //   readOnly: disableFields.logistics,
    // }}
    // {...(disableFields.logistics && {variant:"filled"})}
    }
  ]

  // const textFields = textFieldsConfig.map((f, i)=>{
  //   return(
  //     <TextField
  //       id="standard-helperText"
  //       label={f.label}
  //       style={{ width: f.width }}
  //     />
  //   )
  //       })

  // const RequestedActionDropDownItems = requestedActions.map((c, i)=>{
  //   return(
  //     <MenuItem value={c}>
  //     {c}
  //     </MenuItem>
  //   )
  //       })

  const cards = Object.keys(eng4900s).map(function(key) {
    return CardProduct(eng4900s[key]);
  });

  // const cards = eng4900s.map((form) => {
  //   return CardProduct(form);
  // });

  const disableFields = {
    PBO: true,
    logistics: true,
    HRA: false,
    user: false
  }
console.log(phoneNumbers)
//Render return.
  return (
    <div>
      <div style={{textAlign: 'center'}}>
      <h2 >Eng 4900 Form</h2>
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
            </Menu> */}
            
      </div>
      <div style={{textAlign: 'center'}}>
      
      </div>
      <div style={{textAlign: 'center'}}>
          <form className={classesTextField.root} noValidate autoComplete="off">
              <div className={classesGrid.options}>
                  <Grid container spacing={3}>
                      <Grid item xs={12}>
                              <TextField id="outlined-search-id" name="id" label="Search by ID" type="search" variant="outlined" value={id_} onChange={handleIdChange}/> 
                              {/* <TextField id="outlined-search" label="Search by Bar Tag" type="search" variant="outlined" /> 
                              <TextField id="outlined-search" label="Search by HRA" type="search" variant="outlined"/> 
                              <TextField id="outlined-search" label="Search by Bar Tag" type="search" variant="outlined" />  */}

                      <IconButton id="search-4900" aria-label="search" color="primary" onClick={handle4900Search}>
                              <SearchIcon style={{ fontSize: 40 }}/>
                      </IconButton>
                      </Grid>
                  </Grid>
              </div>
          </form>
      </div>
      {/* <div style={{textAlign:'center'}}>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="position" name="position" defaultValue={searchView} onChange={handleSearchViewChange}>
          <FormControlLabel id="card-view" key="card-view" value="card-view" control={<Radio color="primary" />} label="Card View" />
            <FormControlLabel id="table-view" key="table-view" value="table-view" control={<Radio color="primary" />} label="Table View" />
          </RadioGroup>
        </FormControl>
      </div> */}
      {cards.length > 0 && searchView == "card-view"  && !selectedForm ? (<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <h3 style={{ justifyContent: 'center' }}>Available 4900s</h3>
              <div style={{ justifyContent: 'center' }}>{cards}</div>
      </div>) : null}

      {searchView === "table-view" ? materialTableSelect():null}

      <form className={classesTextField.root} noValidate autoComplete="off">
        <div className={classesGrid.root}>
        <Grid container spacing={3}>
          {selectedForm ? form(selectedForm) : null}
        </Grid>
        </div>
      </form>
    </div>
  );
}
