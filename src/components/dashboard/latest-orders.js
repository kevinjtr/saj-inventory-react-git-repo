import { format, subDays } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from './severity-pill';

const orders = [
  {
    id: uuid(),
    ref: '46853',
    amount: 30.5,
    customer: {
      name: 'Bob Experiment'
    },
    createdAt: Math.floor(subDays(new Date(), 3)),
    status: 'Losing Sign Req'
  },
  {
    id: uuid(),
    ref: '85356',
    amount: 25.1,
    customer: {
      name: 'Johnny Test'
    },
    createdAt: Math.floor(subDays(new Date(), 5)),
    status: 'Completed'
  },
  {
    id: uuid(),
    ref: '37664',
    amount: 10.99,
    customer: {
      name: 'Johnny Test'
    },
    createdAt: Math.floor(subDays(new Date(), 7)),
    status: 'rejected'
  },
  {
    id: uuid(),
    ref: '46822',
    amount: 96.43,
    customer: {
      name: 'Bob Experiment'
    },
    createdAt: Math.floor(subDays(new Date(), 12)),
    status: 'Losing Sign Req'
  },
  {
    id: uuid(),
    ref: '47590',
    amount: 32.54,
    customer: {
      name: 'Bob Experiment'
    },
    createdAt: Math.floor(subDays(new Date(), 17)),
    status: 'Completed'
  },
  {
    id: uuid(),
    ref: '56734',
    amount: 16.76,
    customer: {
      name: 'Johnny Test'
    },
    createdAt: Math.floor(subDays(new Date(), 21)),
    status: 'Completed'
  }
];

export const LatestOrders = (props) => (
  <Card {...props}>
    <CardHeader title="Latest ENG4900" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Bartag Number
              </TableCell>
              <TableCell>
                HRA Name
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                hover
                key={order.id}
              >
                <TableCell>
                  {order.ref}
                </TableCell>
                <TableCell>
                  {order.customer.name}
                </TableCell>
                <TableCell>
                  {format(order.createdAt, 'MM/dd/yyyy')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(order.status === 'Completed' && 'success')
                    || (order.status === 'rejected' && 'error')
                    || 'warning'}
                  >
                    {order.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
