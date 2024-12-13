import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, Alert } from '@mui/material/';
import { styled } from '@mui/material/styles';
import {DashboardNavbar} from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
//import { useTheme } from '@mui/material/styles'
import { connect } from 'redux-bundler-react';
import { isOffHours } from '../tools/tools'

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

const DashboardLayout = (props) => {
  const { children, userAccess } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [forceMdUp, setForceMdUp] = useState(() => {
    // getting stored value
    const saved = window.localStorage.getItem("force-mdup");
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

  const [showAlert, setShowAlert] = useState(false);

	  useEffect(() => {
		setShowAlert(isOffHours());
	  }, []);

  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent('resize'))
}, [width]);

  React.useEffect(() => {
    console.log(`forcemdUp : ${forceMdUp}`)
    window.localStorage.setItem("force-mdup", forceMdUp)
}, [forceMdUp]);

  return (
    <>
      <DashboardLayoutRoot sx={{paddingLeft: width}}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {(process.env.REACT_APP_SERVER === "aws" && showAlert && 
        <Alert sx={{
          zIndex: 1200,
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, -50%)',}} severity="warning">
          The servers are down. They are available M-F, 8am-5pm EST.
        </Alert>
      	)}
          {children}
        </Box>
      </DashboardLayoutRoot>
      
      <DashboardNavbar lgUp={lgUp} mdUp={mdUp} toggleForceMdUp={() => setForceMdUp(prev => !prev)} onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        lgUp={lgUp} mdUp={mdUp} smUp={smUp}
        forceMdUp={forceMdUp}
        onClose={() => setSidebarOpen(false)}
        width={width}
        open={isSidebarOpen}
        userAccess={userAccess}
      />
    </>
  );
};

export default connect(
	'selectUserAccess',
	DashboardLayout);