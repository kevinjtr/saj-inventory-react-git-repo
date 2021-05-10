//import Box from '@material-ui/core/Box';
// import API from "../axios/Api";
// import Header from "./Header";Box
//import { connect } from 'react-redux';
//import { addProduct } from '../../publics/actions/eng4900s';
//import Eng4900Form from './forms/eng4900';
//-start-//
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
import {getQueryStringParams,LoadingCircle,contains,TextMaskCustom,NumberFormatCustom} from '../tools/tools'
import clsx from 'clsx'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, ENG4900, AVD_SEARCH, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT} from '../config/constants'
import {orderBy, findIndex, filter} from 'lodash'
//Styles Import
import { plusButtonStyles, texFieldStyles, gridStyles, itemMenuStyles, phoneTextFieldStyles, AvatarStyles } from '../styles/material-ui';



export default function Eng4900(props) {
  
  //Constants Declarations.
  const formId = props.match.params.id
  const search = getQueryStringParams(props.location.search)
  const PAGE_URL = `/${ENG4900}`
    
  //Variables Declarations.


  //Styles Declarations.
  const classesTextField = texFieldStyles();
  const classesItemMenu = itemMenuStyles();
  const classesPhoneTextField = phoneTextFieldStyles();
  const classesGrid = gridStyles();
  const avatarClasses = AvatarStyles();
  const plusButtonClasses = plusButtonStyles();
  const PlusButtonTheme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  //Hooks Declarations.
  const [searchFields, setSearchFields] = React.useState({
		id: {label: 'ID', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
		requestedAction: {label: 'Requested Action', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
		losingHra: {label: 'Losing HRA', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
		gainingHra: {label: 'Gaining HRA', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    bartagNum: {label: 'Bar Tag', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    dateCreated: {label: 'Date Created', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT}
  })
  const [searchView, setSearchView] = React.useState(BASIC_SEARCH);
  const [switches, setSwitches] = React.useState({
		checkedView: false,
	  });
	const [windowSize, setWindowSize] = React.useState({
	width: undefined,
	height: undefined,
	});
  const [editable,setEditable] = React.useState(false)
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
  // const [id_, setId] = React.useState('');
  const [selectedForm, setSelectedForm] = React.useState(null);
  const [viewSearch, setViewSearch] = React.useState('card-view');
  const [formFields,setFormFields] = React.useState({
    losing_hra:{name:'',officeSymbol:'',hra_num:''},
    gaining_hra:{name:'',officeSymbol:'',hra_num:''},
    equipment:[],
    ror_prop:''
  })
  const [officesSymbol, setOfficesSymbol] = React.useState([]);

  //Events Declarations.
	const handleSearchFieldsChange = (event) => {
		console.log(event.target.name,event.target.value)
		
		if(event.target.value == ''){
			setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], value: event.target.value, options: OPTIONS_DEFAULT} })
		}else{
			setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], value: event.target.value} })
		}
	};

	const handleSearchFieldsOptions = (event) => {
		const opts = SEARCH_FIELD_OPTIONS.map(x=>x.value).includes(event.target.value) ? event.target.value : OPTIONS_DEFAULT
		setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], options : opts} })
	}

	const handleSearchFieldsBlanks = (event) => {
		const blks = SEARCH_FIELD_BLANKS.map(x=>x.value).includes(event.target.value) ? event.target.value : BLANKS_DEFAULT
		setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], blanks : blks} })
  }
  
  const handleSearch = async (e=null,onLoad=false) => {
    if(!onLoad) await UpdateUrl()
  
    console.log(`${ENG4900} Search`)
    setLoading(true)
    //setAlertUser({success:{active:false,text:''},error:{active:false,text:''}})
  
    let opts = {
      includes: {},
      blanks: {}
    }
  
    let fields_obj = {}
  
    Object.keys(searchFields).map(key => {
      fields_obj[key] = onLoad && search[key] != null ? search[key] : searchFields[key].value
  
      opts.includes[key] = searchView != BASIC_SEARCH ? searchFields[key].options : OPTIONS_DEFAULT
      opts.blanks[key] = searchView != BASIC_SEARCH ? searchFields[key].blanks : BLANKS_DEFAULT
    })
  
    console.log(fields_obj)
  
    api.post(`${ENG4900}/search`,{
      'fields': fields_obj,
      'options':opts
  
    }).then((response) => response.data).then((data) => {
      console.log(data)
      setLoading(false)
      setEng4900s(data.status != 400 ? data.data : data)
  
    }).catch(function (error) {
      setLoading(false)
      setEng4900s([])
  
    });
  
    }
  
  const handleSearchView = (e) => {
  setSearchView(e.target.value)
  }

  const handleSwithcesChange = (event) => {
		setSwitches({ ...switches, [event.target.name]: event.target.checked });
  };

  const handleSearchKeyPress = (event) => {
		if(event.key == "Enter"){//enter key pressed.
		   handleSearch()
		}
	}
