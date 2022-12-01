import React, {useState} from 'react';

import { Box, Container, Grid, IconButton, Avatar, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
//import { Budget } from './budget';
import { Eng4900Forms } from './eng4900-forms';
//import { AnnualInventoryBarChart } from './annual-inventory-bar-chart';
import { EmployeesEquipmentCert } from './employees-equipment-cert';
import { TotalEmployees } from './total-employees';
import { TotalEquipment } from './total-equipment';
import {find} from "lodash"
//import { TrafficByDevice } from './traffic-by-device';
//import { indigo } from '@mui/material/colors';
//import UsersIcon from '@mui/icons-material/Person';

const HraDashboard = ({user}) => {
	const {hras} = user
	const [selHra, setSelHra] = useState(hras.length > 0 ? hras[0].hra_num : -1);
	const hra = find(hras,function(h){ return h.hra_num == selHra})

	return (
	<>
	{hras.length > 0 ? (
	<>
	<Box sx={{textAlign:'center',fontSize:"32px"}}>
	<FormControl variant="standard" sx={{fontSize: "32px", m: 1, minWidth: 500 }}>
        <Select
		sx={{fontSize:"32px"}}
		blurOnSelect    
          value={selHra}
          onChange={(event) => setSelHra(event.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label', fontSize:"32px"
		  }
		}
        >
		{hras.map(h => <MenuItem value={h.hra_num}>
            HRA {h.hra_num} - {h.full_name}
          </MenuItem>)}
        </Select>
      </FormControl>
	</Box>
	  <Box
		sx={{
		  flexGrow: 1,
		  paddingTop: 2
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
			<TotalEmployees val={hra.total_employees} sx={{ height: '100%' }}/>
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
			<TotalEquipment val={hra.total_equipments} sx={{ height: '100%' }} />
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
			<EmployeesEquipmentCert total_equipments_cert_porcentage={hra.total_equipments_cert_porcentage} fiscal_year={user.fiscal_year} />
			</Grid>
			<Grid
			  item
			  xl={3}
			  lg={3}
			  sm={6}
			  xs={12}
			>
			<Eng4900Forms val={hra.eng4900_form_notifications} sx={{ height: '100%' }}/>	  
			</Grid>
		  </Grid>
		</Container>
	  </Box>
	</>
	) : null}
	</>
	)
};

export default HraDashboard;  