import React from 'react';
import api from '../../axios/Api';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './eng4900.css';
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
import {tableIcons} from '../material-table/config'
import {getQueryStringParams,LoadingCircle,contains,TextMaskCustom,NumberFormatCustom, numberWithCommas,openInNewTab} from '../tools/tools'
import clsx from 'clsx'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, ENG4900, EQUIPMENT, AVD_SEARCH, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT} from '../config/constants'
import {orderBy, findIndex, filter} from 'lodash'
//Styles Import
import { plusButtonStyles, texFieldStyles, gridStyles, itemMenuStyles, phoneTextFieldStyles, AvatarStyles } from '../styles/material-ui';
import Header from '../Header'

const RESET_FORM = {
  form_id: "",
  requested_action: "",
  individual_ror_prop: "",
  expiration_date: "",
  expiration_date_print: "",
  temporary_loan: "",
  losing_hra_num: "",
  losing_hra_first_name: "",
  losing_hra_last_name: "",
  losing_hra_os_alias: "",
  gaining_hra_num: "",
  gaining_hra_first_name: "",
  gaining_hra_last_name: "",
  gaining_hra_os_alias: "",
}

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
  const formId = props.match.params.id
  //const PAGE_URL = `/${ENG4900}`
  const VIEW = `/view/`
  const EDIT = `/edit/`
  const CREATE = `/create`

  //Variables Declarations.

  //Styles Declarations.
  const classesTextField = texFieldStyles();
  const classesGrid = gridStyles();

  //Hooks Declarations.
  const [editable,setEditable] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  const [equipments,setEquipments] = React.useState([])
  const [phoneNumbers, setPhoneNumbers] = React.useState({
    gaining_hra_work_phone: '(   )    -    ',
    losing_hra_work_phone: '(   )    -    ',
    numberformat: '1320',
  });
  const [selectedForm, setSelectedForm] = React.useState(RESET_FORM);
  const [hras, setHras] = React.useState([]);

  const handleCheckBoxChange = (event) => {
    setSelectedForm({ ...selectedForm, temporary_loan: (event.target.checked ? 1 : 2) });
  };

	const reloadPage = () => {
		window.location.reload()
  }

  const handleFormSelectById = async (edit=false) => {

    if(edit) setEditable(true)

    setSelectedForm(RESET_FORM)
    console.log('4900byID')
    setLoading(true)

    if(edit){
      // await api.get(`officesymbol`,{}).then((response) => response.data).then((data) => {
      //   console.log(data)
      //   setOfficesSymbol(data.status != 400 ? data.data : [])

      // }).catch(function (error) {
      //   //setLoading(false)
      //   setOfficesSymbol([])
      // });
    }

    await api.get(`${ENG4900}/${formId}`).then((response) => response.data).then(async (data) => {
      console.log(data.data)

      if(edit){
        await api.get(`hra`).then((hra_res) => hra_res.data).then((h_data) => {
          console.log('hra_download',h_data)
          setHras(h_data.status != 400 ? h_data.data : h_data)
          // this.setState({
          // 	equipments: data.status != 400 ? data.values: data,
          // 	setequipment: data
          // });
          //console.log(this.state.equipment.values);
          // console.log(this.props, this.state);
          }).catch(function (error) {
          setHras([])
          });
      
        await api.get(EQUIPMENT,{}).then((eq_res) => eq_res.data).then((e_data) => {
          console.log(e_data)
          //setLoading(false)
          setEquipments(e_data.status == 200 ? e_data.data : e_data)
          // this.setState({
          // 	equipments: data.status != 400 ? data.values: data,
          // 	setequipment: data
          // });
          //console.log(this.state.equipment.values);
          // console.log(this.props, this.state);
          }).catch(function (error) {
          //setLoading(false)
          setEquipments([])
          });
        // setPhoneNumbers({
        //   ...phoneNumbers,
        //   ["losing_hra_work_phone"]: data.data.losing_hra_work_phone,
        //   ["gaining_hra_work_phone"]: data.data.gaining_hra_work_phone,
        // });
      }

      setSelectedForm(data.status != 400 ? data.data : null)
      setLoading(false)

      }).catch(function (error) {
        setLoading(false)
        setSelectedForm(RESET_FORM)
        //setEng4900s([])
      });
  }

  const handleDateChange = (date) => {
    setSelectedForm({...selectedForm,  expiration_date: date})
  }

  const handleHraChange = (event,val) => {

    const hra_type = event.target.id.split('-')[2]

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


  const form = () => {
    const {pathname} = props.location
    const {form_id} = selectedForm

    if(form_id && !pathname.includes(`${ENG4900 + CREATE}`) || pathname.includes(`${ENG4900 + CREATE}`) ){

      let {requested_action, individual_ror_prop, expiration_date, expiration_date_print, temporary_loan,
        // losing_hra_num, losing_hra_first_name, losing_hra_last_name, losing_hra_os_alias,
        // gaining_hra_num, gaining_hra_first_name, gaining_hra_last_name, gaining_hra_os_alias,
      } = selectedForm

      return(
        <form className={classesTextField.root} noValidate autoComplete="off">
        <div className={classesGrid.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper className={classesGrid.paper}>
              <p>{`Form - ${form_id ? form_id : 'New'}`}</p> 
              {editable ? (
                <FormControl component="fieldset">
                <FormLabel component="legend">Requested Action:</FormLabel>
                <RadioGroup row aria-label="position" name="position" defaultValue={requested_action} onChange={(event)=>setSelectedForm( {...selectedForm,requested_action:event.target.value} )}>
                  <FormControlLabel id="radio-issue" key="radio-issue" value="Issue" control={<Radio color="primary" />} label="Issue" />
                  <FormControlLabel id="radio-transfer" key="radio-transfer" value="Transfer" control={<Radio color="primary" />} label="Transfer" />
                  <FormControlLabel id="radio-end" key="radio-end" value="Repair" control={<Radio color="primary" />} label="Repair" />
                  <FormControlLabel id="radio-excess" key="radio-excess" value="Excess" control={<Radio color="primary" />} label="Excess" />
                  <FormControlLabel id="radio-foi" key="radio-foi" value="FOI" control={<Radio color="primary" />} label="FOI" />
                </RadioGroup>
              </FormControl>
              ) : (
              <FormControl component="fieldset">
                <FormLabel component="legend">Requested Action:</FormLabel>
                <RadioGroup row aria-label="position" name="position" value={requested_action}>
                  <FormControlLabel id="radio-issue" key="radio-issue" value="Issue" control={<Radio color="primary" />} label="Issue" />
                  <FormControlLabel id="radio-transfer" key="radio-transfer" value="Transfer" control={<Radio color="primary" />} label="Transfer" />
                  <FormControlLabel id="radio-end" key="radio-end" value="Repair" control={<Radio color="primary" />} label="Repair" />
                  <FormControlLabel id="radio-excess" key="radio-excess" value="Excess" control={<Radio color="primary" />} label="Excess" />
                  <FormControlLabel id="radio-foi" key="radio-foi" value="FOI" control={<Radio color="primary" />} label="FOI" />
                </RadioGroup>
              </FormControl>
              )}
              
              {editable ? (
                <FormControlLabel
                  control={<Checkbox color="primary" id="check-temporary-loan" key="check-temporary-loan" checked={temporary_loan == 1 ? true : false} onChange={handleCheckBoxChange} name="TemporaryLoan" />}
                  label="Temporary Loan"/> 
              ) : (
                <FormControlLabel
                  control={<Checkbox color="primary" id="check-temporary-loan" key="check-temporary-loan" checked={temporary_loan == 1 ? true: false} name="TemporaryLoan" />}
                  label="Temporary Loan"/> 
              )}
  
              {editable ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline-expiration-date"
                  key="date-picker-inline-expiration-date"
                  label="Expiration Date"
                  value={expiration_date}
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
                value={expiration_date_print}
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
            {editable ?
              <Autocomplete
                style={{ display:'inline-block' }}
                id="combo-box-losing"
                options={hras}
                getOptionLabel={(option) => option.hra_num + ' - ' + option.hra_first_name + ' ' + option.hra_last_name}
                defaultValue={selectedForm.hra.losing}
                style={{ width: 300 }}
                onChange={handleHraChange}
                renderInput={(params) => <TextField {...params} label="Losing HRA" />}/>
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
            {editable ? 
                <Autocomplete
                style={{ display:'inline-block' }}
                id="combo-box-gaining"
                options={hras}
                getOptionLabel={(option) => option.hra_num + ' - ' + option.hra_first_name + ' ' + option.hra_last_name}
                defaultValue={selectedForm.hra.gaining}
                style={{ width: 300 }}
                onChange={handleHraChange}
                renderInput={(params) => <TextField {...params} label="Gaining HRA" />}
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
          </Grid>
        </div>
      </form>
      )
    }
  }

  const materialTableSelect = () => {

    //considering move to a config file.
    const columns = [
      //{ title: 'Item No.', field: 'hra_num', type:'numeric', editable:'never'},
      { title: 'Bar Tag No.', field: 'bar_tag_num', type:'numeric',
      editComponent: x => {
      console.log(x);
      let idx = -1
  
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
        onChange ={e => {
  
        const bt_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
        console.log(bt_);
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
        {...(editable && {editable:{
          
          //isEditable: rowData => rowData.field !== 'id', // only name(a) rows would be editable
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
              setSelectedForm({...selectedForm,equipment_group:[...selectedForm.equipment_group, newData]});
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

  //Render Variables
  const displayTop = () => {
    if(props.location.pathname.includes(`${ENG4900 + EDIT}`))
    {
      return(
      <div style={{textAlign: 'center'}}>
        <h2>Eng 4900 - Edit Form</h2>
      </div>
      )
    }

    if(props.location.pathname.includes(`${ENG4900 + VIEW}`))
    {
      return(
      <div style={{textAlign: 'center'}}>
        <h2>Eng 4900 - View Form</h2>
      </div>
      )
    }

    if(props.location.pathname.includes(`${ENG4900 + CREATE}`))
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

  //will run once.
  React.useEffect(() => {

    // function handleResize() {
    //   // Set window width/height to state
    //   setWindowSize({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //   });
    // } 

    //setUrl('ur')
    //console.log(props)    
    if(props.location.pathname.includes(`${ENG4900 + VIEW}`) && formId){
      handleFormSelectById()
    }else if(props.location.pathname.includes(`${ENG4900 + EDIT}`) && formId){

      handleFormSelectById(true)
    }

    // Add event listener
    //window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    //handleResize();

    // Remove event listener on cleanup
    //return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
		if(props.history.action == "PUSH"){
			reloadPage()
		}
  }, [props.history.action]);
  
  // React.useEffect(() => {
	// 		reloadPage()
  // }, [props.match.pathname]);

  console.log(selectedForm)
  //Render return.
  return (
    <>
    <Header/>
    <div>
      {displayTop()}
      <div style={{textAlign: 'center'}}> {loading ? LoadingCircle() : null} </div>
      {editable ? (hras.length > 0 && equipments.length > 0 ? form() : null) : form()}
    </div>
    </>
  );
}