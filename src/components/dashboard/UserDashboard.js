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

const UserDashboard = ({user}) => (
	<>
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
			<MyEquipments val={user.my_equipments} sx={{ height: '100%' }} />
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
			  <MyEquipmentCertification val={user.my_equipments_cert_porcentage}/>
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
			<LastLogin val={user.last_login_string} sx={{ height: '100%' }}/>
			</Grid>
			{user.system_annoucements.length > 0 ? (
			<Grid
				item
				lg={6}
				md={12}
				xl={6}
				xs={12}
			>
			<SystemAnnouncements val={user.system_annoucements} sx={{ height: '100%' }} />
			</Grid>
			) : null}
		  </Grid>
		</Container>
	  </Box>
	</>
);

export default UserDashboard;  