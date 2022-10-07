import React, {useEffect, useState } from 'react';
//import NextLink from 'next/link';
//import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { NavItem } from './nav-item';
import { NavItem as NavItemSmall } from './nav-item-small';
import HomeIcon from '@mui/icons-material/Home'
import DevicesIcon from '@mui/icons-material/Devices';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryIcon from '@mui/icons-material/History';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import styled from '@emotion/styled';
import {routes_config} from '../config/routes'

const DashboardDrawerRoot = styled(Drawer)(({ theme }) => ({
  boxShadow: theme.shadows[3],
}));

export const DashboardSidebar = (props) => {
  const { open, onClose, lgUp, mdUp, smUp, forceMdUp, width } = props;

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
          {routes_config.map((item) => {
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
          {routes_config.map((item) => {
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
            py:3
          }}
        />
              <Box
          sx={{
            px: 2,
            py: 2,
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
            sx={{paddingTop:"10px", textAlign:"center"}}
          >
            {(lgUp && !forceMdUp) || smUp ? "Version 0.9.2" : "v0.9.2"}
          </Typography>
          <Typography
            color="text.secondary"
            variant="subtitle2"
            fontSize=".7rem"
            sx={{paddingTop:"10px", textAlign:"center"}}
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
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          //color: '#FFFFFF',
          
          //top:'56px'
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












