
import React, { useState, useEffect, useRef } from 'react';
import {
  Snackbar, Box, AppBar, Tabs, Tab, Switch, Typography, TextField, Icon,
  MenuItem, FormControl, Select, FormGroup, FormControlLabel, Button, IconButton,
  Tooltip, Radio, RadioGroup, Grid, Link, Autocomplete, InputAdornment, DatePicker
} from '@mui/material';
import {
  List as ListIcon, LocationOn as LocationOnIcon, Search as SearchIcon, Computer as ComputerIcon,
  FilterList as FilterListIcon, Clear as ClearIcon, Event as EventIcon
} from '@mui/icons-material';
import { textFieldClasses, gridClasses, TabPanel, a11yProps, tabClasses } from '../styles/mui';
import { find } from "lodash"
import { v4 as uuid } from 'uuid';
import * as XLSX from 'xlsx'
import moment from "moment"
import MaterialTable, { MTableToolbar, MTableBody, MTableAction } from '@material-table/core'
import { tableIcons } from '../mui/config'
import 'date-fns';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { getQueryStringParams, LoadingCircle, generateReportDate, contains, TextMaskCustom, NumberFormatCustom, numberWithCommas, openInNewTab, downloadExcel, downloadPdf } from '../tools/tools'
import { useDimensions } from "../tools/useDimensions";
import { SEARCH_FIELD_OPTIONS, SEARCH_FIELD_BLANKS, EQUIPMENT, AVD_SEARCH, BASIC_SEARCH, OPTIONS_DEFAULT, BLANKS_DEFAULT, condition } from '../config/constants'
import { orderBy, findIndex, filter, debounce } from 'lodash'
import { updateEquipmentApi, destroyEquipmentApi, addEquipmentApi, equipmentSearchApi2 } from '../../publics/actions/equipment-api'
import { getChangeHistoryByTableApi } from '../../publics/actions/change-history-api'
import { connect } from 'redux-bundler-react';
import AddCommentIcon from '@mui/icons-material/AddComment';
import toast from 'react-hot-toast';
import ChangeHistoryButton from '../history'
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddIcon from '@mui/icons-material/Add';
import SaveAlt from '@mui/icons-material/SaveAlt';
import CustomExportButton from './custom-export-button'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material';

const CustomDatePicker = (props) => {
  const [date, setDate] = useState("");
  const handleClearClick = () => {
    props.onFilterChanged(props.columnDef.tableData.id, '');
    setDate("");
  };

  return (
    <TextField
      variant="standard"
      format="dd/MM/yyyy"
      value={date}
      ampm
      autoOk
      allowKeyboardControl
      style={{ width: 150 }}
      onChange={(event) => {
        setDate(event.target.value);
        props.onFilterChanged(props.columnDef.tableData.id, event.target.value ? new Date(event.target.value) : '');
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FilterListIcon />
          </InputAdornment>
        ),
        endAdornment: <IconButton fontSize="small" sx={{ visibility: date ? "visible" : "hidden" }} onClick={handleClearClick}><ClearIcon fontSize="small" /></IconButton>
      }}
    />
  );
};

const CustomFilterTextField = (props) => {
  const [text, setText] = useState("");

  const handleClearClick = () => {
    props.onFilterChanged(props.columnDef.tableData.id, null);
    setText("");
  };

  return (
    <TextField
      variant="standard"
      value={text}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FilterListIcon />
          </InputAdornment>
        ),
        endAdornment: <IconButton fontSize="small" sx={{ visibility: text ? "visible" : "hidden" }} onClick={handleClearClick}><ClearIcon fontSize="small" /></IconButton>
      }}
      style={{ width: 125 }}
      onChange={(event) => {
        setText(event.target.value);
        props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
      }}

    />

  );
};


