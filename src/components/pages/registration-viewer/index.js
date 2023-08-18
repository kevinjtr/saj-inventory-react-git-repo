import React, {useState} from 'react';
import '../../../img/style.css';
// import api from '../axios/Api';
import MaterialTable from '@material-table/core'
import SaveIcon from '@mui/icons-material/Save'
import {tableIcons} from '../../material-table/config'
// import Typography from '@mui/material/Typography';
import {Autocomplete, Alert} from '@mui/material';
// import {TextField, InputLabel, MenuItem, Select, Grid, IconButton, FormControl, Radio, RadioGroup, FormControlLabel, FormGroup} from '@mui/material/';
// import {orderBy, findIndex, filter} from 'lodash'
import {LoadingCircle, getQueryStringParams, ALERT} from '../../tools/tools';
import { getAllRegistrationsApi,destroyRegistrationApi } from '../../../publics/actions/register-api';
import { getEmployeeByEDIPIWithOffice } from '../../../publics/actions/employee-api';
import { connect } from 'redux-bundler-react';
import DeleteIcon from '@mui/icons-material/Delete';
import ApprovalFormContainer from './ApprovalFormContainer';
import Button from '@mui/material/Button';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function RegistrationViewer({userToken,user}) {
    
    //React Hooks Declarations.
    const [initialize, setInitialize] = React.useState(true);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const [alertUser, setAlertUser] = React.useState(ALERT.RESET);
    const [editable,setEditable] = React.useState(false)
    const [openApproval,setOpenApproval] = useState(false);
    const [openDelete,setOpenDelete] = useState(false);
    const [registrationRow, setRegistrationRow] = useState({});
    const [result,setResult] = useState({});
    // Steps for forms.  Approval starts at Step 1, Delete starts at Step 98
    const [step,setStep] = useState(0)

    const AlertUser = (x) => {
		console.log('alert user activated')
        if(x.error.active){
            return(<Alert variant="filled" severity="error">{x.error.text}</Alert>)
        }
        else if(x.success.active){
            return(<Alert variant="filled" severity="success">{x.success.text}</Alert>)
        }
        setAlertUser(ALERT.RESET)
        return(null)
    
    }


    const handleTableDelete = async (id) => {
   
        await destroyRegistrationApi(id, userToken).then((response) => response.data).then((data) => {
        setResult(data)
        }).catch(function (error) {
        setResult({error:true})
        });

        resetRegistrations()

        //Display Delete success/error step
        setStep(99)
    }

    const actions = () => {
        if(user === 'admin'){
            return (
                [
                    {
                        icon: ()=> <SaveIcon />,
                        tooltip:'Save User',
                        onClick: (event,rowData) => {
                            console.log(rowData)
                            setRegistrationRow(rowData)
                            setStep(1)
                            setOpenApproval(true)
                        },
                    },
                    {
                        icon: ()=> <DeleteIcon />,
                        tooltip:'Delete User',
                        onClick: (event,rowData) => {
                            console.log(rowData)
                            setRegistrationRow(rowData)
                            setStep(98)
                            setOpenDelete(true)
                        },
                    },
                ]
            )
        } else if (user === 'hra_1' || user === 'hra_2'){
            return (
                [
                    {
                        icon: ()=> <AssignmentIndIcon />,
                        tooltip:'Approve User',
                        onClick: (event,rowData) => {
                            console.log(rowData)
                            setRegistrationRow(rowData)
                            setStep(1)
                            setOpenApproval(true)
                        }}
                ]
            )
        }
    }

    const materialTableSelect = () => {
	    if(registrations.length > 0){
            const cols = Object.keys(registrations[0])
            let columns = []
    
            const registrations_columns_admin = [
                { title: 'EDIPI', field: 'edipi', type:'date', col_id:2.0, editable: 'never'},
                { title: 'First Name', field: 'first_name',col_id:2.1,editable: 'never' },
                { title: 'Last Name', field: 'last_name',col_id:2.2,editable: 'never' },
                { title: 'Title', field: 'title',col_id:2.3,editable: 'never' },
                { title: 'Office Symbol', field: 'office_symbol_alias',col_id:2.4,editable: 'never' },
                { title: 'Work Phone', field: 'work_phone',col_id:2.5,editable: 'never' },
                { title: 'Deleted', field: 'deleted',col_id:2.6,editable: 'never' },
                { title: 'Division', field: 'division_symbol',col_id:2.8,editable: 'never' },
                { title: 'District', field: 'district_symbol',col_id:2.9,editable: 'never' },
                { title: 'Office Location', field: 'office_location_name',col_id:2.9,editable: 'never' },
                { title: 'Email', field: 'email',col_id:3.0,editable: 'never' },
                { title: 'User Type', field: 'user_type_label',col_id:3.1,editable: 'never' },
                { title: 'HRA', field: 'hras',col_id:3.2,editable: 'never' },
                { title: 'Status Comment', field: 'status_comment',col_id:3.3,editable: 'never' }
            ]

            const registrations_columns_hra = [
                { title: 'First Name', field: 'first_name',col_id:2.1,editable: 'never' },
                { title: 'Last Name', field: 'last_name',col_id:2.2,editable: 'never' },
                { title: 'Title', field: 'title',col_id:2.3,editable: 'never' },
                { title: 'Office Symbol', field: 'office_symbol_alias',col_id:2.4,editable: 'never' },
                { title: 'Work Phone', field: 'work_phone',col_id:2.5,editable: 'never' },
                { title: 'Division', field: 'division_symbol',col_id:2.8,editable: 'never' },
                { title: 'District', field: 'district_symbol',col_id:2.9,editable: 'never' },
                { title: 'Office Location', field: 'office_location_name',col_id:2.9,editable: 'never' },
                { title: 'Email', field: 'email',col_id:3.0,editable: 'never' },
            ]
    
            
            for(const col_config of user === 'admin' ? registrations_columns_admin:registrations_columns_hra){
                if(col_config.hasOwnProperty('field') && col_config){
                    if(cols.includes(col_config.field)) columns.push(col_config)
                }
            }
    
            return(

                <div style={{ maxWidth: '100%'}}>
                    <MaterialTable
                    style={{fontSize:'10px'}}
                    icons={tableIcons}
                    columns={columns}
                    data={registrations}
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
                        fontSize:'10px'
                    }
                    
                    }}
                    actions={actions()}
                    title=""
                    />
                </div>
            )
        }

        return(<p>No Pending Registrations Found.</p>)
    }   

    const resetRegistrations = () => {
		setLoading(true)

    if(user != 'admin'){
    getEmployeeByEDIPIWithOffice(userToken).then((response) => response.data).then((hra) => {
        console.log(hra.data)
        getAllRegistrationsApi(userToken).then((response) => response.data).then((data) => {

            // Store HRA object
            const h = hra.data[0]

            // Filter registrations to match HRA division, district, office_symbol.  Include only Regular user registrations
            const registrations = data.status === 200 ? data.data.filter((r)=>{
                    return (
                        r.division === h.division 
                        && 
                        r.district === h.district 
                        && 
                        r.office_symbol === h.office_symbol
                        &&
                        r.user_type_label === 'Regular'
                    )
            }):data
            
            setRegistrations(registrations)

            setLoading(false)

            }).catch(function (error) {
                setLoading(false)
                setRegistrations([])
            });
        }).catch(function (error) {
            setLoading(false)
            setRegistrations([])
        })
    } else {
        getAllRegistrationsApi(userToken).then((response) => response.data).then((data) => {
            setRegistrations(data.status == 200 ? data.data : data)
            setLoading(false)
        }).catch(function (error) {
            setLoading(false)
            setRegistrations([])
        })
    }



	}

