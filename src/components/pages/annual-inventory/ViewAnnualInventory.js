import React from 'react';
import 'date-fns';
import { LoadingCircle } from '../../tools/tools';
import { tableIcons } from '../../material-table/config'
import AnnualInvMuiTable from '../../material-table/annual-inventory-mui-table'
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

            return(
                <div style={{ maxWidth: '100%' }}>
                    <AnnualInvMuiTable
                    tab_name={'view_inventory'}
                    isLoading={loading}
                    name={'Inventory'}
                    componentName={'annualinventory'}
                    icons={tableIcons}
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