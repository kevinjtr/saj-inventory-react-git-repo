import { Dialog } from "@mui/material";
import React, {useState} from "react";
import ApprovalFormStep1 from "./ApprovalFormStep1";
import ApprovalFormStep2 from "./ApprovalFormStep2";
import ApprovalFormStep3 from "./ApprovalFormStep3";
import ApprovalFormStep4 from "./ApprovalFormStep4";
import ApprovalFormStep98 from "./ApprovalFormStep98";
import ApprovalFormStep99 from "./ApprovalFormStep99";
import { LoadingCircle } from "../../tools/tools";
import './ApprovalFormStyles.css'
import { connect } from 'redux-bundler-react';
import { useTheme } from '@mui/material/styles';

const ApprovalFormContainer = (props) => {

    const {user,openPopup,setOpenPopup,registrationRow,handleTableDelete,step,setStep,result,setResult,resetRegistrations} = props

    // Employees variable to contain all employees and then to be filtered for matching employees
    const [employees, setEmployees] = useState([{
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

    // Selection state variables for Step 1 of the form
    const [matchSelection,setMatchSelection] = useState(0)
    const [selection,setSelection] = useState(-1)

    // Set if employee table has been loaded and searched
    const [employeesLoaded,setEmployeesLoaded] = useState(false)

    // Set if matching HRA was found
    const [matchingHRA,setMatchingHRA] = useState(false)

    // New or existing employee information
    const [employeeRow,setEmployeeRow] = useState({
        id:null,
        first_name:'',
        last_name:'',
        office_symbol:null,
        title:'',
        work_phone:'',
        district:null,
        division:null,
        email:'',
        office_location_id:null
    })

    // New or existing HRA row information
    const [hraRow,setHraRow] = useState({
        hra_num:registrationRow.hras ? registrationRow.hras:'',
        employee_id:null,
        name:registrationRow.first_name + ' ' + registrationRow.last_name
    })

    // New registered user information
    const [registeredUserRow,setRegisteredUserRow] = useState({
        edipi:registrationRow.edipi,
        full_name:registrationRow.first_name + ' ' + registrationRow.last_name,
        employee_id:null,
        user_level:registrationRow.user_type_label === 'HRA' ? '11':'7'
    })

    // Loading variable for this component
    const [loading,setLoading] = useState(false)

    //Styles
    const theme = useTheme();

    const approvalStyles = {
		root:{
			backgroundColor: theme.palette.mode == "dark" ? theme.palette.background.default : 'rgba(255,255,255,0.75)',
			position:'absolute',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            top:0,
            bottom:0,
            left:0,
            right:0,
		},
	}

    return(
        <Dialog open={openPopup} maxWidth={false} >
            <div style={{position:'relative'}}>
            {loading &&
            <div style={approvalStyles.root}>
                <LoadingCircle />
            </div>}
            <div style={{display:'flex',flexDirection:'column',fontSize:'0.8em'}}>
                {step === 1 && 
                <ApprovalFormStep1
                    setStep={setStep}
                    setOpenPopup={setOpenPopup}
                    registrationRow={registrationRow}
                    setEmployeeRow={setEmployeeRow}
                    employeeRow={employeeRow}
                    hraRow={hraRow}
                    setHraRow={setHraRow}
                    registeredUserRow={registeredUserRow}
                    setRegisteredUserRow={setRegisteredUserRow}
                    employeesLoaded={employeesLoaded}
                    setEmployeesLoaded={setEmployeesLoaded}
                    employees={employees}
                    setEmployees={setEmployees}
                    selection={selection}
                    setSelection={setSelection}
                    matchSelection={matchSelection}
                    setMatchSelection={setMatchSelection}
                />
                }
                {step === 2 &&
                <ApprovalFormStep2 
                    employeeRow={employeeRow}
                    setOpenPopup={setOpenPopup}
                    setStep={setStep}
                    hraRow={hraRow}
                    setHraRow={setHraRow}
                    registeredUserRow={registeredUserRow}
                    setRegisteredUserRow={setRegisteredUserRow}
                    registrationRow={registrationRow}
                    matchingHRA={matchingHRA}
                    setMatchingHRA={setMatchingHRA}
                />
                }
                {step === 3 &&
                <ApprovalFormStep3
                    setStep={setStep}
                    employeeRow={employeeRow}
                    hraRow={hraRow}
                    registeredUserRow={registeredUserRow}
                    registrationRow={registrationRow}
                    setOpenPopup={setOpenPopup}
                    matchingHRA={matchingHRA}
                    setHraRow={setHraRow}
                    setRegisteredUserRow={setRegisteredUserRow}
                    setEmployeeRow={setEmployeeRow}
                    resetRegistrations={resetRegistrations}
                />
                }
                {step === 4 &&
                <ApprovalFormStep4
                    setStep={setStep}
                    employeeRow={employeeRow}
                    hraRow={hraRow}
                    registeredUserRow={registeredUserRow}
                    registrationRow={registrationRow}
                    setOpenPopup={setOpenPopup}
                    matchingHRA={matchingHRA}
                    setHraRow={setHraRow}
                    setRegisteredUserRow={setRegisteredUserRow}
                    setEmployeeRow={setEmployeeRow}
                    resetRegistrations={resetRegistrations}
                />
                }

                {/* Steps 98-99 are the Delete steps */}
                {step === 98 &&
                <ApprovalFormStep98
                    registrationRow={registrationRow}
                    handleTableDelete={handleTableDelete}
                    setLoading={setLoading}
                    loading={loading}
                    setOpenPopup={setOpenPopup}
                />}
                {step === 99 &&
                <ApprovalFormStep99
                    setLoading={setLoading}
                    loading={loading}
                    setOpenPopup={setOpenPopup}
                    setStep={setStep}
                    result={result}
                    setResult={setResult}
                />}
            </div>
            </div>
        </Dialog>
    )
}

export default connect(
    'selectUser',
    ApprovalFormContainer)
