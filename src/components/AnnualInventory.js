import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import {LoadingCircle, ALERT} from './tools/tools';
import MaterialTable from 'material-table'
import {tableIcons} from './material-table/config'
import api from '../axios/Api';
import {Autocomplete, Alert} from '@material-ui/lab';
import {findIndex} from 'lodash'
import Header from './Header'
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const lockOptions = {2:'UNLOCK',1:'LOCK'}

export default function AnnualInventory(props) {
	//Hooks Declarations
	const [loading, setLoading] = React.useState(false);
	//const [employees, setEmployees] = React.useState([]);
	const [hras, setHras] = React.useState([]);
	const [annualInv, setAnnualInv] = React.useState([]);
	const [editable,setEditable] = React.useState(false)
	const [alertUser, setAlertUser] = React.useState(ALERT.RESET);

	//Event Handlers.
	const handleTableUpdate = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
		await api.post(`annualinventory/update`,{params:rowData}).then((response) => response.data).then((data) => {
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

	const handleTableDelete = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
		await api.post(`annualinventory/destroy`,{params:rowData}).then((response) => response.data).then((data) => {
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
	await api.post(`annualinventory/add`,{params:rowData}).then((response) => response.data).then((data) => {
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

	//Functions.
	const materialTableSelect = () => {

	const cols = annualInv.length > 0 ? Object.keys(annualInv[0]) : []
	let columns = []
	//considering move to a config file.
	let cols_config = [
		{ title: 'HRA Number', field: 'hra_num', type:'numeric', editable: 'onAdd', col_id:2.0,
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
			getOptionLabel={(option) => option.hra_num + ' - ' + (option.hra_first_name ? option.hra_first_name + ' ' : '') + option.hra_last_name}
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
		},
		validate :(rowData) => {
			if(rowData.hasOwnProperty('hra_num')){
				if(!isNaN(rowData.hra_num)) {
					if(rowData.hasOwnProperty('tableData')){
						if(rowData.tableData.editing === "update"){
							return true
						}
					}					
		
					if(typeof rowData.hra_num == "number"){
						return true
					}
		
					if(typeof rowData.hra_num === "string"){
						return ({ isValid: false, helperText: 'HRA number needs to be numeric.' })
					}
				}
			}
			
			return ({ isValid: false, helperText: 'HRA num is required.' })
		},
		},
		{ title: 'Status', field: 'locked',type:'numeric', editable: 'onUpdate',
		render: rowData => <a value={rowData.locked} >{rowData.locked != 2 ? 'LOCKED' : 'UNLOCKED'}</a>,
		lookup:lockOptions
		// editComponent: x => {
		// 	//const table_id = x.rowData.tableData.id
		// 	console.log(x);
		// 	let idx = -1
	
		// 	if(x.rowData.locked){
		// 		idx = findIndex(lockOptions,function(o){ return (o.value == x.rowData.locked) })
		// 	}
	
		// 	return(
		// 		<Autocomplete
		// 		//onChange={e => x.onChange(e)}
		// 		id={`combo-box-employee-`}
		// 		size="small"
		// 		options={lockOptions}
		// 		getOptionLabel={(option) => option.status}
		// 		value={idx != -1 ? lockOptions[idx].value : null}
		// 		onChange ={e => {
	
		// 		const val_ = e.target.textContent ? (e.target.textContent == 'LOCKED' ? 1:2) : 2
		// 		//console.log(e.target);
		// 		x.onChange(val_)
		// 		}}
		// 		//style={{ verticalAlign: 'top' }}
		// 		renderInput={(params) => <TextField {...params} label="Status" margin="normal"/>}
		// 	/>
		// 	)
		// }
		// editComponent: x => {
		// //const table_id = x.rowData.tableData.id
		// // console.log(x);
		// // let idx = -1

		// // if(x.rowData.office_symbol){
		// // 	idx = findIndex(officesSymbol,function(o){ return (o.id && (o.id == x.rowData.office_symbol)); })
		// // }

		// if(x.rowData.locked === 1){
		// 	return(
		// 		<LockOpenIcon
		// 		//onChange={e => x.onChange(e)}
		// 		id={`lock-icon-${x.rowData.id}`}
		// 		key={`lock-icon-${x.rowData.id}`}
		// 		//size="small"
		// 		//options={officesSymbol}
		// 		//getOptionLabel={(option) => option.id + ' - ' + option.alias}
		// 		//value={idx != -1 ? officesSymbol[idx] : null}
		// 		// onChange ={e => {
	
		// 		// const id_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
		// 		// console.log(id_);
		// 		// x.onChange(id_)
		// 		// }}
		// 		onClick={() => alert('lock open icon clicked.')}
		// 		//style={{ verticalAlign: 'top' }}
		// 		//renderInput={(params) => <TextField {...params} label="Office Symbol" margin="normal"/>}
		// 	/>
		// 	)
		// }

		// return(
		// 	<LockIcon
		// 		//onChange={e => x.onChange(e)}
		// 		id={`lock-icon-${x.rowData.id}`}
		// 		key={`lock-icon-${x.rowData.id}`}
		// 		//size="small"
		// 		//options={officesSymbol}
		// 		//getOptionLabel={(option) => option.id + ' - ' + option.alias}
		// 		//value={idx != -1 ? officesSymbol[idx] : null}
		// 		// onChange ={e => {

		// 		// const id_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
		// 		// console.log(id_);
		// 		// x.onChange(id_)
		// 		// }}
		// 		onClick={() => alert('lock icon clicked.')}
		// 		//style={{ verticalAlign: 'top' }}
		// 		//renderInput={(params) => <TextField {...params} label="Office Symbol" margin="normal"/>}
		// 	/>
		// )
		// }
		},
		{ title: 'Fiscal Year', field: 'fiscal_year', editable: 'onAdd', type:'numeric', validate: (rowData) => {

			if(rowData.hasOwnProperty('fiscal_year')){
				if(!isNaN(rowData.fiscal_year)) {
					if(rowData.hasOwnProperty('tableData')){
						if(rowData.tableData.editing === "update"){
							return true
						}
					}					
		
					if(typeof rowData.fiscal_year == "number"){
						console.log('isnumber')
						if(rowData.fiscal_year.toString().length > 4){
							return ({ isValid: false, helperText: 'FY digits exceed 4.' })
						}else if( findIndex(hras,h => h.fiscal_year == rowData.fiscal_year) != -1 ){
							return ({ isValid: false, helperText: 'Duplicated HRA num.' })
						}

						return true
					}
		
					if(typeof rowData.fiscal_year === "string"){
						return ({ isValid: false, helperText: 'HRA number needs to be numeric.' })
					}
				}
			}
			
			return ({ isValid: false, helperText: 'Fiscal Year is required.' })

		}},
		// , validate: (rowData) => {

		// 	if(rowData.hasOwnProperty('hra_num')){
		// 		if(!isNaN(rowData.hra_num)) {
		// 			if(rowData.hasOwnProperty('tableData')){
		// 				if(rowData.tableData.editing === "update"){
		// 					return true
		// 				}
		// 			}					
		
		// 			if(typeof rowData.hra_num == "number"){
		// 				console.log('isnumber')
		// 				if(rowData.hra_num.toString().length > 3){
		// 					return ({ isValid: false, helperText: 'HRA digits exceed 3.' })
		// 				}else if( findIndex(hras,h => h.hra_num == rowData.hra_num) != -1 ){
		// 					return ({ isValid: false, helperText: 'Duplicated HRA num.' })
		// 				}

		// 				return true
		// 			}
		
		// 			if(typeof rowData.hra_num === "string"){
		// 				return ({ isValid: false, helperText: 'HRA number needs to be numeric.' })
		// 			}
		// 		}
		// 	}
			
		// 	return ({ isValid: false, helperText: 'HRA number is required.' })

		// }},
		// { title: 'Employee ID', field: 'hra_employee_id',type:'numeric',
		// editComponent: x => {
		// console.log(x);
		// let idx = -1

		// if(x.rowData.hra_employee_id){
		// 	idx = findIndex(employees,function(e){ return (e.id && (e.id == x.rowData.hra_employee_id)); })
		// }

		// return(
		// 	<Autocomplete
		// 	//onChange={e => x.onChange(e)}
		// 	id="combo-box-employee"
		// 	size="small"
		// 	options={employees}
		// 	getOptionLabel={(option) => option.id + ' - ' + option.first_name + ' ' + option.last_name}
		// 	value={idx != -1 ? employees[idx] : null}
		// 	onChange ={e => {

		// 	const id_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
		// 	console.log(id_);
		// 	x.onChange(id_)
		// 	}}
		// 	//style={{ verticalAlign: 'top' }}
		// 	renderInput={(params) => <TextField {...params} label="Employee" margin="normal"/>}
		// />
		// )
		// }},
		{ title: 'Employee First Name', field: 'hra_first_name',editable: 'never' },
		{ title: 'Employee Last name', field: 'hra_last_name',editable: 'never' },
		// { title: 'Title', field: 'hra_title',editable: 'never' },
		// { title: 'Office Symbol', field: 'hra_office_symbol_alias',editable: 'never' },
		// { title: 'Work Phone', field: 'hra_work_phone',editable: 'never' },
		{ title: 'Equipment Quantity', field: 'annual_equipment_count',editable: 'never'}
	]

	for(const col_config of cols_config){
		if(cols.includes(col_config.field)) columns.push(col_config)
	}

	return(
		<div style={{ maxWidth: '100%' }}>
			<MaterialTable
			icons={tableIcons}
			columns={columns.length > 0 ? columns : cols_config}
			data={annualInv}
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
				
				rowData => ({
					icon: tableIcons.Update,
					tooltip: 'Update',
					onClick: async (event, rowData) => {
						await handleTableUpdate({changes:{'0':{newData:{...rowData,update:true}}}});
						resetAnnualInventory();
					},
					disabled: (rowData.locked != 2) //rowData.birthYear < 2000
				}),
				// rowData => ({
				// 	icon: tableIcons.Lock,
				// 	tooltip: 'Lock',
				// 	onClick: (event, rowData) => alert("You updated " + JSON.stringify(rowData)),
				// 	disabled: !(rowData.locked == 2) //rowData.birthYear < 2000
				// }),
				// rowData => ({
				// 	icon: tableIcons.Unlock,
				// 	tooltip: 'Unlock',
				// 	onClick: (event, rowData) => alert("You updated " + JSON.stringify(rowData)),
				// 	disabled: !(rowData.locked != 2) //rowData.birthYear < 2000
				// }),
				
			  ]}
			{...(editable && {editable:{
				isEditable: rowData => rowData.locked === 2, // only name(a) rows would be editable
				//isEditHidden: rowData => rowData.name === 'x',
				// isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
				// isDeleteHidden: rowData => rowData.name === 'y',
				// onBulkUpdate: async (changes) => {
				// 	await handleTableUpdate({changes:changes})
				// 		new Promise((resolve, reject) => {
						
				// 			setTimeout(() => {
				// 				//setHras([...hras, newData]);
				// 				//console.log('bulk update')
								
				// 				resetAnnualInventory()
				// 				resolve();
				// 			}, 1000);
				// 		})
				// },
				onRowAddCancelled: rowData => console.log('Row adding cancelled'),
				onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
				onRowAdd: async (newData) => {
				await handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
					new Promise((resolve, reject) => {
						setTimeout(() => {
							//setHras([...hras, newData]);
							resetAnnualInventory()
							resolve();
						}, 1000);
					})
				},
				onRowUpdate: async(newData, oldData) =>{
				await handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
					new Promise((resolve, reject) => {
						setTimeout(() => {
							
							//const dataUpdate = [...hras];
							//const index = oldData.tableData.id;
							//dataUpdate[index] = newData;
							resetAnnualInventory()
							//setHras([...dataUpdate]);
		
							resolve();
						}, 1000);
					})
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

	const resetAnnualInventory = () => {
	api.get(`annualinventory`).then((response) => response.data).then((data) => {
		console.log(data)
		//setLoading(false)
		
		setAnnualInv(data.status == 200 ? data.data : data)
		// this.setState({
		// 	equipments: data.status != 400 ? data.values: data,
		// 	setequipment: data
		// });
		//console.log(this.state.equipment.values);
		// console.log(this.props, this.state);
	}).catch(function (error) {
		//setLoading(false)
		setAnnualInv([])
	});
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

	//Effects
	React.useEffect(() => {
	console.log('AnnualInvCall')
	setLoading(true)
		api.get(`annualinventory`).then((response) => response.data).then((data) => {
		console.log(data)
		setLoading(false)
		setAnnualInv(data.status == 200 ? data.data : data)

		if(data.status == 200 && data.editable){
			setEditable(data.editable)

			console.log('is editable')
		}
		// this.setState({
		// 	equipments: data.status != 400 ? data.values: data,
		// 	setequipment: data
		// });
		//console.log(this.state.equipment.values);
		// console.log(this.props, this.state);
		}).catch(function (error) {
		setLoading(false)
		setAnnualInv([])
		});

	console.log('HRACall')
	api.get(`hra`,{}).then((response) => response.data).then((data) => {
		console.log(data.data)
		// setLoading(false)
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


	}, []);

	//Render return.
	return (
	<>
	<Header/>
	<div>
		<div style={{textAlign: 'center'}}>
			<h2 >Annual Inventory</h2>
		</div>
		{alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
		<div style={{textAlign: 'center'}}>
			{loading ? LoadingCircle() : null}
			{!loading ? materialTableSelect() : null}
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
// import HraForm from './forms/hra';

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
