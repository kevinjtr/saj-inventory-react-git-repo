import React from 'react';
import 'date-fns';
import { LoadingCircle } from '../../tools/tools';
import { tableIcons } from '../../material-table/config'
import MuiTable from '../../material-table'
import { generateReportDate, downloadExcel, downloadPdf } from '../../tools/tools'
import { getAnnualInventoryByIdApi } from '../../../publics/actions/annual-inventory-api'
import { connect } from 'redux-bundler-react';
import toast from 'react-hot-toast';

function ViewAnnualInventory({match, userToken}) {
    const invId = match.params.id

	//Hooks Declarations.
	const [loading, setLoading] = React.useState(false);
	//const [officesSymbol, setOfficesSymbol] = React.useState([]);
	const [annualInventories, setAnnualInventories] = React.useState([]);
	const [editable,setEditable] = React.useState(false)

	//Event Handlers.

	//Styles Declarations

	//Functions Declarations.

	

	const materialTableSelect = () => {

        //if(annualInventories.length > 0){
            //const cols = Object.keys(annualInventories[0])
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

            //if(editable) cols_config.push({title:'Updated By',field:'updated_by_full_name',editable:'never' })

            // for(const col_config of cols_config){
            //     if(col_config.hasOwnProperty('field') && col_config){
            //         if(cols.includes(col_config.field)) columns.push(col_config)
            //     }
            // }

            return(
                <div style={{ maxWidth: '100%' }}>
                    <MuiTable
                    isLoading={loading}
                    name={'Inventory'}
                    componentName={'annualinventory'}
                    icons={tableIcons}
                    columns={cols_config}
                    data={annualInventories}
                    exportButton={true}
                    localization={{
                        toolbar: {
                        searchPlaceholder: "Filter Search"
                        }}}
                    options={{
						// exportMenu:[
						// 	{
						// 		label: 'Export to PDF',
						// 		exportFunc: (columns, eqs) => downloadPdf([...columns], [...eqs])
						// 	}, {
						// 		label: 'Export to Excel',
						// 		exportFunc: (columns, eqs) => downloadExcel([...eqs],"EquipmentReport",["update_status"])
						// 	  }
						// ],
                        // exportButton: true,
                        // exportAllData: true,
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
        //}

        //return(<p>No Data Found.</p>)
	}

	const reloadPage = () => {
		window.location.reload()
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
			
            }).catch(function (error) {
            setLoading(false)
            setAnnualInventories([])
            });
        }
        

	}, []);//will run once.

	//Render return.
	return (
		<>
			<div style={{textAlign: 'center'}}>
				<h2 >View Annual Inventory</h2>
			</div>
			<div style={{textAlign: 'center'}}>
				{materialTableSelect()}
			</div>
		</>
	);
  }

  export default connect(
	'selectUserToken',
	ViewAnnualInventory);  