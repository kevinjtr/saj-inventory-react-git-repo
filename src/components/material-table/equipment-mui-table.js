
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

class EquipmentMuiTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      columns: [
        { title: 'HRA', hidden: false, field: 'hra_num', type:'numeric', print_title: 'HRA Num', col_id:2.0, render: (rowData) => {
            return `${this.props.edit_rights && rowData.hra_num ? `${rowData.hra_num} -`: ''}${rowData.hra_first_name ? ` ${rowData.hra_first_name}`: ''}${rowData.hra_last_name ? ` ${rowData.hra_last_name}` : ''}`
        },
        filterComponent: (props) => <CustomFilterTextField {...props} />,
        customFilterAndSearch: (term, rowData, column) => {
          if(rowData[column.field]){
            const option = `${this.props.edit_rights && rowData.hra_num ? `${rowData.hra_num} -`: ''}${rowData.hra_first_name ? ` ${rowData.hra_first_name}`: ''}${rowData.hra_last_name ? ` ${rowData.hra_last_name}` : ''}`
            return option.toString()?.toUpperCase().includes(term?.toUpperCase())
          }
          return false
        },  
        editComponent: props => {
          console.log(props)
      
          return (
            <Autocomplete
            ListboxProps={{
              sx: { fontSize: 3 },
            }}
                  value={props.value ? find(this.props.hras_array,function(h){ return h.hra_num === props.value}) : null}
                  onChange={(e, nv) => {
                    if(nv?.hra_num){
                      props.onChange(nv.hra_num) 
                      return;
                    }
                    props.onChange(nv)
                  }}
                  options={this.props.hras_array}
                  getOptionLabel={(option) => {
                    const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
                    return `${option.hra_num}${full_name && ` - ${full_name}`}`
                  }}
                  renderOption={(props, option, state) => {
                    const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
                    return <li {...props} style={{fontSize: '1rem'}}>{`${option.hra_num}${full_name && ` - ${full_name}`}`}</li>
                  }}
                  style={{ width: 250 }}
                  renderInput={(params) => <TextField {...params} helperText="HRA" variant="standard" />}
              />)
        },
        validate: (rowData) => {
            if(rowData.hasOwnProperty('hra_num')){
                if(!isNaN(rowData.hra_num)) {
                  if(rowData.hra_num){
                    const idx = findIndex(this.props.hras_array,function(e){ return (e.hra_num && (e.hra_num == rowData.hra_num)); })
                    return idx != -1
                  }
                }
            }
      
            return true
        }
        },
      { title: 'HRA First', hidden: false, field: 'hra_first_name', hidden: true,
       col_id:2.1,editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
      { title: 'HRA Last', hidden: false, field: 'hra_last_name', hidden: true,
       col_id:2.2,editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
      { title: 'Item Description', hidden: false, field: 'item_type', cellStyle: {
        minWidth: 200,
        maxWidth: 200
      },
       col_id:4, filterComponent: (props) => <CustomFilterTextField {...props} />,  },
      { title: 'Bar Tag', hidden: false, field: 'bar_tag_num', type: 'numeric', customFilterAndSearch: (term, rowData, column) => {
        if(rowData[column.field]){
          return rowData[column.field].toString().includes(term)
        }
        return false
      }, cellStyle: {
        minWidth: 200,
        maxWidth: 200
      },
       col_id:5, validate: (rowData) => {
          if(rowData.hasOwnProperty('bar_tag_num')){
              if(!isNaN(rowData.bar_tag_num)) {
                  if(typeof rowData.bar_tag_num === "number"){
                      if(rowData.bar_tag_num.toString().length > 5){
                          return ({ isValid: false, helperText: 'Bar Tag digits exceed 5.' })
                      }else{
                          const idx = findIndex(this.props.equipmentArray,e => e.bar_tag_num == rowData.bar_tag_num)
                          const propTableData = rowData.hasOwnProperty('tableData')//exists: editing, not exists: adding.

                          if(propTableData && idx != -1){
                              if(rowData.id != this.props.equipmentArray[idx].id){
                                  return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
                              }
                          }else if (idx != -1 && !propTableData && !rowData.hasOwnProperty('id')){
                              return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
                          }								
                      }
                      return true
                  }
      
                  if(typeof rowData.bar_tag_num === "string"){
                      return ({ isValid: false, helperText: 'Bar Tag needs to be numeric.' })
                  }
              }
          }
          return ({ isValid: false, helperText: 'Bar Tag is required.' })

      }, filterComponent: (props) => <CustomFilterTextField {...props} />,
      },
      {title:'Serial Num', hidden: false, field:'serial_num', cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }, validate: (rowData) => {
        if(rowData.hasOwnProperty('serial_num')){
                    if(rowData.serial_num.toString().length < 3){
                        return ({ isValid: false, helperText: 'Serial Num is too short.' })
                    }

                    return true  
        }
        return ({ isValid: false, helperText: 'Serial Num is required.' })
      },
       col_id:5.5, filterComponent: (props) => <CustomFilterTextField {...props} />,},
       { title: 'Employee', print_title: 'Employee ID', hidden: false, field: 'employee_id', type:'numeric', render: (rowData) => {
        return `${rowData.employee_first_name ? ` ${rowData.employee_first_name}`: ''}${rowData.employee_last_name ? ` ${rowData.employee_last_name}` : ''}`
      },
      customFilterAndSearch: (term, rowData, column) => {
        if(rowData[column.field]){
          const option = `${rowData.employee_first_name ? ` ${rowData.employee_first_name}`: ''}${rowData.employee_last_name ? ` ${rowData.employee_last_name}` : ''}`
          return option.toString()?.toUpperCase().includes(term?.toUpperCase())
        }
        return false
      },
       col_id:6.0, width:"200px",
      editComponent: props => (
          <Autocomplete
          sx={{
            '.MuiAutocomplete-option': {
              fontSize: '.5rem'
            }
          }}
                value={props.value ? find(this.props.employees,function(employee){ return employee.id === props.value}) : null}
                onChange={(e, nv) => { 
                    if(nv?.id){
                      props.onChange(nv.id) 
                      return;
                    }
                  props.onChange(nv)
                }}
                options={this.props.employees}
                getOptionLabel={(option) => option.id + ' - ' + (option.first_name ? option.first_name + ' ' : '') + option.last_name}
                renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.id + ' - ' + (option.first_name ? option.first_name + ' ' : '') + option.last_name}</li>}
                style={{ width: 250 }}
                renderInput={(params) => <TextField {...params} helperText="Employee" variant="standard" />}
            />), filterComponent: (props) => <CustomFilterTextField {...props} />,
      },
      { title: 'Employee First', hidden: false, field: 'employee_first_name', hidden: true,
       col_id:6.1 ,editable: 'never',filterComponent: (props) => <CustomFilterTextField {...props} />, },
      { title: 'Employee Last', hidden: false, field: 'employee_last_name', hidden: true,
       col_id:6.2,editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />,  },
      { title: 'Employee Office Location', hidden: false, field: 'employee_office_location_name',
       col_id:6.3,editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />,  },
       {title: 'Status', hidden: false, field:'status',
       col_id:6.4,editable: 'no', filterComponent: (props) => <CustomFilterTextField {...props} />, },
      {title: 'Status Date', hidden: false, field:'status_date', type:'date', render: rowData => {
        if(rowData.status_date){
          return moment(rowData.status_date).format("MM/DD/YY HH:mm:ss")
        }
        return ''
    },
     col_id:6.4,editable: 'no', filterComponent: (props) => <CustomFilterTextField {...props} />, 
    },
      ],
      extended_columns: [
        { title: 'HRA', hidden: false, field: 'hra_num', type:'numeric', print_title: 'HRA Num', col_id:2.0, render: (rowData) => {
            return `${this.props.edit_rights && rowData.hra_num ? `${rowData.hra_num} -`: ''}${rowData.hra_first_name ? ` ${rowData.hra_first_name}`: ''}${rowData.hra_last_name ? ` ${rowData.hra_last_name}` : ''}`
        },
        filterComponent: (props) => <CustomFilterTextField {...props} />,
        customFilterAndSearch: (term, rowData, column) => {
          if(rowData[column.field]){
            const option = `${this.props.edit_rights && rowData.hra_num ? `${rowData.hra_num} -`: ''}${rowData.hra_first_name ? ` ${rowData.hra_first_name}`: ''}${rowData.hra_last_name ? ` ${rowData.hra_last_name}` : ''}`
            return option.toString()?.toUpperCase().includes(term?.toUpperCase())
          }
          return false
        },  
        editComponent: props => {
          console.log(props)
      
          return (
            <Autocomplete
            ListboxProps={{
              sx: { fontSize: 3 },
            }}
                  value={props.value ? find(this.props.hras_array,function(h){ return h.hra_num === props.value}) : null}
                  onChange={(e, nv) => {
                    if(nv?.hra_num){
                      props.onChange(nv.hra_num) 
                      return;
                    }
                    props.onChange(nv)
                  }}
                  options={this.props.hras_array}
                  getOptionLabel={(option) => {
                    const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
                    return `${option.hra_num}${full_name && ` - ${full_name}`}`
                  }}
                  renderOption={(props, option, state) => {
                    const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
                    return <li {...props} style={{fontSize: '1rem'}}>{`${option.hra_num}${full_name && ` - ${full_name}`}`}</li>
                  }}
                  style={{ width: 250 }}
                  renderInput={(params) => <TextField {...params} helperText="HRA" variant="standard" />}
              />)
        },
        validate: (rowData) => {
            if(rowData.hasOwnProperty('hra_num')){
                if(!isNaN(rowData.hra_num)) {
                  if(rowData.hra_num){
                    const idx = findIndex(this.props.hras_array,function(e){ return (e.hra_num && (e.hra_num == rowData.hra_num)); })
                    return idx != -1
                  }
                }
            }
      
            return true
        }
        },
      { title: 'HRA First', hidden: false, field: 'hra_first_name', hidden: true,
       col_id:2.1,editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
      { title: 'HRA Last', hidden: false, field: 'hra_last_name', hidden: true,
       col_id:2.2,editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />, },
      { title: 'Item Description', hidden: false, field: 'item_type', cellStyle: {
        minWidth: 200,
        maxWidth: 200
      },
       col_id:4, filterComponent: (props) => <CustomFilterTextField {...props} />,  },
      { title: 'Bar Tag', hidden: false, field: 'bar_tag_num', type: 'numeric', customFilterAndSearch: (term, rowData, column) => {
        if(rowData[column.field]){
          return rowData[column.field].toString().includes(term)
        }
        return false
      }, cellStyle: {
        minWidth: 200,
        maxWidth: 200
      },
       col_id:5, validate: (rowData) => {
          if(rowData.hasOwnProperty('bar_tag_num')){
              if(!isNaN(rowData.bar_tag_num)) {
                  if(typeof rowData.bar_tag_num === "number"){
                      if(rowData.bar_tag_num.toString().length > 5){
                          return ({ isValid: false, helperText: 'Bar Tag digits exceed 5.' })
                      }else{
                          const idx = findIndex(this.props.equipmentArray,e => e.bar_tag_num == rowData.bar_tag_num)
                          const propTableData = rowData.hasOwnProperty('tableData')//exists: editing, not exists: adding.

                          if(propTableData && idx != -1){
                              if(rowData.id != this.props.equipmentArray[idx].id){
                                  return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
                              }
                          }else if (idx != -1 && !propTableData && !rowData.hasOwnProperty('id')){
                              return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
                          }								
                      }
                      return true
                  }
      
                  if(typeof rowData.bar_tag_num === "string"){
                      return ({ isValid: false, helperText: 'Bar Tag needs to be numeric.' })
                  }
              }
          }
          return ({ isValid: false, helperText: 'Bar Tag is required.' })

      }, filterComponent: (props) => <CustomFilterTextField {...props} />,
      },
      {title:'Serial Num', hidden: false, field:'serial_num', cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }, validate: (rowData) => {
        if(rowData.hasOwnProperty('serial_num')){
                    if(rowData.serial_num.toString().length < 3){
                        return ({ isValid: false, helperText: 'Serial Num is too short.' })
                    }

                    return true  
        }
        return ({ isValid: false, helperText: 'Serial Num is required.' })
      },
       col_id:5.5, filterComponent: (props) => <CustomFilterTextField {...props} />,},
       { title: 'Employee', print_title: 'Employee ID', hidden: false, field: 'employee_id', type:'numeric', render: (rowData) => {
        return `${rowData.employee_first_name ? ` ${rowData.employee_first_name}`: ''}${rowData.employee_last_name ? ` ${rowData.employee_last_name}` : ''}`
      },
      customFilterAndSearch: (term, rowData, column) => {
        if(rowData[column.field]){
          const option = `${rowData.employee_first_name ? ` ${rowData.employee_first_name}`: ''}${rowData.employee_last_name ? ` ${rowData.employee_last_name}` : ''}`
          return option.toString()?.toUpperCase().includes(term?.toUpperCase())
        }
        return false
      },
       col_id:6.0, width:"200px",
      editComponent: props => (
          <Autocomplete
          sx={{
            '.MuiAutocomplete-option': {
              fontSize: '.5rem'
            }
          }}
                value={props.value ? find(this.props.employees,function(employee){ return employee.id === props.value}) : null}
                onChange={(e, nv) => { 
                    if(nv?.id){
                      props.onChange(nv.id) 
                      return;
                    }
                  props.onChange(nv)
                }}
                options={this.props.employees}
                getOptionLabel={(option) => option.id + ' - ' + (option.first_name ? option.first_name + ' ' : '') + option.last_name}
                renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.id + ' - ' + (option.first_name ? option.first_name + ' ' : '') + option.last_name}</li>}
                style={{ width: 250 }}
                renderInput={(params) => <TextField {...params} helperText="Employee" variant="standard" />}
            />), filterComponent: (props) => <CustomFilterTextField {...props} />,
      },
      { title: 'Employee First', hidden: false, field: 'employee_first_name', hidden: true,
       col_id:6.1 ,editable: 'never',filterComponent: (props) => <CustomFilterTextField {...props} />, },
      { title: 'Employee Last', hidden: false, field: 'employee_last_name', hidden: true,
       col_id:6.2,editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />,  },
      { title: 'Employee Office Location', hidden: false, field: 'employee_office_location_name',
       col_id:6.3,editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} />,  },
       {title: 'Status', hidden: false, field:'status',
       col_id:6.4,editable: 'no', filterComponent: (props) => <CustomFilterTextField {...props} />, },
      {title: 'Status Date', hidden: false, field:'status_date', type:'date', render: rowData => {
        if(rowData.status_date){
          return moment(rowData.status_date).format("MM/DD/YY HH:mm:ss")
        }
        return ''
    },
     col_id:6.4,editable: 'no', filterComponent: (props) => <CustomFilterTextField {...props} />, 
    },

     {title:'Acquisition Date', extended_col: true, hidden: false, field:'acquisition_date', cellStyle: {
      minWidth: 200,
      maxWidth: 200
    }, type: 'date',
     col_id:1, filterComponent: (props) => <CustomFilterTextField {...props} />,},
    {title:'Acquisition Price', extended_col: true, hidden: false, field:'acquisition_price',type: 'numeric', 
    customFilterAndSearch: (term, rowData, column) => {
      if(rowData[column.field]){
        return rowData[column.field].toString().includes(term)
      }
      return false
    },col_id:7, filterComponent: (props) => <CustomFilterTextField {...props} />},
    {title:'Catalog Num', extended_col: true, hidden: false, field:'catalog_num',
     col_id:8, filterComponent: (props) => <CustomFilterTextField {...props} />},
    {title:'Manufacturer', extended_col: true, hidden: false, field:'manufacturer',
     col_id:10, filterComponent: (props) => <CustomFilterTextField {...props} />},
    {title:'Model', extended_col: true, hidden: false, field:'model',
     col_id:11, filterComponent: (props) => <CustomFilterTextField {...props} />},
    {title:'Condition', extended_col: true, hidden: false, field:'condition', render: rowData => rowData.condition_name, exportColumn: 'condition_name',
     col_id:12, filterComponent: (props) => <CustomFilterTextField {...props} />,
    editComponent: props => (
      <Autocomplete
      sx={{
        '.MuiAutocomplete-option': {
          fontSize: '.5rem'
        }
      }}
            value={props.value ? find(this.props.condition,function(c){ return c.id === props.value}) : null}
            onChange={(e, nv) => { 
                if(nv?.id){
                  props.onChange(nv.id) 
                  return;
                }
              props.onChange(nv)
            }}
            options={this.props.condition}
            getOptionLabel={(option) => option.id + ' - ' + option.name}
            renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.id + ' - ' + option.name}</li>}
            style={{ width: 250 }}
            renderInput={(params) => <TextField {...params} helperText="Condition" variant="standard" />}
        />)
    }
    ],excess_columns: [
      { title: 'Item Description', hidden: false, field: 'item_type', cellStyle: {
        minWidth: 200,
        maxWidth: 200
      },
       col_id:4, filterComponent: (props) => <CustomFilterTextField {...props} />,  },
      { title: 'Bar Tag', hidden: false, field: 'bar_tag_num', type: 'numeric', customFilterAndSearch: (term, rowData, column) => {
        if(rowData[column.field]){
          return rowData[column.field].toString().includes(term)
        }
        return false
      }, cellStyle: {
        minWidth: 200,
        maxWidth: 200
      },
       col_id:5, validate: (rowData) => {
          if(rowData.hasOwnProperty('bar_tag_num')){
              if(!isNaN(rowData.bar_tag_num)) {
                  if(typeof rowData.bar_tag_num === "number"){
                      if(rowData.bar_tag_num.toString().length > 5){
                          return ({ isValid: false, helperText: 'Bar Tag digits exceed 5.' })
                      }else{
                          const idx = findIndex(this.props.equipmentArray,e => e.bar_tag_num == rowData.bar_tag_num)
                          const propTableData = rowData.hasOwnProperty('tableData')//exists: editing, not exists: adding.

                          if(propTableData && idx != -1){
                              if(rowData.id != this.props.equipmentArray[idx].id){
                                  return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
                              }
                          }else if (idx != -1 && !propTableData && !rowData.hasOwnProperty('id')){
                              return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
                          }								
                      }
                      return true
                  }
      
                  if(typeof rowData.bar_tag_num === "string"){
                      return ({ isValid: false, helperText: 'Bar Tag needs to be numeric.' })
                  }
              }
          }
          return ({ isValid: false, helperText: 'Bar Tag is required.' })

      }, filterComponent: (props) => <CustomFilterTextField {...props} />,
      },
      {title:'Serial Num', hidden: false, field:'serial_num', cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }, validate: (rowData) => {
        if(rowData.hasOwnProperty('serial_num')){
                    if(rowData.serial_num.toString().length < 3){
                        return ({ isValid: false, helperText: 'Serial Num is too short.' })
                    }

                    return true  
        }
        return ({ isValid: false, helperText: 'Serial Num is required.' })
      },
       col_id:5.5, filterComponent: (props) => <CustomFilterTextField {...props} />,},
     {title:'Acquisition Date', extended_col: true, hidden: false, field:'acquisition_date', cellStyle: {
      minWidth: 200,
      maxWidth: 200
    }, type: 'date',
     col_id:1, filterComponent: (props) => <CustomFilterTextField {...props} />,},
    {title:'Acquisition Price', extended_col: true, hidden: false, field:'acquisition_price',type: 'numeric', 
    customFilterAndSearch: (term, rowData, column) => {
      if(rowData[column.field]){
        return rowData[column.field].toString().includes(term)
      }
      return false
    },col_id:7, filterComponent: (props) => <CustomFilterTextField {...props} />},
    {title:'Catalog Num', extended_col: true, hidden: false, field:'catalog_num',
     col_id:8, filterComponent: (props) => <CustomFilterTextField {...props} />},
    {title:'Manufacturer', extended_col: true, hidden: false, field:'manufacturer',
     col_id:10, filterComponent: (props) => <CustomFilterTextField {...props} />},
    {title:'Model', extended_col: true, hidden: false, field:'model',
     col_id:11, filterComponent: (props) => <CustomFilterTextField {...props} />},
    {title:'Condition', extended_col: true, hidden: false, field:'condition', render: rowData => rowData.condition_name, exportColumn: 'condition_name',
     col_id:12, filterComponent: (props) => <CustomFilterTextField {...props} />,
    editComponent: props => (
      <Autocomplete
      sx={{
        '.MuiAutocomplete-option': {
          fontSize: '.5rem'
        }
      }}
            value={props.value ? find(this.props.condition,function(c){ return c.id === props.value}) : null}
            onChange={(e, nv) => { 
                if(nv?.id){
                  props.onChange(nv.id) 
                  return;
                }
              props.onChange(nv)
            }}
            options={this.props.condition}
            getOptionLabel={(option) => option.id + ' - ' + option.name}
            renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.id + ' - ' + option.name}</li>}
            style={{ width: 250 }}
            renderInput={(params) => <TextField {...params} helperText="Condition" variant="standard" />}
        />)
    }
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
        columns={this.props.excess ? this.state.excess_columns : this.props.extended_view ? this.state.extended_columns : this.state.columns}
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
                <CustomExportButton {...{...ref?.current?.state, table: {name: 'equipment', viewType: this.props.extended_view ? 'extended' : 'normal'}}}/>
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

export default React.forwardRef((props, ref) => <EquipmentMuiTable
  innref={ref} {...props}
/>);
// export default connect(
//   'selectUserToken',
//   MuiTable);