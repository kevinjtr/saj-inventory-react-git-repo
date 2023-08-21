import React from 'react';
import TextField from '@mui/material/TextField';
import 'date-fns';
import { LoadingCircle } from '../tools/tools';
import MaterialTable from '@material-table/core'
import { tableIcons } from '../material-table/config'
import { Autocomplete } from '@mui/material';
import { findIndex, find } from 'lodash'
import { updateHraApi,destroyHraApi,addHraApi,getAllHrasApi, hraSearchApi } from '../../publics/actions/hra-api'
import { getAllEmployeesApi } from '../../publics/actions/employee-api'
import { connect } from 'redux-bundler-react';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';

function Hra({ history, userToken }) {
	//Hooks Declarations
	const [loading, setLoading] = React.useState(false);
	const [employees, setEmployees] = React.useState([]);
	const [hras, setHras] = React.useState([]);
	const [editable,setEditable] = React.useState(false)

	//Event Handlers.
	const handleTableUpdate = async (rowData) => {
		let errorFound = true

		await updateHraApi(rowData, userToken).then((response) => response.data).then((data) => {
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
		// const tempProps = {...props};
		//  const searchResult = await tempProps.getEquipmentByHraID(hraId)
		//  if(!searchResult.error){
		//   equipments = searchResult.data
		//  }
	}

	const handleTableDelete = async (rowData) => {
		await destroyHraApi(rowData, userToken).then((response) => response.data).then((data) => {

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
		let errorFound = true
		await addHraApi(rowData, userToken).then((response) => response.data).then((data) => {
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
		// const tempProps = {...props};
		//  const searchResult = await tempProps.getEquipmentByHraID(hraId)
		//  if(!searchResult.error){
		//   equipments = searchResult.data
		//  }
	}
	
	//Functions.
	const materialTableSelect = () => {

	const cols = Object.keys(hras[0])
	let columns = []
	//considering move to a config file.
	let hras_cols_config = [
		{ title: 'HRA Number', field: 'hra_num', editable: 'onAdd', type:'numeric', validate: (rowData) => {
				if(rowData.hasOwnProperty('hra_num')){
					if(!isNaN(rowData.hra_num)) {
						if(rowData.hasOwnProperty('tableData')){
							if(rowData.tableData.editing === "update"){
								return true
							}
						}					
			
						if(typeof rowData.hra_num == "number"){
							console.log('isnumber')
							if(rowData.hra_num.toString().length > 3){
								return ({ isValid: false, helperText: 'HRA digits exceed 3.' })
							}else if( findIndex(hras,h => h.hra_num == rowData.hra_num) != -1 ){
								return ({ isValid: false, helperText: 'Duplicated HRA num.' })
							}

							return true
						}
			
						if(typeof rowData.hra_num === "string"){
							return ({ isValid: false, helperText: 'HRA number needs to be numeric.' })
						}
					}
				}
				
				return ({ isValid: false, helperText: 'HRA number is required.' })

			}
		},
		{ title: 'Employee ID', field: 'hra_employee_id',type:'numeric',
			editComponent: props => (
				<Autocomplete
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
					renderInput={(params) => <TextField {...params} label="Employee" variant="outlined" />}
				/>)
		},
		{ title: 'Employee First Name', field: 'hra_first_name',editable: 'never' },
		{ title: 'Employee Last name', field: 'hra_last_name',editable: 'never' },
		{ title: 'Title', field: 'hra_title',editable: 'never' },
		{ title: 'Office Symbol', field: 'hra_office_symbol_alias',editable: 'never' },
		{ title: 'Work Phone', field: 'hra_work_phone',editable: 'never' },
		{ title: 'Equipment Quantity', field: 'hra_equipment_count',editable: 'never'}
	]

	if(editable) hras_cols_config.push({title:'Updated By',field:'updated_by_full_name',editable:'never' })

	for(const col_config of hras_cols_config){
		if(col_config.hasOwnProperty('field') && col_config){
			if(cols.includes(col_config.field)) columns.push(col_config)
		}
	}

	return(
		<div style={{ maxWidth: '100%' }}>
			<MaterialTable
			icons={tableIcons}
			columns={columns}
			data={hras}
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
				// onBulkUpdate: async (changes) => {
				// 	const errorResult = await handleTableUpdate({changes:changes})
				// 		return(new Promise((resolve, reject) => {
				// 			setTimeout(() => {
				// 				if(errorResult){
				// 					reject()
				// 					return
				// 				}
								
				// 				resetHras()
				// 				resolve();
				// 			}, 1000);
				// 		}))
				// 	},
					onRowAddCancelled: rowData => console.log('Row adding cancelled'),
					onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
					onRowAdd: async (newData) =>{
					const errorResult = await handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
						return(new Promise((resolve, reject) => {
							setTimeout(() => {
								if(errorResult){
									reject()
									return
								}

								resetHras()
								resolve();
							}, 1000);
						}))
					},
					onRowUpdate: async(newData, oldData) =>{
					const errorResult = await handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
						return (new Promise((resolve, reject) => {
							setTimeout(() => {
								if(errorResult){
									reject()
									return
								}

								resetHras()
								resolve();
							}, 1000);
						}))
					},
					// onRowDelete: async (oldData) =>{
					// await handleTableDelete({changes:{'0':{newData:null, oldData:oldData}}})
					// 	new Promise((resolve, reject) => {
					// 		setTimeout(() => {
					// 			const dataDelete = [...hras];
					// 			const index = oldData.tableData.id;
					// 			dataDelete.splice(index, 1);
					// 			setHras([...dataDelete]);
					// 			resolve();
					// 		}, 1000);
					// 	})
					// }
			}})}
			/>
		</div>
	)
	}

	const resetHras = () => {
		setLoading(true)
	getAllHrasApi(userToken).then((response) => response.data).then((data) => {
		console.log(data)
		//setLoading(false)
		setHras(data.status == 200 ? data.data : data)
		// this.setState({
		// 	equipments: data.status != 400 ? data.values: data,
		// 	setequipment: data
		// });
		//console.log(this.state.equipment.values);
		// console.log(this.props, this.state);
		setLoading(false)
	}).catch(function (error) {
		//setLoading(false)
		setHras([])
		setLoading(false)
	});
	}

	const reloadPage = () => {
		window.location.reload()
	}

	//Effects.
	React.useEffect(() => {
	console.log('HraCall')
	setLoading(true)
		getAllHrasApi(userToken).then((response) => response.data).then((data) => {
		console.log(data)
		setLoading(false)
		setHras(data.status == 200 ? data.data : data)

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
		setHras([])
		});

	console.log('employeeCall')
	getAllEmployeesApi(userToken).then((response) => response.data).then((data) => {
		console.log(data.data)
		// setLoading(false)
		setEmployees(data.status != 400 ? data.data : data)
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


	}, []);//will run once.

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
				<h2 >HRA</h2>
			</div>
			<div style={{textAlign: 'center'}}>
				{loading ? LoadingCircle() : null}
				{hras.length > 0 ? materialTableSelect() : null}
			</div>
		</div>
		</>
	);
}

export default connect(
	'selectUserToken',
	Hra);





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

// 	handlerSubmit = async () => {
// 		//window.event.preventDefault();
// 		//await this.props.dispatch(addProduct(this.state));
// 		//this.props.history.push('/products');
// 	};
	
// 	render() {
// 		return(
// 			<HraForm/>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		products: state.products
// 	};
// };

// export default connect(mapStateToProps)(AddProduct);