React.useEffect(() => {
    
    console.log(`Registration List Call`)
    setLoading(true)
    if(user != 'admin'){
    getEmployeeByEDIPIWithOffice(userToken).then((response) => response.data).then((hra) => {
        console.log(hra.data)
        getAllRegistrationsApi(userToken).then((response) => response.data).then((data) => {

            // Store HRA object
            const h = hra.data[0]

            // Filter registrations to match HRA division, district, office_symbol.  Include only Regular user registrations
            const registrations = data.status === 200 ? data.data.filter((r)=>{
                    return (
                        r.division === h.division 
                        && 
                        r.district === h.district 
                        && 
                        r.office_symbol === h.office_symbol
                        &&
                        r.user_type_label === 'Regular'
                    )
            }):data
            
            setRegistrations(registrations)

            setLoading(false)

            }).catch(function (error) {
                setLoading(false)
                setRegistrations([])
            });
        }).catch(function (error) {
            setLoading(false)
            setRegistrations([])
        })
    } else {
        getAllRegistrationsApi(userToken).then((response) => response.data).then((data) => {
            setRegistrations(data.status == 200 ? data.data : data)
            setLoading(false)
        }).catch(function (error) {
            setLoading(false)
            setRegistrations([])
        })
    }

}, []);//will run once.


//Render return.
	return (
        <>
        {openApproval && 
            <ApprovalFormContainer 
                openPopup={openApproval} 
                setOpenPopup={setOpenApproval} 
                registrationRow={registrationRow} 
                step={step}
                setStep={setStep}
                resetRegistrations={resetRegistrations}
            />
        }
        {openDelete && 
            <ApprovalFormContainer 
                openPopup={openDelete} 
                setOpenPopup={setOpenDelete} 
                registrationRow={registrationRow} 
                handleTableDelete={handleTableDelete} 
                step={step}
                setStep={setStep}
                result={result}
                setResult={setResult}
            />
        }
        <div>
            <div style={{textAlign: 'center'}}>
                 <h2 >Pending User Registrations</h2>
			</div>
             {alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
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
    'selectUser',
    RegistrationViewer);