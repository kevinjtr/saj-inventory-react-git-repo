//import Box from '@material-ui/core/Box';
// import API from "../axios/Api";
// import Header from "./Header";Box
//import { connect } from 'react-redux';
//import { addProduct } from '../publics/actions/eng4900s';
//-start-//
import React from 'react';
import api from '../axios/Api';
import TextField from '@material-ui/core/TextField';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import Card4900 from 'Card4900';
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
import MaterialTable, { MTableToolbar } from 'material-table'
import {form4900Icons} from './material-table/config'
//import Pdf from './eng4900-26-2.pdf';
import {getQueryStringParams,LoadingCircle,contains,TextMaskCustom,NumberFormatCustom, numberWithCommas,openInNewTab} from './tools/tools'
import clsx from 'clsx'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, ENG4900, AVD_SEARCH, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT} from './config/constants'
import {orderBy, findIndex, filter as _filter} from 'lodash'
//Styles Import
import { plusButtonStyles, texFieldStyles, gridStyles, itemMenuStyles, phoneTextFieldStyles, AvatarStyles, TabPanel, a11yProps, tabStyles, stepStyles, steps } from './styles/material-ui';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import UploadFormModal from '../containers/UploadFormModal'
import Eng4900Form from '../containers/Eng4900Form'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import DescriptionIcon from '@material-ui/icons/Description';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {updateEng4900Api, destroyEng4900Api, addEng4900Api, getAllEng4900sApi, eng4900SearchApi, getEng4900PdfByIdApi} from '../publics/actions/eng4900-api'
import {getHraFormApi} from '../publics/actions/hra-api'
import { connect } from 'redux-bundler-react';

const dialogStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position:'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight:'0px'
  }
}))

