//import NextLink from 'next/link';
//import { useRouter } from 'next/router';
import React from 'react';
import {Link, useLocation} from "react-router-dom";
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material/';
import styled from '@emotion/styled';

const NavItemButtonRoot = styled(Button)(({ theme }) => ({
    //backgroundColor: theme.palette.background.paper,
    //boxShadow: theme.shadows[3],
  }));

export const NavItem = (props) => {
  const { href, icon, title, onClose, ...others } = props;
  const location = useLocation();
  const active = href ? (location.pathname === href || (href === "/dashboard" && location.pathname === "/")) : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        //mb: 0.5,
        py: 0,
        //px: 2
      }}
      {...others}
    >
      <Link to={href} style={{textDecoration:'none'}} onClick={onClose}>
        <NavItemButtonRoot
          title={title}
          //component="a"
          startIcon={icon}
          disableRipple
          sx={{
            '&:focus': {
							outline: 'none',
							},
            //backgroundColor: active && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color: active ? 'success.light' : 'text.secondary',
            fontWeight: active && 'fontWeightBold',
            fontSize:'.75rem',
            justifyContent: 'left',
            //px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: 220,
            '& .MuiButton-startIcon': {
              color: active ? 'success.light' : 'text.secondary',
              paddingLeft:2
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
          <Box >
            {title}
          </Box>
        </NavItemButtonRoot>
      </Link>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
