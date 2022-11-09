import React, {useState} from 'react';

import { Box, Container, Grid, IconButton, Avatar, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
//import { Budget } from './budget';
//import { LatestOrders } from './latest-orders';
import { MyEng4900Forms } from './eng4900-forms';
import { SystemAnnouncements } from './system-announcements';
//import { AnnualInventoryBarChart } from './annual-inventory-bar-chart';
import { EmployeesEquipmentCert } from './employees-equipment-cert';
import { TotalEmployees } from './total-employees';
import { TotalEquipment } from './total-equipment';
import { MyUserInfo } from './my-user-info';
import { MyEquipments } from './my-equipments';
import { LastLogin } from './last-login';
import UserDashboard from "./UserDashboard"
//import { TrafficByDevice } from './traffic-by-device';
//import { indigo } from '@mui/material/colors';
//import UsersIcon from '@mui/icons-material/Person';

const HraDashboard = () => {
	const [age, setAge] = useState('');

	return (
	<>
	<UserDashboard/>	
	<Box sx={{textAlign:'center',fontSize:"32px"}}>
	<FormControl sx={{fontSize: "32px", m: 1, minWidth: 500 }}>
        <Select
		sx={{fontSize:"32px"}}
		blurOnSelect    
          value={age}
          onChange={(event) => setAge(event.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label', fontSize:"32px"
		  }
		}
        >
          <MenuItem value="">
            HRA 555 - Bob Experiment
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
	</Box>


	{/* <Box sx={{textAlign:'center',fontSize:"32px"}}>
		HRA Account 555 - Bob Experiment
	</Box> */}
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
			{/* <Grid
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
			</Grid> */}
			<Grid
			  item
			  lg={3}
			  sm={6}
			  xl={3}
			  xs={12}
			>
			  <TotalEmployees sx={{ height: '100%' }}/>
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
			<TotalEquipment sx={{ height: '100%' }} />
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
			  <EmployeesEquipmentCert />
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
				<MyEng4900Forms sx={{ height: '100%' }}/>
			  
			</Grid>
			{/* <Grid
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
			  lg={4}
			  md={6}
			  xl={3}
			  xs={12}
			>
			<SystemAnnouncements sx={{ height: '100%' }} />
			</Grid> */}
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
	)
};

export default HraDashboard;  