import { Dialog, Button } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import { LoadingCircle } from "../../tools/tools";
import { connect } from 'redux-bundler-react';
import { getAllEmployeesApi } from '../../../publics/actions/employee-api';

const ApprovalFormStep1 = ({setOpenPopup,formData,userToken}) => {

    const [loading, setLoading] = useState(false)

    // Employees variable to contain all employees and then to be filtered for matching employees
    const [employees, setEmployees] = useState([])

    useEffect(()=>{
        console.log('Employee call...')
        setLoading(true)
        getAllEmployeesApi(userToken).then((response) => response.data).then((data) => {
            
            const matches = data.status == 200 ? (data.data.filter((match) =>{
                // Prevent filtering on null values within the employee table
                if(match.first_name && match.last_name) {
                    return ((
                    // Employee table first name must include user registration first name, if user registration first name is not null
                    match.first_name.toString().toLowerCase().includes(formData.first_name ? formData.first_name.toLowerCase().trim():'')
                    && 
                    // AND employee table last name must include user registration last name, if user registration last name is not null
                    match.last_name.toString().toLowerCase().includes(formData.last_name ? formData.last_name.toLowerCase().trim():'')
                    ) || (
                        // Employee table first name must include user registration first name, if user registration first name is not null
                        match.first_name.toString().toLowerCase().includes(formData.first_name_cac && formData.first_name_cac.toLowerCase().trim())
                        && 
                        // AND employee table last name must include user registration last name, if user registration last name is not null
                        match.last_name.toString().toLowerCase().includes(formData.last_name_cac && formData.last_name_cac.toLowerCase().trim())
                        ))
                }
            })
            ) : (data)
               
            setEmployees(matches)

            console.log(matches)
            setLoading(false)


            }).catch(function (error) {
            setLoading(false)
            setEmployees([])
            });

        
        
        }, []);//will run once.

    return(
        <>
            {loading ? (
                <div>
                    <div>
                        Loading employee table...
                    </div>
                    <div style={{textAlign:'center'}}>
                        <LoadingCircle />
                    </div>
                </div>
            ):(
                <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex',justifyContent:'flex-end'}}><div style={{cursor:'pointer'}} onClick={()=>setOpenPopup(false)}>X</div></div>
            <div style={{display:'flex',fontSize:'0.75em'}}>
                <div style={{display:'flex',flexDirection:'column',fontWeight:'600',whiteSpace:'nowrap',paddingRight:'10px',padding:'3px'}}>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>First Name</div>
                    <div>Last Name</div>
                    <div>EDIPI</div>
                    <div>Office</div>
                    <div>Title</div>
                    <div>Work Phone</div>
                    <div>Division</div>
                    <div>District</div>
                    <div>Employee ID</div>

                </div>
                <div style={{display:'flex',flexDirection:'column',whiteSpace:'nowrap',backgroundColor:'#dfffde',border:'1px solid rgb(225,225,225)',textAlign:'center',padding:'3px'}}>
                    <div>&nbsp;</div>
                    <div style={{fontWeight:'600'}}>User Input</div>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <div>{formData.first_name}&nbsp;(</div>
                        <div style={{fontSize:'0.75em',fontWeight:'600',display:'flex',flexDirection:'column',justifyContent:'center'}}>CAC:</div>
                        <div style={{fontSize:'0.75em',display:'flex',flexDirection:'column',justifyContent:'center'}}>{formData.first_name_cac})</div>
                    </div>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <div>{formData.last_name}&nbsp;(</div>
                        <div style={{fontSize:'0.75em',fontWeight:'600',display:'flex',flexDirection:'column',justifyContent:'center'}}>CAC:</div>
                        <div style={{fontSize:'0.75em',display:'flex',flexDirection:'column',justifyContent:'center'}}>{formData.last_name_cac})</div>
                    </div>

                        
                        <div>{formData.edipi}</div>
    
    
                        
                        <div>{formData.office_symbol_alias}</div>
            

                        
                        <div>{formData.title}</div>
          
                        
                        <div>{formData.work_phone}</div>
  
                        
                        <div>{formData.division}</div>
              
                        
                        <div>{formData.district}</div>
                        <div>&nbsp;</div>
                        <div><Button variant='contained' size='small' color='primary' style={{fontSize:'0.85em'}}>Use User Input</Button></div>
                   
                    

                </div>
                <div style={{display:'flex',flexDirection:'column',whiteSpace:'nowrap',backgroundColor:'#fff1de',border:'1px solid rgb(225,225,225)',borderLeft:'0',textAlign:'center',padding:'3px'}}>
                    <div style={{fontWeight:'600'}}>Employee Table</div>
                    <div>Match 1 of 1</div>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <div>&nbsp;(</div>
                        <div style={{fontSize:'0.75em',fontWeight:'600',display:'flex',flexDirection:'column',justifyContent:'center'}}>CAC:</div>
                        <div style={{fontSize:'0.75em',display:'flex',flexDirection:'column',justifyContent:'center'}}>{formData.first_name_cac})</div>
                    </div>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <div>&nbsp;(</div>
                        <div style={{fontSize:'0.75em',fontWeight:'600',display:'flex',flexDirection:'column',justifyContent:'center'}}>CAC:</div>
                        <div style={{fontSize:'0.75em',display:'flex',flexDirection:'column',justifyContent:'center'}}>{formData.last_name_cac})</div>
                    </div>

                        
                        <div></div>
    
    
                        
                        <div>{formData.office_symbol_alias}</div>
            

                        
                        <div>{formData.title}</div>
          
                        
                        <div>{formData.work_phone}</div>
  
                        
                        <div>{formData.division}</div>
              
                        
                        <div>{formData.district}</div>
                        <div>id</div>
                        <div><Button variant='contained' size='small' color='primary' style={{fontSize:'0.85em'}}>Use Employee Match</Button></div>
                   
                    

                </div>
            </div>
            </div>)
            }
        </>
    )
}

export default connect(
    'selectUserToken',
    ApprovalFormStep1);

