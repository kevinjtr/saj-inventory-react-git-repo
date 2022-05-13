import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import {LoadingCircle} from './tools/tools';
import MaterialTable from 'material-table'
import {changeHistoryIcons} from './material-table/config'
import api from '../axios/Api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import findIndex from 'lodash/findIndex'
import {TextField, InputLabel, MenuItem, Select, Grid, IconButton, FormControl, Radio, RadioGroup, FormControlLabel} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {ALERT} from './tools/tools';
import Header from './Header'
import {updateChangeHistoryByViewApi, getChangeHistoryByViewApi} from '../publics/actions/change-history-api'
import { connect } from 'redux-bundler-react';

const DEFAULT_CHANGES_VIEW = 'equipment'
const DB_ID_NAME = {equipment:'id', hra:'hra_num', employee:'id'}
// const ALERT = {
// 	SUCCESS: {success:{active:true,text:'Data was undo successful.'},error:{active:false,text:''}},
// 	FAIL: {success:{active:false,text:''},error:{active:true,text:'Could not undo data.'}},
// 	RESET: {success:{active:false,text:''},error:{active:false,text:''}},
// }

function ChangeHistory({history, userToken}) {
	//Hooks Declarations
	const [loading, setLoading] = React.useState(false);
	const [searchView, setSearchView] = React.useState(DEFAULT_CHANGES_VIEW);
	const [changeHistoryData, setChangeHistoryData] = React.useState([]);
	const [alertUser, setAlertUser] = React.useState(ALERT.RESET);
	const [editable, setEditable] = React.useState(false)

	//Event Handlers.
	const handleUndo = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
	let result = {error:true}

	await updateChangeHistoryByViewApi[searchView](rowData, userToken)
		// await api.post(`${searchView}/update`,{params:rowData})
		.then((response) => response.data).then((data) => {
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
		

	// const tempProps = {...props};
	//  const searchResult = await tempProps.getEquipmentByHraID(hraId)
	//  if(!searchResult.error){
	//   equipments = searchResult.data
	//  }
	}

    const handleSearchView = (e) => {
		setAlertUser(ALERT.RESET)
        setSearchView(e.target.value)
	}
	
	const handleChangeHistoryDataChange= (e) => {
        setChangeHistoryData(e.target.value)
	}
	
	const AlertUser = (x) => {

		if(x.error.active){
			return(<Alert variant="filled" severity="error">{x.error.text}</Alert>)
		}else if(x.success.active){
			return(<Alert variant="filled" severity="success">{x.success.text}</Alert>)
		}
	
		setAlertUser(ALERT.RESET)
		return(null)
	}

	//Functions.
	const materialTableSelect = () => {

		if(changeHistoryData[searchView].length > 0){
			const cols = Object.keys(changeHistoryData[searchView][0])
			let columns = []
			//considering move to a config file.
			let cols_config = 
			{
				hra: [
					{ title: 'Updated Date', field: 'updated_date', editable: 'never', type:'date'},
					{ title: 'HRA Number', field: 'hra_num', editable: 'never', type:'numeric'},
					{ title: 'Employee ID', field: 'hra_employee_id',type:'numeric', editable: 'never'},
					{ title: 'Employee First Name', field: 'hra_first_name',editable: 'never' },
					{ title: 'Employee Last name', field: 'hra_last_name',editable: 'never' },
					{ title: 'Title', field: 'hra_title',editable: 'never' },
					{ title: 'Office Symbol', field: 'hra_office_symbol_alias',editable: 'never' },
					{ title: 'Work Phone', field: 'hra_work_phone',editable: 'never' },
					{ title: 'Equipment Quantity', field: 'hra_equipment_count',editable: 'never'},
					{ title: 'Deleted', field: 'deleted', editable: 'never', type:'boolean'},
					{title:'Updated By',field:'updated_by_full_name',editable:'never' }
				],
				employee: [
					{ title: 'Updated Date', field: 'updated_date', editable: 'never', type:'date'},
					{ title: 'ID', field: 'id', editable: 'never'},
					{ title: 'First Name', field: 'first_name', editable: 'never' },
					{ title: 'Last name', field: 'last_name', editable: 'never' },
					{ title: 'Title', field: 'title', editable: 'never' },
					{ title: 'Office Symbol ID', field: 'office_symbol',type:'numeric', editable: 'never'},
					{ title: 'Office Symbol Alias',field:'office_symbol_alias',editable: 'never'},
					{ title: 'Work Phone', field: 'work_phone',type:'numeric', editable: 'never'},
					{ title: 'Equipment Quantity',field:'employee_equipment_count',editable: 'never'},
					{ title: 'Deleted', field: 'deleted', editable: 'never', type:'boolean'},
					{title:'Updated By',field:'updated_by_full_name',editable:'never' }
				],
				equipment: 	[
					{ title: 'Updated Date', field: 'updated_date', editable: 'never', type:'date'},
					{ title: 'HRA Number', field: 'hra_num', type:'numeric',editable: 'never'},
					{ title: 'HRA First', field: 'hra_first_name',editable: 'never' },
					{ title: 'HRA Last', field: 'hra_last_name',editable: 'never' },
					{ title: 'HRA Employee ID', field: 'hra_employee_id',editable: 'never' },
					{ title: 'Item Type', field: 'item_type', editable: 'never'},
					{ title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric', editable: 'never'},
					{ title: 'Employee ID', field: 'employee_id', type:'numeric', editable: 'never'},
					{ title: 'Employee First', field: 'employee_first_name', editable: 'never' },
					{ title: 'Employee Last', field: 'employee_last_name', editable: 'never'  },
					{ title:'Acquisition Date',field:'acquisition_date',  type: 'date', editable: 'never' },
					{ title:'Acquisition Price',field:'acquisition_price',type: 'numeric', editable: 'never' },
					{ title:'Catalog Num',field:'catalog_num', editable: 'never'},
					{ title:'Serial Num',field:'serial_num', editable: 'never' },
					{ title:'Manufacturer',field:'manufacturer', editable: 'never'},
					{ title:'Model',field:'model', editable: 'never'},
					{ title:'Condition',field:'condition', editable: 'never'},
					{ title: 'Deleted', field: 'deleted', editable: 'never', type:'boolean'},
					{title:'Updated By',field:'updated_by_full_name',editable:'never' }
				],
				eng4900: [
					//{ title: 'Item No.', field: 'hra_num', type:'numeric', editable:'never'},
					{ title: 'Requested Action', field: 'requested_action',editable: 'never'},
					{ title: 'Losing HRA Num', field: 'losing_hra_num',editable: 'never' },
					{ title: 'Losing HRA First', field: 'losing_hra_first_name',editable: 'never' },
					{ title: 'Losing HRA Last', field: 'losing_hra_last_name',editable: 'never' },
					{ title: 'Gaining HRA Num', field: 'gaining_hra_num',editable: 'never' },
					{ title: 'Gaining HRA First', field: 'gaining_hra_first_name',editable: 'never' },
					{ title: 'Gaining HRA Last', field: 'gaining_hra_last_name',editable: 'never' },
					{ title: 'Date Created', field: 'date_created',editable: 'never' },
					{ title: 'Serial Number', field: 'serial_num',editable: 'never' },
					{ title: 'Folder Link', field: 'folder_link',editable: 'never',type:'date' },
					{ title: 'Equipment Group ID', field: 'equipment_group_id',editable: 'never'},
					{ title: 'Expiration Date', field: 'expiration_date',editable: 'never'},
					{title:'Updated By',field:'updated_by_full_name',editable:'never' }
				  ]
		}
		
		for(const col_config of cols_config[searchView]){
			if(cols.includes(col_config.field)) columns.push(col_config)
		}

		return(
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
				icons={changeHistoryIcons}
				localization={{
					toolbar: {
						searchPlaceholder: "Filter"
					},
					body: {
						editRow: {
							deleteText: 'Are you sure you want to revert back to this data?',saveTooltip:"Yes",cancelTooltip:"No"
						},
						deleteTooltip : "Undo" 
					}
				}}
				columns={columns}
				data={changeHistoryData[searchView]}
				options={{
					headerStyle: {
					backgroundColor: "#969696",
					color: "#FFF",
					fontWeight: 'bold',
				}
				}}
				title=""
				{...(editable && {editable:{
					onRowDelete: async (oldData) => {
						setAlertUser(ALERT.RESET)
						let result = await handleUndo({changes:{'0':{newData:oldData, oldData:{ [DB_ID_NAME[searchView]] : oldData[DB_ID_NAME[searchView]] }}},undo:true})
							return (new Promise((resolve, reject) => {
								setTimeout(() => {
								
								console.log(result)

								if(!result.error){
									setAlertUser(ALERT.SUCCESS)
									resolve()
								}else{
									setAlertUser(ALERT.FAIL())
									reject()
								}
								// if(result.error){
								// 	//onst col_name = Object.keys(result.data[0])[0]
								// 	//dataIsOnDatabase[col_name] = true
								// 	reject();
								// }else{
								// 	resetTable()
								// 	//resetEmployees();
								// 	//const dataUpdate = [...equipments];
								// 	//const index = oldData.tableData.id;
								// 	//dataUpdate[index] = newData;
								// 	//setEquipments([...dataUpdate]);
								 	resolve();
								// }
								}, 1000);
							}))
						}
				}})}
				/>
			</div>
		)
		}

		return(<p>No Changes Found.</p>)
	}

	const resetTable = () => {
		setLoading(true)
		getChangeHistoryByViewApi(searchView, userToken)
		//api.get(`change-history/${searchView}`)
		.then((response) => response.data).then((data) => {
		console.log(data)
		setLoading(false)
		setChangeHistoryData(data.status != 400 ? data.data : data)

		}).catch(function (error) {
		setLoading(false)
		setChangeHistoryData({error:true})
		});
	}

	const reloadPage = () => {
		window.location.reload()
	}

    
	//Effects.
	React.useEffect(() => {
	console.log('change-history call')
	setLoading(true)
	getChangeHistoryByViewApi(searchView, userToken)
		//api.get(`change-history/${searchView}`)
		.then((response) => response.data).then((data) => {
		console.log(data)
		setLoading(false)
		setChangeHistoryData(data.status != 400 ? data.data : data)

		if(data.hasOwnProperty('editable')){
			setEditable(data.editable)
		}

		}).catch(function (error) {
		setLoading(false)
		setChangeHistoryData({error:true})
		});

	// console.log('employeeCall')
	// api.get(`employee`,{}).then((response) => response.data).then((data) => {
	// 	console.log(data.data)
	// 	// setLoading(false)
	// 	setEmployees(data.status != 400 ? data.data : data)
	// 	// this.setState({
	// 	// 	equipments: data.status != 400 ? data.values: data,
	// 	// 	setequipment: data
	// 	// });
	// 	//console.log(this.state.equipment.values);
	// 	// console.log(this.props, this.state);
	// 	}).catch(function (error) {
	// 	//setLoading(false)
	// 	setEmployees([])
	// 	});


	}, [searchView]);

	// React.useEffect(() => {
	// 	if(history.action == "PUSH"){
	// 		reloadPage()
	// 	}
	// }, [history.action]);

	//Render return.
	return (
	<>
	<div>
		<div style={{textAlign: 'center'}}>
			<h2 >Change History</h2>
            <FormControl component="fieldset">
			<RadioGroup row aria-label="position" name="position" value={searchView} onChange={handleSearchView}>
			<FormControlLabel value="equipment" control={<Radio color="primary" />} label="Equipment Changes" />
			<FormControlLabel value="hra" control={<Radio color="primary" />} label="HRA Changes" />
            <FormControlLabel value="employee" control={<Radio color="primary" />} label="Employee Changes" />
            {/* <FormControlLabel value="eng4900" control={<Radio color="primary" />} label="Eng4900 Changes" /> */}
            {/* <FormControlLabel value="4844" control={<Radio color="primary" />} label="Eng4844 Changes" /> */}
			</RadioGroup>
		</FormControl>
		</div>
		<div style={{textAlign: 'center'}}>
			{loading ? LoadingCircle() : null}
			{alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
			{changeHistoryData[searchView] ? materialTableSelect() : null}
		</div>
	</div>
	</>
	);
}

export default connect(
	'selectUserToken',
	ChangeHistory);  