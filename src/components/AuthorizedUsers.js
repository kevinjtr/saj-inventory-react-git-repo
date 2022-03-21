import React from 'react';
import '../img/style.css';
<<<<<<< Updated upstream
import api from '../axios/Api';
import MaterialTable from '@material-table/core'
import SearchIcon from '@material-ui/icons/Search';
import {tableIcons} from './material-table/config'
import Typography from '@material-ui/core/Typography';
import {Autocomplete, Alert} from '@material-ui/lab';
import {TextField, InputLabel, MenuItem, Select, Grid, IconButton, FormControl, Radio, RadioGroup, FormControlLabel, FormGroup} from '@material-ui/core';
import {orderBy, findIndex, filter} from 'lodash'
import {LoadingCircle, getQueryStringParams, ALERT} from './tools/tools';
import {addAuthorizedUsersApi, getAuthorizedUsersApi} from '../publics/actions/authorized-users'
import { connect } from 'redux-bundler-react';
//import Header from './Header'

function AuthorizedUsers({userToken}) {
    //React Hooks Declarations.
    const [initialize, setInitialize] = React.useState(true);
    const [AuthorizedUsers, setAuthorizedUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [alertUser, setAlertUser] = React.useState(ALERT.RESET);
    const [editable,setEditable] = React.useState(false)
    const Resolved_Deleted_Options = {'No':'No','Yes':'Yes'}
  /*   const [windowSize, setWindowSize] = React.useState({
        width: undefined,
        height: undefined,
        });


    const reloadPage = () => {
            window.location.reload()
    }
 */
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
   
    const handleTableAdd = async (rowData) => {

        let errorFound = false
            await addAuthorizedUsersApi(rowData, userToken).then((response) => response.data).then((data) => {
                console.log(data)
    
            const status = data.hasOwnProperty('status') ? data.status == 400 : false
            errorFound = data.hasOwnProperty('error') ? data.error : false
    
            if(status || errorFound){
                setAlertUser(ALERT.FAIL())
            }else {
                setAlertUser(ALERT.SUCCESS)
            }
      
            }).catch(function (error) {
            
            });
            
    return errorFound
     
        }

	/* function handleResize() {
		// Set window width/height to state
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	} */


    const materialTableSelect = () => {
	    if(AuthorizedUsers.length > 0){
            const cols = Object.keys(AuthorizedUsers[0])
            let columns = []
            /* const dataIsOnDatabase = {
            bar_tag_num:false
            } */
    
            const problems_cols_config = [
                { title: 'Full Name', field: 'full_name', col_id:2.0, editable: 'never'},
                { title: 'HRA Number', field: 'HRA_NUM',col_id:2.1,editable: 'never' }
                
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
                    data={AuthorizedUsers}
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
                        onRowAdd: async (newData) => {
                            const result = await handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
                                return (new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        //setHras([...hras, newData]);
                                        if(result.errorFound){
                                            reject()
                                        }else{
                                            resetAuthorizedUsers()
                                            resolve();
                                        }
                                        
                                    }, 1000);
                                }))
                            },
                        /* isEditable: rowData => rowData.editable !== 'never', // only name(a) rows would be editable
                         onRowUpdate: async (newData, oldData) =>{
                            const errorResult = await handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
                            return(new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if(errorResult){
                                        reject()
                                        return;
                                    }
    
                                    resetAuthorizedUsers();
                                    resolve();
                                        
                                }, 1000);
                            }))
                            }, */
                    }})}
                    />
                </div>
            )
        }

        return(<p>No Data Found.</p>)
    }   

    const resetAuthorizedUsers = () => {
		setLoading(true)
	    getAuthorizedUsersApi(userToken).then((response) => response.data).then((data) => {
		console.log(data)
		setAuthorizedUsers(data.status == 200 ? data.data : data)
		setLoading(false)
	}).catch(function (error) {
		setAuthorizedUsers([])
		setLoading(false)
	});
	}
