import React, {useState, useEffect} from 'react';
import api from '../axios/Api';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green,grey } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import './eng4900.css';
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
import Button from '@material-ui/core/Button';
//import LoadingButton from '@mui/lab/LoadingButton';
import Menu from '@material-ui/core/Menu';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import MaterialTable from 'material-table'
import {tableIcons} from '../components/material-table/config'
import {getQueryStringParams,LoadingCircle,contains,TextMaskCustom,NumberFormatCustom, numberWithCommas,openInNewTab} from '../components/tools/tools'
import clsx from 'clsx'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, ENG4900, EQUIPMENT, AVD_SEARCH, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT} from '../components/config/constants'
import {orderBy, findIndex, filter} from 'lodash'
//Styles Import
import {texFieldStyles, gridStyles, itemMenuStyles, phoneTextFieldStyles, AvatarStyles } from '../components/styles/material-ui';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header'
import AdornedButton from './AdornedButton'

const dialogStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position:'absolute',
    top: theme.spacing(5),
    'max-width': '80%'
  },
  dialogTitle: {
    float:'right'
  }
}))

const plusButtonStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    //top: theme.spacing(2),
    right: theme.spacing(3),
    //right: '0',
    marginTop:'10px'
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
    height:'50px',
    width:'20%',
    marginTop: '50px',
    marginBottom:'50px'
  },
  fabGrey: {
    color: theme.palette.common.white,
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[600],
    },
    height:'50px',
    width:'20%',
    marginTop: '50px',
    marginBottom:'50px'
  },
}));

const RESET_HRA = {
  hra_employee_id: "",
  hra_equipment_count: "",
  hra_first_name: "",
  hra_full_name: "",
  hra_last_name: "",
  hra_num: "",
  hra_office_symbol_alias: "",
  hra_title: "",
  hra_work_phone: ""  
}

const RESET_FORM = {
  formId: "",
  requested_action: null,
  individual_ror_prop: "",
  expiration_date: null,
  expiration_date_print: "",
  temporary_loan: 2,
  hra: {
    losing: RESET_HRA,
    gaining: RESET_HRA,
  },
  equipment_group: []
}

const RESET_HRAS_HOOK = {losing:[],gaining:[]}

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}


