import { useState, useEffect } from 'react';
import { connect } from 'redux-bundler-react';
import HraDashboard from "./dashboard/HraDashboard"
import UserDashboard from "./dashboard/UserDashboard"
import {dashboardApi} from '../publics/actions/dashboard-api'
import {LoadingCircle} from './tools/tools';
import { Box } from '@mui/material';

const Dashboard = ({userToken, userName}) => {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState({hras: []})
	const [serverDown, setServerDown] = useState(false);

	useEffect(async () => {
		
		await dashboardApi(userToken)
		  .then((response) => response.data).then((data) => {
			  console.log(data.data)
			setUser(data.data)
			setLoading(false)
		  }).catch(function (error) {
			console.log(error)
			setServerDown(true)
			setLoading(false)
		  });
	},[])

	return (
		<>     
		<Box sx={{textAlign:'center',fontSize:"32px"}}>
			Dashboard
		</Box>        
		{loading ? <Box sx={{textAlign:"center",width:"100%", py:1}}> <LoadingCircle/> </Box> : null}
		{!loading && !serverDown ? <UserDashboard user={{...user, name: userName}}/> : null}
		{!loading && user.hras.length > 0 && !serverDown ? <HraDashboard user={user}/> : null}
		</>
	)
}

export default connect(
	'selectUserToken',
	'selectUserName',
	Dashboard);
