import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import {LoadingCircle} from './tools/tools';
import {tableIcons} from './material-table/config'
import MaterialTable from 'material-table'
import FormControl from '@material-ui/core/FormControl';
import api from '../axios/Api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import findIndex from 'lodash/findIndex'
import Header from './Header'

export default function Employee(props) {

	//Hooks Declarations.
	const [loading, setLoading] = React.useState(false);
	const [officesSymbol, setOfficesSymbol] = React.useState([]);
	const [employees, setEmployees] = React.useState([]);
	const [editable,setEditable] = React.useState(false)

	//Event Handlers.
	const handleTableUpdate = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
		await api.post(`employee/update`,{params:rowData}).then((response) => response.data).then((data) => {
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
		await api.post(`employee/destroy`,{params:rowData}).then((response) => response.data).then((data) => {
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
	await api.post(`employee/add`,{params:rowData}).then((response) => response.data).then((data) => {
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

	//Styles Declarations

	//Functions Declarations.
	const resetEmployees = () => {
	api.get(`employee`).then((response) => response.data).then((data) => {
		console.log(data)
		//setLoading(false)
		setEmployees(data.status === 200 ? data.data : data)
		// this.setState({
		// 	equipments: data.status != 400 ? data.values: data,
		// 	setequipment: data
		// });
		//console.log(this.state.equipment.values);
		// console.log(this.props, this.state);
	}).catch(function (error) {
		//setLoading(false)
		setEmployees([])
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
		{ title: 'Office Symbol ID', field: 'office_symbol',type:'numeric',
		editComponent: x => {
		//const table_id = x.rowData.tableData.id
		console.log(x);
		let idx = -1

		if(x.rowData.office_symbol){
			idx = findIndex(officesSymbol,function(o){ return (o.id && (o.id == x.rowData.office_symbol)); })
		}

		return(
			<Autocomplete
			//onChange={e => x.onChange(e)}
			id={`combo-box-employee-`}
			size="small"
			options={officesSymbol}
			getOptionLabel={(option) => option.id + ' - ' + option.alias}
			value={idx != -1 ? officesSymbol[idx] : null}
			onChange ={e => {

			const id_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
			console.log(id_);
			x.onChange(id_)
			}}
			//style={{ verticalAlign: 'top' }}
			renderInput={(params) => <TextField {...params} label="Office Symbol" margin="normal"/>}
		/>
		)
		}},
		{title: 'Office Symbol',field:'office_symbol_alias',editable: 'never'},
		{ title: 'Work Phone', field: 'work_phone',type:'numeric',validate: rowData => {
		if(rowData.work_phone){
			return(rowData.work_phone.toString().length > 10 ? { isValid: false, helperText: 'phone number digits exceed 10.' } : true)
		}
		return(true)
		}},
		{title: 'Equipment Quantity',field:'employee_equipment_count',editable: 'never'}
	]

	if(editable) employee_cols_config.push({title:'Updated By',field:'updated_by_full_name',editable:'never' })

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
			
			{...(editable && {editable:{
				//isEditable: rowData => rowData.field !== 'id', // only name(a) rows would be editable
				//isEditHidden: rowData => rowData.name === 'x',
				// isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
				// isDeleteHidden: rowData => rowData.name === 'y',
				onBulkUpdate: async(changes) => {
					await handleTableUpdate({changes:changes})
						new Promise((resolve, reject) => {
							setTimeout(() => {
								//setEmployees([...employees, newData]);
								//console.log('bulk update')
								resetEmployees()
								resolve();
							}, 1000);
						})
					},
					onRowAddCancelled: rowData => console.log('Row adding cancelled'),
					onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
					onRowAdd: async (newData) =>{
					await handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
						new Promise((resolve, reject) => {
							setTimeout(() => {
								//setEmployees([...employees, newData]);
								resetEmployees();
								resolve();
							}, 1000);
						})
					},
					onRowUpdate: async (newData, oldData) =>{
					await handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
						new Promise((resolve, reject) => {
							setTimeout(() => {
								
								//const dataUpdate = [...employees];
								//const index = oldData.tableData.id;
								//dataUpdate[index] = newData;
								//setEmployees([...dataUpdate]);
								resetEmployees();
								resolve();
							}, 1000);
						})
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


	//Effects.
	React.useEffect(() => {
	console.log('employeeCall')
	setLoading(true)
		api.get(`employee`).then((response) => response.data).then((data) => {
		console.log(data)
		setLoading(false)
		setEmployees(data.status == 200 ? data.data : data)

		if(data.status == 200 && data.editable){
			setEditable(data.editable)
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

		console.log('officeSymbolCall')
	api.get(`officesymbol`,{}).then((response) => response.data).then((data) => {
		console.log(data)
		// setLoading(false)
		setOfficesSymbol(data.status === 200 ? data.data : data)
		// this.setState({
		// 	equipments: data.status != 400 ? data.values: data,
		// 	setequipment: data
		// });
		//console.log(this.state.equipment.values);
		// console.log(this.props, this.state);
		}).catch(function (error) {
		//setLoading(false)
		setOfficesSymbol([])
		});


	}, []);//will run once.

	React.useEffect(() => {
		if(props.history.action == "PUSH"){
			reloadPage()
		}
	}, [props.history.action]);

	//Render return.
	return (
		<>
		<Header/>
		<div>
			<div style={{textAlign: 'center'}}>
				<h2 >Employee</h2>
			</div>
			<div style={{textAlign: 'center'}}>
				{loading ? LoadingCircle() : null}
				{employees.length > 0 ? materialTableSelect() : null}
			</div>
		</div>
		</>
	);
  }





// import React, { Component } from 'react';
// import qs from 'querystring';
// import { connect } from 'react-redux';
// import { addProduct } from '../publics/actions/eng4900s';
// import api from '../axios/Api';
// import EmployeeForm from './forms/employee';

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
// 		//await this.props.dispatch(addProduct(this.state));
// 		//this.props.history.push('/products');
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
