//import styled from '@emotion/styled';
import { deepOrange, deepPurple, green } from '@mui/material/colors';
import PropTypes from 'prop-types';
import {Box, Typography} from '@mui/material';

export const buttonClasses = {
    fab: {
      margin: 2,
    },
    absolute: {
      //position: 'absolute',
      //top: theme.spacing(2),
      right: 3,
      //float:'right',
      //right: '0',
      marginBottom:'10px'
    },
    fabGreen: {
      color: "common.white",
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
      //paddingLeft: theme.spacing(5)
    },
}
  
export const textFieldClasses = {
    root: {
      '& .MuiTextField-root': {
        margin: 1,
        width: '25ch',
        textAlign: 'center',
      },
    },
    options: {
      '& .MuiTextField-root': {
        margin: 1,
        width: '25ch',
        textAlign: 'center',
      },
    },
  }
  
export const gridClasses = {
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: 2,
        textAlign: 'center',
        color: "text.secondary",
      },
      header: {
        padding: 2,
        display: 'flex',
        flowDirection: 'row',
        color: "text.secondary",
        textAlign: 'center'
      },
      paperHidden: {
        padding: 2,
        textAlign: 'center',
        color: "text.secondary",
        elevation: 0
      },
      options: {
          flexGrow: 1,
          textAlign: 'center',
        },
    }
  
// export const itemMenuStyles = {
//       formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//       },
//       selectEmpty: {
//         marginTop: theme.spacing(2),
//       },
//     }

// export const phoneTextFieldStyles = {
//       root: {
//         '& > *': {
//           margin: theme.spacing(1),
//         },
//       },
//     }
  
// export const AvatarStyles = {
//       root: {
//         display: 'flex',
//         '& > *': {
//           margin: theme.spacing(1),
//         },
//       },
//       orange: {
//         color: theme.palette.getContrastText(deepOrange[500]),
//         backgroundColor: deepOrange[500],
//         height:20,
//         width:20
//       },
//       purple: {
//         color: theme.palette.getContrastText(deepPurple[500]),
//         backgroundColor: deepPurple[500],
//       },
//     }


// export const alertStyles = {
//     root: {
//       width: '100%',
//       '& > * + *': {
//         marginTop: 2,
//       },
//     },
// }
    
// export const dropDownStyles = {
//   formControl: {
//     margin: 1,
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: 2,
//   },
// }

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const tabClasses = {
  root: {
    flexGrow: 1,
    backgroundColor: "background.paper",
    //paddingTop: theme.spacing(2)
  },
}

// export const stepStyles = {
//   root: {
//     width: '100%',
//   },
//   backButton: {
//     marginRight: 1,
//   },
//   instructions: {
//     marginTop: 1,
//     marginBottom: 1,
//   },
// }