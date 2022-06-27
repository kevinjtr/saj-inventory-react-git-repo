
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'date-fns';
import Grid from '@material-ui/core/Grid';

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
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import MaterialTable, {MTableToolbar} from '@material-table/core'
import jsPDF from 'jspdf'

import 'jspdf-autotable'
import { ExportCsv } from '@material-table/exporters';

import {getQueryStringParams,LoadingCircle,contains,TextMaskCustom,NumberFormatCustom, numberWithCommas,openInNewTab} from './tools/tools'
import clsx from 'clsx'
import {Autocomplete, Alert} from '@material-ui/lab';
import {SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, EQUIPMENT, AVD_SEARCH, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT, condition} from './config/constants'
import {tableIcons} from './material-table/config'

import {orderBy, findIndex, filter} from 'lodash'
//Styles Import
import { plusButtonStyles, texFieldStyles, gridStyles, itemMenuStyles, phoneTextFieldStyles, AvatarStyles, TabPanel, a11yProps, tabStyles, stepStyles, steps } from './styles/material-ui';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import ComputerIcon from '@material-ui/icons/Computer';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {updateEquipmentApi, destroyEquipmentApi, addEquipmentApi, equipmentSearchApi2} from '../publics/actions/equipment-api'
import {getHraFormApi} from '../publics/actions/hra-api'
import { connect } from 'redux-bundler-react';
import {ALERT} from './tools/tools'
import { Link } from '@material-ui/core';
import UpdateStatusPopup from './UpdateStatusPopup';
import { Snackbar } from '@mui/material';

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

