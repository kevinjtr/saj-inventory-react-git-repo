import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material/';
import {Warning as WarningIcon} from '@mui/icons-material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const SystemAnnouncements  = (props) => (
  <Card {...{sx: props.sx}}>
    <CardHeader
      title="System Announcements"
    />
    <Divider />
    {props.val.length > 0 ? (
      props.val.map(v => <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          p: 1.5,
          px: 4,
          alignItems: 'center',
          color: "text.secondary"
        }}
      >
        {<WarningIcon color="warning" sx={{mr:3}}/>}
      {v.message}
    </Box>)
    ) : <Box
    sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      p: 1.5,
      px: 4,
      alignItems: 'center',
      color: "text.secondary"
    }}
  >
    no annoucements.
</Box>}
  </Card>
);
