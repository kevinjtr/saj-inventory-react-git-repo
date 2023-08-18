import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Box, TextField, Paper, Avatar, Tab } from '@mui/material/';
import { deepOrange, deepPurple, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: '25ch',
    textAlign: 'center',
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
}));

export const StyledOrangeAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        height:20,
        width:20
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
}));