import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import {LoadingCircle} from './tools/tools';
import {tableIcons} from './material-table/config'
import MaterialTable from 'material-table'
import FormControl from '@material-ui/core/FormControl';
import api from '../axios/Api';
import {Autocomplete, Alert} from '@material-ui/lab';
import findIndex from 'lodash/findIndex'
import {ALERT} from './tools/tools'
import {updateEmployeeApi,destroyEmployeeApi,addEmployeeApi,getAllEmployeesApi} from '../publics/actions/employee-api'
import { connect } from 'redux-bundler-react';
//import {officesSymbol} from './config/constants'

const autoCompleteStyles = makeStyles((theme) => ({
    options: {
      '& .MuiAutocomplete-option': {
        fontSize:'8px'
      },
    },
  }));
  

function Employee({history, userToken}) {

	//Hooks Declarations.
	const [loading, setLoading] = React.useState(false);
	const [officesSymbol, setOfficesSymbol] = React.useState([]);
	const [employees, setEmployees] = React.useState([]);
	const [rights, setRights] = React.useState({edit: false, add: false})
	const [alertUser, setAlertUser] = React.useState(ALERT.RESET);
	const [districtOfficeLocations, setDistrictOfficeLocations] = React.useState({});

	//Event Handlers.
	const handleTableUpdate = async (rowData) => {

		let errorFound = true
	//console.log('equipmentbyHraCall')
	//setLoading(true)
		await updateEmployeeApi(rowData, userToken).then((response) => response.data).then((data) => {

		const status = data.hasOwnProperty('status') ? data.status == 400 : false
		const error = data.hasOwnProperty('error') ? data.error : false

		if(status || error){
			setAlertUser(ALERT.FAIL())
		}else {
			errorFound = false
			setAlertUser(ALERT.SUCCESS)
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
	// const tempProps = {...props};
	//  const searchResult = await tempProps.getEquipmentByHraID(hraId)
	//  if(!searchResult.error){
	//   equipments = searchResult.data
	//  }
	}

	const handleTableDelete = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
		await destroyEmployeeApi(rowData, userToken).then((response) => response.data).then((data) => {
		console.log(data)

		const status = data.hasOwnProperty('status') ? data.status == 400 : false
		const error = data.hasOwnProperty('error') ? data.error : false

		if(status || error){
			setAlertUser(ALERT.FAIL())
		}else {
			setAlertUser(ALERT.SUCCESS)
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
			setAlertUser(ALERT.FAIL())
		}else {
			errorFound = false
			setAlertUser(ALERT.SUCCESS)
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

	// const tempProps = {...props};
	//  const searchResult = await tempProps.getEquipmentByHraID(hraId)
	//  if(!searchResult.error){
	//   equipments = searchResult.data
	//  }
	}

	//Styles Declarations
	const autoCompleteClasses = autoCompleteStyles()

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

	const cols = Object.keys(employees[0])
	let columns = []
	//considering moving to a config file.
	const employee_cols_config = [
		{ title: 'ID', field: 'id',editable: 'never'},
		{ title: 'First Name', field: 'first_name' },
		{ title: 'Last name', field: 'last_name', validate: (rowData) => {		
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
		{ title: 'Office Symbol', field: 'office_symbol', render: rowData => <a value={rowData.office_symbol}>{rowData.office_symbol_alias}</a>,
		editComponent: x => {
		let idx = -1

		if(x.rowData.office_symbol){
			idx = findIndex(officesSymbol,function(o){ return (o.office_symbol && (o.office_symbol == x.rowData.office_symbol)); })
		}

		
		return(
			<Autocomplete
			//onChange={e => x.onChange(e)}
			id={`combo-box-employee-office-symbol`}
			id={`combo-box-employee-office-symbol`}
			size="small"
			styles={{}}
			options={officesSymbol}
			getOptionLabel={(option) => option.office_symbol_alias}
			value={idx != -1 ? officesSymbol[idx] : null}
			onChange ={(e,v) => {
				if(v){
					if(v.hasOwnProperty('office_symbol')){
						x.onChange(v.office_symbol)
						return;
					}
				}

				x.onChange(v)
			}}
			//style={{ verticalAlign: 'top' }}
			renderInput={(params) => <TextField {...params} label="Office Symbol" margin="normal"/>}
			renderOption={(option) => <a style={{fontSize:'16px'}}>{option.office_symbol_alias}</a>}
		/>
		)
		}},
		{ title: 'Work Phone', field: 'work_phone',type:'numeric',validate: rowData => {
		if(rowData.work_phone){
			return(rowData.work_phone.toString().length > 10 ? { isValid: false, helperText: 'phone number digits exceed 10.' } : true)
		}
		return(true)
		}},
		{ title: 'Equipment Quantity',field:'employee_equipment_count',editable: 'never'},
		{ title: 'Office Location Name',field:'office_location_id',editable: 'onUpdate', render: rowData => <a value={rowData.office_location_id} >{rowData.office_location_name}</a>,
		editComponent: x => {
			let idx = -1

			if(x.rowData.office_location_id){
				idx = findIndex(districtOfficeLocations[x.rowData.district],function(o){ return (o.office_location_id && (o.office_location_id === x.rowData.office_location_id)); })
			}

			return(
				<Autocomplete
				id={`combo-box-employee-location`}
				key={`combo-box-employee-location`}
				size="medium"
				options={districtOfficeLocations[x.rowData.district]}
				getOptionLabel={(option) => option.office_location_name}
				value={idx != -1 ? districtOfficeLocations[x.rowData.district][idx] : null}
				onChange ={(e,v) => {
					if(v){
						if(v.hasOwnProperty('office_location_id')){
							x.onChange(v.office_location_id)
							return;
						}
					}

					x.onChange(v)
				}}

				renderInput={(params) => <TextField {...params} label="Name" margin="normal"/>}
				renderOption={(v) => <a style={{fontSize:'16px'}}>{v.office_location_name}</a>}
			/>
			)
		}}
	]

	if(rights.edit) employee_cols_config.push({title:'Updated By',field:'updated_by_full_name',editable:'never' })

	for(const col_config of employee_cols_config){
		if(col_config.hasOwnProperty('field') && col_config){
			if(cols.includes(col_config.field)) columns.push(col_config)
		}
	}

	return(
		<div style={{ maxWidth: '100%' }}>
			<MaterialTable
			icons={tableIcons}
			columns={columns}
			data={employees}
			localization={{
				toolbar: {
				searchPlaceholder: "Filter Search"
				}}}
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
			
			{...(rights.edit && {editable:{
				isEditable: rowData => rowData.employee_update_rights, // only name(a) rows would be editable
				//isEditHidden: rowData => rowData.name === 'x',
				// isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
				// isDeleteHidden: rowData => rowData.name === 'y',
				onBulkUpdate: async(changes) => {
					const errorResult = await handleTableUpdate({changes:changes})
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
		<div>
			<div style={{textAlign: 'center'}}>
				<h2 >Employee</h2>
			</div>
			{alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
			<div style={{textAlign: 'center'}}>
				{loading ? LoadingCircle() : null}
				{employees.length > 0 ? materialTableSelect() : null}
			</div>
		</div>
		</>
	);
  }

export default connect(
'selectUserToken',
Employee);



// import React, { Component } from 'react';
// import qs from 'querystring';
// import { connect } from 'react-redux';
// import { addProduct } from '../publics/actions/eng4900s';
// import api from '../axios/Api';

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
// 		this.equipmentData = api.get('employee', this.state).then((response) => response.data).then((data) => {
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
// 		//await this.dispatch(addProduct(this.state));
// 		//this.history.push('/products');
// 	};

// 	render() {
// 		//const { equipments } = this.state;

// 		return(
// 			<EmployeeForm
// 			/>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		products: state.products
// 	};
// };

// export default connect(mapStateToProps)(AddProduct);
