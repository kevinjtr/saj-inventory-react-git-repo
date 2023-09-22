import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import 'date-fns';
import { LoadingCircle } from '../../tools/tools';
import { tableIcons } from '../../material-table/config'
import AnnualInvMuiTable from '../../material-table/annual-inventory-mui-table'
import { Autocomplete } from '@mui/material';
import { findIndex, find } from 'lodash'
import { updateAnnualInventoryApi, destroyAnnualInventoryApi, addAnnualInventoryApi, getAllAnnualInventorysApi, annualInventorySearchApi} from '../../../publics/actions/annual-inventory-api'
import { lockOptions } from '../../config/constants'
import { connect } from 'redux-bundler-react';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';

function AnnualInventory({history, userToken}) {
	const PAGE_URL = '/annualinventory'

	//Hooks Declarations
	//const [initialize, setInitialize] = useState(true);
	const [loading, setLoading] = useState(false);
	//const [employees, setEmployees] = useState([]);
	const [hras, setHras] = useState([]);
	const [annualInv, setAnnualInv] = useState([]);
	const [editable,setEditable] = useState(false)
	const [serverDown, setServerDown] = useState(false);

	//Event Handlers.
	const handleTableUpdate = async (rowData) => {
		let error_found = true
		setLoading(true)
		
		await updateAnnualInventoryApi(rowData, userToken).then((response) => response.data).then((data) => {
		const {status, error} = data
		error_found = error

		if(error){
			toast.error('Could not complete action')
		}else {
			if(data.hasOwnProperty('changes')){
				const {changes} = data
				if(changes.length > 0){
					setAnnualInv(changes)
					toast.success('Action was completed')
				}else{
					toast.error('Could not complete action')
				}
			}else{
				toast.error('Could not complete action')
			}			
		}

		setLoading(false)

		}).catch(function (error) {
			console.log(error)
			toast.error('Could not complete action')
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
			toast.error('Could not complete action')
		}else {
			toast.success('Action was completed')
		}

		}).catch(function (error) {
			console.log(error)
			toast.error('Could not complete action')
			setLoading(false)
		});

		return error_found
	}

	const handleTableAdd = async (rowData) => {
		let error_found = true

		await addAnnualInventoryApi(rowData, userToken).then((response) => response.data).then((data) => {
			console.log(data)
			const {status, error} = data
			error_found = error

			if(error){
				toast.error('Could not complete action')
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
						toast.success('Action was completed')
						//   }			  
						// }
					}else{
						toast.error('Could not complete action')
					}
				}else{
					toast.error('Could not complete action')
				}			
			}

		}).catch(function (error) {
			console.log(error)
			toast.error('Could not complete action')
			setLoading(false)
		});
		
		return error_found
	}

	//Functions.
	const materialTableSelect = () => {

	return(
		<div style={{ maxWidth: '100%' }}>
			<AnnualInvMuiTable
			name={'Inventory'}
			tab_name={'add_inventory'}
			componentName={'annualinventory'}
			addProps={{
				sx:{height: 35, width: 180}
			}}
			hras={hras}
			showHistory={true}
			isLoading={loading}
			icons={tableIcons}
			data={annualInv}
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
			actions={[
				rowData => ({
					icon: tableIcons.Update,
					tooltip: 'Update',
					onClick: async (event, rowData) => {
						await handleTableUpdate({changes:{'0':{newData:{...rowData,update:true}}}});
						//resetAnnualInventory();
					},
					disabled: (rowData.locked != 2 ) //rowData.birthYear < 2000
				}),
				rowData => ({
					icon: tableIcons.View,
					tooltip: 'View',
					disabled: (rowData.annual_equipment_count === 0),
					onClick: async (event, rowData) => {
						history.replace(`${PAGE_URL}/${rowData.id}`)
						//await handleTableUpdate({changes:{'0':{newData:{...rowData,update:true}}}});
						//resetAnnualInventory();
					}
				}),				
			  ]}
			editable={{
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
			}}
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

	//Effects
	useEffect(() => {
		setLoading(true)
		//setInitialize(true)
		getAllAnnualInventorysApi(userToken).then((response) => response.data).then((data) => {
		console.log(data)
		setAnnualInv(data.status == 200 ? data.data : data)

		if(data.status == 200 && data.editable){
			setEditable(data.editable)
			setHras(data.hras.length > 0 ? data.hras : [])
			console.log('is editable')
		}
		//setInitialize(false)
		setLoading(false)
	}).catch(function (error) {
		setServerDown(true)
		setLoading(false)
		//setInitialize(false)
	})}, []);

	//Render return.
	return (
	<>
		<div style={{textAlign: 'center', paddingBottom: 10}}>
			<h2 >Annual Inventory</h2>
		</div>
		<div style={{textAlign: 'center'}}>
			{materialTableSelect()}
		</div>
	</>
	);
}

export default connect(
	'selectUserToken',
	AnnualInventory);  