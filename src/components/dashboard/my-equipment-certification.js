import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const MyEquipmentCertification = (props) => (
  <Card
    sx={{ height: '100%', ...props.sx} }
  >
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
            sx={{fontSize: ".65vw"}}
          >
            {props.fiscal_year}<br/>MY EQUIPMENT CERTIFICATION
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.my_equipments_cert_porcentage}%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 48,
              width: 48
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={props.val}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
);
