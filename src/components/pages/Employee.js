import React, { useState } from 'react';
import 'date-fns';
import { LoadingCircle } from '../tools/tools';
import { tableIcons } from '../material-table/config'
import MuiTable from '../material-table'
import MaterialTable from '@material-table/core'
import { find, findIndex } from 'lodash'
import { updateEmployeeApi, destroyEmployeeApi, addEmployeeApi, getAllEmployeesApi } from '../../publics/actions/employee-api'
import { connect } from 'redux-bundler-react';
import { v4 as uuid } from 'uuid';
import { IconButton, TextField, InputAdornment, Autocomplete } from '@mui/material';
import { FilterList as FilterListIcon, Clear as ClearIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';

function Employee({history, userToken}) {

	//Hooks Declarations.
	const [loading, setLoading] = React.useState(false);
	const [officesSymbol, setOfficesSymbol] = React.useState([]);
	const [employees, setEmployees] = React.useState([]);
	const [rights, setRights] = React.useState({edit: false, add: false})
	const [districtOfficeLocations, setDistrictOfficeLocations] = React.useState({});

	console.log(districtOfficeLocations)
	//Event Handlers.
	const handleTableUpdate = async (rowData) => {

		let errorFound = true
	//console.log('equipmentbyHraCall')
	//setLoading(true)
		await updateEmployeeApi(rowData, userToken).then((response) => response.data).then((data) => {

		const status = data.hasOwnProperty('status') ? data.status == 400 : false
		const error = data.hasOwnProperty('error') ? data.error : false

		if(status || error){
			toast.error('Could not complete action')
		}else {
			errorFound = false
			toast.success('Action was completed')
		}

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
		

		return errorFound
	}

	const handleTableDelete = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
		await destroyEmployeeApi(rowData, userToken).then((response) => response.data).then((data) => {
		console.log(data)

		const status = data.hasOwnProperty('status') ? data.status == 400 : false
		const error = data.hasOwnProperty('error') ? data.error : false

		if(status || error){
			toast.error('Could not complete action')
		}else {
			toast.success('Action was completed')
		}
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
	let errorFound = true

	await addEmployeeApi(rowData, userToken).then((response) => response.data).then((data) => {
		console.log(data)

		const status = data.hasOwnProperty('status') ? data.status == 400 : false
		const error = data.hasOwnProperty('error') ? data.error : false

		if(status || error){
			toast.error('Could not complete action')
		}else {
			errorFound = false
			toast.success('Action was completed')
		}

		
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
		
		return errorFound
	}

	//Functions Declarations.
	const resetEmployees = () => {
		setLoading(true)
		getAllEmployeesApi(userToken).then((response) => response.data).then((data) => {
		console.log(data)
		//setLoading(false)
		setEmployees(data.status === 200 ? data.data : data)
		// this.setState({
		// 	equipments: data.status != 400 ? data.values: data,
		// 	setequipment: data
		// });
		//console.log(this.state.equipment.values);
		// console.log(this.props, this.state);
		setLoading(false)
	}).catch(function (error) {
		//setLoading(false)
		setEmployees([])
		setLoading(false)
	});
	}

	const materialTableSelect = () => {

	//const cols = Object.keys(employees[0])
	//let columns = []
	//considering moving to a config file.
	const employee_cols_config = [
		{ title: 'ID', field: 'id',editable: 'never'},
		{ title: 'First Name', field: 'first_name' },
		{ title: 'Last name', field: 'last_name', cellStyle: {
			minWidth: 200,
			maxWidth: 200
		  }, validate: (rowData) => {		
			if(rowData.hasOwnProperty('last_name')){
				if(rowData.last_name) {
					if(rowData.hasOwnProperty('tableData')){
						if(rowData.tableData.editing === "update"){
							return true
						}
					}

					return true
				}
			}
			
			return ({ isValid: false, helperText: 'Last Name is required.' })

		}},
		{ title: 'Title', field: 'title' },
		{ title: 'Office Symbol', field: 'office_symbol', customFilterAndSearch: (term, rowData, column) => {
			if (rowData.office_symbol_alias) {
			  return rowData.office_symbol_alias.toString()?.toUpperCase().includes(term.toUpperCase())
			}
			return false
		  }, render: rowData => <a value={rowData.office_symbol}>{rowData.office_symbol_alias}</a>,
		editComponent: props => (
			<Autocomplete
				value={props.value ? find(officesSymbol,function(os){ return os.office_symbol === props.value}) : null}
				onChange={(e, nv) => { 
					if(nv?.office_symbol){
						props.onChange(nv.office_symbol) 
						return;
					}
					props.onChange(nv)
				}}
				key={`combo-box-${uuid()}`}
				options={officesSymbol}
				getOptionLabel={(option) => option.office_symbol_alias}
				renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.office_symbol_alias}</li>}
				style={{ width: 250 }}
				renderInput={(params) => <TextField {...params} variant={"standard"} helperText="Office Symbol" margin="normal"/>}
		/>),
	},
		{ title: 'Work Phone', field: 'work_phone',type:'numeric',validate: rowData => {
		if(rowData.work_phone){
			return(rowData.work_phone.toString().length > 10 ? { isValid: false, helperText: 'phone number digits exceed 10.' } : true)
		}
		return(true)
		}},
		{ title: 'Email',field:'email',editable: 'never'},
		{ title: 'Equipment Quantity',field:'employee_equipment_count',editable: 'never'},
		// { title: 'Office Location Name',field:'office_location_id',editable: 'onUpdate', render: rowData => <a value={rowData.office_location_id} >{rowData.office_location_name}</a>,
		// editComponent: props => (
		// 	<Autocomplete
		// 		value={props.value ? find(districtOfficeLocations?.[props.rowData?.district],function(os){ return os.office_symbol === props.value}) : null}
		// 		onChange={(e, nv) => { 
		// 			if(nv?.office_symbol){
		// 				props.onChange(nv.office_symbol) 
		// 				return;
		// 			}
		// 			props.onChange(nv)
		// 		}}
		// 		key={`combo-box-${uuid()}`}
		// 		options={districtOfficeLocations?.[props.rowData?.district]}
		// 		getOptionLabel={(option) => option.office_location_name}
		// 		style={{ width: 250 }}
		// 		renderInput={(params) => <TextField {...params} label="Office Location" margin="normal"/>}
		// />),
		// },
		{ title: 'Office Location Name',field:'office_location_id',editable: 'onUpdate', customFilterAndSearch: (term, rowData, column) => {
			if (rowData.office_location_name) {
			  return rowData.office_location_name.toString()?.toUpperCase().includes(term.toUpperCase())
			}
			return false
		}, render: rowData => <a value={rowData.office_location_id} >{rowData.office_location_name}</a>, //filterComponent: (props) => <CustomFilterTextField {...props} />,
        editComponent: props => {
          console.log(props)

          return (
            <Autocomplete
                  value={props.value ? find(districtOfficeLocations?.[props.rowData?.district],function(os){ return os.office_location_id  === props.value}) : null}
                  onChange={(e, nv) => {
                    if(nv?.office_location_id){
                      props.onChange(nv.office_location_id) 
                      return;
                    }
                    props.onChange(nv)
                  }}
                  
                  key={`combo-box-${uuid()}`}
                  options={districtOfficeLocations[props.rowData.district]}
                  getOptionLabel={(option) => option.office_location_name}
				  renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.office_location_name}</li>}
                  style={{ width: 250 }}
                  renderInput={(params) => <TextField {...params} helperText="Office Location Name" variant="standard" />}
            />)
        },
          validate: (rowData) => {
              if(rowData.hasOwnProperty('office_location_id')){
                  if(!isNaN(rowData.office_location_id)) {
                    if(rowData.office_location_id){
                      const idx = findIndex(districtOfficeLocations[rowData?.district],function(e){ return (e.office_location_id && (e.office_location_id == rowData.office_location_id)); })
                      return idx != -1
                    }
                  }
              }
    
              return true
          }
        },
		// editComponent: x => {
		// 	let idx = -1

		// 	if(x.rowData.office_location_id){
		// 		idx = findIndex(districtOfficeLocations[x.rowData.district],function(o){ return (o.office_location_id && (o.office_location_id === x.rowData.office_location_id)); })
		// 	}

		// 	return(
		// 		<Autocomplete
		// 		id={`combo-box-employee-location`}
		// 		key={`combo-box-employee-location`}
		// 		size="medium"
		// 		options={districtOfficeLocations[x.rowData.district]}
		// 		getOptionLabel={(option) => option.office_location_name}
		// 		value={idx != -1 ? districtOfficeLocations[x.rowData.district][idx] : null}
		// 		onChange ={(e,v) => {
		// 			if(v){
		// 				if(v.hasOwnProperty('office_location_id')){
		// 					x.onChange(v.office_location_id)
		// 					return;
		// 				}
		// 			}

		// 			x.onChange(v)
		// 		}}

		// 		renderInput={(params) => <TextField {...params} label="Name" margin="normal"/>}
		// 		renderOption={(v) => <a style={{fontSize:'16px'}}>{v.office_location_name}</a>}
		// 	/>
		// 	)
		// }}
	]

	if(rights.edit) employee_cols_config.push({title:'Updated By',field:'updated_by_full_name',editable:'never' })

	// for(const col_config of employee_cols_config){
	// 	if(col_config.hasOwnProperty('field') && col_config){
	// 		if(cols.includes(col_config.field)) columns.push(col_config)
	// 	}
	// }

	return(
		<div style={{ maxWidth: '100%' }}>
			<MuiTable
			name={'Employee'}
			componentName={'employee'}
			addProps={{
				sx:{height: 35, width: 180}
			}}
			fetchKey={'id'}
			showHistory={true}
			isLoading={loading}
			exportButton={true}
			icons={tableIcons}
			columns={employee_cols_config}
			data={employees}
			options={{
				exportButton: true,
				//exportAllData: true,
				headerStyle: {
				backgroundColor: "#969696",
				color: "#FFF",
				fontWeight: 'bold',
			}
			
			}}
			title=""
			
			{...(rights.edit && {editable:{
				isEditable: rowData => rowData.employee_update_rights, // only name(a) rows would be editable
				//isEditHidden: rowData => rowData.name === 'x',
				// isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
				// isDeleteHidden: rowData => rowData.name === 'y',
				// onBulkUpdate: async(changes) => {
				// 	const errorResult = await handleTableUpdate({changes:changes})
				// 		return(new Promise((resolve, reject) => {
				// 			setTimeout(() => {
				// 				if(errorResult){
				// 					reject()
				// 					return;
				// 				}

				// 				resetEmployees();
				// 				resolve();
								
				// 			}, 1000);
				// 		}))
				// 	},
					onRowAddCancelled: rowData => console.log('Row adding cancelled'),
					onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
					onRowAdd: rights.add ? async (newData) => {
					const errorResult = await handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
						return(new Promise((resolve, reject) => {
							setTimeout(() => {
								if(errorResult){
									reject()
									return;
								}

								resetEmployees();
								resolve();
								
							}, 1000);
						}))
					} : undefined,
					onRowUpdate: async (newData, oldData) =>{
						const errorResult = await handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
						return(new Promise((resolve, reject) => {
							setTimeout(() => {
								if(errorResult){
									reject()
									return;
								}

								resetEmployees();
								resolve();
									
							}, 1000);
						}))
						},
					// onRowDelete: async (oldData) => {
					// await handleTableDelete({changes:{'0':{newData:null, oldData:oldData}}})
					// 	new Promise((resolve, reject) => {
					// 		setTimeout(() => {
					// 			//const dataDelete = [...employees];
					// 			//const index = oldData.tableData.id;
					// 			//dataDelete.splice(index, 1);
					// 			//setEmployees([...dataDelete]);
					// 			resolve();
					// 		}, 1000);
					// 	})
					// }
			}})}
			/>
		</div>
	)
	}

	const reloadPage = () => {
		window.location.reload()
	}

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

	//Effects.
	React.useEffect(() => {
	console.log('employeeCall')
	setLoading(true)
		getAllEmployeesApi(userToken).then((response) => response.data).then((data) => {
		console.log(data)
		setLoading(false)
		setEmployees(data.status == 200 ? data.data : data)

		if(data.status == 200 && Object.keys(data.rights).length > 0){
			setRights(data.rights)
		}

		if(Object.keys(data.district_office_locations).length > 0){
			setDistrictOfficeLocations(data.district_office_locations)
		}

		if(Object.keys(data.office_symbol).length > 0){
			console.log('office_symbol_update')
			setOfficesSymbol(data.office_symbol)
		}		

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

	// 	console.log('officeSymbolCall')
	// api.get(`officesymbol`,{}).then((response) => response.data).then((data) => {
	// 	console.log(data)
	// 	// setLoading(false)
	// 	setOfficesSymbol(data.status === 200 ? data.data : data)
	// 	// this.setState({
	// 	// 	equipments: data.status != 400 ? data.values: data,
	// 	// 	setequipment: data
	// 	// });
	// 	//console.log(this.state.equipment.values);
	// 	// console.log(this.props, this.state);
	// 	}).catch(function (error) {
	// 	//setLoading(false)
	// 	setOfficesSymbol([])
	// 	});


	}, []);//will run once.

	// React.useEffect(() => {
	// 	if(history.action == "POP"){
	// 		reloadPage()
	// 	}
	// }, [history.action]);

	//Render return.
	return (
		<>
			<div style={{textAlign: 'center',paddingBottom: 10 }}>
				<h2 >Employee</h2>
			</div>
			<div style={{textAlign: 'center'}}>
				{materialTableSelect()}
			</div>
		</>
	);
  }

export default connect(
'selectUserToken',
Employee);