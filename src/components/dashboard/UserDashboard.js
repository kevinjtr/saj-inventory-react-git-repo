//import React, { Component, useState, useEffect } from 'react';

import { Box, Container, Grid, IconButton, Avatar } from '@mui/material';
//import { Budget } from './budget';
//import { LatestOrders } from './latest-orders';
import { LastLogin } from './last-login';
import { SystemAnnouncements } from './system-announcements';
//import { AnnualInventoryBarChart } from './annual-inventory-bar-chart';
import { MyEquipmentCertification } from './my-equipment-certification';
import { MyUserInfo } from './my-user-info';
import { MyEquipments } from './my-equipments';
//import { TrafficByDevice } from './traffic-by-device';
//import { indigo } from '@mui/material/colors';
//import UsersIcon from '@mui/icons-material/Person';

const UserDashboard = () => (
	<>
	<Box sx={{textAlign:'center',fontSize:"32px"}}>
		Dashboard
	</Box>
	  <Box
		//component="main"
		sx={{
		  flexGrow: 1,
		  py: 2
		}}
	  >
		<Container maxWidth={false}>
		  <Grid
			container
			spacing={3}
		  >
			<Grid
			  item
			  lg={3}
			  sm={6}
			  xl={3}
			  xs={12}
			>
			  <MyUserInfo sx={{ height: '100%' }}/>
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
			<MyEquipments sx={{ height: '100%' }} />
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
			  <MyEquipmentCertification />
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
				<LastLogin sx={{ height: '100%' }}/>
			  
			</Grid>
			<Grid
			  item
			  lg={6}
			  md={12}
			  xl={6}
			  xs={12}
			>
			<SystemAnnouncements sx={{ height: '100%' }} />
			</Grid>
			{/* <Grid
			  item
			  lg={4}
			  md={6}
			  xl={3}
			  xs={12}
			>
			  <TrafficByDevice sx={{ height: '100%' }} />
			</Grid> */}
			{/* <Grid
			  item
			  lg={8}
			  md={12}
			  xl={9}
			  xs={12}
			>
			  <AnnualInventoryBarChart />
			</Grid> */}
			{/* <Grid
			  item
			  lg={8}
			  md={12}
			  xl={9}
			  xs={12}
			>
			  <LatestOrders />
			</Grid> */}
		  </Grid>
		</Container>
	  </Box>
	</>
);

export default UserDashboard;  