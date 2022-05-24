import React,{useState} from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'redux-bundler-react';
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles';

const LogoutButton = ({doLogout, userIsLoggedIn}) => {

    const theme = useTheme()
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
       // border: 1px solid gray;
  //border-radius: 3px;
  //background-image: linear-gradient(rgb(225, 225, 225), rgb(200, 200, 200));
  //font-size: 11px;

        return(
            <Button  variant={theme.palette.type == "dark" ? "outlined": "contained"}  onClick={()=> {if(userIsLoggedIn) doLogout()}} style={{borderStyle:'solid', height:'20px', alignSelf:'center',fontSize:'11px',lineHeight:'9px',padding:'2px',whiteSpace:'nowrap', marginLeft:'5px',marginRight:'10px', borderRadius:'5px'}} >LOG OUT</Button>
        )
    //}
}


export default connect(
    'selectUserIsLoggedIn',
    'doLogout',
	LogoutButton);