//import NextLink from 'next/link';
//import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';
import {Link, useLocation} from "react-router-dom";

export const NavItem = (props) => {
  const { href, icon, title, abbv_title, ...others } = props;
  const location = useLocation();
  const active = href ? (location.pathname === href) : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        //mb: 0.5,
        py: 0,
        //px: 2
        //fontSize:'.5rem'
      }}
      {...others}
    >
      <Link to={href} style={{textDecoration:'none'}}>
        <Button
          title={title}
          component="a"
          //startIcon={icon}
          disableRipple
          sx={{
            //backgroundColor: active && 'action.selected',
            borderRadius: 1,
            color: active ? 'success.light' : 'text.secondary',
            fontWeight: active && 'fontWeightBold',
            justify: 'center',
            //px: 3,
            //textAlign: 'left',
            //textTransform: 'none',
            width: 72,
            '& .MuiButton-startIcon': {
              color: active ? 'success.light' : 'text.secondary',
            },
            '&:hover': {
              backgroundColor: 'action.hover',//'rgba(255,255,255, 0.08)',
              color: 'text.primary',
              '& .MuiButton-startIcon': {
                color: 'text.primary',
              },
            }
          }}
        >
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center' }}>
            {icon}
            <Box sx={{fontSize:'.55rem', fontWeight:'bold'}}>{abbv_title ? abbv_title : title}</Box>
          </Box>
        </Button>
      </Link>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
