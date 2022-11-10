import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import MonitorIcon from '@mui/icons-material/Monitor';

export const MyEquipments = (props) => (
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
            MY EQUIPMENTS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.val}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 48,
              width: 48
            }}
          >
            <MonitorIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
