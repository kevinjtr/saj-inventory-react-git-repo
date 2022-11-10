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
          >
            MY EQUIPMENT CERTIFICATION
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.val}%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
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
