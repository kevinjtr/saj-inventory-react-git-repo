
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

class EmployeeMuiTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      columns: [
        {
          title: 'ID', field: 'id', editable: 'never', type: 'numeric', cellStyle: {
            minWidth: 150,
            maxWidth: 200
          }, customFilterAndSearch: (term, rowData, column) => {
            if (rowData[column.field]) {
              return rowData[column.field].toString()?.toUpperCase().includes(term?.toUpperCase())
            }
            return false
          }, filterComponent: (props) => <CustomFilterTextField {...props} />
        },
        { title: 'First Name', field: 'first_name', filterComponent: (props) => <CustomFilterTextField {...props} /> },
        {
          title: 'Last name', field: 'last_name', cellStyle: {
            minWidth: 250,
            maxWidth: 350
          },
          validate: (rowData) => {
            if (rowData.hasOwnProperty('last_name')) {
              if (rowData.last_name) {
                if (rowData.hasOwnProperty('tableData')) {
                  if (rowData.tableData.editing === "update") {
                    return true
                  }
                }

                return true
              }
            }

            return ({ isValid: false, helperText: 'Last Name is required.' })

          }, filterComponent: (props) => <CustomFilterTextField {...props} />
        },
        { title: 'Title', field: 'title', filterComponent: (props) => <CustomFilterTextField {...props} /> },
        {
          title: 'Office Symbol', field: 'office_symbol', customFilterAndSearch: (term, rowData, column) => {
            if (rowData.office_symbol_alias && rowData.office_symbol) {
              return rowData.office_symbol_alias.toString()?.toUpperCase().includes(term?.toUpperCase())
            }
            return false
          }, render: rowData => rowData.office_symbol_alias, exportColumn: 'office_symbol_alias',
          editComponent: props => (
            <Autocomplete
              value={props.value ? find(this.props.officesSymbol, function (os) { return os.office_symbol === props.value }) : null}
              onChange={(e, nv) => {
                if (nv?.office_symbol) {
                  props.onChange(nv.office_symbol)
                  return;
                }
                props.onChange(nv)
              }}
              options={this.props.officesSymbol}
              getOptionLabel={(option) => option.office_symbol_alias}
              renderOption={(props, option, state) => <li {...props} style={{ fontSize: '1rem' }}>{option.office_symbol_alias}</li>}
              style={{ width: 250 }}
              renderInput={(params) => <TextField {...params} variant={"standard"} helperText="Office Symbol" margin="normal" />}
            />),
          filterComponent: (props) => <CustomFilterTextField {...props} />
        },
        {
          title: 'Work Phone', field: 'work_phone', type: 'numeric', validate: rowData => {
            if (rowData.work_phone) {
              return (rowData.work_phone.toString().length > 10 ? { isValid: false, helperText: 'phone number digits exceed 10.' } : true)
            }
            return (true)
          }, filterComponent: (props) => <CustomFilterTextField {...props} />, customFilterAndSearch: (term, rowData, column) => {
            if (rowData[column.field]) {
              return rowData[column.field].toString()?.toUpperCase().includes(term?.toUpperCase())
            }
            return false
          }
        },
        { title: 'Email', field: 'email', editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} /> },
        {
          title: 'Division', field: 'division', editable: 'onAdd', exportColumn: 'division_symbol', render: rowData => rowData.division_symbol,
          editComponent: props => {
            return (
              <Autocomplete
                value={props.value ? find(this.props.divisions, function (d) { return d.id === props.value }) : null}
                onChange={(e, nv) => {
                  if (nv?.id) {
                    props.onChange(nv.id)
                    return;
                  }
                  props.onChange(nv)
                }}
                options={this.props.divisions}
                getOptionLabel={(option) => option.symbol}
                renderOption={(props, option, state) => <li {...props} style={{ fontSize: '1rem' }}>{option.symbol}</li>}
                style={{ width: 250 }}
                renderInput={(params) => <TextField {...params} error={!props.value} helperText={props.value ? "Division" : "Division is required"} variant="standard" />}
              />)
          },
          validate: (rowData) => {
            if (rowData.hasOwnProperty('division')) {
              if (rowData.division) {
                if (rowData.hasOwnProperty('tableData')) {
                  if (rowData.tableData.editing === "update") {
                    return true
                  }
                }

                return true
              }
            }

            return ({ isValid: false, helperText: 'Division is required.' })

          },
          filterComponent: (props) => <CustomFilterTextField {...props} />, customFilterAndSearch: (term, rowData, column) => {
            if (rowData.division_symbol) {
              return rowData.division_symbol.toString()?.toUpperCase().includes(term?.toUpperCase())
            }
            return false
          }
        },
        {
          title: 'District', field: 'district', editable: 'onAdd', exportColumn: 'district_symbol', render: rowData => rowData.district_symbol,
          editComponent: props => {
            return (
              <Autocomplete
                value={props.value ? find(this.props.districts, function (d) { return d.id === props.value }) : null}
                onChange={(e, nv) => {
                  if (nv?.id) {
                    props.onChange(nv.id)
                    return;
                  }
                  props.onChange(nv)
                }}
                options={this.props.districts}
                getOptionLabel={(option) => option.symbol}
                renderOption={(props, option, state) => <li {...props} style={{ fontSize: '1rem' }}>{option.symbol}</li>}
                style={{ width: 250 }}
                renderInput={(params) => <TextField {...params} error={!props.value} helperText={props.value ? "District" : "District is required"} variant="standard" />}
              />)
          },
          validate: (rowData) => {
            if (rowData.hasOwnProperty('district')) {
              if (rowData.district) {
                if (rowData.hasOwnProperty('tableData')) {
                  if (rowData.tableData.editing === "update") {
                    return true
                  }
                }

                return true
              }
            }

            return ({ isValid: false, helperText: 'District is required.' })

          },
          filterComponent: (props) => <CustomFilterTextField {...props} />, customFilterAndSearch: (term, rowData, column) => {
            if (rowData.district_symbol) {
              return rowData.district_symbol.toString()?.toUpperCase().includes(term?.toUpperCase())
            }
            return false
          }
        },
        { title: 'Equipment Quantity', field: 'employee_equipment_count', editable: 'never', filterComponent: (props) => <CustomFilterTextField {...props} /> },
        // { title: 'Office Location Name',field:'office_location_id',editable: 'onUpdate', render: rowData => <a value={rowData.office_location_id} >{rowData.office_location_name}</a>,
        // editComponent: props => (
        // 	<Autocomplete
        // 		value={props.value ? find(districtOfficeLocations?.[props.rowData?.district],function(os){ return os.office_symbol === props.value}) : null}
        // 		onChange={(e, nv) => { 
        // 			if(nv?.office_symbol){
        // 				props.onChange(nv.office_symbol) 
        // 				return;
        // 			}
        // 			props.onChange(nv)
        // 		}}
        // 		key={`combo-box-${uuid()}`}
        // 		options={districtOfficeLocations?.[props.rowData?.district]}
        // 		getOptionLabel={(option) => option.office_location_name}
        // 		style={{ width: 250 }}
        // 		renderInput={(params) => <TextField {...params} label="Office Location" margin="normal"/>}
        // />),
        // },
        {
          title: 'Office Location Name', field: 'office_location_id', editable: 'onUpdate', customFilterAndSearch: (term, rowData, column) => {
            if (rowData.office_location_name) {
              return rowData.office_location_name.toString()?.toUpperCase().includes(term?.toUpperCase())
            }
            return false
          }, render: rowData => rowData.office_location_name, //filterComponent: (props) => <CustomFilterTextField {...props} />,
          exportColumn: 'office_location_name',
          editComponent: props => {
            console.log(props)

            return (
              <Autocomplete
                value={props.value ? find(this.props.districtOfficeLocations?.[props.rowData?.district], function (os) { return os.office_location_id === props.value }) : null}
                onChange={(e, nv) => {
                  if (nv?.office_location_id) {
                    props.onChange(nv.office_location_id)
                    return;
                  }
                  props.onChange(nv)
                }}
                options={props.rowData.district ? this.props.districtOfficeLocations?.[props?.rowData?.district] : []}
                getOptionLabel={(option) => option.office_location_name}
                renderOption={(props, option, state) => <li {...props} style={{ fontSize: '1rem' }}>{option.office_location_name}</li>}
                style={{ width: 250 }}
                renderInput={(params) => <TextField {...params} helperText="Office Location Name" variant="standard" />}
              />)
          },
          filterComponent: (props) => <CustomFilterTextField {...props} />
          //   validate: (rowData) => {
          //       if(rowData.hasOwnProperty('office_location_id')){
          //           if(!isNaN(rowData.office_location_id)) {
          //             if(rowData.office_location_id){
          //               const idx = findIndex(districtOfficeLocations[rowData.district],function(e){ return (e.office_location_id && (e.office_location_id == rowData.office_location_id)); })
          //               return idx != -1
          //             }
          //           }
          //       }

          //       return true
          //   }
        },
        // editComponent: x => {
        // 	let idx = -1

        // 	if(x.rowData.office_location_id){
        // 		idx = findIndex(districtOfficeLocations[x.rowData.district],function(o){ return (o.office_location_id && (o.office_location_id === x.rowData.office_location_id)); })
        // 	}

        // 	return(
        // 		<Autocomplete
        // 		id={`combo-box-employee-location`}
        // 		key={`combo-box-employee-location`}
        // 		size="medium"
        // 		options={districtOfficeLocations[x.rowData.district]}
        // 		getOptionLabel={(option) => option.office_location_name}
        // 		value={idx != -1 ? districtOfficeLocations[x.rowData.district][idx] : null}
        // 		onChange ={(e,v) => {
        // 			if(v){
        // 				if(v.hasOwnProperty('office_location_id')){
        // 					x.onChange(v.office_location_id)
        // 					return;
        // 				}
        // 			}

        // 			x.onChange(v)
        // 		}}

        // 		renderInput={(params) => <TextField {...params} label="Name" margin="normal"/>}
        // 		renderOption={(v) => <a style={{fontSize:'16px'}}>{v.office_location_name}</a>}
        // 	/>
        // 	)
        // }}
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