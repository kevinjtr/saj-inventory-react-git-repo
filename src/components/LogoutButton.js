import React,{useState} from "react";
import { Redirect } from "react-router-dom";

const LogoutButton = ({handleLogout}) => {

    const [navigate,setNavigate] = useState(false)

    const logout = () =>{
        localStorage.setItem('LocalUser',JSON.stringify({firstName:'',lastName:'',level:'',time:''}))
        setNavigate(true)
    }

    if(navigate){
        return (
        <>
        {handleLogout()}
        <Redirect to='/Logout' push={true} />
        </>
        )
    }
    else{
        return(
            <button type="button" className="signin-form-button" onClick={logout} style={{height:'15px', alignSelf:'center',fontSize:'9px',lineHeight:'9px',padding:'2px',whiteSpace:'nowrap', marginLeft:'5px',marginRight:'10px'}} >LOG OUT</button>
        )
    }
}

export default LogoutButton