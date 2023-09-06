import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import 'date-fns';
import { LoadingCircle } from '../../tools/tools';
import { tableIcons } from '../../material-table/config'
import MuiTable from '../../material-table'
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

	//const cols = annualInv.length > 0 ? Object.keys(annualInv[0]) : []
	//let columns = []
	//considering move to a config file.
	let cols_config = [
		{ title: 'HRA Number', field: 'hra_num', type:'numeric', editable:'onAdd', col_id:2.0, //filterComponent: (props) => <CustomFilterTextField {...props} />,
        editComponent: props => {
          console.log(props)

          return (
            <Autocomplete
            ListboxProps={{
              sx: { fontSize: 3 },
            }}
                  value={props.value ? find(hras,function(h){ return h.hra_num === props.value}) : null}
                  onChange={(e, nv) => {
                    if(nv?.hra_num){
                      props.onChange(nv.hra_num) 
                      return;
                    }
                    props.onChange(nv)
                  }}
                  
                  key={`combo-box-${uuid()}`}
                  options={hras}
                  getOptionLabel={(option) => {
						const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
						return `${option.hra_num}${full_name && ` - ${full_name}`}`
					}}
					renderOption={(props, option, state) => {
						const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
						return <li {...props} style={{fontSize: '1rem'}}>{`${option.hra_num}${full_name && ` - ${full_name}`}`}</li>
						}}
                  style={{ width: 250 }}
                  renderInput={(params) => <TextField {...params} helperText="HRA" variant="standard" />}
              />)
        },
          validate: (rowData) => {
              if(rowData.hasOwnProperty('hra_num')){
                  if(!isNaN(rowData.hra_num)) {
                    if(rowData.hra_num){
                      const idx = findIndex(hras,function(e){ return (e.hra_num && (e.hra_num == rowData.hra_num)); })
                      return idx != -1
                    }
                  }
              }
    
              return true
          }
        },
		{ title: 'Status', field: 'locked',type:'numeric', editable: 'onUpdate',customFilterAndSearch: (term, rowData, column) => {
			const option = rowData.locked != 2 ? 'LOCKED' : 'UNLOCKED'
			if (rowData.locked) {
			  return option.toString()?.toUpperCase().includes(term.toUpperCase())
			}
			return false
		},
		render: rowData => rowData.locked != 2 ? 'LOCKED' : 'UNLOCKED',
		lookup:lockOptions
		},
		{ title: 'Fiscal Year', cellStyle: {
			minWidth: 200,
			maxWidth: 200
		  }, field: 'fiscal_year', editable: 'onAdd', type:'numeric', validate: (rowData) => {

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

	// for(const col_config of cols_config){
	// 	if(cols.includes(col_config.field)) columns.push(col_config)
	// }

	return(
		<div style={{ maxWidth: '100%' }}>
			<MuiTable
			name={'Inventory'}
			componentName={'annualinventory'}
			addProps={{
				sx:{height: 35, width: 180}
			}}
			isLoading={loading}
			icons={tableIcons}
			columns={cols_config}
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