////////////////// end new

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
  
  // const handleIdChange = (event) => {
  //   setId(event.target.value);
  //   // if(event.target.value == ''){
  //   //   setIncludes({...includes_,  [event.target.name]: 'includes'})
  //   // }
  // };

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
  const SearchCriteriaOptions = (val,text="Options") => {

		const menuItems = SEARCH_FIELD_OPTIONS.map(x => {
			return(
				<MenuItem value={x.value}>{x.label}</MenuItem>
			)
		})

		return (
		<FormControl variant="outlined" className={classesItemMenu.formControl}>
			<InputLabel id="demo-simple-select-outlined-label">{text}</InputLabel>
			<Select
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={searchFields[val].options ? searchFields[val].options : OPTIONS_DEFAULT}
				name={val}
				onChange={handleSearchFieldsOptions}
				
				label="Sort By"
				>
				{menuItems}
			</Select>
		</FormControl>
		);
	}

	const SearchBlanksOptions = (val,text="Blanks Options") => {

		const menuItems = SEARCH_FIELD_BLANKS.map(x => {
			return <MenuItem value={x.value}>{x.label}</MenuItem>
		})

		return (
		<FormControl variant="outlined" className={classesItemMenu.formControl}>
			<InputLabel id="demo-simple-select-outlined-label">{text}</InputLabel>
			<Select
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={searchFields[val].blanks ? searchFields[val].blanks : BLANKS_DEFAULT}
				name={val}
				onChange={handleSearchFieldsBlanks}
				//label="Sort By"
				style={{width:200}}
				>
				{menuItems}
			</Select>
		</FormControl>
		);
  }

  const UpdateTextFields = async () => {

		const search_keys = Object.keys(search)
		const searchField_keys = Object.keys(searchFields)
		const field_keys = filter(search_keys,function(f){ return !f.includes('Opts') && !f.includes('Blanks') && searchField_keys.includes(f) })
		const option_keys = filter(search_keys,function(o){ return o.includes('Opts')})
		const blank_keys = filter(search_keys,function(b){ return b.includes('Blanks')})

		for(const fieldName of field_keys){
			handleSearchFieldsChange({target:{name: fieldName, value : search[fieldName]}})
		}

		if(option_keys.length > 0 || blank_keys.length > 0) {
			setSearchView(AVD_SEARCH)

			for(const fieldName of option_keys){
				handleSearchFieldsOptions({target:{name: fieldName, value : search[fieldName]}})
			}
		
			for(const fieldName of blank_keys){
				handleSearchFieldsBlanks({target:{name: fieldName, value : search[fieldName]}})
			}

		}

	}

	const UpdateUrl = () => {

	let url = '?'
	const searchFieldKeys = Object.keys(searchFields)

	for(const key of searchFieldKeys) {
		if(searchFields[key].value) url = `${url}${url != '?' ? '&':''}${key}=${searchFields[key].value}`
		if(searchView != BASIC_SEARCH & searchFields[key].options != OPTIONS_DEFAULT) url = `${url}${url != '?' ? '&':''}${key + 'Opts'}=${searchFields[key].options}`
		if(searchView != BASIC_SEARCH & searchFields[key].blanks != BLANKS_DEFAULT) url = `${url}${url != '?' ? '&':''}${key + 'Blanks'}=${searchFields[key].blanks}`
	}

	props.history.replace(PAGE_URL + (url != '?' ? url : ''))
	}

	const reloadPage = () => {
		window.location.reload()
  }
  
  /////////////////end new

  const bartagsData = (eg) => {

    console.log(eg)
    const returnArray = [];

    for(let i=0; i<eg.length;i++){
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
                    value={eg[i].bar_tag_num ? eg[i].bar_tag_num : ""}
                    style={{ width: 200 }}
                    />
                    <TextField
                    id={`catalog_${b_key}`}
                    key={`catalog_${b_key}`}
                    label={"Catalog " + b_key}
                    value={eg[i].catalog_num}
                    style={{ width: 200 }}
                    />
                    <TextField
                    id={`nomenclature_${b_key}`}
                    key={`nomenclature_${b_key}`}
                    label={"Nomenclature (include make, model) " + b_key}
                    value={eg[i].item_type ? eg[i].item_type : ""}
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
                    value={eg[i].condition ? eg[i].condition : ""}
                    style={{ width: 150 }}
                    />
                    <TextField
                    id={`serial_number_${b_key}`}
                    key={`serial_number_${b_key}`}
                    label={"Serial Number " + b_key}
                    value={eg[i].serial_num ? eg[i].serial_num : ""}
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
                        value={eg[i].acquisition_date ? eg[i].acquisition_date : ""}
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
                    value={eg[i].acquisition_date ? eg[i].acquisition_date : ""}
                    style={{ width: 150 }}
                    /> */}
                    <TextField
                    id={`acq_price_${b_key}`}
                    key={`acq_price_${b_key}`}
                    label={"ACQ. Price " + b_key}
                    value={eg[i].acquisition_price ? eg[i].acquisition_price : ""}
                    style={{ width: 150 }}
                    />
                    <TextField
                    id={`document_number_${b_key}`}
                    key={`document_number_${b_key}`}
                    label={"Document Number/Control ID# " + b_key}
                    value={eg[i].document_num ? eg[i].document_num : ""}
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

  const ViewForm = (e) => {
    const eId = (e.target.id).split('-')[1]
    props.history.replace(PAGE_URL + '/view/' + eId)
  }

  const EditForm = (e) => {
    const eId = (e.target.id).split('-')[1]
    props.history.replace(PAGE_URL + '/edit/' + eId)
  }

  const handleFormSelectById = async (edit=false) => {

      const findId = formId
      if(edit) setEditable(true)

    setSelectedForm(null)
    console.log('4900byID')
    setLoading(true)

    await api.get(`officesymbol`,{}).then((response) => response.data).then((data) => {
      console.log(data)
      setOfficesSymbol(data.status != 400 ? data.data : [])

    }).catch(function (error) {
      //setLoading(false)
      setOfficesSymbol([])
    });

      await api.get(`${ENG4900}/${findId}`).then((response) => response.data).then((data) => {
        setSelectedForm(data.status != 400 ? data.data : null)

        setPhoneNumbers({
          ...phoneNumbers,
          ["losing_hra_work_phone"]: data.data.losing_hra_work_phone,
          ["gaining_hra_work_phone"]: data.data.gaining_hra_work_phone,
        });

        setLoading(false)

      }).catch(function (error) {
        setLoading(false)
        setSelectedForm(null)
        //setEng4900s([])
      });
  }

  const handleFormChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    setSelectedForm({...selectedForm,  [e.target.name]: e.target.value})
  }

  const form = () => {

    console.log(selectedForm)
    // {...(disableFields.logistics && {variant:"filled"})}
    const {form_id, requested_action, individual_ror_prop,
      losing_hra_num, losing_hra_first_name, losing_hra_last_name, losing_hra_office_symbol,
      gaining_hra_num, gaining_hra_first_name, gaining_hra_last_name, gaining_hra_office_symbol,
    } = selectedForm

    const idx_lhra_os = findIndex(officesSymbol,function(os){ return  os.id === losing_hra_office_symbol})
    const idx_ghra_os = findIndex(officesSymbol,function(os){ return  os.id === gaining_hra_office_symbol})

    console.log(idx_lhra_os)
    //console.log(f[0])
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
                onChange={handleFormChange}
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
            label="2a. First Name"
            name={"losing_hra_first_name"}
            value={selectedForm.losing_hra_first_name}
            onChange={handleFormChange}
            style={{ width: 200 }}/>
          <TextField
            id="standard-helperText-l-name"
            key="standard-helperText-l-name"
            label="2a. Last Name"
            name={"losing_hra_last_name"}
            value={selectedForm.losing_hra_last_name}
            onChange={handleFormChange}
            style={{ width: 200 }}/>
          <Autocomplete style={{ display:'inline-block' }}
            id={`combo-box-office-symbol-losing-hra`}
            key={`combo-box-office-symbol-losing-hra`}
            name={"losing_hra_office_symbol"}
            size="small"
            options={officesSymbol}
            getOptionLabel={option => option.alias}
            defaultValue={idx_lhra_os != -1 ? officesSymbol[idx_lhra_os] : ''}
            onChange ={handleFormChange}
          //style={{ verticalAlign: 'top' }}
          renderInput={(params) => <TextField {...params} label="Office Symbol" margin="normal"/>}
          />
          {/* <TextField
            id="standard-helperText-l-os"
            key="standard-helperText-l-os"
            label="b. Office Symbol"
            value={losing_hra_os_alias}
            style={{ width: 200 }}/> */}
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
            id="standard-helperText-g-first-name"
            key="standard-helperText-g-first-name"
            label="3a. Name"
            name={"gaining_hra_first_name"}
            value={selectedForm.gaining_hra_first_name}
            style={{ width: 200 }}/>
          <TextField
            id="standard-helperText-g-last-name"
            key="standard-helperText-g-last-name"
            label="3a. Name"
            name={"gaining_hra_last_name"}
            value={selectedForm.gaining_hra_last_name}
            style={{ width: 200 }}/>
          {/* <TextField
            id="standard-helperText-g-os"
            key="standard-helperText-g-os"
            label="b. Office Symbol"
            value={selectedForm.gaining_hra_office_symbol}
            style={{ width: 200 }}/> */}
          <Autocomplete  style={{ display:'inline-block' }}
            id={`combo-box-office-symbol-gaining-hra`}
            key={`combo-box-office-symbol-gaining-hra`}
            name={"gaining_hra_office_symbol"}
            options={officesSymbol}
            getOptionLabel={option => option.alias}
            defaultValue={idx_ghra_os != -1 ? officesSymbol[idx_ghra_os] : ''}
            onChange ={handleFormChange}
            //style={{ verticalAlign: 'top' }}
            renderInput={(params) => <TextField {...params} label="Office Symbol" margin="normal"/>}
          />
          <TextField
            id="standard-helperText-g-hra-num"
            key="standard-helperText-g-hra-num"
            label="c. Hand Receipt Account Number"
            value={gaining_hra_num}
            style={{ width: 300 }}/>
          <FormControl>
            <InputLabel htmlFor="formatted-text-mask-input">d. Work Phone Number</InputLabel>
              <Input 
                style={{ height: 40,width:200 }}
                value={phoneNumbers.gaining_hra_work_phone}
                onChange={handlePhoneTextFieldChange}
                name="gaining_hra_work_phone"
                id="formatted-text-mask-input-g-work-phone"
                key="formatted-text-mask-input-g-work-phone"
                inputComponent={TextMaskCustom}/>
          </FormControl>
        </Paper>
      </Grid>
      {bartagsData(selectedForm.equipment_group)}
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
          
          <h6>Bar Tags Quantity: {Object.keys(form).length}</h6>
          <small>Losing HRA: {form[0].losing_hra_num + ' - ' + form[0].losing_hra_first_name + ' ' + form[0].losing_hra_last_name }</small>
          <small>Gaining HRA: {form[0].gaining_hra_num + ' - ' + form[0].gaining_hra_first_name + ' ' + form[0].gaining_hra_last_name}</small>
          <small>Bar Tags: {bartags}</small>
                  {/* <small>Bar Tags: </small>
                  <small>{btPrint} </small> */}
          <div id={"row-"+form_id} key={"row-"+form_id} className="row" style={{ margin: 3,marginTop:'10px' }}>
              {!folder_link ? <input id={"viewbnt-"+form_id} key={"bnt-"+form_id} type="submit" value="View" className="btn btn-primary" onClick={ViewForm}/> : null}
              {!folder_link ? <input id={"editbnt-"+form_id} key={"bnt-"+form_id} type="submit" value="Edit" className="btn btn-warning ml-2" onClick={EditForm}/> : null}
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
      { title: 'Gaining Hra', field: "0.gaining_hra_num",editable: 'never' },
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
  const searchTextFieldsGridItems = () => Object.keys(searchFields).map(key => {
		const nFields = Object.keys(searchFields).length
		const w = windowSize.width*.75 / nFields
	return(	
	<>
	<Grid item xs={Math.ceil(12/(nFields + 1))}>                 
		<TextField
			id={`outlined-search-${key}`} 
			name={key} label={`Search by ${searchFields[key].label}`} 
			type="search" variant="outlined" 
			value={searchFields[key].value} 
			onChange={handleSearchFieldsChange}
			onKeyPress={handleSearchKeyPress}
			style={{width:w,paddingRight:'0px'}}
			InputLabelProps={{style: {fontSize: '.9vw'}}}
			//{...(searchFields[key].value != null && {style:{width:searchFields[key].width}})}
		/>
		{searchFields[key].value && searchView != BASIC_SEARCH ? <><br/>{SearchCriteriaOptions(key,`${searchFields[key].label} Options`)}</> : null}
		<br/>
		{searchView != BASIC_SEARCH ? SearchBlanksOptions(key,`${searchFields[key].label} Blanks Options`) : null}
	</Grid>
	</>)
	});

	const searchButtonGridItem = () => { 
		return(
			<Grid item style={{textAlign:'left',paddingLeft:'20px'}}  xs={Math.floor(12/(Object.keys(searchFields).length))}>
				<IconButton aria-label="search" color="primary" onClick={handleSearch}>
					<SearchIcon style={{ fontSize: 40 }}/>
				</IconButton>
			</Grid>)
	}

  const cards = Object.keys(eng4900s).map(function(key) {
    return CardProduct(eng4900s[key]);
  });

  const displayTop = () => {
    if(props.location.pathname.includes(`${ENG4900}/edit/`))
    {
      return(
      <div style={{textAlign: 'center'}}>
        <h2>Eng 4900 - Edit Form</h2>
      </div>
      )
    }

    if(props.location.pathname.includes(`${ENG4900}/view/`))
    {
      return(
      <div style={{textAlign: 'center'}}>
        <h2>Eng 4900 - View Form</h2>
      </div>
      )
    }

    return(
      <>
      <div style={{textAlign: 'center'}}>
        <h2>Eng 4900 Form</h2>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="position" name="position" value={searchView} onChange={handleSearchView}>
            <FormControlLabel value="std" control={<Radio color="primary" />} label="Basic Search" />
            <FormControlLabel value="adv" control={<Radio color="primary" />} label="Advanced Seach" />
          </RadioGroup>
        </FormControl>            
      </div>
      <div style={{textAlign: 'center'}}>
        <form className={classesTextField.root} noValidate autoComplete="off">
          <div className={classesGrid.options}>
          <Grid container spacing={2}>
            {searchTextFieldsGridItems()}
            {searchButtonGridItem()}
          </Grid>
          </div>
        </form>
      </div>
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

    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    } 

    //setUrl('ur')
    console.log(props)    
    if(props.location.pathname.includes(`${ENG4900}/view/`) && formId){
      handleFormSelectById()
    }else if(props.location.pathname.includes(`${ENG4900}/edit/`) && formId){
      handleFormSelectById(true)
    }else if(search){
      UpdateTextFields()
      handleSearch(null,true)
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
		if(props.history.action == "PUSH"){
			reloadPage()
		}
	}, [props.history.action]);

  //Render return.
  return (
    <div>
      
      {props.location.pathname == PAGE_URL ? <Tooltip title="Crate New Form" aria-label="add">
      <ThemeProvider>
        <Fab  variant="extended" size="medium" color="inherit" className={ clsx(plusButtonClasses.absolute, plusButtonClasses.fabGreen)} >
        Create 4900
        </Fab>
        </ThemeProvider>
      </Tooltip> : null}
      {displayTop()}
      <div style={{textAlign: 'center'}}>
        {loading ? LoadingCircle() : null}
      </div>
      {cards.length > 0 && viewSearch == "card-view"  && !selectedForm ? (<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <h3 style={{ justifyContent: 'center' }}>Available 4900s</h3>
              <div style={{ justifyContent: 'center' }}>{cards}</div>
      </div>) : null}

      {viewSearch === "table-view" ? materialTableSelect():null}

      <form className={classesTextField.root} noValidate autoComplete="off">
        <div className={classesGrid.root}>
        <Grid container spacing={3}>
          {selectedForm ? form() : null}
        </Grid>
        </div>
      </form>
    </div>
  );
}