React.useEffect(() => {
    
    console.log(`Authorized Users Call`)
        setInitialize(true)
        setLoading(true)
        getAuthorizedUsersApi(userToken).then((response) => response.data).then((data) => {
        setLoading(false)
        console.log(data)
        setAuthorizedUsers(data.status == 200 ? data.data : data)

        if(data.status == 200 && data.editable){
            setEditable(data.editable)
        }

        setAuthorizedUsers(data.status == 200 ? data.data : data)
 
        setInitialize(false)
        }).catch(function (error) {
        setLoading(false)
        setInitialize(false)
        setAuthorizedUsers([])
        });

}, []);//will run once.


//Render return.
	return (
         <>
        <div>
            <div style={{textAlign: 'center'}}>
                 <h2 >Authorized Users</h2>
			</div>
             {alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
             <div style={{textAlign: 'center'}}>
                {loading ? LoadingCircle() : null}
                {!loading > 0  ? materialTableSelect() : null}
            </div>
         </div>
        </>
	);
=======
import MaterialTable from '@material-table/core'
import SearchIcon from '@material-ui/icons/Search';
import { tableIcons } from './material-table/config'
import Typography from '@material-ui/core/Typography';
import { Autocomplete, Alert } from '@material-ui/lab';
import { TextField, InputLabel, MenuItem, Select, Grid, IconButton, FormControl, Radio, RadioGroup, FormControlLabel, FormGroup } from '@material-ui/core';
import { orderBy, findIndex, filter } from 'lodash'
import { LoadingCircle, getQueryStringParams, ALERT } from './tools/tools';
import { addAuthorizedUsersApi, getAuthorizedUsersApi, deleteAuthorizedUsersApi, getNamesApi, getHRAsApi } from '../publics/actions/authorized-users'
import { connect } from 'redux-bundler-react';
//import Header from './Header'

function AuthorizedUsers({ userToken }) {
    //React Hooks Declarations.
    const [initialize, setInitialize] = React.useState(true);
    const [authorizedUsers, setAuthorizedUsers] = React.useState([]);
    const [names, setNames] = React.useState([]);
    const [hras, setHRAs] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [alertUser, setAlertUser] = React.useState(ALERT.RESET);
    const [editable, setEditable] = React.useState(false)
 
    const AlertUser = (x) => {
        console.log('alert user activated')
        if (x.error.active) {
            return (<Alert variant="filled" severity="error">{x.error.text}</Alert>)
        }
        else if (x.success.active) {
            return (<Alert variant="filled" severity="success">{x.success.text}</Alert>)
        }
        setAlertUser(ALERT.RESET)
        return (null)

    }

    const handleTableAdd = async (newData) => {

        let errorFound = false
        await addAuthorizedUsersApi(newData, userToken).then((response) => response.data).then((data) => {
            console.log(data)

            const status = data.hasOwnProperty('status') ? data.status == 400 : false
            errorFound = data.hasOwnProperty('error') ? data.error : false

            if (status || errorFound) {
                setAlertUser(ALERT.FAIL())
            } else {
                setAlertUser(ALERT.SUCCESS)
            }

        }).catch(function (error) {

        });

        return errorFound

    }

    const handleTableDelete = async (rowData) => {

        let errorFound = false
        await deleteAuthorizedUsersApi(rowData, userToken).then((response) => response.data).then((data) => {
            console.log(data)

            const status = data.hasOwnProperty('status') ? data.status == 400 : false
            errorFound = data.hasOwnProperty('error') ? data.error : false

            if (status || errorFound) {
                setAlertUser(ALERT.FAIL())
            } else {
                setAlertUser(ALERT.SUCCESS)
            }

        }).catch(function (error) {

        });

        return errorFound

    }


    const materialTableSelect = () => {
  
            let columns = []
            
            const authorizedUsers_cols_config = [
                { title: 'Full Name', field: 'registered_users_id', col_id: 2.0, render: rowData => <a value={rowData.registered_users_id} >{rowData.full_name}</a>,
                editComponent: x => {
                    let idx = -1
            
                    if(x.rowData.registered_users_id){
                        idx = findIndex(names,function(o){ return (o.registered_users_id && (o.registered_users_id === x.rowData.registered_users_id)); })
                    }
            
                    return(
                        <Autocomplete
                        id={`combo-box-employee-`}
                        size="small"
                        options={names}
                        getOptionLabel={(option) => option.full_name}
                        value={idx != -1 ? names[idx] : null}
                        onChange ={(e,v) => {
                            //console.log(v)
                        //const id_ = e.target.textContent ? Number(e.target.textContent[0]) : null
                      
                        x.onChange(v.registered_users_id)
                        }}
                        
                        renderInput={(params) => <TextField {...params} label="Name" margin="normal"/>}
                    />
                    )
                    }},
                { title: 'HRA Number', field: 'hra_num', col_id: 2.2,
                editComponent: x => {
                   
                    let idx = -1
            
                    if(x.rowData.hra_num){
                        idx = findIndex(hras,function(o){ return (o.hra_num && (o.hra_num === x.rowData.hra_num)); })
                    }
            
                    return(
                        <Autocomplete
                        id={`combo-box-HRA-`}
                        size="small"
                        options={hras}
                        getOptionLabel={(option) =>  option.hra_num.toString()}
                        value={idx != -1 ? hras[idx] : null}
                         onChange ={e => {
            
                        const id_ = e.target.textContent ? Number(e.target.textContent[0]) : null
                      
                        x.onChange(id_)
                        }} 
                       
                    
                        renderInput={(params) => <TextField {...params} label="HRA Number" margin="normal"/>}
                    />
                    )
                    }}
            ]



            for (const col_config of authorizedUsers_cols_config) {
                if (col_config.hasOwnProperty('field') && col_config) {
                     columns.push(col_config)
                    
                }
            }

            return (
                <div style={{ maxWidth: '100%' }}>
                    <MaterialTable
                        icons={tableIcons}
                        columns={columns}
                        data={authorizedUsers}
                        localization={{
                            toolbar: {
                                searchPlaceholder: "Filter Search"
                            }
                        }}
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
                        {...(editable && {
                            editable: {
                                onRowAdd: async (newData) => {
                                    const result = await handleTableAdd({ changes: { '0': { newData: newData, oldData: null } } })
                                    return (new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            //setHras([...hras, newData]);
                                            if (result.errorFound) {
                                                reject()
                                                return;
                                            } else {
                                                resetAuthorizedUsers()
                                                resolve();
                                            }

                                        }, 1000);
                                    }))
                                },
                                onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                                onRowDelete: async (rowData) => {
                                    const errorResult = await handleTableDelete({changes:{'0':{rowData:rowData}}})
                                    return(new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            if(errorResult){
                                                reject()
                                                return;
                                            }
            
                                            resetAuthorizedUsers();
                                            resolve();
                                                
                                        }, 1000);
                                    }))
                                    },
                            }
                        })}
                    />
                </div>
            )
            
   
    }

    const resetAuthorizedUsers = () => {
        setLoading(true)
        getAuthorizedUsersApi(userToken).then((response) => response.data).then((data) => {
            console.log(data)
            setAuthorizedUsers(data.status == 200 ? data.data.authorizedUsers : data)
            setLoading(false)
        }).catch(function (error) {
            setAuthorizedUsers([])
            setLoading(false)
        });
    }

  

    React.useEffect(() => {

        console.log(`Authorized Users Call`)
        setInitialize(true)
        setLoading(true)
        getAuthorizedUsersApi(userToken).then((response) => response.data).then((data) => {
            console.log(data)
           
            // console.log(data)
            setAuthorizedUsers(data.status == 200 ? data.data.authorizedUsers : data)
            setHRAs(data.status == 200 ? data.data.hras : data)
            setNames(data.status == 200 ? data.data.registeredUsers : data)
            if (data.status == 200 && data.editable) {
                setEditable(data.editable)
            }

            //setAuthorizedUsers(data.status == 200 ? data.data : data)
            setLoading(false)
            setInitialize(false)
        }).catch(function (error) {
            setLoading(false)
            setInitialize(false)
            setAuthorizedUsers([])
        });

       
       

    }, []);//will run once.


    //Render return.
    return (
        <>
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h2 >Authorized Users</h2>
                </div>
                {alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
                <div style={{ textAlign: 'center' }}>
                    {loading ? LoadingCircle() : null}
                    {!loading > 0 ? materialTableSelect() : null}
                    
                </div>
            </div>
        </>
    );
>>>>>>> Stashed changes
}

export default connect(
    'selectUserToken',
    AuthorizedUsers);