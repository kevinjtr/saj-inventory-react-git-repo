import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';

export const TotalEquipment = (props) => (
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
            TOTAL EQUIPMENT
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
            <DevicesIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
