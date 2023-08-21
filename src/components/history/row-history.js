import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import {Paper, Typography, Box, Tab, Tabs} from '@mui/material';
import { TabPanel, a11yProps } from './history-config'
import { convertToLabel } from '../../tools/string-tools';
import { columns } from './history-config'

export default function CellHistory(props) {
  
  const cell_label = props?.label ? props.label.replace(':','').trim() : props.history?.[0]?.label || (props.history?.[0]?.attribute && convertToLabel(props.history[0].attribute))
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const tabPanels = (
    <TabPanel key={'cell-history-tab-panel-0'} value={value} index={0}>
    {
      <TableContainer  component={Paper}>
          <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
              <Typography fontSize={'1.5rem'}>Change History</Typography>
          </Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
                {columns().map((column) => (
                <TableCell
                    key={`column_${column.label}_${column.id}`}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                </TableCell>
                ))}
              </TableRow>
              </TableHead>
              <TableBody>
              {props.history.map((row) => {
                return (
                  <TableRow sx={{ maxWidth: 500, wordWrap: 'break-word' }}  hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns(props.type).map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell sx={{ maxWidth: 500, wordWrap: 'break-word' }}  key={`row_${column.label}_${column.id}`} align={column.align}>
                          {column.format(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              </TableBody>
          </Table>
      </TableContainer>
    }
    </TabPanel>
  )

  const tabs = <Tab key={'cell-history-tab-0'} label={cell_label} {...a11yProps(0)}/>

  return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, py: 3}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {tabs}
            </Tabs>
        </Box>
        {tabPanels}
    </Box>
  )
}