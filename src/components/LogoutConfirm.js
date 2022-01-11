import React,{useEffect} from "react";
import getEmblem from '../../src/img/getEmblem.png';
import { useHistory } from "react-router-dom";

const LogoutConfirm = () => {
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.push('/')
        }, 2000)
    }, [])

    return(
        <>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'75px'}}>
        <div style={{backgroundColor:'rgb(243, 248, 255)',border:'1px solid gray',padding:'5px',borderRadius:'5px',display:'flex',flexWrap:'nowrap',boxShadow:'0px 0px 3px #888888'}}>
                <div style={{padding:'5px'}}><img src={getEmblem} style={{height:"65px",opacity:"0.75"}}/></div>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'7px'}}>
                <div style={{textAlign:'center',fontSize:'1.5em',fontWeight:'bold',whiteSpace:'nowrap'}}>You are now signed out.</div>
                <div style={{textAlign:'center',fontSize:'1.25em'}}>Redirecting...</div>
                </div>
        </div> 

        </div>
        </>
    )
}

export default LogoutConfirm
