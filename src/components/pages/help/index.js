import { Box, Container, Grid, Typography} from '@mui/material/';

const Help = () => {

    return (
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{ mb: 3,textAlign:"center" }}
              variant="h4"
            >
              Help
            </Typography>
            <Grid
              container
              spacing={3}
            >
            <Grid
                item
                sx={{textAlign:"center",width:"100%"}}
            >
            </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    )
}
  
export default Help
  