// const textFieldsLosingHandConfig1 = [
//   {label:'2a. Name', width:300},
//   {label:'b. Office Symbol', width:300},
//   {label:'c. Hand Receipt Account Number', width:300},
// ]

// const textFieldsGainingHandConfig1 = [
//   {label:'a. Name', width:300},
//   {label:'b. Office Symbol', width:300},
//   {label:'c. Hand Receipt Account Number', width:300},
// ]

// const textFieldsGainingHandConfig2 = [
//   {label:'13a. Individual/Vendor Removing or Recieving Property', width:600},

// ]

// const textFieldsGainingHandConfig3 = [
//   {label:'b. Date', width:120},
//   {label:'c. Signature', width:120},
// ]

// const textFieldsGainingHandConfig4 = [
//   {label:'13a. Individual/Vendor Removing or Recieving Property', width:600},

// ]

// const textFieldsGainingHandConfig5 = [
//   {label:'14a. Losing HRH Signature', width:300},
//   {label:'b. Date', width:120},
// ]

// const textFieldsGainingHandConfig6 = [
//   {label:'15a. Gaining HRH Signature', width:300},
//   {label:'b. Date', width:120},
// ]

// const textFieldsGainingHandConfig7 = [
//   {label:'16a. Losing Command', width:250},
//   {label:'b. UIC', width:120
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }},
//   // {...(disableFields.PBO && {variant:"filled"})}}
//   }
// ]