function Eng4900({history, location, match, userToken}) {
  
  //Constants Declarations.
  const search = getQueryStringParams(location.search)
  const FORM_STATUS = {1:'FORM CREATED', 2:'COMPLETED INDIVIDUAL/VENDOR ROR PROPERTY',3:'LOSING HRA SIGNATURE REQUIRED', 4:'COMPLETED LOSING HRA SIGNATURE',  5:'GAINING HRA SIGNATURE REQUIRED', 6:'COMPLETED GAINING HRA SIGNATURE',
  7:'SENT TO PBO', 8:'SENT TO LOGISTICS',9:'COMPLETED'}
  const stsOptions = {
    single: [{id:1,label:'FORM CREATED'}, {id:2,label:'COMPLETED INDIVIDUAL/VENDOR ROR PROPERTY'},{id:5,label:'GAINING HRA SIGNATURE REQUIRED'}, {id:6,label:'COMPLETED GAINING HRA SIGNATURE'},
              {id:7,label:'SENT TO PBO'}, {id:8,label:'SENT TO LOGISTICS'},{id:9,label:'COMPLETED'}],
    double: [{id:1,label:'FORM CREATED'}, {id:2,label:'COMPLETED INDIVIDUAL/VENDOR ROR PROPERTY'}, {id:3,label:'LOSING HRA SIGNATURE REQUIRED'}, {id:4,label:'COMPLETED LOSING HRA SIGNATURE'}, {id:5,label:'GAINING HRA SIGNATURE REQUIRED'}, {id:6,label:'COMPLETED GAINING HRA SIGNATURE'},
              {id:7,label:'SENT TO PBO'}, {id:8,label:'SENT TO LOGISTICS'},{id:9,label:'COMPLETED'}],
  }
  const formTabs = {0: {id:'my_forms', label:'My Forms'}, 1: {id:'hra_forms', label:'HRA Forms'}, 2: {id:'sign_forms', label:'Sign Forms'}, 3: {id:'completed_forms', label:'Completed Forms'}}
  const SEARCH_FIELD_RESET = {
    id: {label: 'Form ID', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    requestedAction: {label: 'Requested Action', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    losingHra: {label: 'Losing HRA', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    losingHraName: {label: 'Losing HRA Name', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    gainingHra: {label: 'Gaining HRA', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    gainingHraName: {label: 'Gaining HRA Name', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    bartagNum: {label: 'Bar Tag', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    // itemType: {label: 'Item Description', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    // catalogNum: {label: 'Catalog Number', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    // acqPrice: {label: 'Acquisition Price', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    // serialNum: {label: 'Serial Number', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
  }
  const OPTS_RESET = {
    includes: {},
    blanks: {}
  }
  const SWITCH_RESET = {
		checkedView: false,
		showSearch: false,
  }
  const RESET_HRAS = {losing:[],gaining:[]}

  //Variables Declarations.


  //Styles Declarations.
  const classesTextField = texFieldStyles();
  const classesItemMenu = itemMenuStyles();
  const classesPhoneTextField = phoneTextFieldStyles();
  const classesGrid = gridStyles();
  const avatarClasses = AvatarStyles();
  const plusButtonClasses = plusButtonStyles();
  const PlusButtonTheme = createTheme({
    palette: {
      primary: green,
    },
  });
  const classDialog = dialogStyles();
  const tabClasses = tabStyles();
  const StepClasses = stepStyles();

  //Hooks Declarations.
  const [uploadPdf, setUploadPdf] = React.useState({
    show: false,
    rowData: null
  })
  const [create4900, setCreate4900] = React.useState({
    show: false,
    formData: null,
    formId: null,
    action: 'CREATE'
  })
  const [searchFields, setSearchFields] = React.useState({
    0: SEARCH_FIELD_RESET,
    1: SEARCH_FIELD_RESET,
    2: SEARCH_FIELD_RESET,
    3: SEARCH_FIELD_RESET,
  })
  const [searchView, setSearchView] = React.useState({
    0: BASIC_SEARCH,
    1: BASIC_SEARCH,
    3: BASIC_SEARCH,
    4: BASIC_SEARCH,
  });
	const [windowSize, setWindowSize] = React.useState({
	width: undefined,
	height: undefined,
	});
  const [loading, setLoading] = React.useState({init:true,refresh:{
    0: false,
    1: false,
    2: false,
    3: false,
  }});
  const [eng4900s, setEng4900s] = React.useState({
      0: [],
      1: [],
      2: [],
      3: []
    });
  const [editable,setEditable] = React.useState(false)
  const [tabs, setTabs] = React.useState(0);
  const [switches, setSwitches] = React.useState({
      0: SWITCH_RESET,
      1: SWITCH_RESET,
      2: SWITCH_RESET,
      3: SWITCH_RESET,
    });
  const [hras, setHras] = React.useState({
    0: RESET_HRAS,
    1: RESET_HRAS,
    2: RESET_HRAS,
    4: RESET_HRAS,
  });

  //Events Declarations.
  const handleTableDelete = async (rowData) => {
    let result = {error:true}

    await destroyEng4900Api(rowData, userToken).then((response) => response.data).then((data) => {
      result = data

    }).catch(function (error) {
      //do nothing.
    });

    return result
  }

	const handleSearchFieldsChange = (event) => {

    if(event.target.value == ''){
      setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], value: event.target.value, options: OPTIONS_DEFAULT}} })
		}else{

			setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], value: event.target.value, blanks : BLANKS_DEFAULT}} })
    }
	};

	const handleSearchFieldsOptions = (event) => {
    const opts = SEARCH_FIELD_OPTIONS.map(x=>x.value).includes(event.target.value) ? event.target.value : OPTIONS_DEFAULT
    //const tab = event.target.id.split('-')[1]

    //setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], options : opts} })
    
    setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], options : opts}} })
	}

	const handleSearchFieldsBlanks = (event) => {
    const blks = SEARCH_FIELD_BLANKS.map(x=>x.value).includes(event.target.value) ? event.target.value : BLANKS_DEFAULT
    setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], blanks : blks}} })
  }
  
  const handleSearch = async (e=null,onLoad=false) => {
    setLoading({...loading, refresh: {...loading.refresh, [tabs]: true}})

    let opts = {
      includes: {},
      blanks: {}
    }
  
    let fields_obj = {}
  
    Object.keys(searchFields[tabs]).map(key => {
      fields_obj[key] = onLoad && search[key] != null ? search[key] : searchFields[tabs][key].value
  
      opts.includes[key] = searchView[tabs] != BASIC_SEARCH ? searchFields[tabs][key].options : OPTIONS_DEFAULT
      opts.blanks[key] = searchView[tabs] != BASIC_SEARCH ? searchFields[tabs][key].blanks : BLANKS_DEFAULT
    })
  
    eng4900SearchApi({
      'fields': fields_obj,
      'options':opts,
      'tab': formTabs[tabs].id
    }, userToken)
    .then((response) => response.data).then((data) => {
      console.log(data)
      setLoading({...loading, refresh: {...loading.refresh, [tabs]: false}})
      setEng4900s({...eng4900s, [tabs]: data.status != 400 ? data.data[tabs] : []})

      if(data.status == 200 && data.editable){
        setEditable(data.editable)
      }
  
    }).catch(function (error) {
      setLoading({...loading, refresh: {...loading.refresh, [tabs]: false}})
      setEng4900s({...eng4900s, [tabs]: []})
  
    });
  
  }

  const pageInitialize = () => {
    setLoading({...loading,init:true})
    eng4900SearchApi({
      'fields': {},
      'options':OPTS_RESET,
      'tab': formTabs[tabs].id,
      'init': true
    }, userToken)
    .then((response) => response.data).then((data) => {
      console.log(data)

      if(data.status == 200 && data.editable){
        setEditable(data.editable)
        setEng4900s(data.data)

        if(data.data[0].length == 0){
          setTabs(1)
        }
      }
      
      setLoading({...loading,init:false})

    }).catch(function (error) {
      setLoading({...loading,init:false})
      setEng4900s({...eng4900s, [tabs]: []})
  
    });

    //getHrasAndEquipments()
  }
  
  const handleSearchView = (e) => {

  setSearchView({...searchView, [e.target.name]: e.target.value})
  }

  async function get4900Pdf(rowData) {
    const {form_id} = rowData

    setLoading({...loading, refresh: {...loading.refresh, [tabs]: true}})
    if(typeof form_id != 'undefined'){
      await getEng4900PdfByIdApi(form_id, userToken)
      .then(response => {
      //Create a Blob from the PDF Stream
          const file = new Blob(
            [response.data], 
            {type: 'application/pdf'});
      //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
          window.open(fileURL, '_blank');
          setLoading({...loading, refresh: {...loading.refresh, [tabs]: false}})
      })
      .catch(error => {
          console.log(error);
          setLoading({...loading, refresh: {...loading.refresh, [tabs]: false}})
      });
    }
    
  } 

  const handleSwitchesChange = (event) => {
    const target = event.target.name.split('-')
		setSwitches({ ...switches, [target[1]]: {...switches[target[1]], [target[0]]: event.target.checked} });
  };

  const handleSearchKeyPress = (event) => {
    //const tab = event.target.id.split('-')[1]

		if(event.key == "Enter"){//enter key pressed.
		   handleSearch()
		}
	}

  const handleTabChange = (event, newValue) => {
    setTabs(newValue);
  };

  const handleTableUpdate = async (rowData) => {
    let result = {error:true}
    
		await updateEng4900Api(rowData, userToken).then((response) => response.data).then((data) => {
			result = data
		}).catch(function (error) {
		});

		return(result)
  }
  
  //Function Declarations.
	const SearchCriteriaOptions = (tab, val,text="Options") => {

		const menuItems = SEARCH_FIELD_OPTIONS.map(x => {
			return(
				<MenuItem value={x.value}>{x.label}</MenuItem>
			)
		})

		return (
		<div>
				<Typography noWrap>{text}</Typography>
				<Select
					//labelId="demo-simple-select-outlined-label"
					id={`opts-${tab}-${text}`}
					key={`opts-${tab}-${text}`}
					select
					value={searchFields[tab][val].options ? searchFields[tab][val].options : OPTIONS_DEFAULT}
					name={val}
					onChange={handleSearchFieldsOptions}
					style={{width:'80%'}}
					//InputLabelProps={{style: {fontSize: '8vw'}}}
					//label={text}
					variant="outlined"
					>
					{menuItems}
				</Select>
			
		</div>	
		);
	}

	const SearchBlanksOptions = (tab, val,text="") => {

		const menuItems = SEARCH_FIELD_BLANKS.map(x => {
			return <MenuItem value={x.value}>{x.label}</MenuItem>
		})

		return (
			<div>
				<Typography noWrap>{text}</Typography>
				<Select
					id={`blanks-${tab}-${text}`}
					key={`blanks-${tab}-${text}`}
					select
					value={searchFields[tab][val].blanks ? searchFields[tab][val].blanks : BLANKS_DEFAULT}
					name={val}
					onChange={handleSearchFieldsBlanks}
					style={{width:'80%'}}
				    //label="Sort By"
					//style={{width:'100%',paddingLeft:'20px'}}
					variant="outlined"
				>
					{menuItems}
				</Select>
			</div>
		);
	}

  const searchForm = (tab) => {

    console.log('tab',tab)
      return(
        <div style={{textAlign: 'center'}}>
        <Grid container justifyContent="center">
          <Grid>
            <FormGroup>
              <FormControlLabel
                control={<Switch color="primary" id={`switch-${tab}`} key={`switch-${tab}`} checked={switches[tab].showSearch} onChange={handleSwitchesChange} name={`showSearch-${tab}`} />}
                label={switches[tab].showSearch ? "Hide Search Fields" : "Show Search Fields"}
              />
            </FormGroup>
          </Grid>
        </Grid>
        {switches[tab].showSearch ?
        <FormControl component="fieldset">
          <RadioGroup row aria-label="position" name={tab} id={`radio-group-${tab}`} key={`radio-group-${tab}`} value={searchView[tab]} onChange={handleSearchView}>
          <FormControlLabel value="std" control={<Radio color="primary" />} label="Basic Search" />
          <FormControlLabel value="adv" control={<Radio color="primary" />} label="Advanced Search" />
          </RadioGroup>
        </FormControl> : null
        }		
        {switches[tab].showSearch ?
        <div style={{textAlign: 'center'}}>
        <form className={classesTextField.root} noValidate autoComplete="off">
          <div className={classesGrid.options}>
          <Grid container spacing={2} justifyContent={'center'}>
            {searchTextFieldsGridItems(tab)}
            {searchButtonGridItem(tab)}
          </Grid>
          </div>
        </form>
        </div> : null
        }
      </div>
    )
  }

  const TabsEng4900 = () => {
    return (
      <div className={tabClasses.root}>
        <AppBar position="static" color="default">
          <Tabs value={tabs} onChange={handleTabChange} aria-label="simple tabs example" textColor="primary" centered indicatorColor="primary"> 
            <Tab label={formTabs[0].label.toUpperCase()} hidden={eng4900s[0].length == 0} icon={<DescriptionIcon/>} {...a11yProps(0)} />
            <Tab label={formTabs[1].label.toUpperCase()} icon={<DescriptionIcon/>} {...a11yProps(1)} />
            <Tab label={formTabs[2].label.toUpperCase()} icon= {
            <Badge badgeContent={eng4900s[2].length} color="secondary">
                <DescriptionIcon/>
              </Badge>  
            } {...a11yProps(2)}/>  
            <Tab label={formTabs[3].label.toUpperCase()} icon={<DescriptionIcon/>} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabs} index={0}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[0] ? LoadingCircle() : null} </div>
          {!loading.init ? [searchForm(0), materialTableMyForms(0)] : null}
        </TabPanel>
        <TabPanel value={tabs} index={1}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[1] ? LoadingCircle() : null} </div>
          {!loading.init ? [searchForm(1), materialTableHraForms(1)] : null}
        </TabPanel>
        <TabPanel value={tabs} index={2}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[2] ? LoadingCircle() : null} </div>
          {!loading.init ? [searchForm(2), materialTableSignForms(2)] : null}
        </TabPanel>
        <TabPanel value={tabs} index={3}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[3] ? LoadingCircle() : null} </div>
          {!loading.init ? [searchForm(3), materialTableCompletedForms(3)] : null}
        </TabPanel>
      </div>
    );
  }

  const materialTableMyForms = (tab_idx) => {

    let columns = [
      { title: 'Status', field: 'status', editable:'onUpdate', type:'numeric', render: rowData => <a value={rowData.status} >{FORM_STATUS[rowData.status]}</a>,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
           value={value}
           onChange={(event) => {
              onChange(event.target.value);
           }}
        >
           {(rowData.requested_action == "Issue" ? stsOptions.single : stsOptions.double).map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ),
       validate: (rowData) => {		
        if(rowData.hasOwnProperty('status')){
          if(rowData.status) {
            if(rowData.hasOwnProperty('tableData')){

              if(rowData.status === eng4900s[tab_idx][rowData.tableData.id].status)
                return ({ isValid: false, helperText: 'Please select a different Status.' })

              //if(rowData.status > eng4900s[tab_idx][rowData.tableData.id].status)
                return true
            }
          }
        }
        
        return ({ isValid: false, helperText: 'Status selection is incorrect.' })
  
      }},
      //Object.fromEntries(Object.entries(FORM_STATUS).filter(([key, value]) => Number(key) >= rowData.status))},
      { title: 'Requested Action', field: "requested_action",editable: 'never' },
      { title: 'Form ID', field: 'form_id', editable:'never'},
      { title: 'Bar Tags', field: "bar_tags",editable: 'never'},
      { title: 'Losing HRA', field: "losing_hra",editable: 'never' },
      { title: 'Gaining HRA', field: "gaining_hra",editable: 'never' },
    ]
  
    return(
      <div style={{ maxWidth: '100%',paddingTop:'25px' }}>
          <MaterialTable
          icons={form4900Icons}
            columns={columns}
            data={eng4900s[tab_idx]}
            localization={{
              toolbar: {
              searchPlaceholder: "Filter Search"
              },
              body: {
                editTooltip : "Update Status",
                emptyDataSourceMessage:<h6>No Forms Found.</h6>
              }}}
            options={{
              //exportButton: true,
              //exportAllData: true,
              headerStyle: {
                backgroundColor: "#969696",
                color: "#FFF",
                fontWeight: 'bold',
                actionsColumnIndex: -1,
            }
            }}
            title=""
            detailPanel={[{
              tooltip: 'Show Status',
              render: rowData => {
                return (
                  // <div
                  //   style={{
                  //     fontSize: 100,
                  //     textAlign: 'center',
                  //     color: 'white',
                  //     backgroundColor: '#43A047',
                  //   }}
                  // >
                  //   {rowData.status}
                  // </div>
                  <div className={StepClasses.root}>
                  <Stepper activeStep={rowData.status - 1} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
                )
              },
            }]}
            actions={[
              // {
              //   icon: 'View',
              //   tooltip: 'Save User',
              //   onClick: (event, rowData) => alert("You saved "),// + rowData.name)
              // },
              {
                icon: () => (
                <Tooltip title="Crate New Form" aria-label="add">
                  <ThemeProvider>
                    <Fab  variant="extended" size="medium" color="inherit" className={ plusButtonClasses.fabGreen}>
                    Create 4900
                    </Fab>
                  </ThemeProvider>
                </Tooltip>
                ),
                tooltip: "Create New Form",
                position: "toolbar",
                onClick: () => setCreate4900({...create4900,show:true}),
                hidden: hras[tab_idx].losing.length == 0
              },
              rowData => ({
                icon: form4900Icons.View,
                tooltip: 'View Form',
                onClick: () => setCreate4900({...create4900, show:true, action:'VIEW', formId:rowData.form_id}),
                //onClick: (event, rowData) => ViewFormById(rowData.form_id), // + rowData.name),
                disabled: !(rowData.document_source != 2) //rowData.birthYear < 2000
              }),
              rowData => ({
                  icon: form4900Icons.Assignment,
                  tooltip: 'Edit Form',
                  onClick: () => setCreate4900({...create4900, show:true, action:'EDIT', formId:rowData.form_id}),
                  hidden: !(rowData.document_source != 2 && rowData.status == 1) //rowData.birthYear < 2000
                }),
              rowData => ({
                icon: form4900Icons.Pdf,
                tooltip: 'View PDF',
                onClick: (event, rowData) => {
                  get4900Pdf(rowData)
                  //setUploadPdf({...uploadPdf,show:true,rowData:rowData})
                },//rowData.folder_link ? openInNewTab(rowData.folder_link) : alert("Error: PDF not found."), // + rowData.name),
                disabled: ! (rowData.document_source != 2)  //rowData.birthYear < 2000
              }),
              rowData => ({
                icon: form4900Icons.Publish,
                tooltip: 'Upload PDF',
                onClick: (event, rowData) => {
                  setUploadPdf({...uploadPdf,show:true,rowData:rowData})
                },//rowData.folder_link ? openInNewTab(rowData.folder_link) : alert("Error: PDF not found."), // + rowData.name),
                disabled: ! (rowData.document_source != 2)  //rowData.birthYear < 2000
              })               
            ]}
            {...(editable && {editable:{
              //isEditable: rowData => rowData.field !== 'id', // only name(a) rows would be editable
              //isEditHidden: rowData => rowData.name === 'x',
              // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
              isDeleteHidden: rowData => rowData.originator !== 1 || rowData.status > 6,
              // onBulkUpdate: async(changes) => {
              //   const errorResult = await handleTableUpdate({changes:changes})
              //     return(new Promise((resolve, reject) => {
              //       setTimeout(() => {
              //         if(errorResult){
              //           reject()
              //           return;
              //         }
      
              //         resetEmployees();
              //         resolve();
                      
              //       }, 1000);
              //     }))
              //   },
              //   onRowAddCancelled: rowData => console.log('Row adding cancelled'),
              //   onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
              //   onRowAdd: async (newData) =>{
              //   const errorResult = await handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
              //     return(new Promise((resolve, reject) => {
              //       setTimeout(() => {
              //         if(errorResult){
              //           reject()
              //           return;
              //         }
      
              //         resetEmployees();
              //         resolve();
                      
              //       }, 1000);
              //     }))
              //   },
              onRowUpdate: async (newData, oldData) =>{
                const errorResult = false//await handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
                return(new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if(errorResult){
                      reject()
                      return;
                    }
    
                    //resetEmployees();
                    resolve();
                      
                  }, 1000);
                }))
                },
              onRowDelete: async (oldData) => {
                const result = await handleTableDelete(oldData)

                return(new Promise((resolve, reject) => {
                  setTimeout(() => {

                    if(!result.error){
                      const dataDelete = [...eng4900s[tab_idx]];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      //setEng4900s([...dataDelete]);
                      resolve()
                      return;
                    }  
    
                    reject();
                  }, 1000);
                }
              ))
                }
            }})}
          />
    </div>
    )
  }

  const materialTableHraForms = (tab_idx) => {

    let columns = [
      { title: 'Status', field: 'status', editable:'onUpdate', type:'numeric', render: rowData => <a value={rowData.status} >{FORM_STATUS[rowData.status]}</a>,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
           value={value}
           onChange={(event) => {
              onChange(event.target.value);
           }}
        >
           {(rowData.requested_action == "Issue" ? stsOptions.single : stsOptions.double).map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ),
       validate: (rowData) => {		
        if(rowData.hasOwnProperty('status')){
          if(rowData.status) {
            if(rowData.hasOwnProperty('tableData')){

              if(rowData.status === eng4900s[tab_idx][rowData.tableData.id].status)
                return ({ isValid: false, helperText: 'Please select a different Status.' })

              //if(rowData.status > eng4900s[tab_idx][rowData.tableData.id].status)
                return true
            }
          }
        }
        
        return ({ isValid: false, helperText: 'Status selection is incorrect.' })
  
      }},//Object.fromEntries(Object.entries(FORM_STATUS).filter(([key, value]) => Number(key) >= rowData.status))},
      { title: 'Requested Action', field: "requested_action",editable: 'never' },
      { title: 'Form ID', field: 'form_id', editable:'never'},
      { title: 'Bar Tags', field: "bar_tags",editable: 'never'},
      { title: 'Losing HRA', field: "losing_hra",editable: 'never' },
      { title: 'Gaining HRA', field: "gaining_hra",editable: 'never' },
    ]
  
    return(
      <div style={{ maxWidth: '100%',paddingTop:'25px' }}>
          <MaterialTable
          icons={form4900Icons}
            columns={columns}
            data={eng4900s[tab_idx]}
            localization={{
              toolbar: {
              searchPlaceholder: "Filter Search"
              },
              body: {
                editTooltip : "Update Status",
                emptyDataSourceMessage:<h6>No Forms Found.</h6>
              }}}
            options={{
              //exportButton: true,
              //exportAllData: true,
              headerStyle: {
                backgroundColor: "#969696",
                color: "#FFF",
                fontWeight: 'bold',
                actionsColumnIndex: -1,
            }
            }}
            title=""
            detailPanel={[{
              tooltip: 'Show Status',
              render: rowData => {
                return (
                  // <div
                  //   style={{
                  //     fontSize: 100,
                  //     textAlign: 'center',
                  //     color: 'white',
                  //     backgroundColor: '#43A047',
                  //   }}
                  // >
                  //   {rowData.status}
                  // </div>
                  <div className={StepClasses.root}>
                  <Stepper activeStep={rowData.status - 1} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
                )
              },
            }]}
            actions={[
              // {
              //   icon: 'View',
              //   tooltip: 'Save User',
              //   onClick: (event, rowData) => alert("You saved "),// + rowData.name)
              // },
              {
                icon: () => (
                <Tooltip title="Create New Form" aria-label="add">
                  <ThemeProvider>
                    <Fab  variant="extended" size="medium" color="inherit" className={ plusButtonClasses.fabGreen}>
                    Create 4900
                    </Fab>
                  </ThemeProvider>
                </Tooltip>
                ),
                tooltip: "Create New Form",
                position: "toolbar",
                onClick: () => setCreate4900({...create4900, show:true, action:'CREATE', formId:null}),
                hidden: hras[tab_idx].losing.length == 0
              },
              rowData => ({
                icon: form4900Icons.View,
                tooltip: 'View Form',
                onClick: () => setCreate4900({...create4900, show:true, action:'VIEW', formId:rowData.form_id}),
                //onClick: (event, rowData) => ViewFormById(rowData.form_id), // + rowData.name),
                disabled: !(rowData.document_source != 2) //rowData.birthYear < 2000
              }),
              rowData => ({
                  icon: form4900Icons.Assignment,
                  tooltip: 'Edit Form',
                  onClick: () => setCreate4900({...create4900, show:true, action:'EDIT', formId:rowData.form_id}),
                  hidden: !(rowData.document_source != 2 && rowData.status == 1) //rowData.birthYear < 2000
                }),
              rowData => ({
                icon: form4900Icons.Pdf,
                tooltip: 'View PDF',
                onClick: (event, rowData) => {
                  get4900Pdf(rowData)
                  //setUploadPdf({...uploadPdf,show:true,rowData:rowData})
                },//rowData.folder_link ? openInNewTab(rowData.folder_link) : alert("Error: PDF not found."), // + rowData.name),
                disabled: ! (rowData.document_source != 2)  //rowData.birthYear < 2000
              }),
              // rowData => ({
              //   icon: form4900Icons.Publish,
              //   tooltip: 'Upload PDF',
              //   onClick: (event, rowData) => {
              //     setUploadPdf({...uploadPdf,show:true,rowData:rowData})
              //   },//rowData.folder_link ? openInNewTab(rowData.folder_link) : alert("Error: PDF not found."), // + rowData.name),
              //   disabled: ! (rowData.document_source != 2)  //rowData.birthYear < 2000
              // })               
            ]}
            {...(editable && {editable:{
              //isEditable: rowData => rowData.field !== 'id', // only name(a) rows would be editable
              //isEditHidden: rowData => rowData.name === 'x',
              // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
              //isDeleteHidden: rowData => rowData.originator !== 1 || rowData.status > 6,
              // onBulkUpdate: async(changes) => {
              //   const errorResult = await handleTableUpdate({changes:changes})
              //     return(new Promise((resolve, reject) => {
              //       setTimeout(() => {
              //         if(errorResult){
              //           reject()
              //           return;
              //         }
      
              //         resetEmployees();
              //         resolve();
                      
              //       }, 1000);
              //     }))
              //   },
              //   onRowAddCancelled: rowData => console.log('Row adding cancelled'),
              //   onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
              //   onRowAdd: async (newData) =>{
              //   const errorResult = await handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
              //     return(new Promise((resolve, reject) => {
              //       setTimeout(() => {
              //         if(errorResult){
              //           reject()
              //           return;
              //         }
      
              //         resetEmployees();
              //         resolve();
                      
              //       }, 1000);
              //     }))
              //   },
              onRowUpdate: async (newData, oldData) => {
                const result = await handleTableUpdate({changes:{'0':{newData:{ form_id: newData.form_id, status:newData.status}}}})

                return(new Promise((resolve, reject) => {
                  setTimeout(() => {

                    if(result.error){
                      reject()
                      return;
                    }

                    // const dataUpdate = [...eng4900s[tab_idx]];
                    // const index = oldData.tableData.id;
                    // dataUpdate[index] = result.data;
                    // setEng4900s({...eng4900s, [tab_idx]: [...dataUpdate]});
                    resolve();
                      
                  }, 1000);
                }))
              },
              onRowDelete: async (oldData) => {
                const result = await handleTableDelete(oldData)

                return(new Promise((resolve, reject) => {
                  setTimeout(() => {

                    if(!result.error){
                      const dataDelete = [...eng4900s[tab_idx]];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      //setEng4900s([...dataDelete]);
                      resolve()
                      return;
                    }  
    
                    reject();
                    }, 1000);
                  }
                ))
              }
            }})}
          />
    </div>
    )
  }

  const materialTableSignForms = (tab_idx) => {
    
    let columns = [
      { title: 'Status', field: 'status', editable:'never', type:'numeric', render: rowData => <a value={rowData.status} >{FORM_STATUS[rowData.status]}</a>},
      //Object.fromEntries(Object.entries(FORM_STATUS).filter(([key, value]) => Number(key) >= rowData.status))},
      { title: 'Requested Action', field: "requested_action",editable: 'never' },
      { title: 'Form ID', field: 'form_id', editable:'never'},
      { title: 'Bar Tags', field: "bar_tags",editable: 'never'},
      { title: 'Losing HRA', field: "losing_hra",editable: 'never' },
      { title: 'Gaining HRA', field: "gaining_hra",editable: 'never' },
    ]
  
    return(
      <div style={{ maxWidth: '100%',paddingTop:'25px' }}>
          <MaterialTable
          icons={form4900Icons}
            columns={columns}
            data={eng4900s[tab_idx]}
            localization={{
              toolbar: {
              searchPlaceholder: "Filter Search"
              },
              body: {
                editTooltip : "Update Status",
                emptyDataSourceMessage:<h6>No Forms Found.</h6>
              }}}
            options={{
              //exportButton: true,
              //exportAllData: true,
              headerStyle: {
                backgroundColor: "#969696",
                color: "#FFF",
                fontWeight: 'bold',
                actionsColumnIndex: -1,
            }
            }}
            title=""
            detailPanel={[{
              tooltip: 'Show Status',
              render: rowData => {
                return (
                  // <div
                  //   style={{
                  //     fontSize: 100,
                  //     textAlign: 'center',
                  //     color: 'white',
                  //     backgroundColor: '#43A047',
                  //   }}
                  // >
                  //   {rowData.status}
                  // </div>
                  <div className={StepClasses.root}>
                  <Stepper activeStep={rowData.status - 1} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
                )
              },
            }]}
            actions={[
              rowData => ({
                icon: form4900Icons.View,
                tooltip: 'View Form',
                onClick: () => setCreate4900({...create4900, show:true, action:'VIEW', formId:rowData.form_id}),
                //onClick: (event, rowData) => ViewFormById(rowData.form_id), // + rowData.name),
                disabled: !(rowData.document_source != 2) //rowData.birthYear < 2000
              }),
              rowData => ({
                icon: form4900Icons.Pdf,
                tooltip: 'View PDF',
                onClick: (event, rowData) => {
                  get4900Pdf(rowData)
                  //setUploadPdf({...uploadPdf,show:true,rowData:rowData})
                },//rowData.folder_link ? openInNewTab(rowData.folder_link) : alert("Error: PDF not found."), // + rowData.name),
                disabled: ! (rowData.document_source != 2)  //rowData.birthYear < 2000
              }),
              rowData => ({
                icon: form4900Icons.Publish,
                tooltip: 'Upload PDF',
                onClick: (event, rowData) => {
                  setUploadPdf({...uploadPdf,show:true,rowData:rowData})
                },//rowData.folder_link ? openInNewTab(rowData.folder_link) : alert("Error: PDF not found."), // + rowData.name),
                disabled: ! (rowData.document_source != 2)  //rowData.birthYear < 2000
              })               
            ]}
            {...(editable && {editable:{
              //isEditable: rowData => rowData.field !== 'id', // only name(a) rows would be editable
              isEditHidden: () => true,
              // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
              //isDeleteHidden: rowData => rowData.originator !== 1,
              // onBulkUpdate: async(changes) => {
              //   const errorResult = await handleTableUpdate({changes:changes})
              //     return(new Promise((resolve, reject) => {
              //       setTimeout(() => {
              //         if(errorResult){
              //           reject()
              //           return;
              //         }
      
              //         resetEmployees();
              //         resolve();
                      
              //       }, 1000);
              //     }))
              //   },
              //   onRowAddCancelled: rowData => console.log('Row adding cancelled'),
              //   onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
              //   onRowAdd: async (newData) =>{
              //   const errorResult = await handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
              //     return(new Promise((resolve, reject) => {
              //       setTimeout(() => {
              //         if(errorResult){
              //           reject()
              //           return;
              //         }
      
              //         resetEmployees();
              //         resolve();
                      
              //       }, 1000);
              //     }))
              //   },
              onRowUpdate: async (newData, oldData) =>{
                console.log(newData, oldData)
                const errorResult = false//await handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})

                return(new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if(errorResult){
                      reject()
                      return;
                    }
    
                    //resetEmployees();
                    resolve();
                      
                  }, 1000);
                }))
                },
              // onRowDelete: async (oldData) => {
              //   const result = await handleTableDelete(oldData)

              //   return(new Promise((resolve, reject) => {
              //     setTimeout(() => {

              //       if(!result.error){
              //         const dataDelete = [...eng4900s[1]];
              //         const index = oldData.tableData.id;
              //         dataDelete.splice(index, 1);
              //         //setEng4900s([...dataDelete]);
              //         resolve()
              //         return;
              //       }  
    
              //       reject();
              //     }, 1000);
              //   }
              // ))
              //   }
            }})}
          />
    </div>
    )
  }

  const materialTableCompletedForms = (tab_idx) => {
    
    let columns = [
      { title: 'Status', field: 'status', editable:'never', type:'numeric', render: rowData => <a value={rowData.status} >{FORM_STATUS[rowData.status]}</a>
      ,validate: (rowData) => {		
        if(rowData.hasOwnProperty('status')){
          if(rowData.status) {
            if(rowData.hasOwnProperty('tableData')){
              if(rowData.status >= eng4900s[tab_idx][rowData.tableData.id].status){
                return true
              }
            }
          }
        }
        
        return ({ isValid: false, helperText: 'Status selection is incorrect.' })
  
      }},//Object.fromEntries(Object.entries(FORM_STATUS).filter(([key, value]) => Number(key) >= rowData.status))},
      { title: 'Requested Action', field: "requested_action",editable: 'never' },
      { title: 'Form ID', field: 'form_id', editable:'never'},
      { title: 'Bar Tags', field: "bar_tags",editable: 'never'},
      { title: 'Losing HRA', field: "losing_hra",editable: 'never' },
      { title: 'Gaining HRA', field: "gaining_hra",editable: 'never' },
    ]
  
    return(
      <div style={{ maxWidth: '100%',paddingTop:'25px' }}>
          <MaterialTable
          icons={form4900Icons}
            columns={columns}
            data={eng4900s[tab_idx]}
            localization={{
              toolbar: {
              searchPlaceholder: "Filter Search"
              },
              body: {
                editTooltip : "Update Status",
                emptyDataSourceMessage:<h6>No Forms Found.</h6>
              }}}
            options={{
              headerStyle: {
                backgroundColor: "#969696",
                color: "#FFF",
                fontWeight: 'bold',
                actionsColumnIndex: -1,
            }
            }}
            title=""
            detailPanel={[{
              tooltip: 'Show Status',
              render: rowData => {
                return (
                  <div className={StepClasses.root}>
                  <Stepper activeStep={rowData.status - 1} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
                )
              },
            }]}
            actions={[
              rowData => ({
                icon: form4900Icons.View,
                tooltip: 'View Form',
                onClick: () => setCreate4900({...create4900, show:true, action:'VIEW', formId:rowData.form_id}),
                disabled: !(rowData.document_source != 2)
              }),
              rowData => ({
                icon: form4900Icons.Pdf,
                tooltip: 'View PDF',
                onClick: (event, rowData) => {
                  get4900Pdf(rowData)
                },
                disabled: ! (rowData.document_source != 2)
              }),           
            ]}
          />
    </div>
    )
  }

  //Render Variables
  const searchTextFieldsGridItems = (tab) => Object.keys(searchFields[tab]).map(key => {
		const nFields = Object.keys(searchFields[tab]).length
    const w = windowSize.width*.75 / nFields >= 100 && 120 >= windowSize.width*.75 / nFields ? windowSize.width*.75 / nFields : 120
	return(	
    <div>
      <Typography noWrap>{`Search ${searchFields[tab][key].label}`}</Typography>         
      <TextField
        id={`outlined-search-${key}`}
        key={`outlined-search-${key}`}
        name={key} 
        type="search" variant="outlined" 
        value={searchFields[tab][key].value} 
        onChange={handleSearchFieldsChange}
        onKeyPress={handleSearchKeyPress}
        style={{paddingRight:'10px'}}
      />
      {searchFields[tab][key].value && searchView[tab] !== BASIC_SEARCH ? SearchCriteriaOptions(tab, key, `${searchFields[tab][key].label} Options`) :
      !searchFields[tab][key].value && searchView[tab] !== BASIC_SEARCH ? SearchBlanksOptions(tab, key, `${searchFields[tab][key].label}`) : null
      }
    </div>
	)
  });

	const searchButtonGridItem = (tab) => { 
		return(
			<div style={{paddingTop:'27px'}}>
				<IconButton id={`search-${tab}`} key={`search-${tab}`} name={tab} aria-label="search" color="primary" onClick={handleSearch}>
					<SearchIcon style={{ fontSize: 40 }}/>
				</IconButton>
			</div>)
	}

  const displayTop = () => (
  <div style={{textAlign: 'center'}}>
    <h2>Eng 4900 Form</h2>     
  </div>
)
      
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

    pageInitialize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    console.log(eng4900s)
  }, [eng4900s]);

  React.useEffect(() => {
		console.log(hras)
	}, [hras]);

  //Render return.
  return (
    <>
    {uploadPdf.show ? <UploadFormModal uploadPdf={uploadPdf} setUploadPdf={setUploadPdf} type={"eng4900"} statusOptions={FORM_STATUS}/> : null}
    {create4900.show ? <Eng4900Form formId={create4900.formId} action={create4900.action} type="DIALOG" hras={hras[tabs]} eng4900s={eng4900s} tab={tabs} setEng4900s={setEng4900s} create4900={create4900} setCreate4900={setCreate4900}/> : null}
    <div>
      {displayTop()}
      {!loading.init ? TabsEng4900() : <div style={{textAlign:'center'}}>{LoadingCircle()}</div>}
    </div>
    </>
  );
}

export default connect(
  'selectUserToken',
  Eng4900);