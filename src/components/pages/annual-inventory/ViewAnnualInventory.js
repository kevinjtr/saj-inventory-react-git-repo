import React from 'react';
import 'date-fns';
import { LoadingCircle } from '../../tools/tools';
import { tableIcons } from '../../material-table/config'
import MaterialTable from '@material-table/core'
import { Alert } from '@mui/lab';
import { ALERT, generateReportDate, downloadExcel, downloadPdf } from '../../tools/tools'
import { getAnnualInventoryByIdApi } from '../../../publics/actions/annual-inventory-api'
import { connect } from 'redux-bundler-react';

function ViewAnnualInventory({match, userToken}) {

    const invId = match.params.id

	//Hooks Declarations.
	const [loading, setLoading] = React.useState(false);
	//const [officesSymbol, setOfficesSymbol] = React.useState([]);
	const [annualInventories, setAnnualInventories] = React.useState([]);
	const [editable,setEditable] = React.useState(false)
	const [alertUser, setAlertUser] = React.useState(ALERT.RESET);

	//Event Handlers.
	const handleTableUpdate = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
		// await api.post(`annualinventory/update`,{params:rowData}).then((response) => response.data).then((data) => {
		// console.log(data)

		// const status = data.hasOwnProperty('status') ? data.status == 400 : false
		// const error = data.hasOwnProperty('error') ? data.error : false

		// if(status || error){
		// 	setAlertUser(ALERT.FAIL())
		// }else {
		// 	setAlertUser(ALERT.SUCCESS)
		// }
		//setLoading(false)
		//setEquipments(data.status != 400 ? data.data : data)
		// this.setState({
		// 	equipments: data.status != 400 ? data.values: data,
		// 	setequipment: data
		// });
		//console.log(this.state.equipment.values);
		// console.log(this.props, this.state);
		// }).catch(function (error) {
		// //setLoading(false)
		// //setEquipments([])
		// });
		

	// const tempProps = {...props};
	//  const searchResult = await tempgetEquipmentByHraID(hraId)
	//  if(!searchResult.error){
	//   equipments = searchResult.data
	//  }
	}

	const handleTableDelete = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
		// await api.post(`annualinventory/destroy`,{params:rowData}).then((response) => response.data).then((data) => {
		// console.log(data)

		// const status = data.hasOwnProperty('status') ? data.status == 400 : false
		// const error = data.hasOwnProperty('error') ? data.error : false

		// if(status || error){
		// 	setAlertUser(ALERT.FAIL())
		// }else {
		// 	setAlertUser(ALERT.SUCCESS)
		// }
		//setLoading(false)
		//setEquipments(data.status != 400 ? data.data : data)
		// this.setState({
		// 	equipments: data.status != 400 ? data.values: data,
		// 	setequipment: data
		// });
		//console.log(this.state.equipment.values);
		// console.log(this.props, this.state);
		// }).catch(function (error) {
		// //setLoading(false)
		// //setEquipments([])
		// });
		

	// const tempProps = {...props};
	//  const searchResult = await tempgetEquipmentByHraID(hraId)
	//  if(!searchResult.error){
	//   equipments = searchResult.data
	//  }
	}

	const handleTableAdd = async (rowData) => {

	//console.log('equipmentbyHraCall')
	//setLoading(true)
	// await api.post(`annualinventory/add`,{params:rowData}).then((response) => response.data).then((data) => {
	// 	console.log(data)

	// 	const status = data.hasOwnProperty('status') ? data.status == 400 : false
	// 	const error = data.hasOwnProperty('error') ? data.error : false

	// 	if(status || error){
	// 		setAlertUser(ALERT.FAIL())
	// 	}else {
	// 		setAlertUser(ALERT.SUCCESS)
	// 	}
	// 	//setLoading(false)
	// 	//setEquipments(data.status != 400 ? data.data : data)
	// 	// this.setState({
	// 	// 	equipments: data.status != 400 ? data.values: data,
	// 	// 	setequipment: data
	// 	// });
	// 	//console.log(this.state.equipment.values);
	// 	// console.log(this.props, this.state);
	// 	}).catch(function (error) {
	// 	//setLoading(false)
	// 	//setEquipments([])
	// 	});
		

	// const tempProps = {...props};
	//  const searchResult = await tempgetEquipmentByHraID(hraId)
	//  if(!searchResult.error){
	//   equipments = searchResult.data
	//  }
	}

	//Styles Declarations

	//Functions Declarations.

	

	const materialTableSelect = () => {

        if(annualInventories.length > 0){
            const cols = Object.keys(annualInventories[0])
            let columns = []
            //considering moving to a config file.
            const cols_config = [
                { title: 'HRA Num', field: 'hra_num',editable: 'never'},
                { title: 'Fiscal Year', field: 'fiscal_year',editable: 'never' },
                { title: 'Item Type', field: 'item_type',editable: 'never'},
                { title: 'Bar Tag Num', field: 'bar_tag_num',editable: 'never' },
                { title: 'Serial Number', field: 'serial_num',editable: 'never' },
                { title: 'Employee Holder', field: 'employee_full_name',editable: 'never' }
            ]

            if(editable) cols_config.push({title:'Updated By',field:'updated_by_full_name',editable:'never' })

            for(const col_config of cols_config){
                if(col_config.hasOwnProperty('field') && col_config){
                    if(cols.includes(col_config.field)) columns.push(col_config)
                }
            }

            return(
                <div style={{ maxWidth: '100%' }}>
                    <MaterialTable
                    icons={tableIcons}
                    columns={columns}
                    data={annualInventories}
                    localization={{
                        toolbar: {
                        searchPlaceholder: "Filter Search"
                        }}}
                    options={{
						exportMenu:[
							{
								label: 'Export to PDF',
								exportFunc: (columns, eqs) => downloadPdf([...columns], [...eqs])
							}, {
								label: 'Export to Excel',
								exportFunc: (columns, eqs) => downloadExcel([...eqs],"EquipmentReport",["update_status"])
							  }
						],
                        exportButton: true,
                        exportAllData: true,
                        headerStyle: {
                        backgroundColor: "#969696",
                        color: "#FFF",
                        fontWeight: 'bold',
                    }
                    
                    }}
                    title=""
                    />
                </div>
            )
        }

        return(<p>No Data Found.</p>)
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
    
        console.log('AnnInvCall')

        if(invId){
            setLoading(true)
			getAnnualInventoryByIdApi(invId, userToken)
			.then((response) => response.data).then((data) => {
            console.log(data)
            setLoading(false)
            setAnnualInventories(data.status == 200 ? data.data : data)
    
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
            setAnnualInventories([])
            });
        }
        

	}, []);//will run once.

	//Render return.
	return (
		<>
		<div>
			<div style={{textAlign: 'center'}}>
				<h2 >View Annual Inventory</h2>
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

  export default connect(
	'selectUserToken',
	ViewAnnualInventory);  