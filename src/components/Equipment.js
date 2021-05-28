import React from 'react';
import {TextField, InputLabel, MenuItem, Select, Grid, IconButton, FormControl, Radio, RadioGroup, FormControlLabel, FormGroup} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import 'date-fns';
import SearchIcon from '@material-ui/icons/Search';
import {LoadingCircle, getQueryStringParams} from './tools/tools';
import MaterialTable from 'material-table'
import {tableIcons} from './material-table/config'
import {Autocomplete, Alert} from '@material-ui/lab';
import api from '../axios/Api';
import {orderBy, findIndex, filter} from 'lodash'
import {texFieldStyles, gridStyles, itemMenuStyles } from './styles/material-ui';
import Switch from '@material-ui/core/Switch';
import {SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, EQUIPMENT, AVD_SEARCH, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT, ALERT} from './config/constants'
import { useHistory } from 'react-router-dom'

const BLANKS = 'Blanks'
const OPTS = 'Opts'

export default function Equipment(props) {

	//console.log(props)
	//constants declarations
	const history = useHistory()
	const search = getQueryStringParams(props.location.search)
	const PAGE_URL = `/${EQUIPMENT}`

	//React Hooks Declarations.
	const [loading, setLoading] = React.useState(false);
	const [alertUser, setAlertUser] = React.useState(ALERT.RESET);
	const [equipments, setEquipments] = React.useState([]);
	const [hras, setHras] = React.useState([]);
	const [employees, setEmployees] = React.useState([]);
	const [condition, setCondition] = React.useState([]);
	const [searchView, setSearchView] = React.useState(BASIC_SEARCH);
	const [searchFields, setSearchFields] = React.useState({
		hraName: {label: 'HRA Name', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
		hraNum: {label: 'HRA Number', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
		itemType: {label: 'Item Description', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
		bartagNum: {label: 'Bar Tag', value: '', width: null, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT},
		employeeName: {label: 'Employee Holder', value: '', width: 250, options: OPTIONS_DEFAULT, blanks: BLANKS_DEFAULT}
	})
	const [disableSearchFields, setDisableSearchFields] = React.useState(true)
	const [switches, setSwitches] = React.useState({
		checkedView: false,
		showSearch: false,
	  });
	const [windowSize, setWindowSize] = React.useState({
	width: undefined,
	height: undefined,
	});
	//const [urlUpdatedByTextFields,setUrlUpdatedByTextFields] = React.useState(false)
	const [editable,setEditable] = React.useState(false)

	// Style Declarations.
	const classesTextField = texFieldStyles();
	const classesItemMenu = itemMenuStyles();
	const classesGrid = gridStyles();

	//Event Handlers.
	const handleSearchFieldsChange = (event) => {
		//console.log(event.target.name,event.target.value)
		
		if(event.target.value == ''){
			setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], value: event.target.value, options: OPTIONS_DEFAULT} });
			//setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], value: event.target.value, options: OPTIONS_DEFAULT} })
		}

		//console.log('filedisnotempty')
		setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], value: event.target.value} });
		//setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], value: event.target.value} })
		//console.log(searchFields)
		
	};

	const handleSearchFieldsOptions = (event) => {
		const opts = SEARCH_FIELD_OPTIONS.map(x=>x.value).includes(event.target.value) ? event.target.value : OPTIONS_DEFAULT
		setSearchFields(prevState => {
			return {...prevState,  [event.target.name]: {...prevState[event.target.name], options : opts} }
		  });
		//setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], options : opts} })
	}

	const handleSearchFieldsBlanks = (event) => {
		const blks = SEARCH_FIELD_BLANKS.map(x=>x.value).includes(event.target.value) ? event.target.value : BLANKS_DEFAULT
		setSearchFields(prevState => {
			return {...prevState,  [event.target.name]: {...prevState[event.target.name], blanks : blks} }
		  });
		//setSearchFields({...searchFields,  [event.target.name]: {...searchFields[event.target.name], blanks : blks} })
	}

	const handleSearch = async (e=null,onLoad=false,nReset=true) => {
	if(!onLoad) await UpdateUrl()

	console.log(`${EQUIPMENT} Search`)
	setLoading(true)
	if(nReset) setAlertUser(ALERT.RESET)

	let opts = {
		includes: {},
		blanks: {}
	}

	let fields_obj = {}

	Object.keys(searchFields).map(key => {
		fields_obj[key] = onLoad && search[key] ? search[key] : searchFields[key].value

		//console.log(key,key+BLANKS,key+OPTS)
		//console.log(search[key],search[key+BLANKS],search[key+OPTS])
		console.log(`onLoad = ${onLoad.toString()} searchView=${searchView} search[${key + OPTS}]=${search[key + OPTS]} search[${key + BLANKS}]=${search[key + BLANKS]} `)
		//opts.includes[key] = (searchView != BASIC_SEARCH && search[key + OPTS]) || (onLoad && search[key + OPTS]) ? search[key + OPTS] : OPTIONS_DEFAULT
		//opts.blanks[key] = (searchView != BASIC_SEARCH && search[key + BLANKS]) || (onLoad && search[key + BLANKS]) ? search[key + BLANKS] : BLANKS_DEFAULT
		opts.includes[key] = (searchView != BASIC_SEARCH && !onLoad) ? (searchFields[key].options) : (onLoad && search[key + OPTS] ? search[key + OPTS] : OPTIONS_DEFAULT)
		opts.blanks[key] = (searchView != BASIC_SEARCH && !onLoad) ? (searchFields[key].blanks) : (onLoad && search[key + BLANKS] ? search[key + BLANKS] : BLANKS_DEFAULT)
	})

	console.log(fields_obj,opts)

	api.post(`${EQUIPMENT}/search`,{
		'fields': fields_obj,
		'options':opts

	}).then((response) => response.data).then((data) => {
		console.log(data)
		if(data.status == 200 && data.editable){
			setEditable(data.editable)
			//getDropDownItems()
		}
		setEquipments(data.status == 200 ? data.data : data)
		setLoading(false)
		setDisableSearchFields(false)
	}).catch(function (error) {
		setLoading(false)
		setEquipments([])
		setDisableSearchFields(false)
	});

	}

	const handleSearchView = (e) => {
		setSearchView(e.target.value)
	}

	const handleUpdate = async (rowData) => {

		let result = {}
		console.log(`${EQUIPMENT} Call`)
		//setLoading(true)
		await api.post(`${EQUIPMENT}/update`,{params:rowData}).then((response) => response.data).then((data) => {
			result = data
			//setLoading(false)
			//setEquipments(data.status != 400 ? data.data : data)
			// this.setState({
			// 	equipments: data.status != 400 ? data.values: data,
			// 	setequipment: data
			// });
			//console.log(this.state.equipment.values);
			// console.log(this.props, this.state);
		}).catch(function (error) {
			//setLoading(false)
			//setEquipments([])
		});

		return(result)
	}

	const handleDelete = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
	await api.post(`${EQUIPMENT}/destroy`,{params:rowData}).then((response) => response.data).then((data) => {
		console.log(data)
		//setLoading(false)
		//setEquipments(data.status != 400 ? data.data : data)
		// this.setState({
		// 	equipments: data.status != 400 ? data.values: data,
		// 	setequipment: data
		// });
		//console.log(this.state.equipment.values);
		// console.log(this.props, this.state);
	}).catch(function (error) {
		//setLoading(false)
		//setEquipments([])
	});

	}

	const handleAdd = async (rowData) => {

	let result = {}
	//console.log('equipmentbyHraCall')
	//setLoading(true)
	await api.post(`${EQUIPMENT}/add`,{params:rowData}).then((response) => response.data).then((data) => {
		result = data
		console.log(data)
		//setLoading(false)
		//setEquipments(data.status != 400 ? data.data : data)
		// this.setState({
		// 	equipments: data.status != 400 ? data.values: data,
		// 	setequipment: data
		// });
		//console.log(this.state.equipment.values);
		// console.log(this.props, this.state);
	}).catch(function (error) {
		//setLoading(false)
		//setEquipments([])
	});

	return result

	}

	const handleSwithcesChange = (event) => {
		setSwitches(prevState => {
			return{ ...prevState, [event.target.name]: event.target.checked }
		});
	  };

	const handleSearchKeyPress = (event) => {
		if(event.key == "Enter"){//enter key pressed.
		   handleSearch()
		}
	}

	//Functions.
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

	const materialTableSelect = () => {
		const cols = Object.keys(equipments[0])
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
				idx = findIndex(hras,function(e){ return (e.hra_num && (e.hra_num == x.rowData.hra_num)); })
			}
		
			return(
				<Autocomplete
				//onChange={e => x.onChange(e)}
				id={`combo-box-employee`}
				size="small"
				options={hras}
				getOptionLabel={(option) => option.hra_num + ' - ' + option.hra_first_name + ' ' + option.hra_last_name}
				value={idx != -1 ? hras[idx] : null}
				//defaultValue={idx != -1 ? employees[idx] : null}
				onChange ={e => {
				const hraNum_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
				console.log(hraNum_);
				x.onChange(hraNum_)
				}}
				//style={{ verticalAlign: 'top' }}
				renderInput={(params) => <TextField {...params} label="HRA" margin="normal"/>}
			/>
			)
			}
			},
			{ title: 'HRA First', field: 'hra_first_name',col_id:2.1,editable: 'never' },
			{ title: 'HRA Last', field: 'hra_last_name',col_id:2.2,editable: 'never' },
			{ title: 'Item Type', field: 'item_type',col_id:4  },
			{ title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric',col_id:5, validate: (rowData) => {

				if(rowData.hasOwnProperty('bar_tag_num')){
					if(!isNaN(rowData.bar_tag_num)) {
						if(typeof rowData.bar_tag_num === "number"){
							if(rowData.bar_tag_num.toString().length > 5){
								return ({ isValid: false, helperText: 'Bar Tag digits exceed 5.' })
							}else{
								const idx = findIndex(equipments,e => e.bar_tag_num == rowData.bar_tag_num)
								const propTableData = rowData.hasOwnProperty('tableData')//exists: editing, not exists: adding.

								if(propTableData && idx != -1){
									if(rowData.tableData.id != idx){
										return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
									}
								}else if (idx != -1 && !propTableData){
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
			// , validate: (rowData,dataIsOnDatabase) => {
			// 	try{
			// 	if(rowData.bar_tag_num.toString().length > 5){
			// 		return({ isValid: false, helperText: 'bar tag digits length cannot exceed 5.' })
			// 	}else if(dataIsOnDatabase.bar_tag_num){
			// 		dataIsOnDatabase.bar_tag_num = false
			// 		return({ isValid: false, helperText: 'bar tag exists in database.' })
			// 	}
			// 	}catch(err){
		
			// 	}
				
			// 	return(true)
			// }
			},
			{ title: 'Employee First', field: 'employee_first_name',col_id:6.1 ,editable: 'never' },
			{ title: 'Employee Last', field: 'employee_last_name',col_id:6.2,editable: 'never'  }
		]
		
		const ext_equipment_cols_config = [		
			{title: 'HRA Employee ID', field: 'hra_employee_id',editable: 'never',col_id:2.3 },
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
				size="small"
				options={employees}
				getOptionLabel={(option) => option.id + ' - ' + option.first_name + ' ' + option.last_name}
				value={idx != -1 ? employees[idx] : null}
				//defaultValue={idx != -1 ? employees[idx] : null}
				onChange ={e => {
		
					const id_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
					console.log(id_);
					x.onChange(id_)
				}}
				//style={{ verticalAlign: 'top' }}
				renderInput={(params) => <TextField {...params} label="Employee" margin="normal"/>}
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
				size="small"
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
				/>
				)
				}
			},
			editable ? {title:'Updated By',field:'updated_by_full_name',editable:'never' } : null
			]
		

		for(const col_config of equipment_cols_config){
			if(cols.includes(col_config.field)) columns.push(col_config)
		}

		if(switches.checkedView){
			let extended_columns = []
			
			for(const col_config of ext_equipment_cols_config){
				if(cols.includes(col_config.field)) extended_columns.push(col_config)
			}

			columns = [...columns,...extended_columns]
			columns = orderBy(columns,'col_id','asc')
		}

		return(
			<div style={{ maxWidth: '100%',paddingTop:'25px' }}>
				{editable ? 
					(<Grid container style={{paddingLeft:'20px', paddingTop:'10px', position:'absolute',zIndex:'200',width:'10%'}}>
						<FormGroup>
							<FormControlLabel
								control={<Switch color="primary" checked={switches.checkedView} onChange={handleSwithcesChange} name="checkedView" />}
								label={switches.checkedView ? "Extended View" : "Normal View"}
							/>
						</FormGroup>
					</Grid>) : null}
				<MaterialTable
				icons={tableIcons}
				columns={columns}
				data={equipments}
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
				{...(editable && {editable:{
					
					// isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
					//isEditHidden: rowData => rowData.name === 'x',
					// isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
					// isDeleteHidden: rowData => rowData.name === 'y',
					onBulkUpdate: async (changes) => {
					let result = await handleUpdate({changes:changes})
					let errorResult = result.columnErrors
					let {errorFound} = errorResult
					return(
						new Promise((resolve, reject) => {
						setTimeout(() => {
							/* setEquipments([...equipments, newData]); */
							console.log('bulk update')
							//console.log(changes)
							const keys = Object.keys(changes)//0 ,1,2
							let alert_ = ''

							for(const key of keys){
								const {newData,oldData} = changes[key]
								const errorStatus = errorResult.rows[key]

								console.log(newData,errorStatus)
								if(!errorFound){
								//no error
								resetEquipments()
								//const dataUpdate = [...equipments];
								//const index = oldData.tableData.id;
								//dataUpdate[index] = newData;
								//setEquipments([...dataUpdate]);
								}else{
								//error found.
								console.log('error found')
								//dataIsOnDatabase[Object.keys(errorStatus)[0]] = true
								const col_name = Object.keys(errorStatus)[0]
								const errorText = errorStatus[col_name]
								alert_ = alert_ + `row ${Number(key)+1}: ${col_name} - ${errorText}\n`
								}

								
								//console.log(errorStatus,newData)
								//const dataUpdate = [...equipments];
								//const index = oldData.tableData.id;
								//dataUpdate[index] = newData;
								//setEquipments([...dataUpdate]);
								//resolve();
							}

							if(alert_){
								//setAlertUser({success:{active:false,text:''},error:{active:true,text:alert_}})
								setAlertUser({...ALERT.FAIL,error:{active:true,text:alert_}})
								reject();
							}else{
								setAlertUser(ALERT.SUCCESS)
								resolve();
							}
							//for(const rowid of errorResult){}
							// if(Object.keys(errorResult).length > 0){
							//   console.log(errorResult)
							//   dataIsOnDatabase[Object.keys(errorResult)[0]] = true
							//   reject();
							// }else{
							//   for(const {newData,oldData} of changes){
							//     const dataUpdate = [...equipments];
							//     const index = oldData.tableData.id;
							//     dataUpdate[index] = newData;
							//     setEquipments([...dataUpdate]);
							//     resolve();
							//   }
							// }
						}, 1000);
					}))
					},
					onRowAddCancelled: rowData => console.log('Row adding cancelled'),
					onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
					onRowAdd: async (newData) => {
					let result = await handleAdd({changes:{'0':{newData:newData, oldData:null}}})
						return (new Promise((resolve, reject) => {
							setTimeout(() => {
							console.log(result.error)
							if(!result.error){
								setAlertUser(ALERT.SUCCESS)
								resetEquipments();
								resolve();
								return;
							}

							if(result.hasOwnProperty('columnErrors')) {
								if(result.columnErrors.hasOwnProperty('rows')) {
									setAlertUser({...ALERT.FAIL,error:{active:true,text:JSON.stringify(result.columnErrors.rows[0] ? result.columnErrors.rows[0] : 'error was found.')}})
								}
							}
								//setEquipments([...equipments, newData]);
								reject();
							}, 1000);
						}))
						},
					onRowUpdate: async (newData, oldData) => {
					let result = await handleUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
					let errorResult = result.columnErrors
						return (new Promise((resolve, reject) => {
							setTimeout(() => {
								
							if(errorResult.errorFound){
								const col_name = Object.keys(errorResult.rows[0])[0]
								dataIsOnDatabase[col_name] = true
								setAlertUser({...ALERT.FAIL,error:{active:true,text:'Error updating field.'}})
								reject();
								return;
							}
								resetEquipments();
								setAlertUser(ALERT.SUCCESS)
								//const dataUpdate = [...equipments];
								//const index = oldData.tableData.id;
								//dataUpdate[index] = newData;
								//setEquipments([...dataUpdate]);
								resolve();
							}, 1000);
						}))
					},
					// onRowDelete: async (oldData) => {
					// await handleDelete({changes:{'0':{newData:null, oldData:oldData}}})
					// 	new Promise((resolve, reject) => {
					// 		setTimeout(() => {
					// 			//const dataDelete = [...equipments];
					// 			//const index = oldData.tableData.id;
					// 			//dataDelete.splice(index, 1);
					// 			//setEquipments([...dataDelete]);
					// 			resolve();
					// 		}, 1000);
					// 	})
					// }
				}})}
				/>
		</div>
		)
	}

	const resetEquipments = () => {
		handleSearch(null,false,false);
	}

	const UpdateTextFields = async () => {

		const search_keys = Object.keys(search)
		const searchField_keys = Object.keys(searchFields)
		const field_keys = filter(search_keys,function(f){ return !f.includes(OPTS) && !f.includes(BLANKS) && searchField_keys.includes(f) })
		const option_keys = filter(search_keys,function(o){ return o.includes(OPTS)})
		const blank_keys = filter(search_keys,function(b){ return b.includes(BLANKS)})


		for(const fieldName of field_keys){
			console.log({target:{name: fieldName, value : search[fieldName]}})
			handleSearchFieldsChange({target:{name: fieldName, value : search[fieldName]}})
		}

		if(option_keys.length > 0 || blank_keys.length > 0) {
			setSearchView(AVD_SEARCH)

			for(const blankFieldName of option_keys){//Options
				const fieldName = blankFieldName.replace(OPTS,'')
				console.log(fieldName)
				handleSearchFieldsOptions({target:{name: fieldName, value : search[blankFieldName]}})

			}
		
			for(const optionsFieldName of blank_keys){//Blanks
				const fieldName = optionsFieldName.replace(BLANKS,'')
				console.log(optionsFieldName,fieldName)
				handleSearchFieldsBlanks({target:{name: fieldName, value : search[optionsFieldName]}})
			}

		}
	}

	const UpdateUrl = () => {
	let url = '?'
	const searchFieldKeys = Object.keys(searchFields)

	for(const key of searchFieldKeys) {
		if(searchFields[key].value) url = `${url}${url != '?' ? '&':''}${key}=${searchFields[key].value}`
		if(searchView != BASIC_SEARCH & searchFields[key].options != OPTIONS_DEFAULT) url = `${url}${url != '?' ? '&':''}${key + OPTS}=${searchFields[key].options}`
		if(searchView != BASIC_SEARCH & searchFields[key].blanks != BLANKS_DEFAULT) url = `${url}${url != '?' ? '&':''}${key + BLANKS}=${searchFields[key].blanks}`
	}

	props.history.replace(PAGE_URL + (url != '?' ? url : ''))
	}

	const reloadPage = () => {
		window.location.reload()
	}

	const getDropDownItems = () => {
			
		console.log('employeeCall')
		setLoading(true)
		api.get(`employee`,{}).then((response) => response.data).then((data) => {
			console.log(data)
			setLoading(false)
			setEmployees(data.status != 400 ? data.data : data)
			// this.setState({
			// 	equipments: data.status != 400 ? data.values: data,
			// 	setequipment: data
			// });
			//console.log(this.state.equipment.values);
			// console.log(this.props, this.state);
			}).catch(function (error) {
			setLoading(false)
			setEmployees([])
			});
	
		console.log('hraCall')
		api.get(`hra`,{}).then((response) => response.data).then((data) => {
			console.log(data)
			//setLoading(false)
			setHras(data.status != 400 ? data.data : data)
			// this.setState({
			// 	equipments: data.status != 400 ? data.values: data,
			// 	setequipment: data
			// });
			//console.log(this.state.equipment.values);
			// console.log(this.props, this.state);
			}).catch(function (error) {
			//setLoading(false)
			setHras([])
			});
		
		console.log('conditionsCall')
		api.get(`condition`,{}).then((response) => response.data).then((data) => {
			console.log(data)
			//setLoading(false)
			setCondition(data.status != 400 ? data.data : data)
			// this.setState({
			// 	equipments: data.status != 400 ? data.values: data,
			// 	setequipment: data
			// });
			//console.log(this.state.equipment.values);
			// console.log(this.props, this.state);
			}).catch(function (error) {
			//setLoading(false)
			setCondition([])
			});
		}

	const pageStart = async () => {

		console.log(`${EQUIPMENT} Call`)

		if(search){
			UpdateTextFields()
			handleSearch(null,true)
		}else{
			await api.get(EQUIPMENT,{}).then((response) => response.data).then((data) => {
				console.log(data)
				//setLoading(false)
				if(data.status == 200 && data.editable){
					setEditable(data.editable)
					getDropDownItems()
				}
				
				setEquipments(data.status == 200 ? data.data : data)
				setDisableSearchFields(false)
				
				// this.setState({
				// 	equipments: data.status != 400 ? data.values: data,
				// 	setequipment: data
				// });
				//console.log(this.state.equipment.values);
				// console.log(this.props, this.state);
				}).catch(function (error) {
				//setLoading(false)
				setEquipments([])
				setDisableSearchFields(false)
				});
		}
	}

	//will run once.
	React.useEffect(() => {

		console.log(api.getUri)

	function handleResize() {
		// Set window width/height to state
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	pageStart()

	// Add event listener
	window.addEventListener("resize", handleResize);
	
    // Call handler right away so state gets updated with initial window size
	handleResize();
	
    // Remove event listener on cleanup
	return () => window.removeEventListener("resize", handleResize);
	
	}, []);// Empty array ensures that effect is only run on mount

	React.useEffect(() => {
		if(props.history.action == "PUSH"){
			reloadPage()
		}
	}, [props.history.action]);

	React.useEffect(() => {
		//if(urlUpdatedByTextFields){
			console.log(history.action)
		//}else{
			//console.log('url was not updated by textfield')
		//}


	}, [history.action]);

	const searchTextFieldsGridItems = () => Object.keys(searchFields).map(key => {
		const nFields = Object.keys(searchFields).length
		const w = windowSize.width*.75 / nFields
	return(	
	<>
	<Grid item xs={Math.floor(12/nFields)}>                 
		<TextField
			id={`outlined-search-${key}`} 
			name={key} label={`Search by ${searchFields[key].label}`} 
			type="search" variant="outlined" 
			value={searchFields[key].value} 
			onChange={handleSearchFieldsChange}
			onKeyPress={handleSearchKeyPress}
			style={{width:w,paddingRight:'20px'}}
			InputLabelProps={{style: {fontSize: '.9vw'}}}
			InputProps={{
                readOnly: disableSearchFields,
              }}
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
	
	//Render return.
	return (
	<div>
		<div style={{textAlign: 'center'}}>
		<h2 >Equipment</h2>
		<Grid container justify="center">
			<Grid>
				<FormGroup>
					<FormControlLabel
						control={<Switch color="primary" checked={switches.showSearch} onChange={handleSwithcesChange} name="showSearch" />}
						label={switches.showSearch ? "Hide Search Fields" : "Show Search Fields"}
					/>
				</FormGroup>
			</Grid>
		</Grid>
		{switches.showSearch ?
		<>
		<FormControl component="fieldset">
			<RadioGroup row aria-label="position" name="position" value={searchView} onChange={handleSearchView}>
			<FormControlLabel value="std" control={<Radio color="primary" />} label="Basic Search" />
			<FormControlLabel value="adv" control={<Radio color="primary" />} label="Advanced Search" />
			</RadioGroup>
		</FormControl></> : null
		}		
		</div>
		{switches.showSearch ?
		<div style={{textAlign: 'center'}}>
		<form className={classesTextField.root} noValidate autoComplete="off">
			<div className={classesGrid.options}>
			<Grid container spacing={2}>
				{searchTextFieldsGridItems()}
				{searchButtonGridItem()}
			</Grid>
			</div>
		</form>
		</div> : null
		}
		
		{alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
		<div style={{textAlign: 'center'}}>
		{loading ? LoadingCircle() : null}
		{equipments.length > 0 ? materialTableSelect() : null}
		</div>
	</div>
	);
}

// export class AddProduct extends Component {

// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			equipments: [],
// 			currentEquipment: { id: null, item_type: '' },
// 			editing: false,
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
// 		//this.refreshEquipmentList();
// 	}

// 	refreshEquipmentList() {
// 		console.log('equipmentDataCALL')
// 		this.equipmentData = api.get('equipment', this.state).then((response) => response.data).then((data) => {
// 			console.log(data)
// 			// this.setState({
// 			// 	equipments: data.status != 400 ? data.values: data,
// 			// 	setequipment: data
// 			// });
// 			//console.log(this.state.equipment.values);
// 			// console.log(this.props, this.state);
// 		});
// 	}

// 	getEquipmentByHraID(hraID) {
// 		this.equipmentData = api.get(`/equipment/hra/${hraID}`, this.state).then((response) => response.data).then((data) => {
// 			console.log(data)
// 			// this.setState({
// 			// 	equipments: data.status != 400 ? data.values: data,
// 			// 	setequipment: data
// 			// });
// 			return(data.status != 400 ? data.values: data)
// 			//console.log(this.state.equipment.values);
// 			// console.log(this.props, this.state);
// 		});
// 	}

// 	addEquipment = (equipment) => {
// 		api.post('equipment', qs.stringify(equipment)).then((res) => {
// 			this.refreshEquipmentList();
// 		});
// 	};

// 	deleteEquipment = (id) => {
// 		api.delete(`equipment/${id}`).then((res) => {
// 			this.refreshEquipmentList();
// 		});
// 	};

// 	updateEquipment = (id, equipment) => {

// 		console.log(`equipment/${id}`,qs.stringify(equipment))
// 		api.patch(`equipment/${id}`, qs.stringify(equipment)).then((res) => {
// 			this.refreshEquipmentList();
// 		});

// 		this.setState({
// 			currentEquipment: { id: null, item_type: '' }
// 		});

// 		this.setEditing(false);
// 	};

// 	editRow = (equipment) => {
// 		console.log(equipment)
// 		this.setState({
// 			currentEquipment: { id: equipment.id, item_type: equipment.item_type }
// 		});

// 		this.setEditing(true);
// 	};

// 	setEditing = (isEditing) => {
// 		this.setState({ editing: isEditing });
// 	};

// 	// refreshCategoryTable() {
// 	// 	this.categoriesData = api.get('categories', this.state).then((response) => response.data).then((data) => {
// 	// 		this.setState({
// 	// 			categories: data.status != 400 ? data.values: data,
// 	// 			setCategories: data
// 	// 		});
// 	// 		//console.log(this.state.categories.values);
// 	// 		// console.log(this.props, this.state);
// 	// 	});
// 	// }

// 	// handlerChange = (e) => {
// 	// 	this.setState({ [e.target.name]: e.target.value });
// 	// };

// 	handlerSubmit = async () => {
// 		//window.event.preventDefault();
// 		//await this.props.dispatch(addProduct(this.state));
// 		//this.props.history.push('/products');
// 	};

// 	render() {
// 		return(
// 			<EquipmentForm/>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		products: state.products
// 	};
// };

// export default connect(mapStateToProps)(AddProduct);