// const textFieldsGainingHandConfig8 = [
//   {label:'17a. Gaining Command', width:250
//   // style={{ width: 250 }}
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}

// },
//   {label:'b. UIC', width:120
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}
//   }
// ]

// const textFieldsGainingHandConfig9 = [
//   {label:'c. Ship From', width:120
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}
//   }
// ]

// const textFieldsGainingHandConfig10 = [
//   {label:'c. Ship To:', width:120
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}
//   }
// ]

// const textFieldsGainingHandConfig11 = [
//   {label:'c. Ship To:', width:120
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}
//   }
// ]

// const textFieldsGainingHandConfig12 = [
//   {label:'d. PBO', width:120
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}
//   }
// ]

// const textFieldsGainingHandConfig13 = [
//   {label:'d. PBO', width:120
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}
//   }
// ]

// const textFieldsGainingHandConfig14 = [
//   {label:'e. Losing Command Signature', width:300
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}
//   },
//   {label:'f. Date', width:120
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}
//   }
// ]

// const textFieldsGainingHandConfig15 = [
//   {label:'e. Gaining Command Signature', width:300
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}
//   },
//   {label:'f. Date', width:120
//   // InputProps={{
//   //   readOnly: disableFields.PBO,
//   // }}
//   // {...(disableFields.PBO && {variant:"filled"})}
//   }
// ]

