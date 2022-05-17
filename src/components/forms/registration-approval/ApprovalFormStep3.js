import React, {useState} from "react";
import { addEmployee2Api } from '../../../publics/actions/employee-api';
import { addHraApi } from '../../../publics/actions/hra-api';
import { addRegisteredUserApi } from "../../../publics/actions/registered-users-api";
import { destroyRegistrationApi } from '../../../publics/actions/register-api';
import { connect } from 'redux-bundler-react';
import ApprovalFormStep3RegularUI from "./ApprovalFormStep3RegularUI";
import ApprovalFormStep3ExpressUI from "./ApprovalFormStep3ExpressUI";


const ApprovalFormStep3 = (props) => {

    const {user,userToken,setStep,employeeRow,hraRow,registeredUserRow,registrationRow,setOpenPopup,matchingHRA,setRegisteredUserRow,setHraRow,setEmployeeRow,resetRegistrations} = props
    
    const [addEmployeeStatus,setAddEmployeeStatus]= useState(employeeRow.id ? 'Complete':'Pending')
    const [matchingEmployee,setMatchingEmployee] = useState(employeeRow.id ? true:false)
    const [addHraStatus,setAddHraStatus]= useState(matchingHRA ? 'Complete':'Pending')
    const [addRegisteredUserStatus,setAddRegisteredUserStatus]= useState('Pending')
    const [deleteRegistrationStatus,setDeleteRegistrationStatus]= useState('Pending')
    const [actionTab,setActionTab] = useState(0)

    const [loading,setLoading] = useState(false)
    const [executed,setExecuted] = useState(false)


    const handleExecute = async () => {

        setLoading(true)

        // If employee ID exists then skip to HRA
        if(employeeRow.id){
            // If user level is 11 or 12 (HRA), and if there is no existing matching HRA, add HRA and move to next step if no error is returned
            if((registeredUserRow.user_level !== '11' && registeredUserRow.user_level !== '12') || matchingHRA || await handleAddHra() === false){
                // Add registered user and move to next step if no error is returned
                if(await handleAddRegisteredUser() === false){
                    // Delete registration record
                    await handleDeleteRegistration()
                }       
            }
        } else {

            let employee = await handleAddEmployee()

            if(!employee.error && employee.employee_id){
                // If user level is 11 or 12 (HRA), and if there is no existing matching HRA, add HRA and move to next step if no error is returned
                if((registeredUserRow.user_level !== '11' && registeredUserRow.user_level !== '12') || matchingHRA || await handleAddHra(employee.employee_id) === false){
                    // Add registered user and move to next step if no error is returned
                    if(await handleAddRegisteredUser(employee.employee_id) === false){
                        // Delete registration record
                        await handleDeleteRegistration()
                    }       
                }
            }
        }

        
        setExecuted(true)
        setLoading(false)
    }

    const handleAddEmployee = async () =>{
        
        let errorFound = true

        setAddEmployeeStatus('Executing')

        // Create array with the structure that the add/update API requires
        const rowData = {}
        rowData.changes = {}
        rowData.changes['0'] = {}
        rowData.changes['0'].newData = {}
        rowData.changes['0'].newData.title = employeeRow.title
        rowData.changes['0'].newData.first_name = employeeRow.first_name
        rowData.changes['0'].newData.last_name = employeeRow.last_name
        rowData.changes['0'].newData.work_phone = employeeRow.work_phone
        rowData.changes['0'].newData.email = employeeRow.email
        rowData.changes['0'].newData.district = employeeRow.district
        rowData.changes['0'].newData.division = employeeRow.division
        rowData.changes['0'].newData.office_symbol = employeeRow.office_symbol
        rowData.changes['0'].oldData = null

        let employee = {error:null,employee_id:null}

        await addEmployee2Api(rowData, userToken).then((response) => response.data).then((data) => {

            const status = data.hasOwnProperty('status') ? data.status == 400 : false
            const error = data.hasOwnProperty('error') ? data.error : false

            if(status || error){
                //console.log('add employee failed')
            }else {
                errorFound = false

                // This value will be passed to create new HRA and new registered user, since react state varables are updating asyncronously
                employee.employee_id = data.data[0][0]

                const newEmployeeRow = {...employeeRow}
                newEmployeeRow.id = data.data[0][0]
                setEmployeeRow(newEmployeeRow)
                
                const newHraRow = {...hraRow}
                newHraRow.employee_id = data.data[0][0]
                setHraRow(newHraRow)

                const newRegisteredUserRow = {...registeredUserRow}
                newRegisteredUserRow.employee_id = data.data[0][0]
                setRegisteredUserRow(newRegisteredUserRow)

                //console.log('add employee success')
            }

            }).catch(function (error) {
        });

        setAddEmployeeStatus(errorFound ? 'Error':'Complete')

        employee.error = errorFound

        return employee
    }

    const handleAddHra = async (employee_id) =>{

        setAddHraStatus('Executing')

        let errorFound = true

        const rowData = {}
        rowData.changes = {}
        rowData.changes['0'] = {}
        rowData.changes['0'].newData = {}
        rowData.changes['0'].newData.hra_num = hraRow.hra_num
        rowData.changes['0'].newData.employee_id = hraRow.employee_id ? hraRow.employee_id : employee_id
        rowData.changes['0'].newData.name = hraRow.name
        rowData.changes['0'].oldData = null

        await addHraApi(rowData, userToken).then((response) => response.data).then((data) => {

            const status = data.hasOwnProperty('status') ? data.status == 400 : false
            const error = data.hasOwnProperty('error') ? data.error : false

            if(status || error){
                console.log('add hra failed')
            }else {
                errorFound = false
                console.log('add hra success')
            }

            }).catch(function (error) {
        });

        setAddHraStatus(errorFound ? 'Error':'Complete')

        return errorFound
    }

    const handleAddRegisteredUser = async (employee_id) =>{

        setAddRegisteredUserStatus('Executing')
        
        let errorFound = true

        const rowData = {}
        rowData.changes = {}
        rowData.changes['0'] = {}
        rowData.changes['0'].newData = {}
        rowData.changes['0'].newData.edipi = registeredUserRow.edipi
        rowData.changes['0'].newData.full_name = registeredUserRow.full_name
        rowData.changes['0'].newData.employee_id = registeredUserRow.employee_id ? registeredUserRow.employee_id:employee_id
        rowData.changes['0'].newData.user_level = registeredUserRow.user_level
        rowData.changes['0'].oldData = null

        await addRegisteredUserApi(rowData, userToken).then((response) => response.data).then((data) => {

            const status = data.hasOwnProperty('status') ? data.status == 400 : false
            const error = data.hasOwnProperty('error') ? data.error : false

            if(status || error){
                console.log('add ru failed')
            }else {
                errorFound = false
                console.log('add ru success')
            }

            }).catch(function (error) {
        });

        setAddRegisteredUserStatus(errorFound ? 'Error':'Complete')

        return errorFound
    }

    const handleDeleteRegistration = async () =>{

        setDeleteRegistrationStatus('Executing')

        let errorFound = true

        await destroyRegistrationApi(registrationRow.id, userToken).then((response) => response.data).then((data) => {

            const status = data.hasOwnProperty('status') ? data.status == 400 : false
            const error = data.hasOwnProperty('error') ? data.error : false
            
            if(status || error){
                console.log('delete registration failed')
            }else {
                errorFound = false
                console.log('delete registration success')
            }

        }).catch(function (error) {
        })
    
        resetRegistrations()
        setDeleteRegistrationStatus(errorFound ? 'Error':'Complete')

        return errorFound
    }

    return(
        <>
        {user === 'admin' ? (
        <ApprovalFormStep3RegularUI
            setStep={setStep}
            employeeRow={employeeRow}
            hraRow={hraRow}
            registeredUserRow={registeredUserRow}
            registrationRow={registrationRow}
            setOpenPopup={setOpenPopup}
            matchingHRA={matchingHRA}
            loading={loading}
            executed={executed}
            setActionTab={setActionTab}
            actionTab={actionTab}
            addEmployeeStatus={addEmployeeStatus}
            matchingEmployee={matchingEmployee}
            addHraStatus={addHraStatus}
            addRegisteredUserStatus={addRegisteredUserStatus}
            deleteRegistrationStatus={deleteRegistrationStatus}
            handleExecute={handleExecute}
         />
        ):(
        <ApprovalFormStep3ExpressUI
        addEmployeeStatus={addEmployeeStatus}
        addRegisteredUserStatus={addRegisteredUserStatus}
        handleExecute={handleExecute}
        deleteRegistrationStatus={deleteRegistrationStatus}
        loading={loading}
        setLoading={setLoading}
        setOpenPopup={setOpenPopup}
         />
        )
        }
        </>
    )
}

export default connect(
    'selectUserToken',
    'selectUser',
    ApprovalFormStep3);
