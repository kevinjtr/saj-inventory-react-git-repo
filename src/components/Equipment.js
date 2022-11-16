
import React, {useState, useEffect, useRef} from 'react';
import MapWrapper from "./MapWrapper"

import { Snackbar, Box, AppBar, Tabs, Tab, Switch, Typography, TextField,
   MenuItem, FormControl, Select,FormGroup,FormControlLabel,Button,IconButton,
  Tooltip,Radio,RadioGroup,Grid, Link, Alert, Autocomplete as AutocompleteV5, InputAdornment, DatePicker} from '@mui/material';
import {List as ListIcon, LocationOn as LocationOnIcon, Search as SearchIcon, Computer as ComputerIcon,
  FilterList as FilterListIcon, Clear as ClearIcon, Event as EventIcon} from '@mui/icons-material';
import {textFieldClasses, gridClasses, TabPanel, a11yProps, tabClasses} from './styles/mui';
import {find} from "lodash"
import { v4 as uuid } from 'uuid';
import * as XLSX from 'xlsx'
import moment from "moment"
//import SearchIcon from '@material-ui/icons/Search';
//import ComputerIcon from '@material-ui/icons/Computer';

//import { Link } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';

// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

// import Switch from '@material-ui/core/Switch';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Autocomplete} from '@material-ui/lab';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Grid from '@material-ui/core/Grid';


import MaterialTable, {MTableToolbar,MTableBody} from '@material-table/core'
import { ExportCsv } from '@material-table/exporters';
import {tableIcons} from './mui/config'
//import {texFieldStyles, gridStyles, TabPanel, a11yProps, tabStyles} from './styles/material-ui';

import 'date-fns';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {getQueryStringParams,LoadingCircle,contains,TextMaskCustom,NumberFormatCustom, numberWithCommas,openInNewTab} from './tools/tools'
import { useDimensions } from "./tools/useDimensions";
import {SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, EQUIPMENT, AVD_SEARCH, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT, condition} from './config/constants'


import {orderBy, findIndex, filter, debounce} from 'lodash'
//Styles Import

import {updateEquipmentApi, destroyEquipmentApi, addEquipmentApi, equipmentSearchApi2} from '../publics/actions/equipment-api'
import { connect } from 'redux-bundler-react';
import {ALERT} from './tools/tools'

import UpdateStatusPopup from './UpdateStatusPopup';
import { viVN } from '@mui/material/locale';



// const dialogStyles = makeStyles(theme => ({
//   dialogWrapper: {
//     padding: theme.spacing(2),
//     position:'absolute',
//     top: theme.spacing(5)
//   },
//   dialogTitle: {
//     paddingRight:'0px'
//   }
// }))