// const textFieldsGainingHandConfig16 = [
//   {label:'18a. Received By', width:300
//   // InputProps={{
//   //   readOnly: disableFields.logistics,
//   // }}
//   // {...(disableFields.logistics && {variant:"filled"})}
//   },
//   {label:'b. Date', width:120
//   // InputProps={{
//   //   readOnly: disableFields.logistics,
//   // }}
//   // {...(disableFields.logistics && {variant:"filled"})}
//   }
// ]

// const textFieldsGainingHandConfig17 = [
//   {label:'19a. Posted By', width:300
//   // InputProps={{
//   //   readOnly: disableFields.logistics,
//   // }}
//   // {...(disableFields.logistics && {variant:"filled"})}
//   },
//   {label:'b. Date', width:120
//   // InputProps={{
//   //   readOnly: disableFields.logistics,
//   // }}
//   // {...(disableFields.logistics && {variant:"filled"})}
//   }
// ]

//--end--//
//import './eng4900.css';
// export class AddProduct extends Component {

// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			product_name: '',
// 			description: '',
// 			image: '',
// 			id_category: '',
// 			quantity: '',
// 			categories: [],
// 		};
// 	}

// 	componentDidMount() {
// 		//this.refreshCategoryTable();
// 	}

// 	refreshCategoryTable() {
// 		this.categoriesData = api.get('categories', this.state).then((response) => response.data).then((data) => {
// 			this.setState({
// 				categories: data.status != 400 ? data.values: data,
// 				setCategories: data
// 			});
// 			//console.log(this.state.categories.values);
// 			// console.log(this.props, this.state);
// 		});
// 	}

// 	handlerChange = (e) => {
// 		this.setState({ [e.target.name]: e.target.value });
// 	};

// 	handlerSubmit = async () => {
// 		window.event.preventDefault();
// 		await this.props.dispatch(addProduct(this.state));
// 		this.props.history.push('/products');
// 	};

// 	render() {
// 		return(
// 			<Eng4900Form/>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		products: state.products
// 	};
// };

// export default connect(mapStateToProps)(AddProduct);