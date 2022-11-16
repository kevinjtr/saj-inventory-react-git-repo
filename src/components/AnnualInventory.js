import {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import {LoadingCircle, ALERT} from './tools/tools';
import MaterialTable from 'material-table'
import {tableIcons} from './material-table/config'
import api from '../axios/Api';
import {Autocomplete, Alert} from '@material-ui/lab';
import {findIndex} from 'lodash'
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {updateAnnualInventoryApi, destroyAnnualInventoryApi, addAnnualInventoryApi, getAllAnnualInventorysApi, annualInventorySearchApi} from '../publics/actions/annual-inventory-api'
import {getAllHrasApi} from '../publics/actions/hra-api'
import {lockOptions} from './config/constants'
import { connect } from 'redux-bundler-react';

function AnnualInventory({history, userToken}) {
	const PAGE_URL = '/annualinventory'

	//Hooks Declarations
	const [initialize, setInitialize] = useState(true);
	const [loading, setLoading] = useState(false);
	//const [employees, setEmployees] = useState([]);
	const [hras, setHras] = useState([]);
	const [annualInv, setAnnualInv] = useState([]);
	const [editable,setEditable] = useState(false)
	const [alertUser, setAlertUser] = useState(ALERT.RESET);
	const [serverDown, setServerDown] = useState(false);

	//Event Handlers.
	const handleTableUpdate = async (rowData) => {
		let error_found = true
		setLoading(true)
		setAlertUser(ALERT.RESET)
		
		await updateAnnualInventoryApi(rowData, userToken).then((response) => response.data).then((data) => {
		const {status, error} = data
		error_found = error

		if(error){
			setAlertUser(ALERT.FAIL())
		}else {
			if(data.hasOwnProperty('changes')){
				const {changes} = data
				if(changes.length > 0){

					//const annualInv_copy = [...annualInv]
	
					// for(const inv_record_change of changes){
					//   const idx = findIndex(annualInv_copy,function(c){return c.id == inv_record_change.id})
		  
					//   if(idx != -1){
					// 	annualInv_copy[idx] = inv_record_change
					// 	console.log(annualInv_copy[idx])
					setAnnualInv(changes)
					setAlertUser(ALERT.SUCCESS)
					//   }			  
					// }
				}else{
					setAlertUser(ALERT.FAIL())
				}
			}else{
				setAlertUser(ALERT.FAIL())
			}			
		}

		setLoading(false)

		}).catch(function (error) {
			console.log(error)
			setAlertUser(ALERT.FAIL())
			setLoading(false)
		});

		return error_found
	}

	const handleTableDelete = async (rowData) => {
		let error_found = true
		setLoading(true)

		await destroyAnnualInventoryApi(rowData, userToken).then((response) => response.data).then((data) => {
		console.log(data)
		const error = data.hasOwnProperty('error') ? data.error : false
		error_found = error

		if(error){
			setAlertUser(ALERT.FAIL())
		}else {
			setAlertUser(ALERT.SUCCESS)
		}

		}).catch(function (error) {
			console.log(error)
			setAlertUser(ALERT.FAIL())
			setLoading(false)
		});

		return error_found
	}

	const handleTableAdd = async (rowData) => {
		let error_found = true
		setAlertUser(ALERT.RESET)

		await addAnnualInventoryApi(rowData, userToken).then((response) => response.data).then((data) => {
			console.log(data)
			const {status, error} = data
			error_found = error

			if(error){
				setAlertUser(ALERT.FAIL())
			}else {
				if(data.hasOwnProperty('changes')){
					const {changes} = data
					if(changes.length > 0){
	
						//const annualInv_copy = [...annualInv]
		
						// for(const inv_record_change of changes){
						//   const idx = findIndex(annualInv_copy,function(c){return c.id == inv_record_change.id})
			  
						//   if(idx != -1){
						// 	annualInv_copy[idx] = inv_record_change
						// 	console.log(annualInv_copy[idx])
						setAnnualInv(changes)
						setAlertUser(ALERT.SUCCESS)
						//   }			  
						// }
					}else{
						setAlertUser(ALERT.FAIL())
					}
				}else{
					setAlertUser(ALERT.FAIL())
				}			
			}

		}).catch(function (error) {
			console.log(error)
			setAlertUser(ALERT.FAIL())
			setLoading(false)
		});
		
		return error_found
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
			renderOption={(option) => <a style={{fontSize:'16px'}}>{option.hra_num + ' - ' + (option.hra_first_name ? option.hra_first_name + ' ' : '') + option.hra_last_name}</a>}
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
		
					console.log((new Date()).getFullYear() + 1,rowData.fiscal_year,typeof rowData.fiscal_year,typeof rowData.fiscal_year,rowData.fiscal_year)
					if(typeof rowData.fiscal_year == "number"){
						if(rowData.fiscal_year.toString().length != 4){
							return ({ isValid: false, helperText: 'four digits are required.' })
						}else if(rowData.fiscal_year < 1990 || rowData.fiscal_year > (new Date()).getFullYear() + 1){
							return ({ isValid: false, helperText: 'year is out of range.' })
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
		{ title: 'Employee First Name', field: 'hra_first_name',editable: 'never' },
		{ title: 'Employee Last name', field: 'hra_last_name',editable: 'never' },
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
						//resetAnnualInventory();
					},
					disabled: (rowData.locked != 2) //rowData.birthYear < 2000
				}),
				rowData => ({
					icon: tableIcons.View,
					tooltip: 'View',
					onClick: async (event, rowData) => {
						history.replace(`${PAGE_URL}/${rowData.id}`)
						//await handleTableUpdate({changes:{'0':{newData:{...rowData,update:true}}}});
						//resetAnnualInventory();
					}
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
				// onRowAddCancelled: rowData => console.log('Row adding cancelled'),
				// onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
				onRowAdd: async (newData) => {
				const errorFound = await handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
					return (new Promise((resolve, reject) => {
						setTimeout(() => {
							if(errorFound){
								reject()
							}else{
								//resetAnnualInventory()
								resolve();
							}
							
						}, 1000);
					}))
				},
				onRowUpdate: async(newData, oldData) =>{
				const errorFound = await handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})

					new Promise((resolve, reject) => {
						setTimeout(() => {
							if(errorFound){
								reject();
								return;
							}

							resolve();
							//resetAnnualInventory();
						}, 1000);
					})
				},
			}})}
			/>
		</div>
	)
	}

	const resetAnnualInventory = () => {
		setLoading(true)
	getAllAnnualInventorysApi(userToken).then((response) => response.data).then((data) => {
		console.log(data)
		setAnnualInv(data.status == 200 ? data.data : data)
		setLoading(false)
	}).catch(function (error) {
		setAnnualInv([])
		setLoading(false)
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
	useEffect(() => {
		console.log('AnnualInvCall')
		setInitialize(true)
		getAllAnnualInventorysApi(userToken).then((response) => response.data).then((data) => {
		console.log(data)
		setAnnualInv(data.status == 200 ? data.data : data)

		if(data.status == 200 && data.editable){
			setEditable(data.editable)
			setHras(data.hras.length > 0 ? data.hras : [])
			console.log('is editable')
		}
		setInitialize(false)
	}).catch(function (error) {
		setServerDown(true)
		setLoading(false)
		setInitialize(false)
	})}, []);

	//Render return.
	return (
	<>
	<div>
		<div style={{textAlign: 'center'}}>
			<h2 >Annual Inventory</h2>
		</div>
		{alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
		<div style={{textAlign: 'center'}}>
			{loading || initialize ? LoadingCircle() : null}
			{!initialize && !serverDown ? materialTableSelect() : null}
		</div>
	</div>
	</>
	);
}

export default connect(
	'selectUserToken',
	AnnualInventory);  