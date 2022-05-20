//import Box from '@material-ui/core/Box';
// import API from "../axios/Api";
// import Header from "./Header";Box
//import { connect } from 'react-redux';
//import { addProduct } from '../../publics/actions/eng4900s';
//-start-//
import React from 'react';
import api from '../../axios/Api';
import TextField from '@material-ui/core/TextField';
//import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import Card4900 from '../Card4900';
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
//import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import MaterialTable from 'material-table'
import {tableIcons} from '../material-table/config'
import Pdf from './eng4900-26-2.pdf';
import {LoadingCircle} from '../tools/tools'
//Styles Import
import { plusButtonStyles, texFieldStyles, gridStyles, itemMenuStyles, phoneTextFieldStyles, AvatarStyles } from '../styles/material-ui';
  
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


export default function Eng4900(props) {
  
  //Constants Declarations.

  const {id} = props.match.params
  //const search = getQueryStringParams(props.location.search)

  const reqActionsReset = {
    Issue: false,
    Transfer: false,
    Repair: false,
    Excess: false,
    Foi: false,
    TemporaryLoan: false
  };
    
  //Variables Declarations.


  //Styles Declarations.
  const classesTextField = texFieldStyles();
  const classesItemMenu = itemMenuStyles();
  const classesPhoneTextField = phoneTextFieldStyles();
  const classesGrid = gridStyles();
  const avatarClasses = AvatarStyles();
  const plusButtonClasses = plusButtonStyles();

  //Hooks Declarations.
  const [loading, setLoading] = React.useState(false);
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
  const [selectedForm, setSelectedForm] = React.useState([]);
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

  const disableFields = {
    PBO: true,
    logistics: true,
    HRA: false,
    user: false
  }

  //will run once.
  React.useEffect(() => {
    const {state} = props.location
    setLoading(true)

    console.log(state)
    if(Object.keys(state) > 0){
      try{
        setPhoneNumbers({
          ...phoneNumbers,
          ["losing_hra_work_phone"]: state[0].losing_hra_work_phone,
          ["gaining_hra_work_phone"]: state[0].gaining_hra_work_phone,
          });
  
        setSelectedForm(state);
        setLoading(false)
      }catch(err){
        console.log(err)
        setLoading(false)
      }
      
    }else{
      console.log(`eng4900/${id}`)
      api.get(`eng4900/${id}`).then((response) => response.data).then((data) => {
      if(data.data.length > 0) {

          setPhoneNumbers({
              ...phoneNumbers,
              ["losing_hra_work_phone"]: data.data[0].losing_hra_work_phone,
              ["gaining_hra_work_phone"]: data.data[0].gaining_hra_work_phone,
              });

          setSelectedForm(data.data);
      }
      setLoading(false)

      }).catch(function (error) {
      setLoading(false)
      //setHras([])
      });
    }

  }, []);

  //Render return.
  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <h2 >ENG 4900</h2>
        <h4 >Form #{id}</h4>
        {loading ? LoadingCircle(): null}
      </div>
      <form className={classesTextField.root} noValidate autoComplete="off">
        <div className={classesGrid.root}>
        <Grid container spacing={3}>
          {selectedForm.length > 0 ? form(selectedForm) : null}
        </Grid>
        </div>
      </form>
    </div>
  );
}