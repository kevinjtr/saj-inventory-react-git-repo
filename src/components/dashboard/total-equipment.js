import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';

export const TotalEquipment = (props) => (
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
            TOTAL EQUIPMENT
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            23
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
            <DevicesIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
