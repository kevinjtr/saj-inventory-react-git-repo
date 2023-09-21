import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material/';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import { styled } from '@mui/material/styles';


const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    fontSize: ".75rem"
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: ".62vw"
  },
  // [theme.breakpoints.up('lg')]: {
  //   fontSize: 72
  // }
}));

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
          <StyledTypography
            color="textSecondary"
            gutterBottom
            variant="overline"
            // sx={{ fontSize: "1rem"}}
          >
            {props.fiscal_year}<br/>MY EQUIPMENT CERTIFICATION
          </StyledTypography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.my_equipments_cert_porcentage?.toFixed(1)}%
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