function Equipment({history, location, match, userToken}) {
  
  //Constants Declarations.
  const search = getQueryStringParams(location.search)
  const PAGE_URL = `/${EQUIPMENT}`

  const equipmentTabs = {0: {id:'my_equipment', label:'My Equipment'}, 1: {id:'my_hra_equipment', label:'My HRA Equipment'}, 2: {id:'hra_equipment', label:'Authorized HRA Equipment'}, 3: {id:'equipment_search', label:'Equipment Search'}, 4: {id:'excess_equipment', label:'Excess Equipment'}}
  const SEARCH_FIELD_RESET = {
    hraNum: {label: 'HRA Number', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    hraName: {label: 'HRA Name', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    itemType: {label: 'Item Description', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    bartagNum: {label: 'Bar Tag', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
    employeeName: {label: 'Employee', value: '', width: 250, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT}
}
  const OPTS_RESET = {
    includes: {},
    blanks: {}
  }
  const SWITCH_RESET = {
    checkedView: false,
    showSearch: false,
  }

  //Variables Declarations.
//let sendData = [];

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
  const [searchFields, setSearchFields] = React.useState({
    0: SEARCH_FIELD_RESET,
    1: SEARCH_FIELD_RESET,
    2: SEARCH_FIELD_RESET,
    3: SEARCH_FIELD_RESET,
    4: SEARCH_FIELD_RESET,
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
  const [alertUser, setAlertUser] = React.useState(ALERT.RESET);
  const [loading, setLoading] = React.useState({init:true,refresh:{
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  }});
  const [equipments, setEquipments] = React.useState({
      0: [],
      1: [],
      2: [],
      3: [],
      4: []
    });
  const [editable,setEditable] = React.useState({
    0:false,
    1:false,
    2:false,
    3:false,
    4:false,
  })
  const [rights, setRights] = React.useState({
    0:{view: false, edit:false},
    1:{view: false, edit:false},
    2:{view: false, edit:false},
    3:{view: false, edit:false},
    4:{view: false, edit:false},
  })
  const [tabs, setTabs] = React.useState(0);
  const [switches, setSwitches] = React.useState({
      0: SWITCH_RESET,
      1: SWITCH_RESET,
      2: SWITCH_RESET,
      3: SWITCH_RESET,
      4: SWITCH_RESET,
    });
  const [hras, setHras] = React.useState([]);
  const [my_hras, setMyHras] = React.useState([]);
	const [employees, setEmployees] = React.useState([]);
  const [openPopup,setOpenPopup] =  React.useState(false);
  const [rowData, setRowData] = React.useState([]);
  let [snackBar,setSnackBar] = React.useState({open:false,message:'',severity:'warning'});
  //const [excess, setExcess] = React.useState([]);

  // state variable for showing/hiding column filters in material table
    const [showFilter,setShowFilter] = React.useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      })
      

  //Events Declarations.
  const handleUpdate = async (rowData) => {
      let errorFound = true
      setAlertUser(ALERT.RESET)

      console.log(rowData)
      await updateEquipmentApi(rowData, userToken)
      .then((response) => response.data).then((data) => {
        const {tabChanges, error} = data
        errorFound = error

        if(error){
          setAlertUser(ALERT.FAIL())
        }else {
          let equipments_copy = {...equipments}

          for(const tab_number in tabChanges){
            for(const eq_change of tabChanges[tab_number]){
              let equipments_tab_copy = [...equipments_copy[tab_number]]
              const idx = findIndex(equipments_tab_copy,function(eq){return eq.bar_tag_num == eq_change.bar_tag_num})

              if(idx != -1){
                equipments_tab_copy[idx] = eq_change
                console.log(equipments_tab_copy[idx])
                equipments_copy = {...equipments_copy,[tab_number]: equipments_tab_copy}
              }
            }
          }

          setEquipments(equipments_copy)
          setAlertUser(ALERT.SUCCESS)
        }        

      }).catch(function (error) {
        console.log(error)
        setAlertUser(ALERT.FAIL())
      });

      return(errorFound)
  }

  const handleDelete = async (rowData) => {
    let errorFound = true
    setAlertUser(ALERT.RESET)

    await destroyEquipmentApi(rowData, userToken).then((response) => response.data).then((data) => {
        const {tabChanges, error} = data
        errorFound = error

        if(error){
          setAlertUser(ALERT.FAIL())
        }else {
          let equipments_copy = {...equipments}

          for(const tab_number in tabChanges){
            for(const eq_change of tabChanges[tab_number]){
              let equipments_tab_copy = [...equipments_copy[tab_number]]

              equipments_tab_copy = filter(equipments_tab_copy,function(eq){return eq.bar_tag_num != eq_change.bar_tag_num})
              equipments_copy = {...equipments_copy,[tab_number]: equipments_tab_copy}
            }
          }

          setEquipments(equipments_copy)
          setAlertUser(ALERT.SUCCESS)
        }
      
    }).catch(function (error) {
        console.log(error)
        setAlertUser(ALERT.FAIL())
    });

    return errorFound
  }

  const handleAdd = async (rowData) => {
  let errorFound = true
  setAlertUser(ALERT.RESET)

  await addEquipmentApi(rowData, userToken).then((response) => response.data).then((data) => {
    const {tabChanges, error} = data
    errorFound = error
    console.log(data)

    if(error){
      setAlertUser(ALERT.FAIL())
    }else {
      let copy_equipments = {...equipments}

      for(const tab_number in tabChanges){
        for(const eq_change of tabChanges[tab_number]){
            console.log(eq_change,tab_number)
            copy_equipments = {...copy_equipments,[tab_number]: [eq_change,...copy_equipments[tab_number]]}
        }
      }

      setEquipments(copy_equipments)

      setAlertUser(ALERT.SUCCESS)
    }

  }).catch(function (error) {
    console.log(error)
    setAlertUser(ALERT.FAIL())
  });

  return errorFound

  }

	const handleSearchFieldsChange = (event) => {
		console.log(event.target.value)
    //const tab = event.target.id.split('-')[1]

    if(event.target.value == ''){
      setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], value: event.target.value, options: OPTIONS_DEFAULT}} })
		}else{

			setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], value: event.target.value, blanks : BLANKS_DEFAULT}} })
    }

		// if(event.target.value == ''){
		// 	setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], value: event.target.value, options: OPTIONS_DEFAULT} })
		// }else{
		// 	setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], value: event.target.value} })
		// }
	};

	const handleSearchFieldsOptions = (event) => {
    const opts = SEARCH_FIELD_OPTIONS.map(x=>x.value).includes(event.target.value) ? event.target.value : OPTIONS_DEFAULT
    //const tab = event.target.id.split('-')[1]

    //setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], options : opts} })
    
    setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], options : opts}} })
	}

	const handleSearchFieldsBlanks = (event) => {
    const blks = SEARCH_FIELD_BLANKS.map(x=>x.value).includes(event.target.value) ? event.target.value : BLANKS_DEFAULT
    //const tab = event.target.id.split('-')[1]

    //setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], blanks : blks} })
    
    setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], blanks : blks}} })
  }
  
  const handleSearch = async (e=null,onLoad=false) => {
    //if(!onLoad) await UpdateUrl()
    setAlertUser(ALERT.RESET)
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
  
    equipmentSearchApi2({
      'fields': fields_obj,
      'options':opts,
      'tab': equipmentTabs[tabs].id
    }, userToken)
    .then((response) => response.data).then((data) => {
      console.log(data)
      setLoading({...loading, refresh: {...loading.refresh, [tabs]: false}})
      setEquipments({...equipments, [tabs]: data.status != 400 ? data.data[tabs] : []})

    }).catch(function (error) {
      setLoading({...loading, refresh: {...loading.refresh, [tabs]: false}})
      setEquipments({...equipments, [tabs]: []})
  
    });
  
  }

  const pageInitialize = () => {
    setLoading({...loading,init:true})
    equipmentSearchApi2({
      'fields': {},
      'options':OPTS_RESET,
      'tab': equipmentTabs[tabs].id,
      'init': true
    }, userToken)
    .then((response) => response.data).then((data) => {
      console.log(data)

      if(Object.keys(data.editable).length > 0){
        setEditable(data.editable)
      }

      if(Object.keys(data.rights).length > 0){
        setRights(data.rights)
      }

      if(data.status == 200){
        setEquipments(data.data)
        setHras(data.hras)
        setMyHras(data.my_hras)
        setEmployees(data.employees)
      }

      setLoading({...loading,init:false})

    }).catch(function (error) {
      setLoading({...loading,init:false})
      setEquipments({...equipments, [tabs]: []})
  
    });

    //getHrasAndEquipments()
  }
  
  const handleSearchView = (e) => {
    console.log(e.target.value)
    setSearchView({...searchView, [tabs]:  e.target.value})
  }

  const handleSearchKeyPress = (event) => {
    //const tab = event.target.id.split('-')[1]

		if(event.key == "Enter"){//enter key pressed.
		   handleSearch()
		}
	}

  const handleTabChange = (event, newValue) => {
    setTabs(newValue);
  };

  const handleSwitchesChange = (event) => {
    const target = event.target.name.split('-')

    if(target.length > 1){
        setSwitches({ ...switches, [target[1]]: {...switches[target[1]], [target[0]]: event.target.checked} });
    }
		
  };
  
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
          <Grid container spacing={2}>
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

  const TabsEquipment = () => {
    return (
      <div className={tabClasses.root}>
        <AppBar position="static" color="default">
          <Tabs value={tabs} onChange={handleTabChange} aria-label="simple tabs example" textColor="primary" centered indicatorColor="primary"> 
            <Tab label={equipmentTabs[0].label.toUpperCase()} icon={<ComputerIcon/>} {...a11yProps(0)} />
            <Tab label={equipmentTabs[1].label.toUpperCase()} hidden={!rights.view[3] || equipments[1].length == 0} icon={<ComputerIcon/>} {...a11yProps(1)} />
            <Tab label={equipmentTabs[2].label.toUpperCase()} hidden={!rights.view[3] || equipments[2].length == 0} icon={<ComputerIcon/>} {...a11yProps(2)}/>  
            <Tab label={equipmentTabs[3].label.toUpperCase()} hidden={!rights.view[3]} icon={<SearchIcon/>} {...a11yProps(3)} />
            <Tab label={equipmentTabs[4].label.toUpperCase()} hidden={!rights.view[3] || equipments[4].length == 0} icon={<ComputerIcon/>} {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabs} index={0}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[0] ? LoadingCircle() : null} </div>
          {!loading.init ? materialTableSelect(0) : null}
        </TabPanel>
        <TabPanel value={tabs} index={1}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[1] ? LoadingCircle() : null} </div>
          {!loading.init ? materialTableSelect(1) : null}
        </TabPanel>
        <TabPanel value={tabs} index={2}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[2] ? LoadingCircle() : null} </div>
          {!loading.init ? materialTableSelect(2) : null}
        </TabPanel>
        <TabPanel value={tabs} index={3}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[3] ? LoadingCircle() : null} </div>
          {!loading.init ? [searchForm(3), materialTableSelect(3)] : null}
        </TabPanel>
        <TabPanel value={tabs} index={4}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[4] ? LoadingCircle() : null} </div>
          {!loading.init ? [searchForm(4), materialTableSelect(4)] : null}
        </TabPanel>
      </div>
    );
  }

  const materialTableSelect = (tab_idx) => {
    const isHraTab = equipmentTabs[tab_idx].id == "my_hra_equipment"
    const hras_array = isHraTab ? my_hras : hras

    let columns = []
    const dataIsOnDatabase = {
    bar_tag_num:false
    }

    const equipment_cols_config = [
        { title: 'HRA Number', field: 'hra_num', type:'numeric', col_id:2.0,
        editComponent: (x) => {
        //console.log(x);
        let idx = -1
    
        if(x.rowData.hra_num){
            idx = findIndex(hras_array,function(e){ return (e.hra_num && (e.hra_num == x.rowData.hra_num)); })
        }
    
        return(
            <Autocomplete
            //onChange={e => x.onChange(e)}
            id={`combo-box-employee`}
            //size="small"
            //style={{width:'80%'}}
            options={hras_array}
            getOptionLabel={(option) => option.hra_num + ' - ' + (option.hra_first_name ? option.hra_first_name + ' ' : '') + option.hra_last_name}
            value={idx != -1 ? hras_array[idx] : null}
            //defaultValue={idx != -1 ? employees[idx] : null}
            onChange ={e => {
            const hraNum_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
            console.log(hraNum_);
            x.onChange(hraNum_)
            }}
            //style={{ verticalAlign: 'top' }}
            renderInput={(params) => <TextField {...params} label="HRA" margin="normal"/>}
            renderOption={(option) => <a style={{fontSize:'16px'}}>{option.hra_num + ' - ' + (option.hra_first_name ? option.hra_first_name + ' ' : '') + option.hra_last_name}</a>}
        />
        )
        },validate: (rowData) => {
          if(rowData.hasOwnProperty('hra_num')){
              if(!isNaN(rowData.hra_num)) {
                if(rowData.hra_num){
                  const idx = findIndex(hras_array,function(e){ return (e.hra_num && (e.hra_num == rowData.hra_num)); })
                  return idx != -1
                }
              }
          }

          return ({ isValid: false, helperText: 'Hra Num  is required.' })
      }
        },
        { title: 'HRA First', field: 'hra_first_name',col_id:2.1,editable: 'never' },
        { title: 'HRA Last', field: 'hra_last_name',col_id:2.2,editable: 'never' },
        { title: 'Item Description', field: 'item_type',col_id:4  },
        { title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric',col_id:5, validate: (rowData) => {
            if(rowData.hasOwnProperty('bar_tag_num')){
                if(!isNaN(rowData.bar_tag_num)) {
                    if(typeof rowData.bar_tag_num === "number"){
                        if(rowData.bar_tag_num.toString().length > 5){
                            return ({ isValid: false, helperText: 'Bar Tag digits exceed 5.' })
                        }else{
                            const idx = findIndex(equipments[tab_idx],e => e.bar_tag_num == rowData.bar_tag_num)
                            const propTableData = rowData.hasOwnProperty('tableData')//exists: editing, not exists: adding.

                            if(propTableData && idx != -1){
                                if(rowData.id != equipments[tab_idx][idx].id){
                                    return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
                                }
                            }else if (idx != -1 && !propTableData && !rowData.hasOwnProperty('id')){
                                return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
                            }								
                        }
                        return true
                    }
        
                    if(typeof rowData.bar_tag_num === "string"){
                        return ({ isValid: false, helperText: 'Bar Tag needs to be numeric.' })
                    }
                }
            }
            return ({ isValid: false, helperText: 'Bar Tag is required.' })

        }
        },
        { title: 'Employee First', field: 'employee_first_name',col_id:6.1 ,editable: 'never' },
        { title: 'Employee Last', field: 'employee_last_name',col_id:6.2,editable: 'never'  },
        { title: 'Employee Office Location', field: 'employee_office_location_name',col_id:6.3,editable: 'never'  },
        {title: 'Status', field:'status',col_id:6.4,editable: 'no' },
        {title: 'Status Date', field:'status_date',col_id:6.4,editable: 'no' },
        tab_idx === 0 ? {title: 'Update Status', field:'update_status',col_id:6.5 ,editable: 'yes', render: rowData => <Link underline="always" component="button" onClick={()=>{setRowData(rowData); setOpenPopup(true); setSnackBar={setSnackBar}; }}>Update</Link>}: {}
    ] 
   // tab_idx === 0 || tab_idx === 1 ? {title: 'Status', field:'status',col_id:6.4,editable: 'no' } : {},
    //tab_idx === 1 ? {title: 'Status Date', field:'status_date',col_id:6.4,editable: 'no' } : {},

    const ext_equipment_cols_config = [		
        // {title: 'HRA Employee ID', field: 'hra_employee_id',editable: 'never',col_id:2.3 },
        { title: 'Employee Holder ID', field: 'employee_id', type:'numeric',col_id:6.0,
        editComponent: (x) => {
            //console.log(x);
            let idx = -1
    
            if(x.rowData.employee_id){
            idx = findIndex(employees,function(e){ return (e.id && (e.id == x.rowData.employee_id)); })
            }
    
            return(
            <Autocomplete
            //onChange={e => x.onChange(e)}
            id="combo-box-employee"
            //size="small"
            options={employees}
            getOptionLabel={(option) => option.id + ' - ' + (option.first_name ? option.first_name + ' ' : '') + option.last_name}
            value={idx != -1 ? employees[idx] : null}
            //defaultValue={idx != -1 ? employees[idx] : null}
            onChange ={e => {
    
                const id_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
                console.log(id_);
                x.onChange(id_)
            }}
            //style={{ verticalAlign: 'top' }}
            renderInput={(params) => <TextField {...params} label="Employee" margin="normal"/>}
            renderOption={(option) => <a style={{fontSize:'16px'}}>{option.id + ' - ' + (option.first_name ? option.first_name + ' ' : '') + option.last_name}</a>}
            />
            )
        }},
        {title:'Acquisition Date',field:'acquisition_date',  type: 'date',col_id:1 },
        {title:'Acquisition Price',field:'acquisition_price',type: 'numeric',col_id:7 },
        {title:'Catalog Num',field:'catalog_num',col_id:8 },
        {title:'Serial Num',field:'serial_num',col_id:9 },
        {title:'Manufacturer',field:'manufacturer',col_id:10 },
        {title:'Model',field:'model',col_id:11 },
        {title:'Condition',field:'condition',col_id:12, editComponent: (x) => {
            //console.log(x);
            let idx = -1
    
            if(x.rowData.condition){
            idx = findIndex(condition,function(c){ return (c.id && (c.id == x.rowData.condition)); })
            }
    
            return(
            <Autocomplete
            //onChange={e => x.onChange(e)}
            id="combo-box-employee"
            //size="small"
            options={condition}
            getOptionLabel={(option) => option.id + ' - ' + option.name}
            value={idx != -1 ? condition[idx] : null}
            //defaultValue={idx != -1 ? employees[idx] : null}
            onChange ={e => {
    
                const id_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
                console.log(id_);
                x.onChange(id_)
            }}
            //style={{ verticalAlign: 'top' }}
            renderInput={(params) => <TextField {...params} label="Condition" margin="normal"/>}
            renderOption={(option) => <a style={{fontSize:'16px'}}>{option.id + ' - ' + option.name}</a>}
            />
            )
            }
        }
    ]
    

    if(editable) ext_equipment_cols_config.push({title:'Updated By',col_id:13,field:'updated_by_full_name',editable:'never' })

    for(const col_config of equipment_cols_config){
        if(col_config.hasOwnProperty('field') && col_config){
            columns.push(col_config)
        }
    }

    if(switches[tab_idx].checkedView){
        let extended_columns = []
        
        for(const col_config of ext_equipment_cols_config){
            if(col_config.hasOwnProperty('field') && col_config){
                extended_columns.push(col_config)
            }
        }

        columns = [...columns,...extended_columns]
        columns = orderBy(columns,'col_id','asc')
    }

    // Generate dates for report exports
    const generateReportDate= (dateType) => {

        const date = new Date();
        var day = date.getDate();
        if(day<=9)
            day = '0' + day;
        var month = date.getMonth() + 1;
        if(month<=9)
            month = '0' + month;
        var fullyear = date.getFullYear();
        

        if(dateType === 'filename')
            return fullyear.toString() + month.toString() + day.toString() ;
        else if (dateType === 'footer'){
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var year = date.getYear() - 100;
            return month.toString() + "/" + day.toString() + "/" + year.toString() + " " + hours.toString()+ ":" + minutes.toString()+ ":" + seconds.toString()
        }
    }


    // Custom Pdf Export for Extended View
    const downloadPdf=(columns, equipment_array, viewType)=>{
    
      console.log(equipment_array)
        /* Create new jsPDF() object */
        const doc = new jsPDF({orientation:"landscape"})
        //Title can go here
        doc.setFontSize(12)
        doc.text("Equipment Report",15,10)
        doc.setFontSize(8)
        doc.text("Generated on " + generateReportDate('footer'),240,200)

        if(viewType === 'extended'){

            /* Remove extraneous columns using filter */
            let printColumns = columns.filter(col => 
                col.field !== "updated_by_full_name" && col.field !== "employee_id" && col.field !== "hra_last_name" && col.field !== "employee_last_name" && col.field !== "model" && col.field !== "status_date"
                )
        
            /* Rename column titles using map function */
            printColumns.map(col => 
                    {
                        if(col.field =="acquisition_date")
                            col.title = "Acq. Date"
                        if(col.field =="acquisition_price")
                            col.title = "Acq. Price"
                        if(col.field == "item_type")
                            col.title = "Description"
                        if(col.field =="employee_id")
                            col.title = "EmployeeID"
                        if(col.field =="hra_num")
                            col.title = "HRA #"
                        if(col.field =="hra_first_name"){
                            col.field = "hraLetterName" 			// note field column is renamed for letter name
                            col.title = "HRA Name"}
                        if(col.field =="employee_first_name"){
                            col.field = "employeeFullName" 			// note field column is renamed for full employee name
                            col.title = "Employee"}
                        if(col.field =="manufacturer"){
                            col.field = "mfgrModel"					
                            col.title = "Mft/Model"}
                        if(col.field =="bar_tag_num")
                            col.title = "Bar Tag"
                        if(col.field =="catalog_num")
                            col.title = "Catalog Num."
                        if(col.field =="serial_num")
                            col.title = "Serial Num."
                        if(col.field =="status")
                            col.title = "Status"
                       
                    }
                );

        
            // Convert array of arrays to array of objects
            var printEquipments = equipment_array.map(function(x) {
              //console.log("array fields" + x);
                var hraLetter = x[2] ? x[2].charAt(0) + ". " : ""

                var firstName = x[7] ? x[7] + " " : ""
                var lastName = x[8] ? x[8] : ""
                var employeeFullName = firstName.charAt(0) + ". " + lastName

                var mfgr = x[15] ? x[15] + " " : ""
                var model = x[16] ? x[16] : ""
                var mfgrModel = mfgr + model	

                var status = x[10]
                var status_date = x[11]
                var status_and_date = status + " as of " + status_date
                return { 
                    acquisition_date: x[0],
                    hra_num: x[1],
                    hraLetterName: hraLetter + x[3],
                    item_type: x[4],
                    bar_tag_num: x[5],
                    employee_id: x[6],
                    employeeFullName: employeeFullName,
                    acquisition_price:x[12],
                    catalog_num: x[13],
                    serial_num: x[14],
                    mfgrModel: mfgrModel,
                    condition: x[17],
                    status: status_and_date
                    //updated_by_full_name: x[18]
                    
                }; 
            });

            /* Format data, such as dates or currency */
            printEquipments.map(row => {
                const dateOptions = {day:'2-digit',month:'2-digit',year:'2-digit'}
                row.acquisition_date = new Date(row.acquisition_date).toLocaleDateString('en-EN',dateOptions)
                row.acquisition_price = (Math.round(row.acquisition_price * 100) / 100).toFixed(2);
            })

            /* Generate autoTable with custom column widths */
            doc.autoTable({
                columns:printColumns.map(col=>({...col,dataKey:col.field})),
                body:printEquipments,
                styles: {fontSize: 7},
                columnStyles:{        // Set fixed width for columns
                    0: {cellWidth: 14},
                    1: {cellWidth: 11},
                    2: {cellWidth: 24},
                    3: {cellWidth: 32},
                    4: {cellWidth: 13},
                    5: {cellWidth: 20},
                    6: {cellWidth: 25},
                    7: {cellWidth: 25},
                    8: {cellWidth: 18},
                    9: {cellWidth: 18},
                    10: {cellWidth:18}
                   // 11: {cellWidth: 14}
                   
                }
            }
            )

            /* Output .pdf file */
            doc.save('EquipmentReport' + generateReportDate('filename') + '.pdf')  
            
        }
    else if (viewType === 'normal'){
        /* Generate autoTable with custom column widths */
        doc.autoTable({
            columns:columns.map(col=>({...col,dataKey:col.field})),
            body:equipment_array,
            styles: {fontSize: 9}
        }
        )

        /* Output .pdf file */
        doc.save('EquipmentReport' + generateReportDate('filename') + '.pdf')
    }
    }



    return(
        <div style={{ maxWidth: '100%',paddingTop:'25px' }}>
         {<UpdateStatusPopup openPopup={openPopup} setOpenPopup={setOpenPopup}  handleUpdate={handleUpdate} rowData={rowData} setSnackBar={setSnackBar}/>} 
        {<Snackbar open={snackBar.open} anchorOrigin={{vertical:'top',horizontal:'center'}} autoHideDuration={3000} onClose={()=>setSnackBar({open:false,message:'',severity:''})}></Snackbar>}
            {editable[tabs] || equipmentTabs[tab_idx].id == "excess_equipment" ? 
            {rights.edit[tabs] || equipmentTabs[tab_idx].id == "excess_equipment" ? 
                (<Grid container style={{paddingLeft:'20px', paddingTop:'10px', position:'absolute',zIndex:'200',width:'10%'}}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch color="primary" checked={switches[tab_idx].checkedView} onChange={handleSwitchesChange} name={`checkedView-${tab_idx}`} />}
                            label={switches[tab_idx].checkedView ? "Extended View" : "Normal View"}
                        />
                    </FormGroup>
                </Grid>) : null}
            <MaterialTable
            icons={tableIcons}
            columns={columns}
            data={equipments[tab_idx]}
            localization={{
                toolbar: {
                searchPlaceholder: "Filter Search"
                }}}
            // Add custom show/hide filter button to material table toolbar
            components={{   
                Toolbar: props =>(
                    <>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
                        {showFilter[tab_idx] ? (
                            <Button variant="outlined" size="small" color="primary" onClick={()=>setShowFilter({...showFilter, [tab_idx]: false})}>Hide Filters</Button>
                        ) : (
                            <Button variant="contained" size="small" color="primary" onClick={()=>setShowFilter({...showFilter, [tab_idx]: true})}><><SearchIcon/> Show Filters</> </Button>
                        )	
                        }	
                    </div>
                    <MTableToolbar {...props} />
                    </div>
                    </>
                )
            }}
            options={{
                exportMenu:[
                    {
                        label: 'Export PDF',
                        exportFunc: (columns, eqs) => switches[tab_idx].checkedView ? downloadPdf(columns, eqs, 'extended'): downloadPdf(columns,eqs,'normal')
                      }, {
                        label: 'Export CSV',
                        exportFunc: (columns, eqs) => ExportCsv(columns, eqs, 'EquipmentReport' + generateReportDate('filename'))
                      }
                ],
                filtering:showFilter[tab_idx],
                search:false,
                exportAllData: true,
                headerStyle: {
                backgroundColor: "#969696",
                color: "#FFF",
                fontWeight: 'bold',
            }
            }}
            title=""
            {...(rights.edit[tabs] && {editable:{
                onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
                onRowAdd: async (newData) => {
                let errorFound = await handleAdd({changes:{'0':{newData:newData, oldData:null}}})

                    return (new Promise((resolve, reject) => {
                        setTimeout(() => {
                          if(errorFound){
                              reject();
                              return;
                          }

                          resolve();
                        }, 1000);
                    }))
                    },
                onRowUpdate: async (newData, oldData) => {
                let errorFound = await handleUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
                    return (new Promise((resolve, reject) => {
                        setTimeout(() => {  
                          if(errorFound){
                              reject();
                              return;
                          }

                          resolve();
                        }, 1000);
                    }))
                },
                // onRowDelete: async (newData, oldData) => {
                //   let errorFound = await handleDelete({changes:{'0':{newData:newData, oldData:oldData}}})
                //       return (new Promise((resolve, reject) => {
                //           setTimeout(() => {  
                //             if(errorFound){
                //                 reject();
                //                 return;
                //             }
  
                //             resolve();
                //           }, 1000);
                //       }))
                //   },

            }})}
           >
    </div>
    )
  }

  const AlertUser = (x) => {

    console.log('alert user activated')

    if(x.error.active){
      return(<Alert variant="filled" severity="error">{x.error.text}</Alert>)
    }else if(x.success.active){
      return(<Alert variant="filled" severity="success">{x.success.text}</Alert>)
    }

    //Sucessfully added data to database!

    setAlertUser(ALERT.RESET)
    return(null)
  }

  //Render Variables
	const searchTextFieldsGridItems = (tab) => Object.keys(searchFields[tab]).map(key => {
		const nFields = Object.keys(searchFields[tab]).length
		const w = windowSize.width*.75 / nFields > 150 ? windowSize.width*.75 / nFields : 150
    return(	
      <>
        <Grid item xs={Math.floor(12/nFields)}>     
          <Typography noWrap>{`Search ${searchFields[tab][key].label}`}</Typography>        
          <TextField
            id={`outlined-search-${key}`}
            key={`outlined-search-${key}`}
            name={key} 
            type="search" variant="outlined" 
            value={searchFields[tab][key].value} 
            onChange={handleSearchFieldsChange}
            onKeyPress={handleSearchKeyPress}
            style={{width:w,paddingRight:'50px'}}
            //InputLabelProps={{style: {fontSize: '.7vw'}}}
            //InputProps={{
              //readOnly: disableSearchFields,
              //shrink: false
                  //}}
            //{...(searchFields[key].value != null && {style:{width:searchFields[key].width}})}
          />
          { searchFields[tab][key].value && searchView[tab] !== BASIC_SEARCH ? SearchCriteriaOptions(tab, key, `${searchFields[tab][key].label} Options`) : 
           !searchFields[tab][key].value && searchView[tab] !== BASIC_SEARCH ? SearchBlanksOptions(tab, key, `${searchFields[tab][key].label}`) : null
          }
        </Grid> 
      </>
    )
	});

	const searchButtonGridItem = (tab) => { 
		return(
			<Grid item style={{textAlign:'left',paddingTop:'35px'}}  xs={Math.floor(12/(Object.keys(searchFields[tab]).length))}>
				<IconButton id={`search-${tab}`} key={`search-${tab}`} name={tab} aria-label="search" color="primary" onClick={handleSearch}>
					<SearchIcon style={{ fontSize: 40 }}/>
				</IconButton>
			</Grid>)
	}

  const displayTop = (
      <div style={{textAlign: 'center'}}>
        <h2>Equipment</h2>     
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
    console.log(equipments)
  }, [equipments]);

  // React.useEffect(() => {
	// 	if(history.action == "PUSH"){
	// 		reloadPage()
	// 	}
	// }, [history.action]);
  
  React.useEffect(() => {
		console.log(hras)
	}, [hras]);

  React.useEffect(() => {
		if(tabs == 3 && equipments[tabs].length == 0){
      handleSearch()
    }
	}, [tabs]);

  //Render return.
  return (
    <>
    <div>
      {displayTop}
      {alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
      {!loading.init ? TabsEquipment() : <div style={{textAlign:'center'}}>{LoadingCircle()}</div>}
    </div>
    </>
  );
}

export default connect(
  'selectUserToken',
  Equipment);