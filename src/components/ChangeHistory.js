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

const DEFAULT_CHANGES_VIEW = 'equipment'
const DB_ID_NAME = {equipment:'id', hra:'hra_num', employee:'id'}

export default function ChangeHistory(props) {
	//Hooks Declarations
	const [loading, setLoading] = React.useState(false);
	const [searchView, setSearchView] = React.useState(DEFAULT_CHANGES_VIEW);
	const [changeHistoryData, setChangeHistoryData] = React.useState([]);

	//Event Handlers.
	const handleUndo = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
	let result = {error:true}

		await api.post(`${searchView}/update`,{params:rowData}).then((response) => response.data).then((data) => {
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
        setSearchView(e.target.value)
	}
	
	const handleChangeHistoryDataChange= (e) => {
        setChangeHistoryData(e.target.value)
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
					{ title: 'Employee First Name', field: 'hra_employee_id',editable: 'never' },
					{ title: 'Employee Last name', field: 'hra_last_name',editable: 'never' },
					{ title: 'Title', field: 'hra_title',editable: 'never' },
					{ title: 'Office Symbol', field: 'hra_office_symbol_alias',editable: 'never' },
					{ title: 'Work Phone', field: 'hra_work_phone',editable: 'never' },
					{ title: 'Equipment Quantity', field: 'hra_equipment_count',editable: 'never'},
					{ title: 'Deleted', field: 'deleted', editable: 'never', type:'boolean'},
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
				]
		}
		
		for(const col_config of cols_config[searchView]){
			if(cols.includes(col_config.field)) columns.push(col_config)
		}

		return(
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
				icons={changeHistoryIcons}
				localization={{ body: { editRow: { deleteText: 'Are you sure you want to revert back to this data?',saveTooltip:"Yes",cancelTooltip:"No" }, deleteTooltip : "Undo" } }}
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
				editable={{
					onRowDelete: async (oldData) => {
						let result = await handleUndo({changes:{'0':{newData:oldData, oldData:{ [DB_ID_NAME[searchView]] : oldData[DB_ID_NAME[searchView]] }}}})
							return (new Promise((resolve, reject) => {
								setTimeout(() => {
								
								console.log(result)
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
				}}
				/>
			</div>
		)
		}

		return(<p>No Chnages Found.</p>)
	}

	const resetTable = () => {
		setLoading(true)
		api.get(`change-history/${searchView}`).then((response) => response.data).then((data) => {
		console.log(data)
		setLoading(false)
		setChangeHistoryData(data.status != 400 ? data.data : data)

		}).catch(function (error) {
		setLoading(false)
		setChangeHistoryData({error:true})
		});
	}
    
	//will run once.
	React.useEffect(() => {
	console.log('change-history call')
	setLoading(true)
		api.get(`change-history/${searchView}`).then((response) => response.data).then((data) => {
		console.log(data)
		setLoading(false)
		setChangeHistoryData(data.status != 400 ? data.data : data)

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

	//Render return.
	return (
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
			{changeHistoryData[searchView] ? materialTableSelect() : null}
		</div>
	</div>
	);
}