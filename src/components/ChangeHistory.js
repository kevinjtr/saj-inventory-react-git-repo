import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import {LoadingCircle} from './tools/tools';
import MaterialTable from 'material-table'
import {tableIcons} from './material-table/config'
import api from '../axios/Api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import findIndex from 'lodash/findIndex'
import {TextField, InputLabel, MenuItem, Select, Grid, IconButton, FormControl, Radio, RadioGroup, FormControlLabel} from '@material-ui/core';

const DEFAULT_CHANGES_VIEW = 'equipment'

export default function ChangeHistory(props) {
	//Hooks Declarations
	const [loading, setLoading] = React.useState(false);
	const [searchView, setSearchView] = React.useState(DEFAULT_CHANGES_VIEW);
	const [changeHistoryData, setChangeHistoryData] = React.useState([]);

	//Event Handlers.
	const handleTableUpdate = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
		await api.post(`hra/update`,{params:rowData}).then((response) => response.data).then((data) => {
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
		

	// const tempProps = {...props};
	//  const searchResult = await tempProps.getEquipmentByHraID(hraId)
	//  if(!searchResult.error){
	//   equipments = searchResult.data
	//  }
	}

	const handleTableDelete = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
		await api.post(`hra/destroy`,{params:rowData}).then((response) => response.data).then((data) => {
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
		

	// const tempProps = {...props};
	//  const searchResult = await tempProps.getEquipmentByHraID(hraId)
	//  if(!searchResult.error){
	//   equipments = searchResult.data
	//  }
	}

	const handleTableAdd = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
	await api.post(`hra/add`,{params:rowData}).then((response) => response.data).then((data) => {
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
					{ title: 'Hra Number', field: 'hra_num', editable: 'onAdd', type:'numeric'},
					{ title: 'Employee ID', field: 'hra_employee_id',type:'numeric'},
					{ title: 'Employee First Name', field: 'hra_employee_id',editable: 'never' },
					{ title: 'Employee Last name', field: 'hra_last_name',editable: 'never' },
					{ title: 'Title', field: 'hra_title',editable: 'never' },
					{ title: 'Office Symbol', field: 'hra_office_symbol_alias',editable: 'never' },
					{ title: 'Work Phone', field: 'hra_work_phone',editable: 'never' },
					{ title: 'Equipment Quantity', field: 'hra_equipment_count',editable: 'never'}
				],
				employee: [
					{ title: 'ID', field: 'id',editable: 'never'},
					{ title: 'First Name', field: 'first_name' },
					{ title: 'Last name', field: 'last_name' },
					{ title: 'Title', field: 'title' },
					{ title: 'Office Symbol ID', field: 'office_symbol',type:'numeric'},
					{ title: 'Office Symbol Alias',field:'office_symbol_alias',editable: 'never'},
					{ title: 'Work Phone', field: 'work_phone',type:'numeric'},
					{ title: 'Equipment Quantity',field:'employee_equipment_count',editable: 'never'}
				],
				equipment: 	[
					{ title: 'HRA Number', field: 'hra_num', type:'numeric', col_id:2.0},
					{ title: 'HRA First', field: 'hra_first_name',col_id:2.1,editable: 'never' },
					{ title: 'HRA Last', field: 'hra_last_name',col_id:2.2,editable: 'never' },
					{ title: 'HRA Employee ID', field: 'hra_employee_id',editable: 'never' },
					{ title: 'Item Type', field: 'item_type',col_id:4  },
					{ title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric',col_id:5},
					{ title: 'Employee ID', field: 'employee_id', type:'numeric',col_id:6.0},
					{ title: 'Employee First', field: 'employee_first_name',col_id:6.1 ,editable: 'never' },
					{ title: 'Employee Last', field: 'employee_last_name',col_id:6.2,editable: 'never'  },
					{ title:'Acquisition Date',field:'acquisition_date',  type: 'date',col_id:1 },
					{ title:'Acquisition Price',field:'acquisition_price',type: 'numeric',col_id:7 },
					{ title:'Catalog Num',field:'catalog_num',col_id:8 },
					{ title:'Serial Num',field:'serial_num',col_id:9 },
					{ title:'Manufacturer',field:'manufacturer',col_id:10 },
					{ title:'Model',field:'model',col_id:11 },
					{ title:'Condition',field:'condition',col_id:12 }
				]
		}
		
		for(const col_config of cols_config[searchView]){
			if(cols.includes(col_config.field)) columns.push(col_config)
		}

		return(
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
				icons={tableIcons}
				columns={columns}
				data={changeHistoryData[searchView]}
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
				actions={[
					{
					  icon: tableIcons.Check,
					  tooltip: 'Save User',
					  onClick: (event, rowData) => alert("This will revert changes to bartag: " + rowData.bar_tag_num)
					}
				  ]}
				/>
			</div>
		)
		}

		return(<p>No Chnages Found.</p>)
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