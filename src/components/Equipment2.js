
import React, {useState, useEffect, createRef, useRef, useLayoutEffect} from 'react';
import MaterialTable from '@material-table/core'
import {SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, EQUIPMENT, AVD_SEARCH, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT, condition} from './config/constants'
import {equipmentSearchApi2} from '../publics/actions/equipment-api'
import MapWrapper from "./MapWrapper"

function Equipment() {
  const [userToken, setUserToken] = React.useState(() => {
    // getting stored value
    const saved = localStorage.getItem('auth');
    //const initialValue = JSON.parse(saved);
    return saved || false;
});




const tableRef = createRef(MaterialTable)

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
  //const [alertUser, setAlertUser] = React.useState(ALERT.RESET);
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
  const [serverDown, setServerDown] = React.useState(false);
  const [viewSwitch, setViewSwitch] = React.useState(() => {
    // getting stored value
    const saved = localStorage.getItem("view-switch");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
});
  const [mapFilters, setMapFilters] = React.useState([]);

  // state variable for showing/hiding column filters in material table
    const [showFilter,setShowFilter] = React.useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      })
      const [filteredData,setFilteredData] = React.useState([])

      useEffect(() => {
        console.log(filteredData)
      },[filteredData])
  //Events Declarations.
  // const handleUpdate = async (rowData) => {
  //     let errorFound = true
  //     //setAlertUser(ALERT.RESET)

  //     console.log(rowData)
  //     await updateEquipmentApi(rowData, userToken)
  //     .then((response) => response.data).then((data) => {
  //       const {tabChanges, error} = data
  //       errorFound = error

  //       if(error){
  //         //setAlertUser(ALERT.FAIL())
  //       }else {
  //         let equipments_copy = {...equipments}

  //         for(const tab_number in tabChanges){
  //           for(const eq_change of tabChanges[tab_number]){
  //             let equipments_tab_copy = [...equipments_copy[tab_number]]
  //             const idx = -1 //findIndex(equipments_tab_copy,function(eq){return eq.bar_tag_num == eq_change.bar_tag_num})

  //             if(idx != -1){
  //               equipments_tab_copy[idx] = eq_change
  //               console.log(equipments_tab_copy[idx])
  //               equipments_copy = {...equipments_copy,[tab_number]: equipments_tab_copy}
  //             }
  //           }
  //         }

  //         setEquipments(equipments_copy)
  //         //setAlertUser(ALERT.SUCCESS)
  //       }        

  //     }).catch(function (error) {
  //       console.log(error)
  //       //setAlertUser(ALERT.FAIL())
  //     });

  //     return(errorFound)
  // }

  // const handleDelete = async (rowData) => {
  //   let errorFound = true
  //   //setAlertUser(ALERT.RESET)

  //   await destroyEquipmentApi(rowData, userToken).then((response) => response.data).then((data) => {
  //       const {tabChanges, error} = data
  //       errorFound = error

  //       if(error){
  //         //setAlertUser(ALERT.FAIL())
  //       }else {
  //         let equipments_copy = {...equipments}

  //         for(const tab_number in tabChanges){
  //           for(const eq_change of tabChanges[tab_number]){
  //             let equipments_tab_copy = [...equipments_copy[tab_number]]

  //             //equipments_tab_copy = filter(equipments_tab_copy,function(eq){return eq.bar_tag_num != eq_change.bar_tag_num})
  //             equipments_copy = {...equipments_copy,[tab_number]: equipments_tab_copy}
  //           }
  //         }

  //         setEquipments(equipments_copy)
  //         //setAlertUser(ALERT.SUCCESS)
  //       }
      
  //   }).catch(function (error) {
  //       console.log(error)
  //       //setAlertUser(ALERT.FAIL())
  //   });

  //   return errorFound
  // }

  // const handleAdd = async (rowData) => {
  // let errorFound = true
  // //setAlertUser(ALERT.RESET)

  // await addEquipmentApi(rowData, userToken).then((response) => response.data).then((data) => {
  //   const {tabChanges, error} = data
  //   errorFound = error
  //   console.log(data)

  //   if(error){
  //     //setAlertUser(ALERT.FAIL())
  //   }else {
  //     let copy_equipments = {...equipments}

  //     for(const tab_number in tabChanges){
  //       for(const eq_change of tabChanges[tab_number]){
  //           console.log(eq_change,tab_number)
  //           copy_equipments = {...copy_equipments,[tab_number]: [eq_change,...copy_equipments[tab_number]]}
  //       }
  //     }

  //     setEquipments(copy_equipments)

  //     //setAlertUser(ALERT.SUCCESS)
  //   }

  // }).catch(function (error) {
  //   console.log(error)
  //   //setAlertUser(ALERT.FAIL())
  // });

  // return errorFound

  // }

	// const handleSearchFieldsChange = (event) => {
	// 	console.log(event.target.value)
  //   //const tab = event.target.id.split('-')[1]

  //   if(event.target.value == ''){
  //     setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], value: event.target.value, options: OPTIONS_DEFAULT}} })
	// 	}else{

	// 		setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], value: event.target.value, blanks : BLANKS_DEFAULT}} })
  //   }

	// 	// if(event.target.value == ''){
	// 	// 	setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], value: event.target.value, options: OPTIONS_DEFAULT} })
	// 	// }else{
	// 	// 	setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], value: event.target.value} })
	// 	// }
	// };

	// const handleSearchFieldsOptions = (event) => {
  //   const opts = SEARCH_FIELD_OPTIONS.map(x=>x.value).includes(event.target.value) ? event.target.value : OPTIONS_DEFAULT
  //   //const tab = event.target.id.split('-')[1]

  //   //setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], options : opts} })
    
  //   setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], options : opts}} })
	// }

	// const handleSearchFieldsBlanks = (event) => {
  //   const blks = SEARCH_FIELD_BLANKS.map(x=>x.value).includes(event.target.value) ? event.target.value : BLANKS_DEFAULT
  //   //const tab = event.target.id.split('-')[1]

  //   //setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], blanks : blks} })
    
  //   setSearchFields({...searchFields,  [tabs] : {...searchFields[tabs], [event.target.name] : {...searchFields[tabs][event.target.name], blanks : blks}} })
  // }
  
  const handleSearch = async (e=null,onLoad=false) => {
    //if(!onLoad) await UpdateUrl()
    //setAlertUser(ALERT.RESET)
    setLoading({...loading, refresh: {...loading.refresh, [tabs]: true}})
  
    let opts = {
      includes: {},
      blanks: {}
    }
  
    let fields_obj = {}
  
    Object.keys(searchFields[tabs]).map(key => {
      //fields_obj[key] = onLoad && search[key] != null ? search[key] : searchFields[tabs][key].value
  
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
        localStorage.setItem('equipments-data', JSON.stringify(data.data));
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

    pageInitialize();
    
    // Add event listener
    //window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    //handleResize();

    // Remove event listener on cleanup
    //return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    console.log(equipments)
  }, [equipments]);


  
  React.useEffect(() => {
		console.log(hras)
	}, [hras]);

  React.useEffect(() => {
		if(tabs == 3 && equipments[tabs].length == 0){
      handleSearch()
    }
	}, [tabs]);

  React.useEffect(() => {
    localStorage.setItem('view-switch', viewSwitch);
}, [viewSwitch]);



let columns = []
const tab_idx = 0
const isHraTab = equipmentTabs[tab_idx].id == "my_hra_equipment"
const hras_array = isHraTab ? my_hras : hras


const equipment_cols_config = [
    { title: 'HRA Number', field: 'hra_num', type:'numeric', col_id:2.0,},
    { title: 'HRA First', field: 'hra_first_name',col_id:2.1,editable: 'never' },
    { title: 'HRA Last', field: 'hra_last_name',col_id:2.2,editable: 'never' },
    { title: 'Item Description', field: 'item_type',col_id:4  },
    { title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric',col_id:5},
    { title: 'Employee First', field: 'employee_first_name',col_id:6.1 ,editable: 'never' },
    { title: 'Employee Last', field: 'employee_last_name',col_id:6.2,editable: 'never'  },
    { title: 'Employee Office Location', field: 'employee_office_location_name',col_id:6.3,editable: 'never'  },
    {title: 'Status', field:'status',col_id:6.4,editable: 'no' },
    {title: 'Status Date', field:'status_date',col_id:6.4,editable: 'no' },
    //tab_idx === 0 ? {title: 'Update Status', field:'update_status',col_id:6.5 ,editable: 'yes', render: rowData => <Link underline="always" component="button" onClick={()=>{setRowData(rowData); setOpenPopup(true); setSnackBar={setSnackBar}; }}>Update</Link>}: {}
] 
// tab_idx === 0 || tab_idx === 1 ? {title: 'Status', field:'status',col_id:6.4,editable: 'no' } : {},
//tab_idx === 1 ? {title: 'Status Date', field:'status_date',col_id:6.4,editable: 'no' } : {},

const ext_equipment_cols_config = [		
    // {title: 'HRA Employee ID', field: 'hra_employee_id',editable: 'never',col_id:2.3 },
    { title: 'Employee Holder ID', field: 'employee_id', type:'numeric',col_id:6.0},
    {title:'Acquisition Date',field:'acquisition_date',  type: 'date',col_id:1 },
    {title:'Acquisition Price',field:'acquisition_price',type: 'numeric',col_id:7 },
    {title:'Catalog Num',field:'catalog_num',col_id:8 },
    {title:'Serial Num',field:'serial_num',col_id:9 },
    {title:'Manufacturer',field:'manufacturer',col_id:10 },
    {title:'Model',field:'model',col_id:11 },
    {title:'Condition',field:'condition',col_id:12}
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
    //columns = orderBy(columns,'col_id','asc')
}

  //Render return.
  return (
    <>
    <div>
    {/* <p>{`height is: ${height}`}</p>
      <p>{`width is: ${width}`}</p> */}
      <div  style={{display:'flex',flex:'auto'}}>
      <div  style={{width: "100%"}}>
      {equipments[tab_idx].length > 0 ? <MapWrapper equipments={[...filteredData]}/> : null}
{  equipments[tab_idx].length > 0 ?      
<MaterialTable
            tableRef={tableRef}
            onOrderChange={(colId, ord) =>
              console.log("OnOrderChange: [ColId: " + colId + ", Dir: " + ord + "]",tableRef.current.state.data)
            }
            onFilterChange={() => {
              
              setFilteredData(tableRef.current.state.data)
            }}
            // icons={tableIcons}
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
                    <div   style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                    <div   style={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
                        {showFilter[tab_idx] ? (
                            <button  variant="outlined" size="small" color="primary" onClick={()=>setShowFilter({...showFilter, [tab_idx]: false})}>Hide Filters</button>
                        ) : (
                            <button  variant="contained" size="small" color="primary" onClick={()=>setShowFilter({...showFilter, [tab_idx]: true})}><>Show Filters</> </button>
                        )	
                        }	
                    </div>
                    {/* <MTableToolbar {...props} /> */}
                    </div>
                    </>
                )
            }}
            options={{
                // exportMenu:[
                //     {
                //         label: 'Export PDF',
                //         exportFunc: (columns, eqs) => switches[tab_idx].checkedView ? downloadPdf(columns, eqs, 'extended'): downloadPdf(columns,eqs,'normal')
                //       }, 
                //       {
                //         label: 'Export CSV',
                //         exportFunc: (columns, eqs) => ExportCsv(columns, eqs, 'EquipmentReport' + generateReportDate('filename'))
                //       }
                // ],
                filtering:true,
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
                // onRowAdd: async (newData) => {
                // let errorFound = await handleAdd({changes:{'0':{newData:newData, oldData:null}}})

                //     return (new Promise((resolve, reject) => {
                //         setTimeout(() => {
                //           if(errorFound){
                //               reject();
                //               return;
                //           }

                //           resolve();
                //         }, 1000);
                //     }))
                //     },
                // onRowUpdate: async (newData, oldData) => {
                // let errorFound = await handleUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
                //     return (new Promise((resolve, reject) => {
                //         setTimeout(() => {  
                //           if(errorFound){
                //               reject();
                //               return;
                //           }

                //           resolve();
                //         }, 1000);
                //     }))
                // },
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
           /> : null}
      </div>
      
      </div>
    </div>
    </>
  );
}

export default Equipment;