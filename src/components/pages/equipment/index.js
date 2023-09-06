
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
import MuiTable from '../../material-table'
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

function Equipment({history, location, match, userToken}) {
  
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
  const [initialLoad, setInitialLoad] = useState(true)
  const [loading, setLoading] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
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
  let [snackBar,setSnackBar] = useState({open:false,message:'',severity:'warning'});
  const [serverDown, setServerDown] = useState(false);
  const [viewSwitch, setViewSwitch] = useState(() => {
    // getting stored value
    const saved = window.localStorage.getItem("view-switch");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
});
  const [openChangeHistory, setMapFilters] = useState([]);

  // state variable for showing/hiding column filters in material table

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
                console.log(equipments_tab_copy[idx])
                equipments_copy = {...equipments_copy,[tab_number]: equipments_tab_copy}
              }
            }
          }

          setEquipments(equipments_copy)
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

          setEquipments(equipments_copy)
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
    console.log(data)

    if(error){
      toast.error('Could not complete action')
    }else {
      let copy_equipments = {...equipments}

      for(const tab_number in tabChanges){
        for(const eq_change of tabChanges[tab_number]){
            console.log(eq_change,tab_number)
            copy_equipments = {...copy_equipments,[tab_number]: [eq_change,...copy_equipments[tab_number]]}
        }
      }

      setEquipments(copy_equipments)

      toast.success('Action was completed')
    }

  }).catch(function (error) {
    console.log(error)
    toast.error('Could not complete action')
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
    setLoading({...loading, [tabs]: true})
    //setLoading({...loading, refresh: {...loading.refresh, [tabs]: true}})
  
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
      setLoading({...loading, [tabs]: false})
      //setLoading({...loading, refresh: {...loading.refresh, [tabs]: false}})
      setEquipments({...equipments, [tabs]: data.status != 400 ? data.data[tabs] : []})

    }).catch(function (error) {
      setLoading({...loading, [tabs]: false})
      //setLoading({...loading, refresh: {...loading.refresh, [tabs]: false}})
      setEquipments({...equipments, [tabs]: []})
  
    });
  
  }

  const pageInitialize = () => {
    setInitialLoad(true)
    //setLoading({...loading,init:true})
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
      setInitialLoad(false)
      //setLoading({...loading,init:false})

    }).catch(function (error) {
      setServerDown(true)
      setInitialLoad(false)
      //setLoading({...loading,init:false})
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
    const { columns, equipmentArray, loading } = props
    const tab_idx = tabs
    const [openPopup,setOpenPopup] =  useState(false);
    const [selRowData, setSelRowData] = useState({});
    const [name, componentName, fetchKey] = ['Equipment', 'equipment','id']
    const [showFilter,setShowFilter] = useState(false)

    const [filteredDataRows, setFilteredDataRows] = useState([...equipmentArray]);

    const handleSearchChangeDirect = ({ data, searchText }) => setFilteredDataRows(data)

    return(
        <Box sx={{ paddingTop:'25px' }}>
        <UpdateStatusPopup openPopup={openPopup} setOpenPopup={setOpenPopup}  handleUpdate={handleUpdate} rowData={selRowData} setSnackBar={setSnackBar} equipments={{...equipments}} setEquipments={setEquipments}/>
        {!viewSwitch ? <MapWrapper equipments={[...filteredDataRows]}/> : null}
        {/* {<Snackbar open={snackBar.open} anchorOrigin={{vertical:'top',horizontal:'center'}} autoHideDuration={3000} onClose={()=>setSnackBar({open:false,message:'',severity:''})}></Snackbar>} */}
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
      isLoading={loading}
      tableRef={ref}
      components={{
        Action: (props, rowData) => {
          if (props.action.name === 'change-history') {
            return (
              <ChangeHistoryButton id={fetchKey ? props.data[fetchKey] : props.data.id} componentName={componentName}/>
            )
          }
          
          if(props.action.name === "export"){
              return (<div style={{paddingLeft: 10}}>
                <CustomExportButton {...{...ref?.current?.state, table: {name: 'equipment', viewType: switches[tab_idx].checkedView ? 'extended' : 'normal'}}}/>
              </div>)
          }

          if(props.action.name === "filter"){
            return (<div style={{paddingLeft: 10}}>
              <Button sx={{ height: 35, width: 150 }}
              startIcon={<FilterListIcon />}
              variant={showFilter ? 'outlined' : 'contained'}
              size="small"
              color="primary"
              onClick={() => {
                ref?.current?.dataManager?.columns?.forEach((item) => {
                  if(item.type != 'date' && item?.tableData?.filterValue)
                    ref.current?.onFilterChange(item?.tableData?.id, "");
                })
                setShowFilter(prev => !prev)
              }}
              >
                {showFilter ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>)  
          }

          // if(props.action.tooltip === "Add" && !switches[tab_idx].checkedView){
          //   return <></>
          // }

          if (props.action.display === 'button' || (props.action.tooltip === "Add")) {
            const title = `${props.action.tooltip} ${name}`
            return (
              <div style={{paddingLeft: 10}}>
                <Button
                color={'success'}
                startIcon={<AddIcon />}
                {...props.action}
                onClick={(event) => props.action.onClick(event, props.data)}
                variant="contained"
                title={title}
              >{props.action.label || title}
              </Button>
            </div>
           )
          }

          return <MTableAction {...props} />;
        },
      }}
      onOrderChange={() => handleSearchChangeDirect(ref.current.state)}
      onFilterChange={() => handleSearchChangeDirect(ref.current.state)}
      //onSearchChange={() => handleSearchChangeDirect(ref.current.state)}
      actions={[{ name: 'filter', position: 'toolbar' }, { name: 'change-history' }, { name: 'export', position: 'toolbar' }, [0,1,2].includes(tab_idx) && {
        icon: AddCommentIcon,
        tooltip: 'Update Status',
        onClick: (event, rowData) => {
          setSelRowData({...rowData})
          setOpenPopup(true)
        }
      }]}
    
      icons={tableIcons}
      columns={columns}
      data={equipmentArray}
      options={{
        filtering: showFilter,
        search: false,
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

  const TabsEquipment = React.forwardRef((props, ref) => {
    const { ref0, ref1, ref2, ref3, ref4 } = ref.current;
    const tab_idx = tabs
    const equipmentArray = equipments[tab_idx]
    const isHraTab = equipmentTabs[tab_idx].id == "my_hra_equipment"
    const hras_array = isHraTab ? my_hras : hras
    let columns = []

    const equipment_cols_config = [
        { title: 'HRA', field: 'hra_num', type:'numeric', print_title: 'HRA Num', col_id:2.0, render: (rowData) => {
            return `${rights.edit[tab_idx] && rowData.hra_num ? `${rowData.hra_num} -`: ''}${rowData.hra_first_name ? ` ${rowData.hra_first_name}`: ''}${rowData.hra_last_name ? ` ${rowData.hra_last_name}` : ''}`
        },
        customFilterAndSearch: (term, rowData, column) => {
          if(rowData[column.field]){
            const option = `${rights.edit[tab_idx] && rowData.hra_num ? `${rowData.hra_num} -`: ''}${rowData.hra_first_name ? ` ${rowData.hra_first_name}`: ''}${rowData.hra_last_name ? ` ${rowData.hra_last_name}` : ''}`
            return option.toString()?.toUpperCase().includes(term?.toUpperCase())
          }
          return false
        },  
        editComponent: props => {
          console.log(props)

          return (
            <Autocomplete
            ListboxProps={{
              sx: { fontSize: 3 },
            }}
                  value={props.value ? find(hras_array,function(h){ return h.hra_num === props.value}) : null}
                  onChange={(e, nv) => {
                    if(nv?.hra_num){
                      props.onChange(nv.hra_num) 
                      return;
                    }
                    props.onChange(nv)
                  }}
                  key={`combo-box-${uuid()}`}
                  options={hras_array}
                  getOptionLabel={(option) => {
                    const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
                    return `${option.hra_num}${full_name && ` - ${full_name}`}`
                  }}
                  renderOption={(props, option, state) => {
                    const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
                    return <li {...props} style={{fontSize: '1rem'}}>{`${option.hra_num}${full_name && ` - ${full_name}`}`}</li>
                  }}
                  style={{ width: 250 }}
                  renderInput={(params) => <TextField {...params} helperText="HRA" variant="standard" />}
              />)
        },
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
        },
        { title: 'HRA First', field: 'hra_first_name', hidden: true,
         col_id:2.1,editable: 'never' },
        { title: 'HRA Last', field: 'hra_last_name', hidden: true,
         col_id:2.2,editable: 'never' },
        { title: 'Item Description', field: 'item_type', cellStyle: {
          minWidth: 200,
          maxWidth: 200
        },
         col_id:4  },
        { title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric', customFilterAndSearch: (term, rowData, column) => {
          if(rowData[column.field]){
            return rowData[column.field].toString().includes(term)
          }
          return false
        }, cellStyle: {
          minWidth: 200,
          maxWidth: 200
        },
         col_id:5, validate: (rowData) => {
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
        {title:'Serial Num',field:'serial_num', cellStyle: {
          minWidth: 200,
          maxWidth: 200
        }, validate: (rowData) => {
          if(rowData.hasOwnProperty('serial_num')){
                      if(rowData.serial_num.toString().length < 3){
                          return ({ isValid: false, helperText: 'Serial Num is too short.' })
                      }

                      return true  
          }
          return ({ isValid: false, helperText: 'Serial Num is required.' })
        },
         col_id:5.5},
         { title: 'Employee', print_title: 'Employee ID', field: 'employee_id', type:'numeric', render: (rowData) => {
          return `${rowData.employee_first_name ? ` ${rowData.employee_first_name}`: ''}${rowData.employee_last_name ? ` ${rowData.employee_last_name}` : ''}`
        },
        customFilterAndSearch: (term, rowData, column) => {
          if(rowData[column.field]){
            const option = `${rowData.employee_first_name ? ` ${rowData.employee_first_name}`: ''}${rowData.employee_last_name ? ` ${rowData.employee_last_name}` : ''}`
            return option.toString()?.toUpperCase().includes(term?.toUpperCase())
          }
          return false
        },
         col_id:6.0, width:"200px",
        editComponent: props => (
            <Autocomplete
            sx={{
              '.MuiAutocomplete-option': {
                fontSize: '.5rem'
              }
            }}
                  value={props.value ? find(employees,function(employee){ return employee.id === props.value}) : null}
                  onChange={(e, nv) => { 
                      if(nv?.id){
                        props.onChange(nv.id) 
                        return;
                      }
                    props.onChange(nv)
                  }}
                  key={`combo-box-${uuid()}`}
                  options={employees}
                  getOptionLabel={(option) => option.id + ' - ' + (option.first_name ? option.first_name + ' ' : '') + option.last_name}
                  renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.id + ' - ' + (option.first_name ? option.first_name + ' ' : '') + option.last_name}</li>}
                  style={{ width: 250 }}
                  renderInput={(params) => <TextField {...params} helperText="Employee" variant="standard" />}
              />)
        },
        { title: 'Employee First', field: 'employee_first_name', hidden: true,
         col_id:6.1 ,editable: 'never' },
        { title: 'Employee Last', field: 'employee_last_name', hidden: true,
         col_id:6.2,editable: 'never'  },
        { title: 'Employee Office Location', field: 'employee_office_location_name',
         col_id:6.3,editable: 'never'  },
        {title: 'Status', field:'status',
         col_id:6.4,editable: 'no' },
        {title: 'Status Date', field:'status_date', type:'date', render: rowData => {
          if(rowData.status_date){
            return moment(rowData.status_date).format("MM/DD/YY HH:mm:ss")
          }
          return ''
      },
       col_id:6.4,editable: 'no' },
    ]

    const ext_equipment_cols_config = [		
        // { title: 'Employee Holder ID', field: 'employee_id', type:'numeric',
        // customFilterAndSearch: (term, rowData, column) => {
        //   if(rowData[column.field]){
        //     return rowData[column.field].toString().includes(term)
        //   }
        //   return false
        // },
        //  col_id:6.0, width:"200px",
        // editComponent: props => (
        //     <Autocomplete
        //     sx={{
        //       '.MuiAutocomplete-option': {
        //         fontSize: '.5rem'
        //       }
        //     }}
        //           value={props.value ? find(employees,function(employee){ return employee.id === props.value}) : null}
        //           onChange={(e, nv) => { 
        //               if(nv?.id){
        //                 props.onChange(nv.id) 
        //                 return;
        //               }
        //             props.onChange(nv)
        //           }}
        //           key={`combo-box-${uuid()}`}
        //           options={employees}
        //           getOptionLabel={(option) => option.id + ' - ' + (option.first_name ? option.first_name + ' ' : '') + option.last_name}
        //           renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.id + ' - ' + (option.first_name ? option.first_name + ' ' : '') + option.last_name}</li>}
        //           style={{ width: 250 }}
        //           renderInput={(params) => <TextField {...params} helperText="Employee" variant="standard" />}
        //       />)
        // },
        {title:'Acquisition Date',field:'acquisition_date', cellStyle: {
          minWidth: 200,
          maxWidth: 200
        }, type: 'date',
         col_id:1},
        {title:'Acquisition Price',field:'acquisition_price',type: 'numeric', customFilterAndSearch: (term, rowData, column) => {
          if(rowData[column.field]){
            return rowData[column.field].toString().includes(term)
          }
          return false
        },
         col_id:7},
        {title:'Catalog Num',field:'catalog_num',
         col_id:8},
        {title:'Manufacturer',field:'manufacturer',
         col_id:10},
        {title:'Model',field:'model',
         col_id:11},
        {title:'Condition',field:'condition', render: rowData => rowData.condition_name, exportColumn: 'condition_name',
         col_id:12,
        editComponent: props => (
          <Autocomplete
          sx={{
            '.MuiAutocomplete-option': {
              fontSize: '.5rem'
            }
          }}
                value={props.value ? find(condition,function(c){ return c.id === props.value}) : null}
                onChange={(e, nv) => { 
                    if(nv?.id){
                      props.onChange(nv.id) 
                      return;
                    }
                  props.onChange(nv)
                }}
                key={`condition-${uuid()}`}
                options={condition}
                getOptionLabel={(option) => option.id + ' - ' + option.name}
                renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.id + ' - ' + option.name}</li>}
                style={{ width: 250 }}
                renderInput={(params) => <TextField {...params} helperText="Condition" variant="standard" />}
            />)
        }
    ]

    // if(editable) ext_equipment_cols_config.push({title:'Updated By',
    //  col_id:13,field:'updated_by_full_name',editable:'never' })

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

    columns.map(col => {
      if (col.type === 'numeric' && !col.customFilterAndSearch) {
        col.customFilterAndSearch = (term, rowData, column) => {
            if (rowData[column.field]) {
              return rowData[column.field].toString().includes(term)
            }
            return false
          }
        
      }

      // if(col.filterComponent){
      //   return col
      // }

      if (col.type == 'date') {
        //col.filterComponent = (props) => <CustomDatePicker {...props} />
        col.filtering = false
      }else{
        col.filterComponent = (props) => <CustomFilterTextField {...props} />
      }
      
      return col
    })

    return (
      <div className={tabClasses.root}>
        <AppBar position="static" color="default">
          <Tabs value={tabs} onChange={handleTabChange} aria-label="simple tabs example" textColor="primary" centered indicatorColor="primary"> 
            <Tab label={equipmentTabs[0].label?.toUpperCase()} icon={<ComputerIcon/>} {...a11yProps(0)} />
            <Tab label={equipmentTabs[1].label?.toUpperCase()} hidden={!rights.view[3] || equipments[1].length == 0} icon={<ComputerIcon/>} {...a11yProps(1)} />
            <Tab label={equipmentTabs[2].label?.toUpperCase()} hidden={!rights.view[3] || equipments[2].length == 0} icon={<ComputerIcon/>} {...a11yProps(2)}/>  
            <Tab label={equipmentTabs[3].label?.toUpperCase()} hidden={!rights.view[3]} icon={<SearchIcon/>} {...a11yProps(3)} />
            <Tab label={equipmentTabs[4].label?.toUpperCase()} hidden={!rights.view[3] || equipments[4].length == 0} icon={<ComputerIcon/>} {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabs} index={0}>
          <MaterialTableSelect ref={ref0} columns={[...columns]} loading={loading[0]} equipmentArray={[...equipmentArray]}/>
        </TabPanel>
        <TabPanel value={tabs} index={1}>
          <MaterialTableSelect ref={ref1} columns={[...columns]} loading={loading[1]} equipmentArray={[...equipmentArray]}/>
        </TabPanel>
        <TabPanel value={tabs} index={2}>
          <MaterialTableSelect ref={ref2} columns={[...columns]} loading={loading[2]} equipmentArray={[...equipmentArray]}/>
        </TabPanel>
        <TabPanel value={tabs} index={3}>
          <MaterialTableSelect ref={ref3} columns={[...columns]} loading={loading[3]} equipmentArray={[...equipmentArray]}/>
        </TabPanel>
        <TabPanel value={tabs} index={4}>
          <MaterialTableSelect ref={ref4} columns={filter(columns,(col) => !['hra_num','hra_first_name','hra_last_name','employee_id','employee_first_name','employee_last_name','status','status_date','employee_office_location_name'].includes(col.field))} loading={loading[4]} equipmentArray={[...equipmentArray]}/>
        </TabPanel>
      </div>
    );
  })

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
		console.log(employees)
	}, [employees]);

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
    window.localStorage.setItem('view-switch', viewSwitch);
}, [viewSwitch]);

  //Render return.
  return (
    <>
    <div>
      {displayTop}
      <Box sx={{display:'flex',flex:'auto'}}>
      <Box ref={ref} sx={{width: "100%"}}>
        {!initialLoad ? !serverDown ? <TabsEquipment ref={refs} />: null : <div style={{textAlign:'center'}}>{LoadingCircle()}</div>}
      </Box>
      </Box>
    </div>
    </>
  );
}

export default connect(
  'selectUserToken',
  Equipment);