export default function Eng4900(props) {
  
  //Constants Declarations.
  console.log(props)
  const {formData, create4900, setCreate4900, type, eng4900s, setEng4900s} = props
  const formId = props.match ? props.match.params.id : null
  let action = props.location ? (props.location.pathname.split('/')[2].toUpperCase()) : (props.action ? props.action.toUpperCase() : "VIEW")
  //(props.match ? props.match.location.pathname.split('/')[2].toUpperCase() : "VIEW")
  //const editEnabled = ["CREATE","EDIT"].includes(action)
  //console.log(action)
  //Variables Declarations.

  //Styles Declarations.
  const classesTextField = texFieldStyles();
  const classesGrid = gridStyles();
  const classDialog = dialogStyles();
  const plusButtonClasses = plusButtonStyles();

  //Hooks Declarations.
  const [loading, setLoading] = React.useState({
    init:false,
    hra:false,
    equipment:false,
    submit:false
  });
  const [submitButton, setSubmitButton] = React.useState({
    active:false,
    send:false,
  });
  const [equipments,setEquipments] = React.useState([])
  const [phoneNumbers, setPhoneNumbers] = React.useState({
    gaining_hra_work_phone: '(   )    -    ',
    losing_hra_work_phone: '(   )    -    ',
    numberformat: '1320',
  });
  const [selectedForm, setSelectedForm] = React.useState(RESET_FORM);
  const [hras, setHras] = React.useState(RESET_HRAS_HOOK);
  const [editEnabled, setEditEnabled] = React.useState(false);

  const handleCheckBoxChange = (event) => {
    setSelectedForm({ ...selectedForm, temporary_loan: (event.target.checked ? 1 : 2) });
  };

  const handleFormSelect = async () => {

    const getHrasAndEquipments = () => {
      setLoading({...loading,hra:true})
      setLoading({...loading,equipment:true})

      api.get(`hra/form`).then((hra_res) => hra_res.data).then((h_data) => {
          console.log('hra_download',h_data)
          setHras(h_data.status != 400 ? h_data.data : h_data)
          setLoading({...loading,hra:false})
        }).catch(function (error) {
          setHras(RESET_HRAS_HOOK)
          setLoading({...loading,hra:false})
        });
    
      // api.get(`${EQUIPMENT}`).then((eq_res) => eq_res.data).then((e_data) => {
      //     console.log(e_data)
      //     setEquipments(e_data.status == 200 ? e_data.data : e_data)
      //     setLoading({...loading,equipment:false})
      //   }).catch(function (error) {
      //     setEquipments([])
      //     setLoading({...loading,equipment:false})
      //   });
    }

    setLoading({...loading,init:true})

    if(action === "CREATE"){
      setEditEnabled(true)
      setLoading({...loading,init:false})
      getHrasAndEquipments()
      return;
    }

    if((action === "EDIT" || action === "VIEW") && formId){
      await api.get(`${ENG4900}/${formId}`).then((response) => response.data).then(async (data) => {

        if(data.data.status != 1 && action === "EDIT"){
          setEditEnabled(false)
        }

        setSelectedForm(data.status != 400 ? data.data : null)
        setLoading({...loading,init:false})

        if(action === "EDIT" && data.data.status === 1){
          setEditEnabled(true)
          getHrasAndEquipments()
        }
  
        }).catch(function (error) {
          setLoading({...loading,init:false,hra:false,equipment:false})
          setSelectedForm(RESET_FORM)
          //setEng4900s([])
        });
        return;
    }
  }

  const isDateValid = (date) => {

    if(date){
        return (date instanceof Date && !isNaN(date))
    }
    
    return true
  }

  const handleRorPropChange = (e) => {
    setSelectedForm({...selectedForm,  individual_ror_prop: e.target.value})
  }

  const handleDateChange = (date) => {
    setSelectedForm({...selectedForm,  expiration_date: date})
  }

  const handleGainingHraChange = (event,val) => {

    if(val){
      setSelectedForm({...selectedForm,  hra: {...selectedForm.hra, gaining: val} })
      return;
    }

    setSelectedForm({...selectedForm,  hra: {...selectedForm.hra, gaining: RESET_HRA} })
  }

  const handleLosingHraChange = (event,val) => {

    if(val){

      setSelectedForm({...selectedForm,  hra: {...selectedForm.hra, losing: val} })

      console.log(val)
      const idx = findIndex(hras.losing,function(h){ return h.hra_num === val.hra_num})

      console.log('index',idx)
      if(idx != -1){
        setEquipments(hras.losing[idx].equipments)
        console.log(equipments)
        return;
      }

      setEquipments([])
      return;
    }

    
    setSelectedForm({...selectedForm,  hra: {...selectedForm.hra, losing: RESET_HRA},equipment_group:[] })
    setEquipments([])
  }

  const handleHraChange = (event,val) => {

    console.log(event.target.id)

    const hra_type = event.target.id.split('-')[2]

    console.log(hra_type)

    if(hra_type){
      console.log(val)
      setSelectedForm({...selectedForm,  hra: {...selectedForm.hra, [hra_type]: val} })
    }

    // let value = {...val}
    // const hraText = Object.keys(value).includes('gaining_hra_num') ? 'gaining_' : 'losing_'

    // for(const oldKey in value){
    //   delete Object.assign(value, {[hraText + oldKey]: value[oldKey] })[oldKey];
    // }
    // setSelectedForm({...selectedForm,...value})

  }

  const handleSubmit = async (event) => {

    setSubmitButton({...submitButton,send:true})

    return(new Promise((resolve, reject) => {
      setTimeout(() => {
        if(editEnabled){
          api.post(`${ENG4900}/add`,{form:selectedForm,type:action}).then((response) => response.data).then((data) => {
            if(!data.error){
              setEng4900s([data.data, ...eng4900s])
              resetCreate4900Data()
            }
            
            setSubmitButton({...submitButton,send:false})
        
          }).catch(function (error) {
            setSubmitButton({...submitButton,send:false})
          });
        }

        resolve();
        
      }, 1000);
    }))
  }

  const resetCreate4900Data = () => {
    setCreate4900({...create4900,show:false,formId:null,formData:null})
    return;
  }


  const form = () => {

    console.log(selectedForm)

        return(
          <>
          <form className={classesTextField.root} noValidate autoComplete="off">
          <div className={classesGrid.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              <Paper className={classesGrid.paper}>
                <p>{`Form - ${formId ? formId : 'New'}`}</p> 
                {editEnabled ? (
                  <FormControl error={!selectedForm.requested_action} component="fieldset">
                  <FormLabel component="legend">Requested Action:</FormLabel>
                  <RadioGroup row aria-label="position" name="position" value={selectedForm.requested_action} onChange={(event)=>setSelectedForm( {...selectedForm,requested_action:event.target.value} )}>
                    <FormControlLabel id="radio-issue" key="radio-issue" value="Issue" control={<Radio color="primary" />} label="Issue" />
                    <FormControlLabel id="radio-transfer" key="radio-transfer" value="Transfer" control={<Radio color="primary" />} label="Transfer" />
                    <FormControlLabel id="radio-end" key="radio-end" value="Repair" control={<Radio color="primary" />} label="Repair" />
                    <FormControlLabel id="radio-excess" key="radio-excess" value="Excess" control={<Radio color="primary" />} label="Excess" />
                    <FormControlLabel id="radio-foi" key="radio-foi" value="FOI" control={<Radio color="primary" />} label="FOI" />
                  </RadioGroup>
                  {!selectedForm.requested_action ? <FormHelperText>Selection Required.</FormHelperText> : null}
                </FormControl>
                ) : (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Requested Action:</FormLabel>
                  <RadioGroup row aria-label="position" name="position" value={selectedForm.requested_action}>
                    <FormControlLabel id="radio-issue" key="radio-issue" value="Issue" control={<Radio color="primary" />} label="Issue" />
                    <FormControlLabel id="radio-transfer" key="radio-transfer" value="Transfer" control={<Radio color="primary" />} label="Transfer" />
                    <FormControlLabel id="radio-end" key="radio-end" value="Repair" control={<Radio color="primary" />} label="Repair" />
                    <FormControlLabel id="radio-excess" key="radio-excess" value="Excess" control={<Radio color="primary" />} label="Excess" />
                    <FormControlLabel id="radio-foi" key="radio-foi" value="FOI" control={<Radio color="primary" />} label="FOI" />
                  </RadioGroup>
                </FormControl>
                )}
                
                {editEnabled ? (
                  <FormControlLabel
                    control={<Checkbox color="primary" id="check-temporary-loan" key="check-temporary-loan" checked={selectedForm.temporary_loan == 1 ? true : false} onChange={handleCheckBoxChange} name="TemporaryLoan" />}
                    label="Temporary Loan"/> 
                ) : (
                  <FormControlLabel
                    control={<Checkbox color="primary" id="check-temporary-loan" key="check-temporary-loan" checked={selectedForm.temporary_loan == 1 ? true: false} name="TemporaryLoan" />}
                    label="Temporary Loan"/> 
                )}
    
                {editEnabled ? (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline-expiration-date"
                    key="date-picker-inline-expiration-date"
                    label="Expiration Date"
                    value={selectedForm.expiration_date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}/>
                  </MuiPickersUtilsProvider>
                ) : (
                  <TextField
                  id="date-picker-inline-expiration-date"
                  key="date-picker-inline-expiration-date"
                  label="Expiration Date"
                  name={"expiration_date"}
                  value={selectedForm.expiration_date_print}
                  //onChange={handleFormChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ width: 200 }}/>
                )}
            </Paper>
          </Grid>
          
          <Grid item xs={6}>
            <Paper className={classesGrid.paper}>
              <p>LOSING HAND RECEIPT HOLDER</p>
              <TextField
                id="standard-helperText-f-name"
                key="standard-helperText-f-name"
                label="2a. First Name"
                name={"losing_hra_first_name"}
                value={selectedForm.hra.losing.hra_first_name}
                //onChange={handleFormChange}
                InputProps={{
                  readOnly: true,
                }}
                style={{ width: 200 }}/>
              <TextField
                id="standard-helperText-l-name"
                key="standard-helperText-l-name"
                label="2a. Last Name"
                name={"losing_hra_last_name"}
                value={selectedForm.hra.losing.hra_last_name}
                //onChange={handleFormChange}
                InputProps={{
                  readOnly: true,
                }}
                style={{ width: 200 }}/>
              <TextField
                id="standard-helperText-os-alias"
                key="standard-helperText-os-alias"
                label="b. Office Symbol"
                name={"losing_hra_os_alias"}
                value={selectedForm.hra.losing.hra_office_symbol_alias}
                //onChange={handleFormChange}
                InputProps={{
                  readOnly: true,
                }}
                style={{ width: 200 }}/>
              {editEnabled ?
                <Autocomplete
                  style={{ display:'inline-block' }}
                  id="combo-box-losing"
                  options={hras.losing}
                  loading={loading.hra}
                  getOptionLabel={(option) => option.hra_num + ' - ' + option.hra_first_name + ' ' + option.hra_last_name}
                  defaultValue={selectedForm.hra.losing.hra_num ? selectedForm.hra.losing : null}
                  style={{ width: 300 }}
                  onChange={handleLosingHraChange}
                  
                  renderInput={(params) => <TextField {...(!selectedForm.hra.losing.hra_num && {error:true,helperText:"Selection Required."})} {...params} label="Losing HRA" />}/>
                :
                <TextField
                  id="standard-helperText-l-hra-num"
                  key="standard-helperText-l-hra-num"
                  label="c. Hand Receipt Account Number"
                  value={selectedForm.hra.losing.hra_num}
                  style={{ width: 300 }}/>
                }
                <TextField
                id="standard-helperText-l-hra-pnum"
                key="standard-helperText-l-hra-pnum"
                label="d. Work Phone Number"
                name="losing_hra_work_phone"
                value={selectedForm.hra.losing.hra_work_phone ? formatPhoneNumber(selectedForm.hra.losing.hra_work_phone) : ""}
                style={{ width: 200 }}/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classesGrid.paper}>
              <p>GAINING HAND RECEIPT HOLDER</p>
              <TextField
                id="standard-helperText-g-first-name"
                key="standard-helperText-g-first-name"
                label="3a. Name"
                name={"gaining_hra_first_name"}
                value={selectedForm.hra.gaining.hra_first_name}
                //onChange={handleFormChange}
                InputProps={{
                  readOnly: true,
                }}
                style={{ width: 200 }}/>
              <TextField
                id="standard-helperText-g-last-name"
                key="standard-helperText-g-last-name"
                label="3a. Name"
                name={"gaining_hra_last_name"}
                value={selectedForm.hra.gaining.hra_last_name}
                //onChange={handleFormChange}
                InputProps={{
                  readOnly: true,
                }}
                style={{ width: 200 }}/>
                <TextField
                id="standard-helperText-g-name"
                key="standard-helperText-g-name"
                label="b. Office Symbol"
                name={"gaining_hra_os_alias"}
                value={selectedForm.hra.gaining.hra_office_symbol_alias}
                //onChange={handleFormChange}
                InputProps={{
                  readOnly: true,
                }}
                style={{ width: 200 }}/>
              {editEnabled ? 
                  <Autocomplete
                  style={{ display:'inline-block' }}
                  id="combo-box-gaining"
                  options={hras.gaining}
                  getOptionDisabled={(option) =>
                    selectedForm.hra.losing.hra_num === option.hra_num
                  }
                  loading={loading.hra}
                  getOptionLabel={(option) => option.hra_num + ' - ' + option.hra_first_name + ' ' + option.hra_last_name}
                  defaultValue={selectedForm.hra.gaining.hra_num ? selectedForm.hra.gaining : null}
                  style={{ width: 300 }}
                  onChange={handleGainingHraChange}
                  renderInput={(params) => <TextField {...(!selectedForm.hra.gaining.hra_num && {error:true,helperText:"Selection Required."})} {...params} label="Gaining HRA" />}
                />
              :
              <TextField
                id="standard-helperText-g-hra-num"
                key="standard-helperText-g-hra-num"
                label="c. Hand Receipt Account Number"
                value={selectedForm.hra.gaining.hra_num}
                style={{ width: 300 }}/>
              }
              
              <TextField
                id="standard-helperText-g-hra-pnum"
                key="standard-helperText-g-hra-pnum"
                label="d. Work Phone Number"
                name="gaining_hra_work_phone"
                value={selectedForm.hra.gaining.hra_work_phone ? formatPhoneNumber(selectedForm.hra.gaining.hra_work_phone ) : ""}
                style={{ width: 200 }}/>
            </Paper>
          </Grid>
          {materialTableSelect()}
          <Grid item xs={6}>
            <Paper className={classesGrid.paper}>
            {editEnabled ? 
            <TextField
              id="standard-helperText-ror-prop"
              key="standard-helperText-ror-prop"
              label="13a. Individual/Vendor Removing or Recieving Property"
              value={selectedForm.individual_ror_prop ? selectedForm.individual_ror_prop : ""}
              onChange={handleRorPropChange}
              style={{ width: '80%' }}/>
            :
            <TextField
                id="standard-helperText-ror-prop"
                key="standard-helperText-ror-prop"
                label="13a. Individual/Vendor Removing or Recieving Property"
                value={selectedForm.individual_ror_prop ? selectedForm.individual_ror_prop : ""}
                style={{ width: '80%' }}/>
            }
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classesGrid.paper}>
              <TextField
                id="standard-helperText-ror-prop-sign-date"
                key="standard-helperText-ror-prop-sign-date"
                label="b. Date"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                style={{ width: 120 }}/>
              <TextField
                id="standard-helperText-ror-prop-sign"
                key="standard-helperText-ror-prop-sign"
                label="c. Signature"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                style={{ width: 120 }}/>
          </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classesGrid.paper}>
              <TextField
                id="standard-helperText-l-hra-sign"
                key="standard-helperText-l-hra-sign"
                label="14a. Losing HRH Signature"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                style={{ width: 300 }}/>
              <TextField
                id="standard-helperText-l-hra-sign-date"
                key="standard-helperText-l-hra-sign-date"
                label="b. Date"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                style={{ width: 120 }}/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classesGrid.paper}>
              <TextField
                id="standard-helperText-g-hra-sign"
                key="standard-helperText-g-hra-sign"
                label="15a. Gaining HRH Signature"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                style={{ width: 300 }}/>
              <TextField
                id="standard-helperText-g-hra-sign-date"
                key="standard-helperText-g-hra-sign-date"
                label="b. Date"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                style={{ width: 120 }}/>
            </Paper>
          </Grid>
          {/* <Grid item xs={12}>
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
          </Grid> */}
            </Grid>
          </div>
        </form>
        {(action === "CREATE" || action === "EDIT") && editEnabled ? (
          <div style={{textAlign:'center'}}>

          {/* <LoadingButton className={ submitButton ? clsx(plusButtonClasses.fabGreen) : clsx(plusButtonClasses.fabGrey)} {...(!submitButton && {disabled:true})}
            onClick={handleSubmit}
            endIcon={tableIcons.Send}
            loading={loading.submit}
            loadingPosition="end"
            variant="contained"
          >
            Send
          </LoadingButton> */}

          <AdornedButton onClick={handleSubmit} className={ submitButton.active ? clsx(plusButtonClasses.fabGreen) : clsx(plusButtonClasses.fabGrey)} {...((!submitButton.active || submitButton.send) && {disabled:true})} {...((submitButton.send) && {loading:true})}> 
            Submit
          </AdornedButton>
          </div>
        ) : null}
        </>
        )
      

    // if(action === "VIEW"){

    //   let {requested_action, individual_ror_prop, expiration_date, expiration_date_print, temporary_loan,
    //     // losing_hra_num, losing_hra_first_name, losing_hra_last_name, losing_hra_os_alias,
    //     // gaining_hra_num, gaining_hra_first_name, gaining_hra_last_name, gaining_hra_os_alias,
    //   } = selectedForm

    //   return(
    //     <form className={classesTextField.root} noValidate autoComplete="off">
    //     <div className={classesGrid.root}>
    //       <Grid container spacing={3}>
    //         <Grid item xs={12}>
    //         <Paper className={classesGrid.paper}>
    //           <p>{`Form - ${formId ? formId : 'New'}`}</p> 
    //           {editEnabled ? (
    //             <FormControl component="fieldset">
    //             <FormLabel component="legend">Requested Action:</FormLabel>
    //             <RadioGroup row aria-label="position" name="position" error={true} defaultValue={selectedForm.requested_action} onChange={(event)=>setSelectedForm( {...selectedForm,requested_action:event.target.value} )}>
    //               <FormControlLabel id="radio-issue" key="radio-issue" value="Issue" control={<Radio color="primary" />} label="Issue" />
    //               <FormControlLabel id="radio-transfer" key="radio-transfer" value="Transfer" control={<Radio color="primary" />} label="Transfer" />
    //               <FormControlLabel id="radio-end" key="radio-end" value="Repair" control={<Radio color="primary" />} label="Repair" />
    //               <FormControlLabel id="radio-excess" key="radio-excess" value="Excess" control={<Radio color="primary" />} label="Excess" />
    //               <FormControlLabel id="radio-foi" key="radio-foi" value="FOI" control={<Radio color="primary" />} label="FOI" />
    //             </RadioGroup>
    //             <FormHelperText>{helperText}</FormHelperText>
    //           </FormControl>
    //           ) : (
    //           <FormControl component="fieldset">
    //             <FormLabel component="legend">Requested Action:</FormLabel>
    //             <RadioGroup row aria-label="position" name="position" value={requested_action}>
    //               <FormControlLabel id="radio-issue" key="radio-issue" value="Issue" control={<Radio color="primary" />} label="Issue" />
    //               <FormControlLabel id="radio-transfer" key="radio-transfer" value="Transfer" control={<Radio color="primary" />} label="Transfer" />
    //               <FormControlLabel id="radio-end" key="radio-end" value="Repair" control={<Radio color="primary" />} label="Repair" />
    //               <FormControlLabel id="radio-excess" key="radio-excess" value="Excess" control={<Radio color="primary" />} label="Excess" />
    //               <FormControlLabel id="radio-foi" key="radio-foi" value="FOI" control={<Radio color="primary" />} label="FOI" />
    //             </RadioGroup>
    //           </FormControl>
    //           )}
              
    //           {editEnabled ? (
    //             <FormControlLabel
    //               control={<Checkbox color="primary" id="check-temporary-loan" key="check-temporary-loan" checked={temporary_loan == 1 ? true : false} onChange={handleCheckBoxChange} name="TemporaryLoan" />}
    //               label="Temporary Loan"/> 
    //           ) : (
    //             <FormControlLabel
    //               control={<Checkbox color="primary" id="check-temporary-loan" key="check-temporary-loan" checked={temporary_loan == 1 ? true: false} name="TemporaryLoan" />}
    //               label="Temporary Loan"/> 
    //           )}
  
    //           {editEnabled ? (
    //             <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //               <KeyboardDatePicker
    //               disableToolbar
    //               variant="inline"
    //               format="MM/dd/yyyy"
    //               margin="normal"
    //               id="date-picker-inline-expiration-date"
    //               key="date-picker-inline-expiration-date"
    //               label="Expiration Date"
    //               value={expiration_date}
    //               onChange={handleDateChange}
    //               KeyboardButtonProps={{
    //                   'aria-label': 'change date',
    //               }}/>
    //             </MuiPickersUtilsProvider>
    //           ) : (
    //             <TextField
    //             id="date-picker-inline-expiration-date"
    //             key="date-picker-inline-expiration-date"
    //             label="Expiration Date"
    //             name={"expiration_date"}
    //             value={expiration_date_print}
    //             //onChange={handleFormChange}
    //             InputProps={{
    //               readOnly: true,
    //             }}
    //             style={{ width: 200 }}/>
    //           )}
    //       </Paper>
    //     </Grid>
        
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <p>LOSING HAND RECEIPT HOLDER</p>
    //         <TextField
    //           id="standard-helperText-f-name"
    //           key="standard-helperText-f-name"
    //           label="2a. First Name"
    //           name={"losing_hra_first_name"}
    //           value={selectedForm.hra.losing.hra_first_name}
    //           //onChange={handleFormChange}
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           style={{ width: 200 }}/>
    //         <TextField
    //           id="standard-helperText-l-name"
    //           key="standard-helperText-l-name"
    //           label="2a. Last Name"
    //           name={"losing_hra_last_name"}
    //           value={selectedForm.hra.losing.hra_last_name}
    //           //onChange={handleFormChange}
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           style={{ width: 200 }}/>
    //         <TextField
    //           id="standard-helperText-os-alias"
    //           key="standard-helperText-os-alias"
    //           label="b. Office Symbol"
    //           name={"losing_hra_os_alias"}
    //           value={selectedForm.hra.losing.hra_office_symbol_alias}
    //           //onChange={handleFormChange}
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           style={{ width: 200 }}/>
    //         {editEnabled ?
    //           <Autocomplete
    //             style={{ display:'inline-block' }}
    //             id="combo-box-losing"
    //             options={hras}
    //             getOptionLabel={(option) => option.hra_num + ' - ' + option.hra_first_name + ' ' + option.hra_last_name}
    //             defaultValue={selectedForm.hra.losing.hra_num ? selectedForm.hra.losing : null}
    //             style={{ width: 300 }}
    //             onChange={handleLosingHraChange}
    //             renderInput={(params) => <TextField {...(!selectedForm.hra.losing.hra_num && {error:true,helperText:"Selection Required."})} {...params} label="Losing HRA" />}/>
    //           :
    //           <TextField
    //             id="standard-helperText-l-hra-num"
    //             key="standard-helperText-l-hra-num"
    //             label="c. Hand Receipt Account Number"
    //             value={selectedForm.hra.losing.hra_num}
    //             style={{ width: 300 }}/>
    //           }
    //           <TextField
    //           id="standard-helperText-l-hra-pnum"
    //           key="standard-helperText-l-hra-pnum"
    //           label="d. Work Phone Number"
    //           name="losing_hra_work_phone"
    //           value={selectedForm.hra.losing.hra_work_phone ? formatPhoneNumber(selectedForm.hra.losing.hra_work_phone) : ""}
    //           style={{ width: 200 }}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <p>GAINING HAND RECEIPT HOLDER</p>
    //         <TextField
    //           id="standard-helperText-g-first-name"
    //           key="standard-helperText-g-first-name"
    //           label="3a. Name"
    //           name={"gaining_hra_first_name"}
    //           value={selectedForm.hra.gaining.hra_first_name}
    //           //onChange={handleFormChange}
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           style={{ width: 200 }}/>
    //         <TextField
    //           id="standard-helperText-g-last-name"
    //           key="standard-helperText-g-last-name"
    //           label="3a. Name"
    //           name={"gaining_hra_last_name"}
    //           value={selectedForm.hra.gaining.hra_last_name}
    //           //onChange={handleFormChange}
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           style={{ width: 200 }}/>
    //           <TextField
    //           id="standard-helperText-g-name"
    //           key="standard-helperText-g-name"
    //           label="b. Office Symbol"
    //           name={"gaining_hra_os_alias"}
    //           value={selectedForm.hra.gaining.hra_office_symbol_alias}
    //           //onChange={handleFormChange}
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           style={{ width: 200 }}/>
    //         {editEnabled ? 
    //             <Autocomplete
    //             style={{ display:'inline-block' }}
    //             id="combo-box-gaining"
    //             options={hras}
    //             getOptionLabel={(option) => option.hra_num + ' - ' + option.hra_first_name + ' ' + option.hra_last_name}
    //             defaultValue={selectedForm.hra.gaining.hra_num ? selectedForm.hra.gaining : null}
    //             style={{ width: 300 }}
    //             onChange={handleGainingHraChange}
    //             renderInput={(params) => <TextField {...(!selectedForm.hra.gaining.hra_num && {error:true,helperText:"Selection Required."})} {...params} label="Gaining HRA" />}
    //           />
    //         :
    //         <TextField
    //           id="standard-helperText-g-hra-num"
    //           key="standard-helperText-g-hra-num"
    //           label="c. Hand Receipt Account Number"
    //           value={selectedForm.hra.gaining.hra_num}
    //           style={{ width: 300 }}/>
    //         }
            
    //         <TextField
    //           id="standard-helperText-g-hra-pnum"
    //           key="standard-helperText-g-hra-pnum"
    //           label="d. Work Phone Number"
    //           name="gaining_hra_work_phone"
    //           value={selectedForm.hra.gaining.hra_work_phone ? formatPhoneNumber(selectedForm.hra.gaining.hra_work_phone ) : ""}
    //           style={{ width: 200 }}/>
    //       </Paper>
    //     </Grid>
    //     {materialTableSelect()}
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-ror-prop"
    //           key="standard-helperText-ror-prop"
    //           label="13a. Individual/Vendor Removing or Recieving Property"
    //           value={individual_ror_prop ? individual_ror_prop : ""}
    //           style={{ width: 600 }}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-ror-prop-sign-date"
    //           key="standard-helperText-ror-prop-sign-date"
    //           label="b. Date"
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           variant="filled"
    //           style={{ width: 120 }}/>
    //         <TextField
    //           id="standard-helperText-ror-prop-sign"
    //           key="standard-helperText-ror-prop-sign"
    //           label="c. Signature"
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           variant="filled"
    //           style={{ width: 120 }}/>
    //     </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-l-hra-sign"
    //           key="standard-helperText-l-hra-sign"
    //           label="14a. Losing HRH Signature"
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           variant="filled"
    //           style={{ width: 300 }}/>
    //         <TextField
    //           id="standard-helperText-l-hra-sign-date"
    //           key="standard-helperText-l-hra-sign-date"
    //           label="b. Date"
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           variant="filled"
    //           style={{ width: 120 }}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-g-hra-sign"
    //           key="standard-helperText-g-hra-sign"
    //           label="15a. Gaining HRH Signature"
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           variant="filled"
    //           style={{ width: 300 }}/>
    //         <TextField
    //           id="standard-helperText-g-hra-sign-date"
    //           key="standard-helperText-g-hra-sign-date"
    //           label="b. Date"
    //           InputProps={{
    //             readOnly: true,
    //           }}
    //           variant="filled"
    //           style={{ width: 120 }}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Paper className={classesGrid.paper}>
    //         <p>Transfer (PBO use only)</p>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-l-command"
    //           key="standard-helperText-l-command"
    //           label="16a. Losing Command"
    //           style={{ width: 250 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //         <TextField
    //           id="standard-helperText-l-uic"
    //           key="standard-helperText-l-uic"
    //           label="b. UIC"
    //           style={{ width: 120 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-g-command"
    //           key="standard-helperText-g-command"
    //           label="17a. Gaining Command"
    //           style={{ width: 250 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //         <TextField
    //           id="standard-helperText-g-uic"
    //           key="standard-helperText-g-uic"
    //           label="b. UIC"
    //           style={{ width: 120 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //       <TextField
    //         id="standard-helperText-ship-from"
    //         key="standard-helperText-ship-from"
    //         label="c. Ship From"
    //         style={{ width: 120 }}
    //         InputProps={{
    //           readOnly: disableFields.PBO,
    //         }}
    //         {...(disableFields.PBO && {variant:"filled"})}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-ship-to"
    //           key="standard-helperText-ship-to"
    //           label="c. Ship To:"
    //           style={{ width: 120 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-l-pbo"
    //           key="standard-helperText-l-pbo"
    //           label="d. PBO"
    //           style={{ width: 120 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-g-pbo"
    //           key="standard-helperText-g-pbo"
    //           label="d. PBO"
    //           style={{ width: 120 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-l-command-sign"
    //           key="standard-helperText-l-command-sign"
    //           label="e. Losing Command Signature"
    //           style={{ width: 300 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //         <TextField
    //           id="standard-helperText-l-command-sign-date"
    //           key="standard-helperText-l-command-sign-date"
    //           label="f. Date"
    //           style={{ width: 120 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-g-command-sign"
    //           key="standard-helperText-g-command-sign"
    //           label="e. Gaining Command Signature"
    //           style={{ width: 300 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //         <TextField
    //           id="standard-helperText-g-command-sign-date"
    //           key="standard-helperText-g-command-sign-date"
    //           label="f. Date"
    //           style={{ width: 120 }}
    //           InputProps={{
    //             readOnly: disableFields.PBO,
    //           }}
    //           {...(disableFields.PBO && {variant:"filled"})}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Paper className={classesGrid.paper}>
    //         <p>Logistics (supply use only)</p>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classesGrid.paper}>
    //         <TextField
    //           id="standard-helperText-received-by"
    //           key="standard-helperText-received-by"
    //           label="18a. Received By"
    //           style={{ width: 300 }}
    //           InputProps={{
    //             readOnly: disableFields.logistics,
    //           }}
    //           {...(disableFields.logistics && {variant:"filled"})}/>
    //         <TextField
    //           id="standard-helperText-received-by-date"
    //           key="standard-helperText-received-by-date"
    //           label="b. Date"
    //           style={{ width: 120 }}
    //           InputProps={{
    //             readOnly: disableFields.logistics,
    //           }}
    //           {...(disableFields.logistics && {variant:"filled"})}/>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //     <Paper className={classesGrid.paper}>
    //       <TextField
    //         id="standard-helperText-posted-by"
    //         key="standard-helperText-posted-by"
    //         label="19a. Posted By"
    //         style={{ width: 300 }}
    //         InputProps={{
    //           readOnly: disableFields.logistics,
    //         }}
    //         {...(disableFields.logistics && {variant:"filled"})}/>
    //       <TextField
    //         id="standard-helperText-posted-by-date"
    //         key="standard-helperText-posted-by-date"
    //         label="b. Date"
    //         style={{ width: 120 }}
    //         InputProps={{
    //           readOnly: disableFields.logistics,
    //         }}
    //         {...(disableFields.logistics && {variant:"filled"})}/>
    //       </Paper>
    //     </Grid>
    //       </Grid>
    //     </div>
    //   </form>
    //   )
    // }
  }

  const materialTableSelect = () => {

    //considering move to a config file.
    const columns = [
      //{ title: 'Item No.', field: 'hra_num', type:'numeric', editEnabled:'never'},
      { title: 'Bar Tag No.', field: 'bar_tag_num', type:'numeric',
        editComponent: x => {
        //console.log(x);
        let idx = -1
    
        //const equipments_losing_hra = selectedForm.hra.losing.hra_num && Object.keys(equipments) > 0 ? equipments[selectedForm.hra.losing.hra_num] : []
        const selectedEquipments = selectedForm.equipment_group.length > 0 ? selectedForm.equipment_group.map(x => x.bar_tag_num) : []

        if(x.rowData.bar_tag_num){
          idx = findIndex(equipments,function(e){ return (e.bar_tag_num && (e.bar_tag_num == x.rowData.bar_tag_num)); })
        }
    
        return(
          <Autocomplete
          //onChange={e => x.onChange(e)}
          id="combo-box-equipments"
          size="small"
          options={equipments}
          getOptionLabel={(option) => option.bar_tag_num + ' - ' + option.item_type}
          value={idx != -1 ? equipments[idx] : null}
          getOptionDisabled={(option) =>
            selectedEquipments.includes(option.bar_tag_num)
          }
          loading={loading.equipment}
          onChange ={e => {
    
          const bt_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
          //console.log(bt_);
          x.onChange(bt_)
          }}
          //style={{ verticalAlign: 'top' }}
          renderInput={(params) => <TextField {...params} label="Equipments" margin="normal"/>}
        />
        )
        }
      },
      { title: 'Catalog', field: 'catalog_num',editable: 'never' },
      { title: 'Nomenclature (include make, model)', field: 'item_type',editable: 'never' },
      { title: 'Cond Code', field: 'condition_alias',editable: 'never' },
      { title: 'Serial Number', field: 'serial_num',editable: 'never' },
      { title: 'ACQ Date', field: 'acquisition_date',editable: 'never',type:'date' },
      { title: 'ACQ Price', field: 'acquisition_price',editable: 'never'},
      { title: 'Document Number/Control ID#', field: 'document_num',editable: 'never'}
    ]

    
  
    return(
      <div style={{ width: '100%' }}>
        <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={selectedForm.equipment_group}
        localization={{ body:{ emptyDataSourceMessage:<h6 style={{color:'#ff0000'}}>Equipments are required</h6> } }}
        options={{
          //exportButton: true,
          //exportAllData: true,
          search:false,
          headerStyle: {
          backgroundColor: "#969696",
          color: "#FFF",
          fontWeight: 'bold',
        }
        }}
        title=""
        {...(editEnabled && {editable:{
          
          //isEditable: rowData => rowData.field !== 'id', // only name(a) rows would be editEnabled
          //isEditHidden: rowData => rowData.name === 'x',
          // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
          // isDeleteHidden: rowData => rowData.name === 'y',
          onBulkUpdate: (changes) => {
          //await handleTableUpdate({changes:changes})
            new Promise((resolve, reject) => {
            
              setTimeout(() => {
                //setHras([...hras, newData]);
                //console.log('bulk update')
                
                //resetHras()
                resolve();
              }, 1000);
            })
          },
          //onRowAddCancelled: rowData => console.log('Row adding cancelled'),
          //onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
          onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              //const equipments_losing_hra = selectedForm.hra.losing.hra_num && Object.keys(equipments) > 0 ? equipments[selectedForm.hra.losing.hra_num] : []

              const idx = findIndex(equipments,function(e){ return e.bar_tag_num === newData.bar_tag_num})

              if(idx != -1){
                setSelectedForm({...selectedForm,equipment_group:[...selectedForm.equipment_group, equipments[idx]]});
              }

              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...selectedForm.equipment_group];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setSelectedForm({...selectedForm,equipment_group:[...dataUpdate]});

              resolve();
            }, 1000)
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...selectedForm.equipment_group];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setSelectedForm({...selectedForm,equipment_group:[...dataDelete]});

                resolve();
              }, 1000);
            }),
        }})}
        />
      </div>
    )
  }

  useEffect(()=>{
    if(action === "CREATE"){
      console.log(selectedForm)
      if(isDateValid(selectedForm.expiration_date) && selectedForm.requested_action && selectedForm.hra.losing.hra_num && selectedForm.hra.gaining.hra_num && selectedForm.equipment_group.length > 0){
        setSubmitButton({...submitButton,active:true})
        return;
      }
        
      setSubmitButton({...submitButton,active:false})
    }
  },[selectedForm])

  useEffect(()=>{
    if(!selectedForm.hra.losing.hra_num){
      //setSelectedForm({...selectedForm,equipment_group:[]})
    }
    
  },[selectedForm.hra.losing.hra_num])

  //Render Variables
  const displayTop = () => {
    if(action.includes("EDIT"))
    {
      return(
      <div style={{textAlign: 'center'}}>
        <h2>Eng 4900 - Edit Form</h2>
      </div>
      )
    }

    if(action.includes("VIEW"))
    {
      return(
      <div style={{textAlign: 'center'}}>
        <h2>Eng 4900 - View Form</h2>
      </div>
      )
    }

    if(action.includes("CREATE"))
    {
      return(
      <div style={{textAlign: 'center'}}>
        <h2>Eng 4900 - Create Form</h2>
      </div>
      )
    }

    return(<div style={{textAlign: 'center'}}> <h2>Eng 4900</h2> </div>)
  }

  const disableFields = {
    PBO: true,
    logistics: true,
    HRA: false,
    user: false
  }

  //Effects.
	useEffect(() => {
    handleFormSelect()
  }, []);//will run once.

  //Render return.

  if((type ? type : "FORM").toUpperCase() !== "FORM"){
    return (
      <>
      <Dialog  maxWidth = {false} open={create4900 ? create4900.show : false} class={{paper:classDialog.dialogWrapper}} onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
            //setModal({...modal,active:false})
        }
        }}>
        
        <div >
        <DialogTitle disableTypography class={classDialog.dialogTitle}>
          <IconButton onClick={()=>resetCreate4900Data()}>
              <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        </div>
        <DialogContent>
        
        {displayTop()}
        <div style={{textAlign: 'center'}}> {loading.init ? LoadingCircle() : null} </div>
        {form()}

        </DialogContent>
        </Dialog>
        </>
    )
  }

  return (
    <>
    <Header/>
      {displayTop()}
      <div style={{textAlign: 'center'}}> {loading.init ? LoadingCircle() : null} </div>
      {!loading.init ? form() : null}
      </>
  )

  // return (
  //   <>
  //   <div>
  //   <IconButton onClick={()=>resetCreate4900Data()}>
  //           <CloseIcon />
  //       </IconButton>
  //     {displayTop()}
  //     <div style={{textAlign: 'center'}}> {loading ? LoadingCircle() : null} </div>
  //     {form()}
  //   </div>
  //   </>
  // );
}