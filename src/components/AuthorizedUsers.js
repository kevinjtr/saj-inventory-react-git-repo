import React from 'react';
import '../img/style.css';
import api from '../axios/Api';
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
        setAlertUser(ALERT.RESET)

        await addAuthorizedUsersApi(newData, userToken).then((response) => response.data).then((data) => {
            const {error} = data
            errorFound = error

            if (error) {
                setAlertUser(ALERT.FAIL())
            } else {
                if(data.authorizedUsers){
                    setAuthorizedUsers(data.authorizedUsers)
                }
                
                setAlertUser(ALERT.SUCCESS)
            }

        }).catch(function (error) {
            console.log(error)
            setAlertUser(ALERT.FAIL())
        });

        return errorFound

    }

    const handleTableDelete = async (rowData) => {
        let errorFound = false
        setAlertUser(ALERT.RESET)

        await deleteAuthorizedUsersApi(rowData, userToken).then((response) => response.data).then((data) => {
            const {error} = data
            errorFound = error

            if (error) {
                setAlertUser(ALERT.FAIL())
            } else {
                if(data.authorizedUsers){
                    setAuthorizedUsers(data.authorizedUsers)
                }
                
                setAlertUser(ALERT.SUCCESS)
            }

        }).catch(function (error) {
            console.log(error)
            setAlertUser(ALERT.FAIL())
        });

        return errorFound
    }

    const materialTableSelect = () => {

            let columns = []

            const authorizedUsers_cols_config = [
                { title: 'User Name', field: 'registered_users_id', col_id: 2.0, render: rowData => <a value={rowData.registered_users_id} >{rowData.full_name}</a>,
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
                            if(v){
                                if(v.hasOwnProperty('registered_users_id')){
                                    x.onChange(v.registered_users_id)
                                    return;
                                }
                            }

                            x.onChange(v)
                        }}

                        renderInput={(params) => <TextField {...params} label="User Name" margin="normal"/>}
                        renderOption={(option) => <a style={{fontSize:'16px'}}>{option.full_name}</a>}
                    />
                    )
                },
                validate: (rowData) => {
                    if(rowData.hasOwnProperty('hra_num')){
                        if(!isNaN(rowData.registered_users_id)) {
                            if(typeof rowData.registered_users_id === "number"){
                                if(rowData.registered_users_id.toString().length == 0){
                                    return ({ isValid: false, helperText: 'Invalid Full name.' })
                                }

                                return true
                            }
                
                            if(typeof rowData.registered_users_id === "string"){
                                return ({ isValid: false, helperText: 'Invalid Full name.' })
                            }
                        }
                    }
                    return ({ isValid: false, helperText: 'Selection is required.' })
                }
            },
                { title: 'HRA Account', field: 'hra_num', col_id: 2.2,
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
                        getOptionLabel={(option) =>  option.hra_num ? option.hra_num.toString(): ""}
                        value={idx != -1 ? hras[idx] : null}
                         onChange ={(e, v) => {
                            if(v){
                                if(v.hasOwnProperty('hra_num')){
                                    x.onChange(v.hra_num)
                                    return;
                                }
                            }
                            
                            x.onChange(v)
                        }}

                        renderInput={(params) => <TextField {...params} label="HRA Account" margin="normal"/>}
                        renderOption={(option) => <a style={{fontSize:'16px'}}>{option.hra_num ? option.hra_num.toString(): ""}</a>}
                    />
                    )
                },
                validate: (rowData) => {
                    if(rowData.hasOwnProperty('hra_num')){
                        if(!isNaN(rowData.hra_num)) {
                            if(typeof rowData.hra_num === "number"){
                                if(rowData.hra_num.toString().length > 3){
                                    return ({ isValid: false, helperText: 'HRA Num digits exceed 3.' })
                                }

                                return true
                            }
                
                            if(typeof rowData.hra_num === "string"){
                                return ({ isValid: false, helperText: 'HRA Num needs to be numeric.' })
                            }
                        }
                    }
                    return ({ isValid: false, helperText: 'HRA Num is required.' })
                }
            }
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
                                                //resetAuthorizedUsers()
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

                                            //resetAuthorizedUsers();
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
}

export default connect(
    'selectUserToken',
    AuthorizedUsers);