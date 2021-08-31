import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple, green } from '@material-ui/core/colors';

export const plusButtonStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      //top: theme.spacing(2),
      right: theme.spacing(3),
      //right: '0',
      marginTop:'10px'
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  }));
  
export const texFieldStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    options: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        textAlign: 'center',
      },
    },
  }));
  
export const gridStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      paperHidden: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        elevation:0
      },
      options: {
          flexGrow: 1,
          textAlign: 'center',
        },
    }));
  
export const itemMenuStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }));

export const phoneTextFieldStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    }));
  
export const AvatarStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        height:20,
        width:20
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
    }));
    