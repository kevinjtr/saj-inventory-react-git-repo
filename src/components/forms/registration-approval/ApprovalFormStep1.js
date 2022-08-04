import { CircularProgress } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import { connect } from 'redux-bundler-react';
import { getAllEmployees2Api } from '../../../publics/actions/employee-api';
import { getRegisteredUserByEDIPIApi } from '../../../publics/actions/registered-users-api';
import ApprovalFormStep1RegularUI from "./ApprovalFormStep1RegularUI";
import ApprovalFormStep1ExpressUI from "./ApprovalFormStep1ExpressUI";

const ApprovalFormStep1 = ({user,matchSelection,setMatchSelection,selection,setSelection,employees,setEmployees,setOpenPopup,setStep,userToken,registrationRow,employeeRow,setEmployeeRow,hraRow,setHraRow,registeredUserRow,setRegisteredUserRow,employeesLoaded,setEmployeesLoaded}) => {

    const [loading, setLoading] = useState(false)
    const [loadingMessage,setLoadingMessage] = useState('')

    // Show next employee match
    const handleNext= () =>{
        if((matchSelection + 1) < employees.length){
            const next = matchSelection + 1
            setMatchSelection(next)
        }
    }
    // Show prev employee match
    const handlePrev= () =>{
        if(matchSelection > 0){
            const prev = matchSelection - 1
            setMatchSelection(prev)
        }
    }

    const handleUseExisting = (selection,admin) =>{
        const newEmployeeRow = {...employeeRow}
        newEmployeeRow.id = employees[selection].id
        newEmployeeRow.first_name = employees[selection].first_name
        newEmployeeRow.last_name = employees[selection].last_name
        newEmployeeRow.office_symbol = employees[selection].office_symbol
        newEmployeeRow.office_symbol_alias = employees[selection].office_symbol_alias
        newEmployeeRow.title = employees[selection].title
        newEmployeeRow.work_phone = employees[selection].work_phone
        newEmployeeRow.district = employees[selection].district
        newEmployeeRow.district_name = employees[selection].district_name
        newEmployeeRow.division = employees[selection].division
        newEmployeeRow.division_name = employees[selection].division_name
        newEmployeeRow.email = employees[selection].email
        newEmployeeRow.office_location_id = employees[selection].office_location_id
        newEmployeeRow.office_location_name = employees[selection].office_location_name
        setEmployeeRow(newEmployeeRow)

        const newHraRow = {...hraRow}
        newHraRow.employee_id = employees[selection].id
        newHraRow.name = employees[selection].first_name + ' ' + employees[selection].last_name
        newHraRow.hra_num = registrationRow.hras ? registrationRow.hras:''
        setHraRow(newHraRow)

        const newRegisteredUserRow = {...registeredUserRow}
        newRegisteredUserRow.employee_id = employees[selection].id
        newRegisteredUserRow.full_name = employees[selection].first_name + ' ' + employees[selection].last_name
        newRegisteredUserRow.user_level = (registrationRow.user_type_label === 'HRA' && admin === true) ? '11':'7'
        setRegisteredUserRow(newRegisteredUserRow)

        if(admin){
            setStep(2)
        }else {
            setStep(3)
        }
    }

    const handleNewEmployee = (admin) =>{

        // Set employee row with registration row data
        const newEmployeeRow = {...employeeRow}
        newEmployeeRow.id = null
        newEmployeeRow.first_name = registrationRow.first_name
        newEmployeeRow.last_name = registrationRow.last_name
        newEmployeeRow.office_symbol = registrationRow.office_symbol
        newEmployeeRow.title = registrationRow.title
        newEmployeeRow.work_phone = registrationRow.work_phone
        newEmployeeRow.district = registrationRow.district
        newEmployeeRow.division = registrationRow.division
        newEmployeeRow.email = registrationRow.email
        newEmployeeRow.office_location_id = registrationRow.office_location_id
        setEmployeeRow(newEmployeeRow)

        // Set hra row with registration row data
        const newHraRow = {...hraRow}
        newHraRow.employee_id = null
        newHraRow.name = registrationRow.first_name ? (registrationRow.first_name + ' ' + registrationRow.last_name) : registrationRow.last_name
        newHraRow.hra_num = registrationRow.hras ? registrationRow.hras:''
        setHraRow(newHraRow)

        // Set registered user row with registration row data
        const newRegisteredUserRow = {...registeredUserRow}
        newRegisteredUserRow.employee_id = null
        newRegisteredUserRow.full_name = registrationRow.first_name ? (registrationRow.first_name + ' ' + registrationRow.last_name) : registrationRow.last_name
        newRegisteredUserRow.user_level = registrationRow.user_type_label === 'HRA' ? '11':'7'
        setRegisteredUserRow(newRegisteredUserRow)
        
        // Next step
        if(admin){
            setStep(2)
        }else {
            setStep(3)
        }
	}



    useEffect(async ()=>{
        if(!employeesLoaded){
        console.log('Get registered user by EDIPI...')
        setLoadingMessage('Checking user CAC...')
        setLoading(true)

        let edipiMatch = true

        await getRegisteredUserByEDIPIApi(registrationRow.edipi,userToken).then((response)=>response.data).then((data) => {
            if(data.data.length === 0){
                edipiMatch = false
            } else {
                const newRegisteredUserRow = {...registeredUserRow}
                newRegisteredUserRow.employee_id = data.data[0].employee_id
                newRegisteredUserRow.full_name = data.data[0].full_name
                newRegisteredUserRow.user_level = data.data[0].user_level
                newRegisteredUserRow.edipi = data.data[0].edipi
                setRegisteredUserRow(newRegisteredUserRow)
            }
        })

        if(!edipiMatch){
        console.log('Employee call...')
        setLoadingMessage('Searching employee table...')
        getAllEmployees2Api(userToken).then((response) => response.data).then((data) => {
            
            // First filter on user input first and last name 
            const matches1 = data.data.filter((match) => {
                if(match.first_name && match.last_name){
                    return(
                    match.first_name.toString().toLowerCase().replace(/-/g,' ').trim().includes((registrationRow.first_name && registrationRow.first_name.length > 1) ? registrationRow.first_name.toLowerCase().replace(/-/g,' ').trim():'')
                    && 
                    match.last_name.toString().toLowerCase().replace(/-/g,' ').trim().includes((registrationRow.last_name && registrationRow.last_name.length > 1) && registrationRow.last_name.toLowerCase().replace(/-/g,' ').trim())
                    )
                }
            })

            // If no results, search only on last
            const matches2 = matches1.length === 0 ? data.data.filter((match) => {
                if(match.first_name && match.last_name){
                    return(
                    match.last_name.toString().toLowerCase().replace(/-/g,' ').trim().includes((registrationRow.last_name && registrationRow.last_name.length > 1) && registrationRow.last_name.toLowerCase().replace(/-/g,' ').trim())
                    )
                }
            }):[]

            // Next filter on CAC first and last name
            const matches3 = data.data.filter((match) => {
                if(match.first_name && match.last_name){
                    return(
                    match.first_name.toString().toLowerCase().replace(/-/g,' ').trim().includes((registrationRow.first_name_cac && registrationRow.first_name_cac.length > 1) ? registrationRow.first_name_cac.toLowerCase().replace(/-/g,' ').trim():'')
                    && 
                    match.last_name.toString().toLowerCase().replace(/-/g,' ').trim().includes((registrationRow.last_name_cac && registrationRow.last_name_cac.length > 1) && registrationRow.last_name_cac.toLowerCase().replace(/-/g,' ').trim())
                    )
                }
            })

            // If no results from CAC first and last name, search only on CAC last name
            const matches4 = matches3.length === 0 ? data.data.filter((match) => {
                if(match.first_name && match.last_name){
                    return(
                    match.last_name.toString().toLowerCase().replace(/-/g,' ').trim().includes((registrationRow.last_name_cac && registrationRow.last_name_cac.length > 1) && registrationRow.last_name_cac.toLowerCase().replace(/-/g,' ').trim())
                    )
                }
            }):[]

            const matches = [...new Set([...matches4,...matches3,...matches2,...matches1])];

            if(matches.length > 0){
            setEmployees(matches)
            }

            setLoading(false)

            }).catch(function (error) {
            setLoading(false)
            setEmployees([{
                id:'',
                first_name:'',
                last_name:'',
                office_symbol:'',
                title:'',
                work_phone:'',
                district:'',
                division:'',
                email:'',
                office_location_id:''
            }])
        });

        setEmployeesLoaded(true)

        } else{
            //  If EDIPI match is found, set to step 4 to alert the user and abort the assignment process
            setStep(4)         
        } 
  
        } 
        
        }, []);//will run once.

    return(
        <>
            {loading ? (
            <div style={{display:'flex',padding:'1em'}}>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    <CircularProgress size={20} />
                </div>
                <div style={{paddingLeft:'1em',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    {loadingMessage}
                </div>
            </div>
            ):(
            <>
            {user === 'admin' ?
            (<ApprovalFormStep1RegularUI
                handlePrev={handlePrev} 
                handleNext={handleNext} 
                handleUseExisting={handleUseExisting}
                handleNewEmployee={handleNewEmployee}
                matchSelection={matchSelection}
                selection={selection}
                setSelection={setSelection}
                employees={employees}
                setOpenPopup={setOpenPopup}
                registrationRow={registrationRow}
            />):
            (<ApprovalFormStep1ExpressUI 
                handlePrev={handlePrev} 
                handleNext={handleNext} 
                handleUseExisting={handleUseExisting}
                handleNewEmployee={handleNewEmployee}
                matchSelection={matchSelection}
                selection={selection}
                setSelection={setSelection}
                employees={employees}
                setOpenPopup={setOpenPopup}
                registrationRow={registrationRow}
            />)
            }
            </>)
            }
        </>
    )
}

export default connect(
    'selectUser',
    'selectUserToken',
    ApprovalFormStep1);

