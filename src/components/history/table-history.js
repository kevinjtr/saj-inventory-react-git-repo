import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import { Paper, Typography, Box, Tab, Tabs } from '@mui/material';
import { convertToLabel } from '../tools/tools';
import { TabPanel, a11yProps } from '../styles/mui'
import MaterialTable from '@material-table/core'
import moment from 'moment'
import { changeHistoryIcons } from '../material-table/config'

export default function TableHistory(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabPanels = props.history.map((item, i) => 
        <TabPanel key={`change-history-tab-panel-${i}`} value={value} index={i}>
        
                <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                    <Typography fontSize={'1.5rem'}>Change History</Typography>
                </Toolbar>
                        <MaterialTable
                            icons={changeHistoryIcons}
                            columns={[
                                { title: 'Updated Date', field: 'updated_date', editable: 'never', type: 'date',render: rowData => {
                                    if(rowData.updated_date){
                                      return <a>{moment(rowData.updated_date).format("MM/DD/YY HH:mm:ss")}</a>
                                    }
                                    return <a></a>
                                }, defaultSort: 'desc',},
                                { title: 'Updated By', field: 'updated_by_full_name', editable: 'never', sorting: false },
                                { title: 'Old Value', field: 'oldValue', editable: 'never', sorting: false, type: 'date' },
                                { title: 'New Value', field: 'newValue', editable: 'never', sorting: false },                                
                            ]}
                            data={item}
                            options={{
                                headerStyle: {
                                    backgroundColor: "#969696",
                                    color: "#FFF",
                                    fontWeight: 'bold',
                                }
                            }}
                            title=""
                        />

        </TabPanel>
    )

    const tabs = props.history.map((item, i) => {
      const cell_label = convertToLabel(item?.[0]?.property)
      return <Tab key={`change-history-tab-${cell_label}-${i}`} label={cell_label} {...a11yProps(i)} />
    })

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