const MuiTable = React.forwardRef(({ name, addProps, showHistory, exportButton, columns, options, components, Action, Toolbar, actions, componentName, ...rest }, ref) => {
  const [showFilter, setShowFilter] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const mytheme =  createTheme({
  });

  let all_actions = [{ name: 'filter', position: 'toolbar' }]

  if (actions?.length > 0) {
    const temp_actions = actions.filter((act) => {

      return Object.keys(act).length > 0
    })
    all_actions = [...all_actions, ...temp_actions]
  }

  console.log(all_actions)

  if (showHistory) {
    all_actions = [{ name: 'change-history' }, ...all_actions]
  }

  if (exportButton) {
    all_actions.push({ name: 'export', position: 'toolbar' })
  }

  return (
    <MaterialTable
      tableRef={ref}
      onTreeExpandChange
      columns={columns.map(col => {
        let temp_col = { ...col }
        if (temp_col.type === 'numeric') {
          temp_col = {
            ...temp_col, customFilterAndSearch: (term, rowData, column) => {
              if (rowData[column.field]) {
                return rowData[column.field].toString().includes(term)
              }
              return false
            }
          }
        }
        if (temp_col.type === 'date') {
          return { ...temp_col, filterComponent: (props) => <CustomDatePicker {...props} />, }
        }
        return { ...temp_col, filterComponent: (props) => <CustomFilterTextField {...props} />, }
      })}

      {...(all_actions && {
        actions: [
          ...all_actions
        ]
      })}
      components={{
        Action: (props, rowData) => {
          if (props.action.name === 'change-history') {
            return (
              <ChangeHistoryButton id={props.data.id} componentName={componentName} />
            )
          }
          
          if(props.action.name === "export"){
              return (<div style={{paddingLeft: 10}}>
                <CustomExportButton {...ref?.current?.state}/>
              </div>)
          }

          if(props.action.name === "filter"){
            return (<div style={{paddingLeft: 10}}>
              <Button sx={{ height: 35, width: 150 }}
              startIcon={<FilterListIcon />}
              variant={showFilter ? 'outlined' : 'contained'}
              size="small"
              color="primary"
              onClick={() => setShowFilter(prev => !prev)}
              >
                {showFilter ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>)  
          }

          if (props.action.display === 'button' || props.action.tooltip === "Add") {
            const title = `${props.action.tooltip} ${name}`
            return (
              <div style={{paddingLeft: 10}}>
                <Button
                color={'success'}
                startIcon={<AddIcon />}
                {...props.action}
                {...(addProps || {})}
                onClick={(event) => props.action.onClick(event, props.data)}
                variant="contained"
                title={title}
              >{props.action.label || title}
              </Button>
            </div>
           )
          }

          return <MTableAction {...props} />;
        },
        // Toolbar: props => (
        //   <>
        //     <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
        //       <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        //         {showFilter ? (
        //           <Button sx={{ height: 35 }} startIcon={<FilterListIcon />} variant="outlined" size="small" color="primary" onClick={() => setShowFilter(false)}>Hide Filters</Button>
        //         ) : (
        //           <Button sx={{ height: 35 }} startIcon={<FilterListIcon />} variant="contained" size="small" color="primary" onClick={() => setShowFilter(true)}>Show Filters</Button>
        //         )
        //         }
        //       </div>
        //       <MTableToolbar {...props} />
        //     </div>
        //   </>
        // ),
      }}
      options={{
        // ...(exportButton && {
        //   exportMenu: [
        //     {
        //       label: 'Export to PDF',
        //       exportFunc: (columns, rows) => {
        //         downloadPdf([...columns], [...rows])
        //       }
        //     }, {
        //       label: 'Export to Excel',
        //       exportFunc: (columns, rows) => downloadExcel([...rows], "report", ["update_status"])
        //     }
        //   ],
        //   exportButton: false,
        //   exportAllData: false,
        // }),
        filtering: showFilter,
        search: false,
        headerStyle: {
          backgroundColor: "#969696",
          color: "#FFF",
        }
      }}
      title=""
      {...rest}
    />
  )
})

export default MuiTable
// export default connect(
//   'selectUserToken',
//   MuiTable);