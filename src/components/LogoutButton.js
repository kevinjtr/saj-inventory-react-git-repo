import React,{useState} from "react";
import { connect } from 'redux-bundler-react';
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const buttonStyles = makeStyles(theme => ({
    root: {
        fontWeight:'bold',
        borderStyle:'solid',
        height:'22px',
        width:'75px',
        alignSelf:'center',
        fontSize:'13px',
        lineHeight:'9px',
        padding:'2px',
        whiteSpace:'nowrap',
        marginLeft:'5px',
        marginRight:'10px',
        borderRadius:'5px'
    },
  }))

const LogoutButton = ({doLogout, userIsLoggedIn}) => {
    const theme = useTheme()
    const buttonClasses = buttonStyles()

    return(
        <Button  className={buttonClasses.root} variant={theme.palette.type == "dark" ? "outlined": "outlined"}  onClick={()=> {if(userIsLoggedIn) doLogout()}} >LOG OUT</Button>
    )
}


export default connect(
    'selectUserIsLoggedIn',
    'doLogout',
	LogoutButton);