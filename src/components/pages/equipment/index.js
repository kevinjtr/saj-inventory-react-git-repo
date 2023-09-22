
import React, {useState, useEffect, useRef, useCallback} from 'react';
import MapWrapper from "./MapWrapper"
import { Snackbar, Box, AppBar, Tabs, Tab, Switch, Typography, TextField, Icon,
   MenuItem, FormControl, Select,FormGroup,FormControlLabel,Button,IconButton,
  Tooltip,Radio,RadioGroup,Grid, Link, Autocomplete, InputAdornment, DatePicker} from '@mui/material';
import {List as ListIcon, LocationOn as LocationOnIcon, Search as SearchIcon, Computer as ComputerIcon,
  FilterList as FilterListIcon, Clear as ClearIcon, Event as EventIcon} from '@mui/icons-material';
import {textFieldClasses, gridClasses, TabPanel, a11yProps, tabClasses} from '../../styles/mui';
import {find} from "lodash"
import { v4 as uuid } from 'uuid';
import * as XLSX from 'xlsx'
import moment from "moment"
import MaterialTable, { MTableToolbar, MTableBody, MTableAction } from '@material-table/core'
import EquipmentMuiTable from '../../material-table/equipment-mui-table'
import {tableIcons} from '../../mui/config'
import 'date-fns';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {getQueryStringParams,LoadingCircle, generateReportDate, contains,TextMaskCustom,NumberFormatCustom, numberWithCommas,openInNewTab, CustomFilterTextField} from '../../tools/tools'
import { useDimensions } from "../../tools/useDimensions";
import {SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, EQUIPMENT, AVD_SEARCH, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT, condition} from '../../config/constants'
import {orderBy, findIndex, filter, debounce} from 'lodash'
import {updateEquipmentApi, destroyEquipmentApi, addEquipmentApi, equipmentSearchApi2} from '../../../publics/actions/equipment-api'
import {getChangeHistoryByTableApi} from '../../../publics/actions/change-history-api'
import { connect } from 'redux-bundler-react';
import UpdateStatusPopup from './UpdateStatusPopup';
import AddCommentIcon from '@mui/icons-material/AddComment';
import toast from 'react-hot-toast';
import ChangeHistoryButton from '../../history'
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddIcon from '@mui/icons-material/Add';
import CustomExportButton from '../../../components/material-table/custom-export-button'

