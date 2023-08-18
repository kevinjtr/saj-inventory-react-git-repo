
import { useState, useEffect } from 'react';
import 'date-fns';
import SearchIcon from '@mui/icons-material/Search';
import MaterialTable from '@material-table/core'
import { form4900Icons } from '../../material-table/config'
import { getQueryStringParams,LoadingCircle } from '../../tools/tools'
import { Alert } from '@mui/lab';
import { SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT } from '../../config/constants'
import { filter as _filter } from 'lodash'
import UploadFormModal from './UploadFormModal'
import Eng4900Form from './Eng4900Form'
import { Badge, Box, Switch, Typography, Stepper, Step, StepLabel,
  AppBar, Tabs, Tab, TextField, MenuItem, FormControl,
  Select, Grid, FormGroup, FormControlLabel, IconButton,
  Radio, RadioGroup } from '@mui/material';
import { updateEng4900Api, destroyEng4900Api, eng4900SearchApi, getEng4900PdfByIdApi } from '../../../publics/actions/eng4900-api'
import { getHraFormApi} from '../../../publics/actions/hra-api'
import { connect } from 'redux-bundler-react';
import { ALERT } from '../../tools/tools'
import { useTheme } from '@mui/material/styles';
import { Description as DescriptionIcon } from '@mui/icons-material';
import { TabPanel, a11yProps, StyledBox } from '../../styles/mui';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { green } from '@mui/material/colors';

