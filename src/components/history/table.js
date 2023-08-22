
import {Typography, Stack, CircularProgress} from '@mui/material';
import TableHistory from './history-table';

export default function BasicTable(props) {
  
  return (
      <>
      {
      (props.fetching) ? (
        <Stack direction="row" sx={{justifyContent: 'center', alignItems: 'center'}} gap={1}>
          <CircularProgress sx={{ml: 1}}size={16} />
          <Typography sx={{mr: 1}}>Fetching History</Typography>
        </Stack>
      ) : (
        (
          props.fetched && props.history && props.history.length>0) ? (
          <TableHistory {...props}/>
        ) : (
          <Typography sx={{mx: 1}}>No History</Typography>
        )
      )
      }
      </>
    
  );
}