import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const MyUserInfo = (props) => (
  <Card {...props}>
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
            variant="h4"
          >
            Kevin Alemany
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <AccountBoxIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        {/* <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          0%
        </Typography> */}
        {/* <Typography
          color="textSecondary"
          variant="caption"
        >
          
        </Typography> */}
      </Box>
    </CardContent>
  </Card>
);
