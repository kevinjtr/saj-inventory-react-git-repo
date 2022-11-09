import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import MonitorIcon from '@mui/icons-material/Monitor';

export const MyEquipments = (props) => (
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
            MY EQUIPMENTS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            6
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <MonitorIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
