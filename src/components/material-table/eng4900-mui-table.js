
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
import { getQueryStringParams, LoadingCircle, generateReportDate, contains, TextMaskCustom, NumberFormatCustom, numberWithCommas, openInNewTab, downloadExcel, downloadPdf, CustomFilterTextField } from '../tools/tools'
import { useDimensions } from "../tools/useDimensions";
import { FORM_STATUS } from '../config/constants'
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

class Eng4900MuiTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showFilter: false,
        my_hra_forms:[
        {
            title: 'Status', field: 'status', customFilterAndSearch: (term, rowData, column) => {
            if (rowData[column.field]) {
                return FORM_STATUS[rowData[column.field]].toString()?.toUpperCase().includes(term.toUpperCase())
            }
            return false
            },editable: 'onUpdate', type: 'numeric', render: rowData => FORM_STATUS[rowData.status],
            editComponent: ({ value, onChange, rowData }) => (
            <Select
                value={value}
                onChange={(event) => {
                onChange(event.target.value);
                }}
            >
                {(rowData.status_options).map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.label}
                </MenuItem>
                ))}
            </Select>
            ),
            validate: (rowData) => {
            if (rowData.hasOwnProperty('status')) {
                if (rowData.status) {
                if (rowData.hasOwnProperty('tableData')) {

                    if (rowData.status === this.props.data?.[rowData.tableData.id].status)
                    return ({ isValid: false, helperText: 'Please select a different Status.' })

                    //if(rowData.status > this.props.eng4900s[tab_idx][rowData.tableData.id].status)
                    return true
                }
                }
            }

            return ({ isValid: false, helperText: 'Status selection is incorrect.' })

            }, filterComponent: (props) => <CustomFilterTextField {...props} />,
        },
        { title: 'Requested Action', field: "requested_action", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        { title: 'Form ID', field: 'form_id', editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        { title: 'Bar Tags', field: "bar_tags", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        { title: 'Losing HRA', field: "losing_hra", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        { title: 'Gaining HRA', field: "gaining_hra", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        ],
        hra_forms: [
            {
              title: 'Status', customFilterAndSearch: (term, rowData, column) => {
                if (rowData[column.field]) {
                  return FORM_STATUS[rowData[column.field]].toString()?.toUpperCase().includes(term.toUpperCase())
                }
                return false
              }, field: 'status', type: 'numeric', render: rowData => FORM_STATUS[rowData.status],
              editComponent: ({ value, onChange, rowData }) => (
                <Select
                  value={value}
                  onChange={(event) => {
                    onChange(event.target.value);
                  }}
                >
                  {(rowData.status_options).map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              ),
              validate: (rowData) => {
                console.log(rowData)
                if (rowData.hasOwnProperty('status')) {
                  if (rowData.status) {
                    if (rowData.hasOwnProperty('tableData')) {
      
                      if (rowData.tableData.editing == "delete" && rowData.status == 1) {
                        return true
                      }
      
                      if (rowData.status === this.props.data?.[rowData.tableData.id].status)
                        return ({ isValid: false, helperText: 'Please select a different Status.' })
      
                      //if(rowData.status > eng4900s[tab_idx][rowData.tableData.id].status)
                      return true
                    }
                  }
                }
      
                return ({ isValid: false, helperText: 'Status selection is incorrect.' })
      
              }, filterComponent: (props) => <CustomFilterTextField {...props} />,
            },
            { title: 'Requested Action', field: "requested_action", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
            { title: 'Form ID', field: 'form_id', editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
            { title: 'Bar Tags', field: "bar_tags", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
            { title: 'Losing HRA', field: "losing_hra", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
            { title: 'Gaining HRA', field: "gaining_hra", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        ],
        sign_forms: [
            { title: 'Status', customFilterAndSearch: (term, rowData, column) => {
              if (rowData[column.field]) {
                return FORM_STATUS[rowData[column.field]].toString()?.toUpperCase().includes(term.toUpperCase())
              }
              return false
            }, field: 'status', editable: 'never', type: 'numeric', render: rowData => FORM_STATUS[rowData.status],
            filterComponent: (props) => <CustomFilterTextField {...props} />},
            { title: 'Requested Action', field: "requested_action", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
            { title: 'Form ID', field: 'form_id', editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
            { title: 'Bar Tags', field: "bar_tags", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
            { title: 'Losing HRA', field: "losing_hra", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
            { title: 'Gaining HRA', field: "gaining_hra", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        ],
        completed_forms: [
        {
            title: 'Status', customFilterAndSearch: (term, rowData, column) => {
            if (rowData[column.field]) {
                return FORM_STATUS[rowData[column.field]].toString()?.toUpperCase().includes(term.toUpperCase())
            }
            return false
            }, field: 'status', editable: 'never', type: 'numeric', render: rowData => FORM_STATUS[rowData.status]
            , validate: (rowData) => {
            if (rowData.hasOwnProperty('status')) {
                if (rowData.status) {
                if (rowData.hasOwnProperty('tableData')) {
                    if (rowData.status >= this.props.data?.[rowData.tableData.id].status) {
                    return true
                    }
                }
                }
            }
    
            return ({ isValid: false, helperText: 'Status selection is incorrect.' })
    
            }, filterComponent: (props) => <CustomFilterTextField {...props} />,
        },
        { title: 'Requested Action', field: "requested_action", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        { title: 'Form ID', field: 'form_id', editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        { title: 'Bar Tags', field: "bar_tags", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        { title: 'Losing HRA', field: "losing_hra", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        { title: 'Gaining HRA', field: "gaining_hra", editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
        ]
    };
  }

  render() {
    const { name, addProps, fetchKey, showHistory, exportButton, options, components, Action, Toolbar, actions, componentName, innref, ...rest } = this.props
    const ref = innref ? innref : React.createRef(MaterialTable)

    let all_actions = [{ name: 'filter', position: 'toolbar' }]

    if (actions?.length > 0) {
      all_actions = [...all_actions, ...actions]
    }

    if (showHistory) {
      all_actions = [{ name: 'change-history' }, ...all_actions]
    }

    if (exportButton) {
      all_actions.push({ name: 'export', position: 'toolbar' })
    }

    return (
      <MaterialTable
        tableRef={ref}
        columns={this.state?.[this.props.tab_name]}
        // columns={columns.map(col => {
        //   if (col.type === 'numeric' && !col.customFilterAndSearch) {
        //     col.customFilterAndSearch = (term, rowData, column) => {
        //         if (rowData[column.field]) {
        //           return rowData[column.field].toString()?.toUpperCase().includes(term?.toUpperCase())
        //         }
        //         return false
        //       }

        //   }

        //   // if(col.filterComponent){
        //   //   return col
        //   // }

        //   if (col.type == 'date') {
        //     //col.filterComponent = (props) => <CustomDatePicker {...props} />
        //     col.filtering = false
        //   }else{
        //     col.filterComponent = (props) => <CustomFilterTextField {...props}/>
        //   }

        //   return col
        // })}

        {...(all_actions && {
          actions: [
            ...all_actions
          ]
        })}
        components={{
          Action: (props, rowData) => {
            if (props.action.name === 'change-history') {
              //console.log(fetchKey)
              return (

                <ChangeHistoryButton id={fetchKey ? props.data[fetchKey] : props.data.id} componentName={componentName} />
              )
            }

            if (props.action.name === "export") {
              return (<div style={{ paddingLeft: 10 }}>
                <CustomExportButton {...ref?.current?.state} />
              </div>)
            }

            if (props.action.name === "filter") {
              return (<div style={{ paddingLeft: 10 }}>
                <Button sx={{ height: 35, width: 150 }}
                  startIcon={<FilterListIcon />}
                  variant={this.state.showFilter ? 'outlined' : 'contained'}
                  size="small"
                  color="primary"
                  onClick={() => {
                    if (this.state.showFilter)
                      ref?.current?.dataManager?.columns?.forEach((item) => {
                        if (item.type != 'date' && item?.tableData?.filterValue)
                          ref.current?.onFilterChange(item?.tableData?.id, undefined);
                        //ref.current?.onFilterChange(item?.tableData?.id, "");
                      })
                    this.setState({
                      showFilter: !this.state.showFilter
                    });
                    //setShowFilter(prev => !prev)
                  }}
                >
                  {this.state.showFilter ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>)
            }

            if (props.action.display === 'button' || props.action.tooltip === "Add") {
              const title = `${props.action.tooltip} ${name}`
              return (
                <div style={{ paddingLeft: 10 }}>
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
        }}
        options={{
          filtering: this.state.showFilter,
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
  }
}

export default React.forwardRef((props, ref) => <Eng4900MuiTable
  innref={ref} {...props}
/>);
// export default connect(
//   'selectUserToken',
//   MuiTable);