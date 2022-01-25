import React,{useState} from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'redux-bundler-react';
import Button from '@material-ui/core/Button'

const LogoutButton = ({doLogout, userIsLoggedIn}) => {

    // const [navigate,setNavigate] = useState(false)

    // const logout = () =>{
    //     // localStorage.setItem('LocalUser',JSON.stringify({firstName:'',lastName:'',level:'',time:''}))
    //     // setNavigate(true)
    //     logout()
    // }

    // if(navigate){
    //     return (
    //     <>
    //     {handleLogout()}
    //     <Redirect to='/Logout' push={true} />
    //     </>
    //     )
    // }
    //else{
        return(
            <Button color="default" type="button" className="signin-form-button" onClick={()=> {if(userIsLoggedIn) doLogout()}} style={{height:'20px', alignSelf:'center',fontSize:'9px',lineHeight:'9px',padding:'2px',whiteSpace:'nowrap', marginLeft:'5px',marginRight:'10px'}} >LOG OUT</Button>
        )
    //}
}


export default connect(
    'selectUserIsLoggedIn',
    'doLogout',
	LogoutButton);