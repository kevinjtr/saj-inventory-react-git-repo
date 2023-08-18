import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material/';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { styled } from '@mui/material/styles';

export const MyUserInfo = (props) => (
  <Card {...{sx: props.sx}}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            WELCOME
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {props.val}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 48,
              width: 48
            }}
          >
            <AccountBoxIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
