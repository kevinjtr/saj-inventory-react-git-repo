import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from '../components/Login'
import Signup from '../components/Signup' 
import { Row, Col } from 'react-bootstrap';
import { AlignHorizontalLeft } from '@mui/icons-material';

const SignInOut = (props) => {
const [value,setValue]=useState(0)
const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  const paperStyle={width:490, marginTop:"20px", marginLeft: '150px'}
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
    return (
      <>
<<<<<<< HEAD
=======
<<<<<<< HEAD
        <Paper elevation={20} style={paperStyle}>
=======
      <Header/>
>>>>>>> ec33c21925b6ad99bb312e54cc82f5437379eced
      <Row>
      <Col>
        <img src="usace-inventory.png" alt="image" height="290px" style={{ marginLeft: '300px', marginTop: '20px'}}/>
        <h3 style={{textDecorationLine: 'underline', marginTop: '60px', textAlign:'left', marginLeft: '300px'}}>System Updates and Availability </h3>
        <h4 style={{ marginTop: '60px', textAlign:'left', marginLeft: '300px' }}>System is current and no maintenance is scheduled at this time.</h4>
      </Col>
<<<<<<< HEAD
      <Col style={{ alignSelf: 'center'}}>
       <Paper elevation={20} style={paperStyle}>
=======
      <Col style={{columnWidth: '30%', alignSelf: 'center'}}>
       <Paper elevation={20} style={paperStyle }>
>>>>>>> master
>>>>>>> ec33c21925b6ad99bb312e54cc82f5437379eced
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Sign In" />
         
          <Tab label="Sign Up" />
        </Tabs>
        <TabPanel value={value} index={0}>
       <Login  handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Signup/>
      </TabPanel>
      </Paper>
      </Col>
      </Row>
      </>
    )
}

export default  SignInOut