
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

class HraMuiTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      columns: [
		{ title: 'HRA Number', cellStyle: {
			minWidth: 200,
			maxWidth: 200
		  },field: 'hra_num', editable: 'onAdd', type:'numeric', customFilterAndSearch: (term, rowData, column) => {
            if (rowData[column.field]) {
              return rowData[column.field].toString()?.toUpperCase().includes(term?.toUpperCase())
            }
            return false
          }, validate: (rowData) => {
				if(rowData.hasOwnProperty('hra_num')){
					if(!isNaN(rowData.hra_num)) {
						if(rowData.hasOwnProperty('tableData')){
							if(rowData.tableData.editing === "update"){
								return true
							}
						}					
			
						if(typeof rowData.hra_num == "number"){
							console.log('isnumber')
							if(rowData.hra_num.toString().length > 3){
								return ({ isValid: false, helperText: 'HRA digits exceed 3.' })
							}else if( findIndex(this.props.hras,h => h.hra_num == rowData.hra_num) != -1 ){
								return ({ isValid: false, helperText: 'Duplicated HRA num.' })
							}

							return true
						}
			
						if(typeof rowData.hra_num === "string"){
							return ({ isValid: false, helperText: 'HRA number needs to be numeric.' })
						}
					}
				}
				
				return ({ isValid: false, helperText: 'HRA number is required.' })

			},
            filterComponent: (props) => <CustomFilterTextField {...props} />},
		{title: 'Next Certification Date', field: 'certification_date', type: 'date',render: rowData => {
        if(rowData.certification_date){
          return moment(rowData.certification_date).format("MM/DD/YY")
        }
        return ''
      }
    },{ title: 'Employee ID', field: 'hra_employee_id',type:'numeric', customFilterAndSearch: (term, rowData, column) => {
            if (rowData[column.field]) {
              return rowData[column.field].toString()?.toUpperCase().includes(term?.toUpperCase())
            }
            return false
          },
			editComponent: props => (
					<Autocomplete
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
						renderInput={(params) => <TextField {...params} variant="standard" helperText={'Employee'}/>}
					/>
				),
                filterComponent: (props) => <CustomFilterTextField {...props} />
		},
		{ title: 'Employee First Name', field: 'hra_first_name',editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} /> },
		{ title: 'Employee Last name', field: 'hra_last_name',editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} /> },
		{ title: 'Title', field: 'hra_title',editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} /> },
		{ title: 'Office Symbol', field: 'hra_office_symbol_alias',editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} /> },
		{ title: 'Work Phone', field: 'hra_work_phone',editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} /> },
		{ title: 'Equipment Quantity', field: 'hra_equipment_count',editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} /> }
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
        columns={this.state.columns}
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
        title=""s
        {...rest}
      />
    )
  }
}

export default React.forwardRef((props, ref) => <HraMuiTable
  innref={ref} {...props}
/>);
// export default connect(
//   'selectUserToken',
//   MuiTable);