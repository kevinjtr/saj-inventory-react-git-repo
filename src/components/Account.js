// import { AccountProfile } from '../components/account/account-profile';
// import { AccountProfileDetails } from '../components/account/account-profile-details';
// import { DashboardLayout } from '../components/dashboard-layout';
import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Container,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Divider,
    Grid,
    TextField,
    Typography
} from '@mui/material';
  
const user = {
avatar: '/static/images/avatars/avatar_6.png',
city: 'Los Angeles',
country: 'USA',
jobTitle: 'Senior Developer',
name: 'Katarina Smith',
timezone: 'GTM-7'
};

const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];
  
const AccountProfile = (props) => (
<Card {...props}>
    <CardContent>
    <Box
        sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
        }}
    >
        <Avatar
        src={user.avatar}
        sx={{
            height: 64,
            mb: 2,
            width: 64
        }}
        />
        <Typography
        color="textPrimary"
        gutterBottom
        variant="h5"
        >
        {user.name}
        </Typography>
        <Typography
        color="textSecondary"
        variant="body2"
        >
        {`${user.city} ${user.country}`}
        </Typography>
        <Typography
        color="textSecondary"
        variant="body2"
        >
        {user.timezone}
        </Typography>
    </Box>
    </CardContent>
    {/* <Divider />
    <CardActions>
    <Button
        color="primary"
        fullWidth
        variant="text"
    >
        Upload picture
    </Button>
    </CardActions> */}
</Card>
);

const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};


const Account = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Account
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Account.getLayout = (page) => (
    {page}
);

export default Account;