function Equipment({history, location, match, userToken}) {
  
  //Constants Declarations.
  const search = getQueryStringParams(location.search)
  const PAGE_URL = `/${EQUIPMENT}`
  const [{ height, width }, ref] = useDimensions();
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const refs = useRef({ ref0, ref1, ref2, ref3, ref4 });

  const [filteredEquipments, setFilteredEquipments] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: []
  })

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
  //const textFieldClasses = texFieldStyles();
  //const classesItemMenu = itemMenuStyles();
  //const classesPhoneTextField = phoneTextFieldStyles();
  //const gridClasses = gridStyles();
  // const avatarClasses = AvatarStyles();
  // const plusButtonClasses = plusButtonStyles();
  // const PlusButtonTheme = createTheme({
  //   palette: {
  //     primary: green,
  //   },
  // });
  //const classDialog = dialogStyles();
  //const tabClasses = tabStyles();
  //const StepClasses = stepStyles();

  //Hooks Declarations.
  const [searchFields, setSearchFields] = useState({
    0: SEARCH_FIELD_RESET,
    1: SEARCH_FIELD_RESET,
    2: SEARCH_FIELD_RESET,
    3: SEARCH_FIELD_RESET,
    4: SEARCH_FIELD_RESET,
  })
  const [searchView, setSearchView] = useState({
    0: BASIC_SEARCH,
    1: BASIC_SEARCH,
    3: BASIC_SEARCH,
    4: BASIC_SEARCH,
  });
	const [windowSize, setWindowSize] = useState({
	width: undefined,
	height: undefined,
	});
  const [alertUser, setAlertUser] = useState(ALERT.RESET);
  const [loading, setLoading] = useState({init:true,refresh:{
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  }});
  const [equipments, setEquipments] = useState({
      0: [],
      1: [],
      2: [],
      3: [],
      4: []
    });
  const [editable,setEditable] = useState({
    0:false,
    1:false,
    2:false,
    3:false,
    4:false,
  })
  const [rights, setRights] = useState({
    0:{view: false, edit:false},
    1:{view: false, edit:false},
    2:{view: false, edit:false},
    3:{view: false, edit:false},
    4:{view: false, edit:false},
  })
  const [tabs, setTabs] = useState(0);
  const [switches, setSwitches] = useState({
      0: SWITCH_RESET,
      1: SWITCH_RESET,
      2: SWITCH_RESET,
      3: SWITCH_RESET,
      4: SWITCH_RESET,
    });
  const [hras, setHras] = useState([]);
  const [my_hras, setMyHras] = useState([]);
	const [employees, setEmployees] = useState([]);
  const [openPopup,setOpenPopup] =  useState(false);
  const [selRowData, setSelRowData] = useState({});
  let [snackBar,setSnackBar] = useState({open:false,message:'',severity:'warning'});
  const [serverDown, setServerDown] = useState(false);
  const [viewSwitch, setViewSwitch] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("view-switch");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
});
  const [mapFilters, setMapFilters] = useState([]);

  // state variable for showing/hiding column filters in material table
    const [showFilter,setShowFilter] = useState({
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
        //setFilteredEquipments(data.data[tabs])
        setEquipments(data.data)
        setHras(data.hras)
        setMyHras(data.my_hras)
        setEmployees(data.employees)
      }

      setLoading({...loading,init:false})

    }).catch(function (error) {
      setServerDown(true)
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
        <form className={textFieldClasses.root} noValidate autoComplete="off">
          <div className={gridClasses.options}>
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

  const MaterialTableSelect = React.forwardRef((props,ref) => {
    const {columns, equipmentArray} = props
    const tab_idx = tabs
    const [f, setF] = useState([...equipmentArray])

    // useEffect(() => {
    //     setFilteredEquipments({...filteredEquipments,[tabs]:f})
    // },[f])

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

    const downloadExcel = (arrayOfObjects, name="exported_doc", ignore=[]) => {
      const newData = arrayOfObjects.map(row=>{
        delete row.tableData
        ignore.map(x => {
          delete row[x]
        })
        return row
      })
      const workSheet=XLSX.utils.json_to_sheet(newData)
      const workBook=XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workBook,workSheet,"Sheet 1")
      //Buffer
      let buf = XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
      //Binary string
      XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
      const report_date = generateReportDate('filename')
      //Download
      XLSX.writeFile(workBook,`${name} ${report_date}.xlsx`)
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
                        if(col.field =="employee_office_location_name")
                            col.title = "Emp Office Loc"
                    }
                );

            var printEquipments = equipment_array.map(function(x) {
                let hraLetter = x["hra_first_name"] ? x["hra_first_name"].charAt(0) + ". " : ""

                let firstName = x.employee_first_name ? x.employee_first_name + " " : ""
                let lastName = x.employee_last_name ? x.employee_last_name : ""
                let employeeFullName = firstName.charAt(0) + ". " + lastName

                let mfgr = x.manufacturer ? x.manufacturer + " " : ""
                let model = x.model ? x.model : ""
                let mfgrModel = mfgr + model

                const idx = findIndex(condition,function(c){ return c.id == x.condition})
                let status_date = x.status_date ? ` [${moment(status_date).format("MM/DD/YY hh:mmm:ss")}]` : ""
                let status_and_date = x.status ? `${x.status}${status_date}` : ""

                return { 
                    acquisition_date: x.acquisition_date,
                    hra_num: x.hra_num,
                    hraLetterName: hraLetter + x["hra_last_name"],
                    item_type: x.item_type,
                    bar_tag_num: x.bar_tag_num,
                    employee_id: x.employee_id,
                    employeeFullName: employeeFullName,
                    acquisition_price:x.acquisition_price,
                    catalog_num: x.catalog_num,
                    serial_num: x.serial_num,
                    mfgrModel: mfgrModel,
                    condition: idx != -1 ? condition[idx].alias : x.condition,
                    status: status_and_date,
                    employee_office_location_name: x.employee_office_location_name ? x.employee_office_location_name : ""
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
        <Box sx={{ paddingTop:'25px' }}>
          {!viewSwitch ? <MapWrapper equipments={[...f]}/> : null}
        {<Snackbar open={snackBar.open} anchorOrigin={{vertical:'top',horizontal:'center'}} autoHideDuration={3000} onClose={()=>setSnackBar({open:false,message:'',severity:''})}></Snackbar>}
            {/* {editable[tabs] || equipmentTabs[tab_idx].id == "excess_equipment" ?  */}
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
            tableRef={ref}
            onOrderChange={() => {
                setF(ref.current.state.data)
            }}
            onFilterChange={() => {
                setF(ref.current.state.data)
            }}
            icons={tableIcons}
            columns={columns}
            data={equipmentArray}
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
                ),
            }}

            options={{
                exportMenu:[
                    {
                        label: 'Export to PDF',
                        exportFunc: (columns, eqs) => switches[tab_idx].checkedView ? downloadPdf([...columns], [...eqs], 'extended'): downloadPdf([...columns],[...eqs],'normal')
                      }, {
                        label: 'Export to CSV',
                        exportFunc: (columns, eqs) => ExportCsv([...columns], [...eqs], 'EquipmentReport' + generateReportDate('filename'))
                      }, {
                        label: 'Export to Excel',
                        exportFunc: (columns, eqs) => downloadExcel([...eqs],"EquipmentReport",["update_status"])
                      }
                ],
                filtering:showFilter[tab_idx],
                search:false,
                exportAllData: true,
                headerStyle: {
                backgroundColor: "#969696",
                color: "#FFF",
                fontWeight: 'bold',
                tableLayout: 'fixed'
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
           />
    </Box>
    )
  })

  const CustomDatePicker = (props) => {
    const [date, setDate] = useState("");
    const handleClearClick = () => {
      props.onFilterChanged(props.columnDef.tableData.id, null);
      setDate("");
    };

    return (
      <TextField
        variant="standard"
        format="dd/MM/yyyy"
        value={date}
        ampm
        autoOk
        allowKeyboardControl
        style={{ width: 150 }}
        onChange={(event) => {
          setDate(event.target.value);
          props.onFilterChanged(props.columnDef.tableData.id, event.target.value ? new Date(event.target.value) : null);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FilterListIcon />
            </InputAdornment>
          ),
          endAdornment: <IconButton fontSize="small" sx={{visibility: date? "visible": "hidden"}} onClick={handleClearClick}><ClearIcon fontSize="small"/></IconButton>
        }}
      />
    );
  };

  const CustomFilterTextField = (props) => {
    const [text, setText] = useState("");
    
    const handleClearClick = () => {
      props.onFilterChanged(props.columnDef.tableData.id, null);
      setText("");
    };

    return (
      <TextField
        variant="standard"
        value={text}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FilterListIcon />
            </InputAdornment>
          ),
          endAdornment: <IconButton fontSize="small" sx={{visibility: text? "visible": "hidden"}} onClick={handleClearClick}><ClearIcon fontSize="small"/></IconButton>
        }}
        style={{ width: 125 }}
        onChange={(event) => {
          console.log(event.target.value)
          setText(event.target.value);
          props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
        }}

      />

    );
  };

  const TabsEquipment = React.forwardRef((props, ref) => {
    const { ref0, ref1, ref2, ref3, ref4 } = ref.current;
    const tab_idx = tabs
    const equipmentArray = equipments[tab_idx]
    const isHraTab = equipmentTabs[tab_idx].id == "my_hra_equipment"
    const hras_array = isHraTab ? my_hras : hras
    let columns = []

    const equipment_cols_config = [
        { title: 'HRA Number', field: 'hra_num', type:'numeric', col_id:2.0, filterComponent: (props) => <CustomFilterTextField {...props} />,
        editComponent: props => (
        <AutocompleteV5
              value={props.value ? find(hras_array,function(h){ return h.hra_num == props.value}) : null}
              onChange={(e, nv) => { 
                if(nv){
                  if(nv.hasOwnProperty('hra_num')){
                      props.onChange(nv.hra_num) 
                    return;
                  }
                }
                props.onChange(nv)
              }}
              key={`combo-box-${uuid()}`}
              options={hras_array}
              getOptionLabel={(option) => option.hra_num + ' - ' + (option.hra_first_name ? option.hra_first_name + ' ' : '') + option.hra_last_name}
              style={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="HRA" variant="outlined" />}
          />),
          validate: (rowData) => {
              if(rowData.hasOwnProperty('hra_num')){
                  if(!isNaN(rowData.hra_num)) {
                    if(rowData.hra_num){
                      const idx = findIndex(hras_array,function(e){ return (e.hra_num && (e.hra_num == rowData.hra_num)); })
                      return idx != -1
                    }
                  }
              }
    
              return true
          }
        // editComponent: (x) => {
        // //console.log(x);
        // let idx = -1
    
        // if(x.rowData.hra_num){
        //     idx = findIndex(hras_array,function(e){ return (e.hra_num && (e.hra_num == x.rowData.hra_num)); })
        // }
    
        // return(
        //     <Autocomplete
        //     //onChange={e => x.onChange(e)}
        //     id={`combo-box-employee`}
        //     //size="small"
        //     //style={{width:'80%'}}
        //     options={hras_array}
        //     getOptionLabel={(option) => option.hra_num + ' - ' + (option.hra_first_name ? option.hra_first_name + ' ' : '') + option.hra_last_name}
        //     value={idx != -1 ? hras_array[idx] : null}
        //     //defaultValue={idx != -1 ? employees[idx] : null}
        //     onChange ={e => {
        //     const hraNum_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
        //     console.log(hraNum_);
        //     x.onChange(hraNum_)
        //     }}
        //     //style={{ verticalAlign: 'top' }}
        //     renderInput={(params) => <TextField {...params} label="HRA" margin="normal"/>}
        //     renderOption={(option) => <a style={{fontSize:'16px'}}>{option.hra_num + ' - ' + (option.hra_first_name ? option.hra_first_name + ' ' : '') + option.hra_last_name}</a>}
        // />
        // )
        // },
      //   validate: (rowData) => {
      //     if(rowData.hasOwnProperty('hra_num')){
      //         if(!isNaN(rowData.hra_num)) {
      //           if(rowData.hra_num){
      //             const idx = findIndex(hras_array,function(e){ return (e.hra_num && (e.hra_num == rowData.hra_num)); })
      //             return idx != -1
      //           }
      //         }
      //     }

      //     return ({ isValid: false, helperText: 'Hra Num  is required.' })
      // }
        },
        { title: 'HRA First', field: 'hra_first_name', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:2.1,editable: 'never' },
        { title: 'HRA Last', field: 'hra_last_name', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:2.2,editable: 'never' },
        { title: 'Item Description', field: 'item_type', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:4  },
        { title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:5, validate: (rowData) => {
            if(rowData.hasOwnProperty('bar_tag_num')){
                if(!isNaN(rowData.bar_tag_num)) {
                    if(typeof rowData.bar_tag_num === "number"){
                        if(rowData.bar_tag_num.toString().length > 5){
                            return ({ isValid: false, helperText: 'Bar Tag digits exceed 5.' })
                        }else{
                            const idx = findIndex(equipmentArray,e => e.bar_tag_num == rowData.bar_tag_num)
                            const propTableData = rowData.hasOwnProperty('tableData')//exists: editing, not exists: adding.

                            if(propTableData && idx != -1){
                                if(rowData.id != equipmentArray[idx].id){
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
        { title: 'Employee First', field: 'employee_first_name', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:6.1 ,editable: 'never' },
        { title: 'Employee Last', field: 'employee_last_name', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:6.2,editable: 'never'  },
        { title: 'Employee Office Location', field: 'employee_office_location_name', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:6.3,editable: 'never'  },
        {title: 'Status', field:'status', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:6.4,editable: 'no' },
        {title: 'Status Date', field:'status_date', type:'date', filterComponent: (props) => <CustomDatePicker {...props} />, col_id:6.4,editable: 'no' },
        [0,1,2].includes(tab_idx) ? {title: 'Update Status', field:'update_status', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:6.5,editable: 'yes', render: (rowData) => <Link underline="always" component="button" onClick={()=>{console.log(rowData); setSelRowData(rowData); setOpenPopup(true); }}>Update</Link>}: {}
    ] 
   // tab_idx === 0 || tab_idx === 1 ? {title: 'Status', field:'status', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:6.4,editable: 'no' } : {},
    //tab_idx === 1 ? {title: 'Status Date', field:'status_date', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:6.4,editable: 'no' } : {},

    const ext_equipment_cols_config = [		
        // {title: 'HRA Employee ID', field: 'hra_employee_id',editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:2.3 },
        { title: 'Employee Holder ID', field: 'employee_id', type:'numeric', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:6.0, width:"200px",
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
        {title:'Acquisition Date',field:'acquisition_date',  type: 'date', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:1},
        {title:'Acquisition Price',field:'acquisition_price',type: 'numeric', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:7},
        {title:'Catalog Num',field:'catalog_num', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:8},
        {title:'Serial Num',field:'serial_num', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:9},
        {title:'Manufacturer',field:'manufacturer', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:10},
        {title:'Model',field:'model', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:11},
        {title:'Condition',field:'condition', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:12,  editComponent: (x) => {
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
    

    if(editable) ext_equipment_cols_config.push({title:'Updated By', filterComponent: (props) => <CustomFilterTextField {...props} />, col_id:13,field:'updated_by_full_name',editable:'never' })

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
          {!loading.init ? <MaterialTableSelect ref={ref0} columns={[...columns]} equipmentArray={[...equipmentArray]}/> : null}
        </TabPanel>
        <TabPanel value={tabs} index={1}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[1] ? LoadingCircle() : null} </div>
          {!loading.init ? <MaterialTableSelect ref={ref1} columns={[...columns]} equipmentArray={[...equipmentArray]}/> : null}
        </TabPanel>
        <TabPanel value={tabs} index={2}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[2] ? LoadingCircle() : null} </div>
          {!loading.init ? <MaterialTableSelect ref={ref2} columns={[...columns]} equipmentArray={[...equipmentArray]}/> : null}
        </TabPanel>
        <TabPanel value={tabs} index={3}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[3] ? LoadingCircle() : null} </div>
          {!loading.init ? [searchForm(3), <MaterialTableSelect ref={ref3} columns={[...columns]} equipmentArray={[...equipmentArray]}/>] : null}
        </TabPanel>
        <TabPanel value={tabs} index={4}>
          <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[4] ? LoadingCircle() : null} </div>
          {!loading.init ? [searchForm(4), <MaterialTableSelect ref={ref4} columns={[...columns]} equipmentArray={[...equipmentArray]}/>] : null}
        </TabPanel>
      </div>
    );
  })

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
		const w = width*.75 / nFields > 150 ? width*.75 / nFields : 150
    return(	
      <>
        <Grid item xs={Math.floor(12/nFields)}>     
        <Tooltip title={`Search ${searchFields[tab][key].label}`}>
        <Typography noWrap>{`Search ${searchFields[tab][key].label}`}</Typography>    
        </Tooltip>
          
          <Tooltip title={`Search ${searchFields[tab][key].label}`}>
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
          </Tooltip>
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
      <div style={{display:"flex", justifyContent:"center"}}>
        <h2>Equipment</h2>
        <Box sx={{position:'absolute',top:"75px",right:"20px",spacing:1}}>
          <Button
          onClick={() => setViewSwitch(prev => !prev)}
          startIcon={<ListIcon/>} 
          disabled={viewSwitch}
          sx={{
            '& .MuiButton-startIcon': {
              //color: active ? 'success.light' : 'text.secondary',
              paddingLeft:1
            },
            '&:disabled': {
              //cursor:"default",
              //backgroundColor: "#555",//'rgba(255,255,255, 0.08)',
              color:"background.default",
              backgroundColor: "action.active",
              // '& .MuiButton-startIcon': {
              //   color: 'text.primary',
              // },
            },
            '&:focus': {
              outline: 'none',
            },
            height: "36px",
            width: "85px",
            fontSize:"12px",
            color:"text.primary",
            outlineColor: "#555",
            border:"1px solid",
            borderTopLeftRadius: "18px",
            borderBottomLeftRadius: "18px",
            borderRight: "1px",
            padding: "0px 12px 0 12px",
          }}>
            Table
          </Button>
          <Button
          onClick={() => setViewSwitch(prev => !prev)}
          disabled={!viewSwitch}
          startIcon={<LocationOnIcon/>} 
          sx={{
            '&:disabled': {
              //cursor:"default",
              //backgroundColor: "#555",//'rgba(255,255,255, 0.08)',
              color:"background.default",
              backgroundColor: "action.active",
              // '& .MuiButton-startIcon': {
              //   color: 'text.primary',
              // },
            },
            '&:focus': {
              outline: 'none',
            },
            paddingLeft:"5px",
            color:"text.primary",
            height: "36px",
            width: "85px",
            fontSize:"12px",
            outlineColor: "#555",
            border:"1px solid",
            borderTopRightRadius: "18px",
            borderBottomRightRadius: "18px",
            borderLeft: "1px",
            padding: "0px 12px 0 12px"
          }}>
              Map
          </Button>
        </Box>
      </div>
  )

  const disableFields = {
    PBO: true,
    logistics: true,
    HRA: false,
    user: false
  }

  //will run once.
  useEffect(() => {

    // function handleResize() {
    //   // Set window width/height to state
    //   setWindowSize({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //   });
    // }

    pageInitialize();
    
    // Add event listener
    //window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    //handleResize();

    // Remove event listener on cleanup
    //return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  // }, [equipments]);

  // useEffect(() => {
	// 	if(history.action == "PUSH"){
	// 		reloadPage()
	// 	}
	// }, [history.action]);
  
  useEffect(() => {
		console.log(hras)
	}, [hras]);

  useEffect(() => {
		if(tabs == 3 && equipments[tabs].length == 0){
      handleSearch()
    }

    //setFilteredEquipments(equipments[tabs])
	}, [tabs]);

  useEffect(() => {
    localStorage.setItem('view-switch', viewSwitch);
}, [viewSwitch]);

  //Render return.
  return (
    <>
    <div>
      {displayTop}
      <Box sx={{display:'flex',flex:'auto'}}>
      {openPopup ? <UpdateStatusPopup openPopup={openPopup} setOpenPopup={setOpenPopup}  handleUpdate={handleUpdate} rowData={selRowData} setSnackBar={setSnackBar} equipments={equipments} setEquipments={setEquipments} setAlertUser={setAlertUser}/> : null} 
      <Box ref={ref} sx={{width: "100%"}}>
        {alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
        {!loading.init ? !serverDown ? <TabsEquipment ref={refs} />: null : <div style={{textAlign:'center'}}>{LoadingCircle()}</div>}
      </Box>
      </Box>
    </div>
    </>
  );
}

export default connect(
  'selectUserToken',
  Equipment);