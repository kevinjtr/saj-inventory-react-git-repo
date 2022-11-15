import React, {useEffect, useState } from 'react';
//import NextLink from 'next/link';
//import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { NavItem } from './nav-item';
import { NavItem as NavItemSmall } from './nav-item-small';
import styled from '@emotion/styled';
import {routes_config} from '../config/routes'
import {filter} from 'lodash'

const DashboardDrawerRoot = styled(Drawer)(({ theme }) => ({
  
}));

export const DashboardSidebar = (props) => {
  const { open, onClose, lgUp, mdUp, smUp, forceMdUp, width, userAccess } = props;

  const route_tabs = filter(routes_config, function(r){
    if(r.hasOwnProperty('alias')){
        if(Object.keys(userAccess).indexOf(r.alias) > -1){
            return r.tab && userAccess[r.alias].view 
        }else{
            return false
        }
    }

    return r.type == "public" && r.tab
})

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {(mdUp && !lgUp) || forceMdUp && !smUp ? (<Box> 
          {route_tabs.map((item) => {
            if(item.tab){
              return(
                <NavItemSmall
                  key={item.label}
                  icon={item.icon}
                  href={item.path}
                  title={item.alt_label ? item.alt_label : item.label}
                  onClose={onClose}
                />
              )
            }

            return;
          })}
        </Box>) :
        (<Box>
          {route_tabs.map((item) => {
            if(item.tab){
              return(
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  href={item.path}
                  title={item.label}
                  onClose={onClose}
                />
              )
            }

            return;
          })}
        </Box>)}
        <Divider
          sx={{
            borderColor: '#2D3748',
            //my: 10,
            paddingTop:1
          }}
        />
              <Box
          sx={{
            px: 2,
            paddingTop: 1.5,
            width: width,
            //mt:0,
          }}
        >
          <Typography
            color="text.secondary"
            variant="subtitle2"
            fontSize=".7rem"
            sx={{textAlign:"center"}}
          >
            {(lgUp && !forceMdUp) || smUp ? "Inventory App Beta" : "Inv App\nBeta"}
          </Typography>
          <Typography
            color="text.secondary"
            variant="subtitle2"
            fontSize=".7rem"
            sx={{paddingTop: .75, textAlign:"center"}}
          >
            {(lgUp && !forceMdUp) || smUp ? "Version " : "v"}{process.env.REACT_APP_VERSION}
          </Typography>
          <Typography
            color="text.secondary"
            variant="subtitle2"
            fontSize=".7rem"
            sx={{paddingTop: .75, textAlign:"center",marginBottom:"75px"}}
          >
            {(lgUp && !forceMdUp) || smUp ? "Controlled Unclassified Information" : "C.U.I."}
          </Typography>
        </Box>
      </Box>
    </>
  );

  if (lgUp || mdUp) {
    return (
      <DashboardDrawerRoot
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'background.default',
            //color: '#FFFFFF',
            //width: 280
            //width: 220,
            top:'56px'
          }
        }}
        variant="permanent"
      >
        {content}
      </DashboardDrawerRoot>
    );
  }


  return (
    <DashboardDrawerRoot
      anchor="left"
      onClose={onClose}
      open={open}
      elevation={3}
      PaperProps={{
        sx: {
          //backgroundColor: 'background.paper',
          //color: '#FFFFFF',
          
          top:'56px'
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </DashboardDrawerRoot>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};












