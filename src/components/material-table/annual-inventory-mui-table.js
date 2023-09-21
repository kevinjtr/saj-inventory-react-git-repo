
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
import { lockOptions } from '../config/constants'
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

class EmployeeMuiTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showFilter: false,
        add_inventory: [
		{ title: 'HRA Number', field: 'hra_num', type:'numeric', editable:'onAdd', col_id:2.0, //filterComponent: (props) => <CustomFilterTextField {...props} />,
        editComponent: props => {
          console.log(props)

          return (
            <Autocomplete
            ListboxProps={{
              sx: { fontSize: 3 },
            }}
                  value={props.value ? find(this.props.hras,function(h){ return h.hra_num === props.value}) : null}
                  onChange={(e, nv) => {
                    if(nv?.hra_num){
                      props.onChange(nv.hra_num) 
                      return;
                    }
                    props.onChange(nv)
                  }}
                  options={this.props.hras}
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
                    const idx = findIndex(this.props.hras,function(e){ return (e.hra_num && (e.hra_num == rowData.hra_num)); })
                    return idx != -1
                }
                }
            }

            return true
        }, customFilterAndSearch: (term, rowData, column) => {
            if(rowData[column.field]){
              return rowData[column.field].toString().includes(term)
            }
            return false
          }
        },
		{ title: 'Status', field: 'locked',type:'numeric', editable: 'onUpdate',customFilterAndSearch: (term, rowData, column) => {
			const option = rowData.locked != 2 ? 'LOCKED' : 'UNLOCKED'
			if (rowData.locked) {
			  return option.toString()?.toUpperCase().includes(term.toUpperCase())
			}
			return false
		},
		render: rowData => rowData.locked != 2 ? 'LOCKED' : 'UNLOCKED',
		lookup:lockOptions
		},
		{ title: 'Fiscal Year', cellStyle: {
			minWidth: 200,
			maxWidth: 200
		  }, field: 'fiscal_year', editable: 'onAdd', type:'numeric', validate: (rowData) => {

			if(rowData.hasOwnProperty('fiscal_year')){
				if(!isNaN(rowData.fiscal_year)) {
					if(rowData.hasOwnProperty('tableData')){
						if(rowData.tableData.editing === "update"){
							return true
						}
					}					
		
					console.log((new Date()).getFullYear() + 1,rowData.fiscal_year,typeof rowData.fiscal_year,typeof rowData.fiscal_year,rowData.fiscal_year)
					if(typeof rowData.fiscal_year == "number"){
						if(rowData.fiscal_year.toString().length != 4){
							return ({ isValid: false, helperText: 'four digits are required.' })
						}else if(rowData.fiscal_year < 1990 || rowData.fiscal_year > (new Date()).getFullYear() + 1){
							return ({ isValid: false, helperText: 'year is out of range.' })
						}

						return true
					}
		
					if(typeof rowData.fiscal_year === "string"){
						return ({ isValid: false, helperText: 'HRA number needs to be numeric.' })
					}
				}
			}
			
			return ({ isValid: false, helperText: 'Fiscal Year is required.' })

		}, customFilterAndSearch: (term, rowData, column) => {
            if(rowData[column.field]){
              return rowData[column.field].toString().includes(term)
            }
            return false
          }},
		{ title: 'Employee First Name', field: 'hra_first_name',editable: 'never' },
		{ title: 'Employee Last name', field: 'hra_last_name',editable: 'never' },
		{ title: 'Equipment Quantity', field: 'annual_equipment_count',editable: 'never'}
	    ].map(c => {c.filterComponent = (props) => <CustomFilterTextField {...props} />; return c}),
      view_inventory: [
        { title: 'HRA Num', field: 'hra_num',editable: 'never'},
        { title: 'Fiscal Year', field: 'fiscal_year',editable: 'never' },
        { title: 'Item Type', field: 'item_type',editable: 'never'},
        { title: 'Bar Tag Num', field: 'bar_tag_num',editable: 'never' },
        { title: 'Serial Number', field: 'serial_num',editable: 'never' },
        { title: 'Employee Holder', field: 'employee_full_name',editable: 'never' }
    ].map(c => {c.filterComponent = (props) => <CustomFilterTextField {...props} />; return c})
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
        //columns={this.state.columns}
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

export default React.forwardRef((props, ref) => <EmployeeMuiTable
  innref={ref} {...props}
/>);
// export default connect(
//   'selectUserToken',
//   MuiTable);