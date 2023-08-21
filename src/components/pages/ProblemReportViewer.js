import React from 'react';
import '../../img/style.css';
import MaterialTable from '@material-table/core'
import {tableIcons} from '../material-table/config'
import {LoadingCircle, getQueryStringParams} from '../tools/tools';
import {updateProblemReportApi, getAllProblemReportsApi} from '../../publics/actions/problem-report'
import { connect } from 'redux-bundler-react';
import toast from 'react-hot-toast';

function ProblemReportViewer({userToken}) {
    //React Hooks Declarations.
    const [initialize, setInitialize] = React.useState(true);
    const [problems, setProblems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [editable,setEditable] = React.useState(false)
    const Resolved_Deleted_Options = {'No':'No','Yes':'Yes'}
   
    const handleTableUpdate = async (rowData) => {

        let errorFound = false
        //console.log('equipmentbyHraCall')
        //setLoading(true)
        await updateProblemReportApi(rowData, userToken).then((response) => response.data).then((data) => {
        console.log(data)

        const status = data.hasOwnProperty('status') ? data.status == 400 : false
        errorFound = data.hasOwnProperty('error') ? data.error : false

        if(status || errorFound){
            toast.error('Could not complete action')
        }else {
            toast.success('Action was completed')
        }
    
        }).catch(function (error) {
        
        });
            
        return errorFound
     
    }

    const materialTableSelect = () => {
	    if(problems.length > 0){
            const cols = Object.keys(problems[0])
            let columns = []
            /* const dataIsOnDatabase = {
            bar_tag_num:false
            } */
    
            const problems_cols_config = [
                { title: 'Date Reported', field: 'date_reported', type:'date', col_id:2.0, editable: 'never'},
                { title: 'Problem', field: 'message',col_id:2.1,editable: 'never' },
                { title: 'Employee', field: 'full_name',col_id:2.2,editable: 'never' },
                { title: 'Resolved', field: 'resolved',col_id:4, editable:"onUpdate", render: rowData => <a value={rowData.resolved} >{rowData.resolved === 'Yes' ? 'Yes' : 'No'}</a>,
                lookup:Resolved_Deleted_Options  },
                { title: 'Deleted', field: 'deleted',col_id:5, editable:"onUpdate",  render: rowData => <a value={rowData.deleted} >{rowData.deleted === 'Yes' ? 'Yes' : 'No'}</a>,
                lookup:Resolved_Deleted_Options  }
            ]
    
            
            for(const col_config of problems_cols_config){
                if(col_config.hasOwnProperty('field') && col_config){
                    if(cols.includes(col_config.field)) columns.push(col_config)
                }
            }
    
            return(
                <div style={{ maxWidth: '100%' }}>
                    <MaterialTable
                    icons={tableIcons}
                    columns={columns}
                    data={problems}
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
                         isEditable: rowData => rowData.editable !== 'never', // only name(a) rows would be editable
                         onRowUpdate: async (newData, oldData) =>{
                            const errorResult = await handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
                            return(new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if(errorResult){
                                        reject()
                                        return;
                                    }
    
                                    resetProblems();
                                    resolve();
                                        
                                }, 1000);
                            }))
                            },
                    }})}
                    />
                </div>
            )
        }

        return(<p>No Problems Reported Found.</p>)
    }   

    const resetProblems = () => {
		setLoading(true)
        getAllProblemReportsApi(userToken).then((response) => response.data).then((data) => {
		console.log(data)
		setProblems(data.status == 200 ? data.data : data)
		setLoading(false)
	}).catch(function (error) {
		setProblems([])
		setLoading(false)
	});
	}
React.useEffect(() => {
    
    console.log(`Feedback Call`)
        setInitialize(true)
        setLoading(true)
        getAllProblemReportsApi(userToken).then((response) => response.data).then((data) => {
        setLoading(false)
        console.log(data)
        setProblems(data.status == 200 ? data.data : data)

        if(data.status == 200 && data.editable){
            setEditable(data.editable)
        }

        setProblems(data.status == 200 ? data.data : data)
 
        setInitialize(false)
        }).catch(function (error) {
        setLoading(false)
        setInitialize(false)
        setProblems([])
        });

}, []);//will run once.


//Render return.
	return (
         <>
        <div>
            <div style={{textAlign: 'center'}}>
                 <h2 >Feedback Viewer</h2>
			</div>
             <div style={{textAlign: 'center'}}>
                {loading ? LoadingCircle() : null}
                {!loading > 0  ? materialTableSelect() : null}
            </div>
         </div>
        </>
	);
}

export default connect(
    'selectUserToken',
    ProblemReportViewer);