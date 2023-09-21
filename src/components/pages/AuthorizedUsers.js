import {useState, useEffect} from 'react';
import '../../img/style.css';
import { tableIcons } from '../material-table/config'
import AuthorizedUsersMuiTable from '../material-table/authorized-users-mui-table'
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material/';
import { findIndex, find } from 'lodash'
import { LoadingCircle } from '../tools/tools';
import { addAuthorizedUsersApi, getAuthorizedUsersApi, deleteAuthorizedUsersApi } from '../../publics/actions/authorized-users'
import { connect } from 'redux-bundler-react';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';

function AuthorizedUsers({ userToken }) {
    //React Hooks Declarations.
    const [initialize, setInitialize] = useState(true);
    const [authorizedUsers, setAuthorizedUsers] = useState([]);
    const [names, setNames] = useState([]);
    const [hras, setHRAs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(false)
    const [serverDown, setServerDown] = useState(false);

    const handleTableAdd = async (newData) => {
        let errorFound = false

        await addAuthorizedUsersApi(newData, userToken).then((response) => response.data).then((data) => {
            const {error} = data
            errorFound = error

            if (error) {
                toast.error('Could not complete action')
            } else {
                if(data.authorizedUsers){
                    setAuthorizedUsers(data.authorizedUsers)
                }
                
                toast.success('Action was completed')
            }

        }).catch(function (error) {
            console.log(error)
            toast.error('Could not complete action')
        });

        return errorFound

    }

    const handleTableDelete = async (rowData) => {
        let errorFound = false

        await deleteAuthorizedUsersApi(rowData, userToken).then((response) => response.data).then((data) => {
            const {error} = data
            errorFound = error

            if (error) {
                toast.error('Could not complete action')
            } else {
                if(data.authorizedUsers){
                    setAuthorizedUsers(data.authorizedUsers)
                }
                
                toast.success('Action was completed')
            }

        }).catch(function (error) {
            console.log(error)
            toast.error('Could not complete action')
        });

        return errorFound
    }

    const materialTableSelect = () => {

            return (
                <div style={{ maxWidth: '100%' }}>
                    <AuthorizedUsersMuiTable
                        name={'User'}
                        componentName={'Authorized Users'}
                        icons={tableIcons}
                        isLoading={loading}
                        hras={hras}
                        names={names}
                        //columns={authorizedUsers_cols_config}
                        data={authorizedUsers}
                        localization={{
                            toolbar: {
                                searchPlaceholder: "Filter Search"
                            }
                        }}
                        options={{
                            //exportButton: true,
                            //exportAllData: true,
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

    useEffect(() => {

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
            setServerDown(true)
            setLoading(false)
            setInitialize(false)
            setAuthorizedUsers([])
        });




    }, []);//will run once.


    //Render return.
    return (
        <>
            <div style={{textAlign: 'center',paddingBottom: 10 }}>
                <h2>Authorized Users</h2>
			</div>
            <div style={{ textAlign: 'center' }}>
                {materialTableSelect()}
            </div>
        </>
    );
}

export default connect(
    'selectUserToken',
    AuthorizedUsers);