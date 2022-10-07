import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import {DashboardNavbar} from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
//import { useTheme } from '@mui/material/styles'

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 56,
    // [theme.breakpoints.up('md')]: {
    //   paddingLeft: 72
    // },
    // [theme.breakpoints.up('lg')]: {
    //   paddingLeft: 220
    // }
  }));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [forceMdUp, setForceMdUp] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("force-mdUp");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
  });
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'), {
    defaultMatches: true,
    noSsr: false
  });
  const smUp = useMediaQuery((theme) => theme.breakpoints.down('md'), {
    defaultMatches: true,
    noSsr: false
  });
  const width = (forceMdUp && !smUp) || (mdUp && !lgUp) ? "72px" : lgUp ? "220px" : "0px"

  React.useEffect(() => {
    console.log(`forcemdUp : ${forceMdUp}`)
    localStorage.setItem("force-mdUp", forceMdUp)
}, [forceMdUp]);

  return (
    <>
      <DashboardLayoutRoot sx={{paddingLeft: width}}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar lgUp={lgUp} mdUp={mdUp} forceMdUp={forceMdUp} toggleForceMdUp={() => setForceMdUp(!forceMdUp)} onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        lgUp={lgUp} mdUp={mdUp} smUp={smUp}
        forceMdUp={forceMdUp}
        onClose={() => setSidebarOpen(false)}
        width={width}
        open={isSidebarOpen}
      />
    </>
  );
};
