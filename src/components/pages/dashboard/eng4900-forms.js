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
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Link} from "react-router-dom"

export const Eng4900Forms = (props) => (
  <Card {...{sx: props.sx}}>
    <CardHeader
      title="ENG4900 Forms"
    />
    <Divider />
    <Box
      sx={{
        fontSize:"1.2rem",
        display: 'flex',
        justifyContent: 'flex-start',
        p: 1.5,
        px: 4,
        color: "text.secondary"
      }}
    >
      {props.val ? (
      <Link style={{color:"inherit"}} to="/eng4900">
      {props.val} Form(s) Pending for Approval
      </Link>
      ): (
      `${props.val} Form(s) Pending for Approval`
      )}
    </Box>
  </Card>
);
