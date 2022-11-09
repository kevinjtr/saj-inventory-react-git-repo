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
} from '@mui/material';
import {Warning as WarningIcon} from '@mui/icons-material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const products = [
  {
    id: uuid(),
    name: '65344 - HDD',
    //imageUrl: '/static/images/products/product_1.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: '53444 - Monitor Dell',
    //imageUrl: '/static/images/products/product_2.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: '36846 - Laptop Dell',
    //imageUrl: '/static/images/products/product_3.png',
    updatedAt: subHours(Date.now(), 3)
  },
  {
    id: uuid(),
    name: '44564 - Laptop Dell',
    //imageUrl: '/static/images/products/product_4.png',
    updatedAt: subHours(Date.now(), 5)
  },
  {
    id: uuid(),
    name: '89546 - HDD WD',
    //imageUrl: '/static/images/products/product_5.png',
    updatedAt: subHours(Date.now(), 9)
  }
];

export const SystemAnnouncements  = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${products.length} in total`}
      title="System Announcements"
    />
    <Divider />
    {/* <List>
      {products.map((product, i) => (
        <ListItem
          divider={i < products.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            { <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            /> }
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`completed ${formatDistanceToNow(product.updatedAt)} ago`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider /> */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        p: 1.5,
        px: 4,
        color: "text.secondary"
      }}
    >
        {<WarningIcon color="warning" sx={{mr:3}}/>}
      19-NOV-2022 06:11 Scheduled Maintenance...
      {/* <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button> */}
    </Box>
    <Box
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
      01-NOV-2022 03:11 CEFMS II Legacy Reports to Sunset - Phase Two Set for 15 Nov...
      {/* <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button> */}
    </Box>
  </Card>
);