function Eng4900({history, location, match, userToken}) {
  
  //Constants Declarations.
  const search = getQueryStringParams(location.search)
  const FORM_STATUS = {
    1:"Form Edit",
		2:"Individual/Vendor signature required",
		3:"Completed Individual/Vendor signature",
		4:"Losing HRA signature required",
		5:"Completed losing HRA signature",
		6:"Gaining HRA signature required",
		7:"Completed gaining HRA signature",
		8:"Logistics signature required",
		9:"Completed Logistics signature",
		10:"PBO signature required",
		11:"Completed PBO signature",
		12:"Form Rejected",
}
  const formTabs = {0: {id:'my_forms', label:'My Forms'}, 1: {id:'hra_forms', label:'HRA Forms'}, 2: {id:'sign_forms', label:'Sign Forms'}, 3: {id:'completed_and_ipg_forms', label:'Completed & IP Gaining HRA Forms'}}
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
  const theme = useTheme()

  //Hooks Declarations.
  const [uploadPdf, setUploadPdf] = useState({
    show: false,
    rowData: null,
    refresh:false
  })
  const [create4900, setCreate4900] = useState({
    show: false,
    formData: null,
    formId: null,
    action: 'CREATE'
  })
  const [searchFields, setSearchFields] = useState({
    0: SEARCH_FIELD_RESET,
    1: SEARCH_FIELD_RESET,
    2: SEARCH_FIELD_RESET,
    3: SEARCH_FIELD_RESET,
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
  const [loading, setLoading] = useState({init:true,refresh:{
    0: false,
    1: false,
    2: false,
    3: false,
  }});
  const [eng4900s, setEng4900s] = useState({
      0: [],
      1: [],
      2: [],
      3: []
    });
  const [editable,setEditable] = useState(false)
  const [tabs, setTabs] = useState(1);
  const [switches, setSwitches] = useState({
      0: SWITCH_RESET,
      1: SWITCH_RESET,
      2: SWITCH_RESET,
      3: SWITCH_RESET,
    });
  const [hras, setHras] = useState({
    0: RESET_HRAS,
    1: RESET_HRAS,
    2: RESET_HRAS,
    4: RESET_HRAS,
  });
  const [alertUser, setAlertUser] = useState(ALERT.RESET);
  const [selectedRow, setSelectedRow] = useState({});
  const [serverDown, setServerDown] = useState(false);

  //Events Declarations.
  const handleTableDelete = async (rowData) => {
    let result_error = true
    setAlertUser(ALERT.RESET)
    
    await destroyEng4900Api(rowData, userToken).then((response) => response.data).then((data) => {
      console.log(data)
      const {error, tabUpdatedData} = data
      result_error = error

      if(error){
        setAlertUser(ALERT.FAIL())
      }else {
        let eng4900s_copy = {...eng4900s}

        for(const tab_number in tabUpdatedData){
          eng4900s_copy[tab_number] = tabUpdatedData[tab_number]
        }

        setEng4900s(eng4900s_copy)
        setAlertUser(ALERT.SUCCESS)
      }


    }).catch(function (error) {
      console.log(error)
      setAlertUser(ALERT.FAIL())
    });

    return result_error
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
  
    await eng4900SearchApi({
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

        // for(const tab_num in data.data){
        //   if(data.data[tab_num].length > 0){
        //     const num = Number(tab_num)
        //     setTabs(num)
        //     break;
        //   }
        // }

        if(data.hasOwnProperty('hras')){
          for(const key in data.hras){
            setHras({...hras, [key]: data.hras[key] })
          }        
        }

        // if(data.data[0].length == 0){
        //   setTabs(1)
        // }
      }
      
      setLoading({...loading,init:false})

    }).catch(function (error) {
      setServerDown(true)
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
    let result_error = true
    setAlertUser(ALERT.RESET)
    
		await updateEng4900Api(rowData, userToken).then((response) => response.data).then((data) => {
      console.log(data)
      const {error, tabUpdatedData} = data
      result_error = error

      if(error){
        setAlertUser(ALERT.FAIL())
      }else {
        let eng4900s_copy = {...eng4900s}

        for(const tab_number in tabUpdatedData){
          eng4900s_copy[tab_number] = tabUpdatedData[tab_number]
        }

        setEng4900s(eng4900s_copy)
        setAlertUser(ALERT.SUCCESS)
      }

		}).catch(function (error) {
      console.log(error)
      setAlertUser(ALERT.FAIL())
		});

		return(result_error)
  }

  const getHrasAndEquipments = () => {

    //api.get(`hra/form`)
    getHraFormApi(userToken).then((hra_res) => hra_res.data).then((h_data) => {
        console.log('hra_download',h_data)

        for(const key in h_data.data){
          setHras({...hras, [key]: (h_data.status != 400 ? h_data.data[key] : RESET_HRAS) })
        }        

      }).catch(function (error) {
        setHras(RESET_HRAS)
      });
  }
  
  //Function Declarations.
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
        <form noValidate autoComplete="off">
          <div>
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
      <StyledBox>
        <AppBar position="static" color="default">
          <Tabs value={tabs} onChange={handleTabChange} aria-label="simple tabs example" textColor="primary" centered indicatorColor="primary"> 
            <Tab label={formTabs[0].label.toUpperCase()} hidden={true} icon={<DescriptionIcon/>} {...a11yProps(0)} />
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
      </StyledBox>
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
           {(rowData.status_options).map((option) => (
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
      { title: 'Requested Action', field: "requested_action",editable: 'never' },
      { title: 'Form ID', field: 'form_id', editable:'never'},
      { title: 'Bar Tags', field: "bar_tags",editable: 'never'},
      { title: 'Losing HRA', field: "losing_hra",editable: 'never' },
      { title: 'Gaining HRA', field: "gaining_hra",editable: 'never' },
    ]
  
    return(
      <div id={`mt-4900-${tab_idx}`} key={`mt-4900-${tab_idx}`} style={{ maxWidth: '100%',paddingTop:'25px' }}>
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
              rowStyle: rowData => ({
                //backgroundColor: (selectedRow[tab_idx] === rowData.form_id) ? (theme.palette.mode == "dark" ? theme.palette.text.disabled : '#CCFFCC') : theme.palette.background.paper
              }),
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
              render: ({rowData}) => {
                return (
                  <Box sx={{ width: '100%', py: 3 }}>
                  <Stepper activeStep={rowData.status - 1} alternativeLabel>
                  {rowData.all_status_steps?.map((option, i) => {
                    const labelProps = {};

                    if(rowData.status == 12) {
                        labelProps.error = true
                        return (<Step key={option.label}>
                          <StepLabel {...labelProps}>{option.label}</StepLabel>
                        </Step>)                      
                    }else if(rowData.status != 12){
                      return (<Step key={option.label}>
                        <StepLabel {...labelProps}>{option.label}</StepLabel>
                      </Step>)
                    }

                    return;
                  }
                      
                    )}
                  </Stepper>
                </Box>
                )
              },
            }]}
            // actions={[
            //   // {
            //   //   icon: 'View',
            //   //   tooltip: 'Save User',
            //   //   onClick: (event, rowData) => alert("You saved "),// + rowData.name)
            //   // },
            //   {
            //     icon: () => (
            //     <Tooltip title="Crate New Form" aria-label="add">
            //       <ThemeProvider>
            //         <Fab  variant="extended" size="medium" color="inherit" className={ plusButtonClasses.fabGreen}>
            //         Create 4900
            //         </Fab>
            //       </ThemeProvider>
            //     </Tooltip>
            //     ),
            //     tooltip: "Create New Form",
            //     position: "toolbar",
            //     onClick: () => setCreate4900({...create4900,show:true}),
            //     hidden: hras[tab_idx].losing.length == 0
            //   },
            //   // rowData => ({
            //   //   icon: form4900Icons.Pdf,
            //   //   tooltip: 'View PDF',
            //   //   onClick: (event, rowData) => {
            //   //     setAlertUser(ALERT.RESET)
            //   //     get4900Pdf(rowData)
            //   //   },//rowData.folder_link ? openInNewTab(rowData.folder_link) : alert("Error: PDF not found."), // + rowData.name),
            //   //   disabled: ! (rowData.document_source != 2)  //rowData.birthYear < 2000
            //   // }),
            //   // rowData => ({
            //   //   icon: form4900Icons.Publish,
            //   //   tooltip: 'Upload PDF',
            //   //   onClick: (event, rowData) => {
            //   //     setUploadPdf({...uploadPdf,show:true,rowData:rowData})
            //   //   },//rowData.folder_link ? openInNewTab(rowData.folder_link) : alert("Error: PDF not found."), // + rowData.name),
            //   //   disabled: ! (rowData.document_source != 2)  //rowData.birthYear < 2000
            //   // })               
            // ]}
            // {...(editable && {editable:{
            //   isDeleteHidden: rowData => rowData.originator !== 1 || rowData.status > 6,
            //   onRowUpdate: async (newData, oldData) =>{
            //     const errorResult = false
            //     return(new Promise((resolve, reject) => {
            //       setTimeout(() => {
            //         if(errorResult){
            //           reject()
            //           return;
            //         }
    
            //         //resetEmployees();
            //         resolve();
                      
            //       }, 1000);
            //     }))
            //     },
            //   // onRowDelete: async (oldData) => {
            //   //   const result = await handleTableDelete(oldData)

            //   //   return(new Promise((resolve, reject) => {
            //   //     setTimeout(() => {

            //   //       if(!result.error){
            //   //         const dataDelete = [...eng4900s[tab_idx]];
            //   //         const index = oldData.tableData.id;
            //   //         dataDelete.splice(index, 1);
            //   //         //setEng4900s([...dataDelete]);
            //   //         resolve()
            //   //         return;
            //   //       }  
    
            //   //       reject();
            //   //     }, 1000);
            //   //   }
            //   // ))
            //   //   }
            // }})}
          />
    </div>
    )
  }

  const materialTableHraForms = (tab_idx) => {

    let columns = [
      { title: 'Status', field: 'status', type:'numeric', render: rowData => <a value={rowData.status} >{FORM_STATUS[rowData.status]}</a>,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
           value={value}
           onChange={(event) => {
              onChange(event.target.value);
           }}
        >
           {(rowData.status_options).map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ),
       validate: (rowData) => {		
         console.log(rowData)
        if(rowData.hasOwnProperty('status')){
          if(rowData.status) {
            if(rowData.hasOwnProperty('tableData')){

              if(rowData.tableData.editing == "delete" && rowData.status == 1){
                return true
              }

              if(rowData.status === eng4900s[tab_idx][rowData.tableData.id].status)
                return ({ isValid: false, helperText: 'Please select a different Status.' })

              //if(rowData.status > eng4900s[tab_idx][rowData.tableData.id].status)
                return true
            }
          }
        }
        
        return ({ isValid: false, helperText: 'Status selection is incorrect.' })
  
      }
    },
      { title: 'Requested Action', field: "requested_action",editable: 'never' },
      { title: 'Form ID', field: 'form_id', editable:'never'},
      { title: 'Bar Tags', field: "bar_tags",editable: 'never'},
      { title: 'Losing HRA', field: "losing_hra",editable: 'never' },
      { title: 'Gaining HRA', field: "gaining_hra",editable: 'never' },
    ]
  
    return(
      <div id={`mt-4900-${tab_idx}`} key={`mt-4900-${tab_idx}`} style={{ maxWidth: '100%',paddingTop:'25px' }}>
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
              rowStyle: rowData => ({
                //backgroundColor: (selectedRow[tab_idx] === rowData.form_id) ? (theme.palette.mode == "dark" ? theme.palette.text.disabled : '#CCFFCC') : theme.palette.background.paper
              }),
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
              render: ({rowData}) => {
                return (
                  <Box sx={{ width: '100%', py: 3 }}>
                  <Stepper activeStep={rowData.status - 1} alternativeLabel>
                  {rowData.all_status_steps?.map((option, i) => {
                    const labelProps = {};

                    if(rowData.status == 12) {
                        labelProps.error = true
                        return (<Step key={option.label}>
                          <StepLabel {...labelProps}>{option.label}</StepLabel>
                        </Step>)                      
                    }else if(rowData.status != 12){
                      return (<Step key={option.label}>
                        <StepLabel {...labelProps}>{option.label}</StepLabel>
                      </Step>)
                    }

                    return;
                  }
                      
                    )}
                  </Stepper>
                </Box>
                )
              },
            }]}
            actions={[
              {
                icon: () => (
                    <AddBoxIcon sx={{width: '30px', height: '30px', color: green['500']}}/>
                ),
                tooltip: "Create New Form",
                position: "toolbar",
                onClick: () => setCreate4900({...create4900, show:true, action:'CREATE', formId:null}),
                hidden: hras[tab_idx].losing.length == 0             
              },
              // rowData => ({
              //   icon: CommentIcon,
              //   tooltip: 'Edit Form',
              //   onClick: () => setCreate4900({...create4900, show:true, action:'EDIT', formId:rowData.form_id}),
              //   //onClick: (event, rowData) => ViewFormById(rowData.form_id), // + rowData.name),
              //   disabled: !(rowData.status == 1) //rowData.birthYear < 2000
              // }),
              rowData => ({
                icon: form4900Icons.Pdf,
                tooltip: 'View PDF',
                onClick: (event, rowData) => {
                  setAlertUser(ALERT.RESET)
                  get4900Pdf(rowData)
                  //setUploadPdf({...uploadPdf,show:true,rowData:rowData})
                },//rowData.folder_link ? openInNewTab(rowData.folder_link) : alert("Error: PDF not found."), // + rowData.name),
                disabled: ! (rowData.document_source != 2)  //rowData.birthYear < 2000
              }),            
            ]}
            {...(editable && {editable:{
              isDeletable: rowData => rowData.status == 1,
              isDeleteHidden: rowData => rowData.status != 1,
              onRowUpdate: async (newData, oldData) => {
                const errorFound = await handleTableUpdate({changes:{'0':{newData:{ form_id: newData.form_id, status:newData.status, tab: tab_idx}}}})

                return(new Promise((resolve, reject) => {
                  setTimeout(() => {

                    if(errorFound){
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
                const errorFound = await handleTableDelete(oldData)

                return(new Promise((resolve, reject) => {
                  setTimeout(() => {

                    if(!errorFound){
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
      { title: 'Requested Action', field: "requested_action",editable: 'never' },
      { title: 'Form ID', field: 'form_id', editable:'never'},
      { title: 'Bar Tags', field: "bar_tags",editable: 'never'},
      { title: 'Losing HRA', field: "losing_hra",editable: 'never' },
      { title: 'Gaining HRA', field: "gaining_hra",editable: 'never' },
    ]
  
    return(
      <div id={`mt-4900-${tab_idx}`} key={`mt-4900-${tab_idx}`} style={{ maxWidth: '100%',paddingTop:'25px' }}>
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
              render: ({rowData}) => {
                return (
                  <Box sx={{ width: '100%', py: 3 }}>
                  <Stepper activeStep={rowData.status - 1} alternativeLabel>
                  {rowData.all_status_steps?.map((option, i) => {
                    const labelProps = {};

                    if(rowData.status == 12) {
                        labelProps.error = true
                        return (<Step key={option.label}>
                          <StepLabel {...labelProps}>{option.label}</StepLabel>
                        </Step>)                      
                    }else if(rowData.status != 12){
                      return (<Step key={option.label}>
                        <StepLabel {...labelProps}>{option.label}</StepLabel>
                      </Step>)
                    }

                    return;
                  }
                      
                    )}
                  </Stepper>
                </Box>
                )
              },
            }]}
            actions={[
              rowData => ({
                icon: form4900Icons.Pdf,
                tooltip: 'View PDF',
                onClick: (event, rowData) => {
                  setAlertUser(ALERT.RESET)
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
              onRowUpdate: async (newData, oldData) =>{
                console.log(newData, oldData)
                const errorResult = false

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
  
      }},
      { title: 'Requested Action', field: "requested_action",editable: 'never' },
      { title: 'Form ID', field: 'form_id', editable:'never'},
      { title: 'Bar Tags', field: "bar_tags",editable: 'never'},
      { title: 'Losing HRA', field: "losing_hra",editable: 'never' },
      { title: 'Gaining HRA', field: "gaining_hra",editable: 'never' },
    ]
  
    return(
      <div id={`mt-4900-${tab_idx}`} key={`mt-4900-${tab_idx}`} style={{ maxWidth: '100%',paddingTop:'25px' }}>
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
              render: ({rowData}) => {
                return (
                  <Box sx={{ width: '100%', py: 3 }}>
                  <Stepper activeStep={rowData.status - 1} alternativeLabel>
                  {rowData.all_status_steps?.map((option, i) => {
                    const labelProps = {};

                    if(rowData.status == 12) {
                        labelProps.error = true
                        return (<Step key={option.label}>
                          <StepLabel {...labelProps}>{option.label}</StepLabel>
                        </Step>)                      
                    }else if(rowData.status != 12){
                      return (<Step key={option.label}>
                        <StepLabel {...labelProps}>{option.label}</StepLabel>
                      </Step>)
                    }

                    return;
                  }
                      
                    )}
                  </Stepper>
                </Box>
                )
              },
            }]}
            actions={[
              rowData => ({
                icon: form4900Icons.Pdf,
                tooltip: 'View PDF',
                onClick: (event, rowData) => {
                  setAlertUser(ALERT.RESET)
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
    <h2>ENG 4900</h2>     
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

  useEffect(() => {
    console.log(eng4900s)
  }, [eng4900s]);

  useEffect(() => {
    if(Object.keys(selectedRow) > 0){
      setTimeout(() => setSelectedRow({}), 20000);
    }
    
  }, [selectedRow]);

  useEffect(() => {
		console.log(hras)
	}, [hras]);

  useEffect(() => {
		if(uploadPdf.refresh){
      
    }
	}, [uploadPdf.refresh]);

  //Render return.
  return (
    <>
    {uploadPdf.show ? <UploadFormModal uploadPdf={uploadPdf} setUploadPdf={setUploadPdf} type={"eng4900"} eng4900s={eng4900s} tab={tabs} setEng4900s={setEng4900s} alertUser={alertUser} setAlertUser={setAlertUser}/> : null}
    {create4900.show ? <Eng4900Form formId={create4900.formId} action={create4900.action} type="DIALOG" setSelectedRow={setSelectedRow} hras={hras[tabs]} eng4900s={eng4900s} tab={tabs} setEng4900s={setEng4900s} create4900={create4900} setCreate4900={setCreate4900} alertUser={alertUser} setAlertUser={setAlertUser}/> : null}
    <div>
      {displayTop()}
      {alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
      {loading.init ? <div style={{textAlign:'center'}}>{LoadingCircle()}</div> : null}
      {!loading.init && !serverDown ? TabsEng4900() : null}
    </div>
    </>
  );
}

export default connect(
  'selectUserToken',
  Eng4900);