function Equipment(props) {
  const {history, location, match, serverDown, userToken, filteredDataRows, doSetFilteredDataRows, doSearchEquipmentTab, initialLoad, loading, rights, editable, myHras, hras, employees, equipments, doSetEquipments, doGetAllEquipmentTabsInitialLoad} = props
  //Constants Declarations.
  const search = getQueryStringParams(location.search)
  const PAGE_URL = `/${EQUIPMENT}`
  const [{ height, width }, ref] = useDimensions();
  const ref0 = useRef(MaterialTable)
  const ref1 = useRef(MaterialTable)
  const ref2 = useRef(MaterialTable)
  const ref3 = useRef(MaterialTable)
  const ref4 = useRef(MaterialTable)
  const refs = useRef({ ref0, ref1, ref2, ref3, ref4 });

  const [filteredEquipments, setFilteredEquipments] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: []
  })

  const equipmentTabs = {0: {id:'my_equipment', label:'My Equipment'}, 1: {id:'my_hra_equipment', label:'My HRA Equipment'}, 2: {id:'hra_equipment', label:'Authorized HRA Equipment'}, 3: {id:'all_equipments', label:'All Equipments'}, 4: {id:'excess_equipment', label:'Excess Equipment'}}
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
  

  //Styles Declarations.


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
  //const [initialLoad, setInitialLoad] = useState(true)
  // const [loading, setLoading] = useState({
  //   0: false,
  //   1: false,
  //   2: false,
  //   3: false,
  //   4: false,
  // });
  // const [equipments, setEquipments] = useState({
  //     0: [],
  //     1: [],
  //     2: [],
  //     3: [],
  //     4: []
  //   });
  // const [editable,setEditable] = useState({
  //   0:false,
  //   1:false,
  //   2:false,
  //   3:false,
  //   4:false,
  // })
  // const [rights, setRights] = useState({
  //   0:{view: false, edit:false},
  //   1:{view: false, edit:false},
  //   2:{view: false, edit:false},
  //   3:{view: false, edit:false},
  //   4:{view: false, edit:false},
  // })
  const [tabs, setTabs] = useState(0);
  const [switches, setSwitches] = useState({
      0: SWITCH_RESET,
      1: SWITCH_RESET,
      2: SWITCH_RESET,
      3: SWITCH_RESET,
      4: SWITCH_RESET,
    });
  //const [hras, setHras] = useState([]);
  //const [my_hras, setMyHras] = useState([]);
	//onst [employees, setEmployees] = useState([]);
  let [snackBar,setSnackBar] = useState({open:false,message:'',severity:'warning'});
  // const [serverDown, setServerDown] = useState(false);
  const [viewSwitch, setViewSwitch] = useState(() => {
    // getting stored value
    const saved = window.localStorage.getItem("view-switch");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
});
  const [openChangeHistory, setMapFilters] = useState([]);

  // state variable for showing/hiding column filters in material table

        //Render Variables
	// const searchTextFieldsGridItems = (tab) => Object.keys(searchFields[tab]).map(key => {
	// 	const nFields = Object.keys(searchFields[tab]).length
	// 	const w = width*.75 / nFields > 150 ? width*.75 / nFields : 150
  //   return(	
  //     <>
  //       <Grid item xs={Math.floor(12/nFields)}>     
  //       <Tooltip title={`Search ${searchFields[tab][key].label}`}>
  //       <Typography noWrap>{`Search ${searchFields[tab][key].label}`}</Typography>    
  //       </Tooltip>
          
  //         <Tooltip title={`Search ${searchFields[tab][key].label}`}>
  //           <TextField
  //             id={`outlined-search-${key}`}
  //             key={`outlined-search-${key}`}
  //             name={key} 
  //             type="search" variant="outlined" 
  //             value={searchFields[tab][key].value} 
  //             onChange={handleSearchFieldsChange}
  //             onKeyPress={handleSearchKeyPress}
  //             style={{width:w,paddingRight:'50px'}}
  //             //InputLabelProps={{style: {fontSize: '.7vw'}}}
  //             //InputProps={{
  //               //readOnly: disableSearchFields,
  //               //shrink: false
  //                   //}}
  //             //{...(searchFields[key].value != null && {style:{width:searchFields[key].width}})}
  //           />
  //         </Tooltip>
  //         { searchFields[tab][key].value && searchView[tab] !== BASIC_SEARCH ? SearchCriteriaOptions(tab, key, `${searchFields[tab][key].label} Options`) : 
  //          !searchFields[tab][key].value && searchView[tab] !== BASIC_SEARCH ? SearchBlanksOptions(tab, key, `${searchFields[tab][key].label}`) : null
  //         }
  //       </Grid> 
  //     </>
  //   )
	// });

	// const searchButtonGridItem = (tab) => { 
	// 	return(
	// 		<Grid item style={{textAlign:'left',paddingTop:'35px'}}  xs={Math.floor(12/(Object.keys(searchFields[tab]).length))}>
	// 			<IconButton id={`search-${tab}`} key={`search-${tab}`} name={tab} aria-label="search" color="primary" onClick={handleSearch}>
	// 				<SearchIcon style={{ fontSize: 40 }}/>
	// 			</IconButton>
	// 		</Grid>)
	// }

  const displayTop = (
      <div style={{display:"flex", justifyContent:"center"}}>
        <h2 style={{paddingBottom: 10}}>Equipment</h2>
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
  
  //Events Declarations.
  const handleUpdate = async (rowData) => {
      let errorFound = true
      await updateEquipmentApi(rowData, userToken)
      .then((response) => response.data).then((data) => {
        const {tabChanges, error} = data
        errorFound = error

        if(error){
          toast.error('Could not complete action')
        }else {
          let equipments_copy = {...equipments}

          for(const tab_number in tabChanges){
            for(const eq_change of tabChanges[tab_number]){
              let equipments_tab_copy = [...equipments_copy[tab_number]]
              const idx = findIndex(equipments_tab_copy,function(eq){return eq.bar_tag_num == eq_change.bar_tag_num})

              if(idx != -1){
                equipments_tab_copy[idx] = eq_change
                equipments_copy = {...equipments_copy,[tab_number]: equipments_tab_copy}
              }
            }
          }

          doSetEquipments(equipments_copy)
          toast.success('Action was completed')
        }        

      }).catch(function (error) {
        console.log(error)
        toast.error('Could not complete action')
      });

      return(errorFound)
  }

  const handleDelete = async (rowData) => {
    let errorFound = true

    await destroyEquipmentApi(rowData, userToken).then((response) => response.data).then((data) => {
        const {tabChanges, error} = data
        errorFound = error

        if(error){
          toast.error('Could not complete action')
        }else {
          let equipments_copy = {...equipments}

          for(const tab_number in tabChanges){
            for(const eq_change of tabChanges[tab_number]){
              let equipments_tab_copy = [...equipments_copy[tab_number]]

              equipments_tab_copy = filter(equipments_tab_copy,function(eq){return eq.bar_tag_num != eq_change.bar_tag_num})
              equipments_copy = {...equipments_copy,[tab_number]: equipments_tab_copy}
            }
          }

          doSetEquipments(equipments_copy)
          toast.success('Action was completed')
        }
      
    }).catch(function (error) {
        console.log(error)
        toast.error('Could not complete action')
    });

    return errorFound
  }

  const handleAdd = async (rowData) => {
  let errorFound = true

  await addEquipmentApi(rowData, userToken).then((response) => response.data).then((data) => {
    const {tabChanges, error} = data
    errorFound = error

    if(error){
      toast.error('Could not complete action')
    }else {
      let copy_equipments = {...equipments}

      for(const tab_number in tabChanges){
        for(const eq_change of tabChanges[tab_number]){
            copy_equipments = {...copy_equipments,[tab_number]: [eq_change,...copy_equipments[tab_number]]}
        }
      }

      doSetEquipments(copy_equipments)

      toast.success('Action was completed')
    }

  }).catch(function (error) {
    console.log(error)
    toast.error('Could not complete action')
  });

  return errorFound

  }

	const handleSearchFieldsChange = (event) => {
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
    //setLoading({...loading, [tabs]: true})
    //setLoading({...loading, refresh: {...loading.refresh, [tabs]: true}})
  
    // let opts = {
    //   includes: {},
    //   blanks: {}
    // }
  
    // let fields_obj = {}
  
    // Object.keys(searchFields[tabs]).map(key => {
    //   fields_obj[key] = onLoad && search[key] != null ? search[key] : searchFields[tabs][key].value
  
    //   opts.includes[key] = searchView[tabs] != BASIC_SEARCH ? searchFields[tabs][key].options : OPTIONS_DEFAULT
    //   opts.blanks[key] = searchView[tabs] != BASIC_SEARCH ? searchFields[tabs][key].blanks : BLANKS_DEFAULT
    // })
  
    //console.log(fields_obj, opts)

    doSearchEquipmentTab({num: tabs, id: equipmentTabs[tabs].id})
    // let opts = {
    //   includes: {},
    //   blanks: {}
    // }
  
    // let fields_obj = {}
  
    // Object.keys(searchFields[tabs]).map(key => {
    //   fields_obj[key] = onLoad && search[key] != null ? search[key] : searchFields[tabs][key].value
  
    //   opts.includes[key] = searchView[tabs] != BASIC_SEARCH ? searchFields[tabs][key].options : OPTIONS_DEFAULT
    //   opts.blanks[key] = searchView[tabs] != BASIC_SEARCH ? searchFields[tabs][key].blanks : BLANKS_DEFAULT
    // })
  
    // equipmentSearchApi2({
    //   'fields': fields_obj,
    //   'options':opts,
    //   'tab': equipmentTabs[tabs].id
    // }, userToken)
    // .then((response) => response.data).then((data) => {
    //   console.log(data)
    //   //setLoading({...loading, [tabs]: false})
    //   //setLoading({...loading, refresh: {...loading.refresh, [tabs]: false}})
    //   //doSetEquipments({...equipments, [tabs]: data.status != 400 ? data.data[tabs] : []})
    //   //doSetFilteredDataRows({...filteredDataRows, [tabs]: data.data[tabs]})

    // }).catch(function (error) {
    //   //setLoading({...loading, [tabs]: false})
    //   //setLoading({...loading, refresh: {...loading.refresh, [tabs]: false}})
    //   //doSetEquipments({...equipments, [tabs]: []})
    //   //doSetFilteredDataRows({...filteredDataRows, [tabs]: equipments[tabs]})
    // });
  
  }

  const pageInitialize = () => {
    //setInitialLoad(true)
    //setLoading({...loading,init:true})
    doGetAllEquipmentTabsInitialLoad()
    // equipmentSearchApi2({
    //   'fields': {},
    //   'options':OPTS_RESET,
    //   'tab': equipmentTabs[tabs].id,
    //   'init': true
    // }, userToken)
    // .then((response) => response.data).then((data) => {
    //   console.log(data)

    //   doSetEquipmentsInitialLoad(data)
    //   // if(Object.keys(data.editable).length > 0){
    //   //   setEditable(data.editable)
    //   // }

    //   // if(Object.keys(data.rights).length > 0){
    //   //   setRights(data.rights)
    //   // }

    //   // if(data.status == 200){
    //   //   //setFilteredEquipments(data.data[tabs])
    //   //   doSetEquipments(data.data)
    //   //   setHras(data.hras)
    //   //   setMyHras(data.my_hras)
    //   //   setEmployees(data.employees)
    //   // }
    //   setInitialLoad(false)
    //   //setLoading({...loading,init:false})

    // }).catch(function (error) {
    //   setServerDown(true)
    //   setInitialLoad(false)
    //   //setLoading({...loading,init:false})
    //   //doSetEquipments({...equipments, [tabs]: []})
    // });

    //getHrasAndEquipments()
  }
  
  const handleSearchView = (e) => {
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
	// const SearchCriteriaOptions = (tab, val,text="Options") => {

	// 	const menuItems = SEARCH_FIELD_OPTIONS.map(x => {
	// 		return(
	// 			<MenuItem value={x.value}>{x.label}</MenuItem>
	// 		)
	// 	})

	// 	return (
	// 	<div>
	// 			<Typography noWrap>{text}</Typography>
	// 			<Select
	// 				//labelId="demo-simple-select-outlined-label"
	// 				id={`opts-${tab}-${text}`}
	// 				key={`opts-${tab}-${text}`}
	// 				select
	// 				value={searchFields[tab][val].options ? searchFields[tab][val].options : OPTIONS_DEFAULT}
	// 				name={val}
	// 				onChange={handleSearchFieldsOptions}
	// 				style={{width:'80%'}}
	// 				//InputLabelProps={{style: {fontSize: '8vw'}}}
	// 				//label={text}
	// 				variant="outlined"
	// 				>
	// 				{menuItems}
	// 			</Select>
			
	// 	</div>	
	// 	);
	// }

	// const SearchBlanksOptions = (tab, val,text="") => {

	// 	const menuItems = SEARCH_FIELD_BLANKS.map(x => {
	// 		return <MenuItem value={x.value}>{x.label}</MenuItem>
	// 	})

	// 	return (
	// 		<div>
	// 			<Typography noWrap>{text}</Typography>
	// 			<Select
	// 				id={`blanks-${tab}-${text}`}
	// 				key={`blanks-${tab}-${text}`}
	// 				select
	// 				value={searchFields[tab][val].blanks ? searchFields[tab][val].blanks : BLANKS_DEFAULT}
	// 				name={val}
	// 				onChange={handleSearchFieldsBlanks}
	// 				style={{width:'80%'}}
	// 			    //label="Sort By"
	// 				//style={{width:'100%',paddingLeft:'20px'}}
	// 				variant="outlined"
	// 			>
	// 				{menuItems}
	// 			</Select>
	// 		</div>
	// 	);
	// }

  // const searchForm = (tab) => {

  //     return(
  //       <div style={{textAlign: 'center'}}>
  //       <Grid container justifyContent="center">
  //         <Grid>
  //           <FormGroup>
  //             <FormControlLabel
  //               control={<Switch color="primary" id={`switch-${tab}`} key={`switch-${tab}`} checked={switches[tab].showSearch} onChange={handleSwitchesChange} name={`showSearch-${tab}`} />}
  //               label={switches[tab].showSearch ? "Hide Search Fields" : "Show Search Fields"}
  //             />
  //           </FormGroup>
  //         </Grid>
  //       </Grid>
  //       {switches[tab].showSearch ?
  //       <FormControl component="fieldset">
  //         <RadioGroup row aria-label="position" name={tab} id={`radio-group-${tab}`} key={`radio-group-${tab}`} value={searchView[tab]} onChange={handleSearchView}>
  //         <FormControlLabel value="std" control={<Radio color="primary" />} label="Basic Search" />
  //         <FormControlLabel value="adv" control={<Radio color="primary" />} label="Advanced Search" />
  //         </RadioGroup>
  //       </FormControl> : null
  //       }		
  //       {switches[tab].showSearch ?
  //       <div style={{textAlign: 'center'}}>
  //       <form className={textFieldClasses.root} noValidate autoComplete="off">
  //         <div className={gridClasses.options}>
  //         <Grid container spacing={2}>
  //           {searchTextFieldsGridItems(tab)}
  //           {searchButtonGridItem(tab)}
  //         </Grid>
  //         </div>
  //       </form>
  //       </div> : null
  //       }
  //     </div>
  //   )
  // }

  //const { columns, setColumns, toggleSwitch, setToggleSwitch, hras_array } = props
  const [toggleSwitch,setToggleSwitch] =  useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [openPopup,setOpenPopup] =  useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [selRowData, setSelRowData] = useState({
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
  });
  // const [filteredDataRows, setFilteredDataRows] = useState({
  //   0: [],
  //   1: [],
  //   2: [],
  //   3: [],
  //   4: [],
  // });

  const MaterialTableTabs = [0,1,2,3,4].map((t, i) => (
        <TabPanel value={tabs} index={i}>
                    <Box>
        <UpdateStatusPopup index={i} openPopup={openPopup[i]} setOpenPopup={setOpenPopup}  handleUpdate={handleUpdate} rowData={selRowData[i]} setSnackBar={setSnackBar}/>
            {rights?.edit?.[tabs] ? 
                (<Grid container style={{paddingLeft:'20px', paddingTop:'10px', position:'absolute',zIndex:'200',width:'10%'}}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch color="primary" checked={toggleSwitch[i]} onChange={() => setToggleSwitch(prev => ({...prev, [i]: !prev[i] }))} name={`checkedView-${i}`} />}
                            label={toggleSwitch[i] ? "Extended View" : "Normal View"}
                        />
                    </FormGroup>
                </Grid>) : null}
                <EquipmentMuiTable
      exportButton={true}
      tab_id={equipmentTabs[i].id}
      tab_index={i}
      doSearchEquipmentTab={doSearchEquipmentTab}
      equipmentArray={equipments[i]}
      employees={employees}
      condition={condition}
      hras_array={i === 1 ? myHras : hras}
      edit_rights={rights?.edit?.[i]}
      extended_view={toggleSwitch[i]}
      excess={i === 4}
      name={'Equipment'}
      componentName={'equipment'}
      showHistory={true}
      isLoading={loading?.[i]}
      ref={refs.current[`ref${i}`]}
      // components={{
      //   Action: (props, rowData) => {
      //     if (props.action.name === 'change-history') {
      //       return (
      //         <ChangeHistoryButton id={fetchKey ? props.data[fetchKey] : props.data.id} componentName={componentName}/>
      //       )
      //     }
          
      //     if(props.action.name === "export"){
      //         return (<div style={{paddingLeft: 10}}>
      //           <CustomExportButton {...{...ref?.current?.state, table: {name: 'equipment', viewType: toggleSwitch ? 'extended' : 'normal'}}}/>
      //         </div>)
      //     }

      //     if(props.action.name === "filter"){
      //       return (<div style={{paddingLeft: 10}}>
      //         <Button sx={{ height: 35, width: 150 }}
      //         startIcon={<FilterListIcon />}
      //         variant={showFilter ? 'outlined' : 'contained'}
      //         size="small"
      //         color="primary"
      //         onClick={() => {
      //           ref?.current?.dataManager?.columns?.forEach((item) => {
      //             if(item.type != 'date' && item?.tableData?.filterValue)
      //               ref.current?.onFilterChange(item?.tableData?.id, "");
      //           })
      //           setShowFilter(prev => !prev)
      //         }}
      //         >
      //           {showFilter ? 'Hide Filters' : 'Show Filters'}
      //         </Button>
      //       </div>)  
      //     }

      //     // if(props.action.tooltip === "Add" && !switches[tab_idx].checkedView){
      //     //   return <></>
      //     // }

      //     if (props.action.display === 'button' || (props.action.tooltip === "Add")) {
      //       const title = `${props.action.tooltip} ${name}`
      //       return (
      //         <div style={{paddingLeft: 10}}>
      //           <Button
      //           color={'success'}
      //           startIcon={<AddIcon />}
      //           {...props.action}
      //           onClick={(event) => props.action.onClick(event, props.data)}
      //           variant="contained"
      //           title={title}
      //         >{props.action.label || title}
      //         </Button>
      //       </div>
      //      )
      //     }

      //     return <MTableAction {...props} />;
      //   },
      // }}
      onOrderChange={() => doSetFilteredDataRows({...filteredDataRows, [i]: refs.current[`ref${i}`].current?.state?.data})}
      onFilterChange={() => doSetFilteredDataRows({...filteredDataRows, [i]: refs.current[`ref${i}`].current?.state?.data})}
      //onSearchChange={() => handleSearchChangeDirect(ref.current.state)}
      actions={[[0,1,2].includes(i) && {
        icon: AddCommentIcon,
        tooltip: 'Update Status',
        onClick: (event, rowData) => {
          setSelRowData(prev => ({...prev, [i]: rowData}))
          setOpenPopup(prev => ({...prev, [i]: true}))
        }
      }]}
    
      icons={tableIcons}
      //columns={[hra, status]}
      data={equipments[i]}
      options={{
        //filtering: showFilter,
        //search: false,
      //     headerStyle: {
      //     backgroundColor: "#969696",
      //     color: "#FFF",
      //     fontWeight: 'bold',
      //     tableLayout: 'fixed'
      // }
      }}
      title=""
      {...(rights?.edit?.[tabs] && !initialLoad && {editable:{
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
        </TabPanel>

    ))

  //will run once.
  useEffect(() => {
    pageInitialize();
  }, []);
  
  // useEffect(() => {
	// 	console.log(employees)
	// }, [employees]);

  // useEffect(() => {
	// 	console.log(hras)
	// }, [hras]);

  useEffect(() => {
		if(tabs == 3 && equipments[tabs].length == 0){
      handleSearch()
    }
	}, [tabs]);

  useEffect(() => {
    window.localStorage.setItem('view-switch', viewSwitch);
}, [viewSwitch]);

//const { ref0, ref1, ref2, ref3, ref4 } = ref.current;
//const tab_idx = tabs
//const equipmentArray = 
//const isHraTab = equipmentTabs[tab_idx].id == "my_hra_equipment"
//const hras_array = tabs === 1 ? my_hras : hras

const [toggleSwitch0,setToggleSwitch0] =  useState(false);
const [toggleSwitch1,setToggleSwitch1] =  useState(false);
const [toggleSwitch2,setToggleSwitch2] =  useState(false);
const [toggleSwitch3,setToggleSwitch3] =  useState(false);
const [toggleSwitch4,setToggleSwitch4] =  useState(false);

  //Render return.
  return (
    <>
    <div>
      {displayTop}
      <Box sx={{display:'flex',flex:'auto'}}>
      <Box ref={ref} sx={{width: "100%"}}>
        {!initialLoad ? !serverDown ? (
              <div className={tabClasses.root}>
                <AppBar position="static" color="default">
                  <Tabs value={tabs} onChange={handleTabChange} aria-label="simple tabs example" textColor="primary" centered indicatorColor="primary"> 
                    <Tab label={equipmentTabs[0].label?.toUpperCase()} icon={<ComputerIcon/>} {...a11yProps(0)} />
                    <Tab label={equipmentTabs[1].label?.toUpperCase()} hidden={!rights?.view[3]} icon={<ComputerIcon/>} {...a11yProps(1)} />
                    <Tab label={equipmentTabs[2].label?.toUpperCase()} hidden={!rights?.view[3] || equipments?.[2]?.length == 0} icon={<ComputerIcon/>} {...a11yProps(2)}/>  
                    <Tab label={equipmentTabs[3].label?.toUpperCase()} hidden={!rights?.view[3]} icon={<SearchIcon/>} {...a11yProps(3)} />
                    <Tab label={equipmentTabs[4].label?.toUpperCase()} hidden={!rights?.view[3] || equipments?.[4]?.length == 0} icon={<ComputerIcon/>} {...a11yProps(4)} />
                  </Tabs>
                </AppBar>
                <Box sx={{pt: 1.5}}>
                  {!viewSwitch && <MapWrapper equipments={[...filteredDataRows[tabs]]}/>}
                </Box>
                {MaterialTableTabs}
              </div>
        ) : null : <div style={{textAlign:'center'}}>{LoadingCircle()}</div>}
      </Box>
      </Box>
    </div>
    </>
  );
}

export default connect(
  'selectUserToken',
  'doSearchEquipmentTab',
  'selectEquipments',
  'doSetEquipments',
  'selectInitialLoad',
  'selectRights',
  'selectLoading',
  'selectEmployees',
  'selectHras',
  'selectMyHras',
  'selectFilteredDataRows',
  'selectServerDown',
  'doSetFilteredDataRows',
  'doGetAllEquipmentTabsInitialLoad',
  Equipment);