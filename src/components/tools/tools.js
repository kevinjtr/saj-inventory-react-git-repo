import {CircularProgress} from '@mui/material/';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import React, { useEffect, useState } from 'react';
import { filter } from 'lodash'
import moment from 'moment'
import { TextField, IconButton, InputAdornment, DatePicker } from '@mui/material';
import {
  FilterList as FilterListIcon, Clear as ClearIcon
} from '@mui/icons-material';

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getQueryStringParams = query => {
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce((params, param) => {
                    let [key, value] = param.split('=');
                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                    return params;
                }, {}
            )
        : {}
  };

export const contains = (target, pattern) => {
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
}

export const LoadingCircle = () => {
    return(
        <CircularProgress key={uuidv4()}/>
    )
}

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

export const generateReportDate= (dateType) => {

    const date = new Date();
    var day = date.getDate();
    if(day<=9)
        day = '0' + day;
    var month = date.getMonth() + 1;
    if(month<=9)
        month = '0' + month;
    var fullyear = date.getFullYear();
    

    if(dateType === 'filename')
        return fullyear.toString() + month.toString() + day.toString() ;
    else if (dateType === 'footer'){
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var year = date.getYear() - 100;
        return month.toString() + "/" + day.toString() + "/" + year.toString() + " " + hours.toString()+ ":" + minutes.toString()+ ":" + seconds.toString()
    }
}

export const downloadExcel = (columns, arrayOfObjects, name="exported_doc", ignore=[]) => {
    try{
      const col_names = columns.map(c => c.exportColumn ? c.exportColumn : c.field)
        const temp_array = JSON.parse(JSON.stringify(arrayOfObjects))
        const newData = temp_array?.map(row=>{
            delete row.tableData
            ignore.map(x => {
              delete row[x]
            })
            
            Object.keys(row).forEach(prop => {
              if(!col_names.includes(prop) || prop.includes('updated_by'))
                delete row[prop]
            })
            return row
          })
          const workSheet=XLSX.utils.json_to_sheet(newData)
          const workBook=XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(workBook,workSheet,"Sheet 1")
          //Buffer
          let buf = XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
          //Binary string
          XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
          const report_date = generateReportDate('filename')
          //Download
          XLSX.writeFile(workBook,`${name} ${report_date}.xlsx`)
    }catch(err){
        console.log(err)
    }
}

export const downloadEquipmentPdf=(columns, equipment_array, table={})=>{
    const { viewType } = table
    /* Create new jsPDF() object */
    const doc = new jsPDF({orientation:"landscape"})
    //Title can go here
    doc.setFontSize(12)
    doc.text("Equipment Report",15,10)
    doc.setFontSize(8)
    doc.text("Generated on " + generateReportDate('footer'),240,200)

    if(viewType === 'extended'){

        /* Remove extraneous columns using filter */
        let printColumns = columns.filter(col => 
            col.field !== "updated_by_full_name" && col.field !== "employee_id" && col.field !== "hra_last_name" && col.field !== "employee_last_name" && col.field !== "model" && col.field !== "status_date"
            )
    
        /* Rename column titles using map function */
        printColumns.map(col => 
                {
                    if(col.field =="acquisition_date")
                        col.title = "Acq. Date"
                    if(col.field =="acquisition_price")
                        col.title = "Acq. Price"
                    if(col.field == "item_type")
                        col.title = "Description"
                    if(col.field =="employee_id")
                        col.title = "EmployeeID"
                    if(col.field =="hra_num")
                        col.title = "HRA #"
                    if(col.field =="hra_first_name"){
                        col.field = "hraLetterName" 			// note field column is renamed for letter name
                        col.title = "HRA Name"}
                    if(col.field =="employee_first_name"){
                        col.field = "employeeFullName" 			// note field column is renamed for full employee name
                        col.title = "Employee"}
                    if(col.field =="manufacturer"){
                        col.field = "mfgrModel"					
                        col.title = "Mft/Model"}
                    if(col.field =="bar_tag_num")
                        col.title = "Bar Tag"
                    if(col.field =="catalog_num")
                        col.title = "Catalog Num."
                    if(col.field =="serial_num")
                        col.title = "Serial Num."
                    if(col.field =="status")
                        col.title = "Status"
                    if(col.field =="employee_office_location_name")
                        col.title = "Emp Office Loc"
                }
            );

        var printEquipments = equipment_array.map(function(x) {
            let hraLetter = x["hra_first_name"] ? x["hra_first_name"].charAt(0) + ". " : ""

            let firstName = x.employee_first_name ? x.employee_first_name + " " : ""
            let lastName = x.employee_last_name ? x.employee_last_name : ""
            let employeeFullName = firstName.charAt(0) + ". " + lastName

            let mfgr = x.manufacturer ? x.manufacturer + " " : ""
            let model = x.model ? x.model : ""
            let mfgrModel = mfgr + model
            let status_date = x.status_date ? ` [${moment(status_date).format("MM/DD/YY hh:mmm:ss")}]` : ""
            let status_and_date = x.status ? `${x.status}${status_date}` : ""

            return { 
                acquisition_date: x.acquisition_date,
                hra_num: x.hra_num,
                hraLetterName: hraLetter + x["hra_last_name"],
                item_type: x.item_type,
                bar_tag_num: x.bar_tag_num,
                employee_id: x.employee_id,
                employeeFullName: employeeFullName,
                acquisition_price:x.acquisition_price,
                catalog_num: x.catalog_num,
                serial_num: x.serial_num,
                mfgrModel: mfgrModel,
                condition:x. condition_name,
                status: status_and_date,
                employee_office_location_name: x.employee_office_location_name ? x.employee_office_location_name : ""
            }; 
        });

        /* Format data, such as dates or currency */
        printEquipments.map(row => {
            const dateOptions = {day:'2-digit',month:'2-digit',year:'2-digit'}
            row.acquisition_date = new Date(row.acquisition_date).toLocaleDateString('en-EN',dateOptions)
            row.acquisition_price = (Math.round(row.acquisition_price * 100) / 100).toFixed(2);
        })

        /* Generate autoTable with custom column widths */
        doc.autoTable({
            columns:printColumns.map(col=>({...col,dataKey:col.field})),
            body:printEquipments,
            styles: {fontSize: 7},
            columnStyles:{        // Set fixed width for columns
                0: {cellWidth: 14},
                1: {cellWidth: 11},
                2: {cellWidth: 24},
                3: {cellWidth: 32},
                4: {cellWidth: 13},
                5: {cellWidth: 20},
                6: {cellWidth: 25},
                7: {cellWidth: 25},
                8: {cellWidth: 18},
                9: {cellWidth: 18},
                10: {cellWidth:18}
               // 11: {cellWidth: 14}
               
            }
        }
        )

        /* Output .pdf file */
        doc.save('EquipmentReport' + generateReportDate('filename') + '.pdf')  
        return;
    }

    /* Generate autoTable with custom column widths */
    doc.autoTable({
        columns:columns.map(col=>{
          console.log(col)
          if(col.print_title){
            return {...col, title: col.print_title, dataKey:col.field}
          }
          return {...col,dataKey:col.field}
        }
          
          ),
        body:equipment_array,
        styles: {fontSize: 9}
    }
    )

    /* Output .pdf file */
    doc.save('EquipmentReport' + generateReportDate('filename') + '.pdf')
}

export const downloadPdf = (columns, dataArray, viewType) => {
    try{
        const data = JSON.parse(JSON.stringify(dataArray))
        const doc = new jsPDF({orientation:"landscape"})
        const cols = JSON.parse(JSON.stringify(columns)).map(col=>({...col,dataKey: col.exportColumn ? col.exportColumn : col.field}))
        doc.setFontSize(12)
        doc.text("Report",15,10)
        doc.setFontSize(8)
        doc.text("Generated on " + generateReportDate('footer'),240,200)
        doc.autoTable({
        columns: filter(cols,(col) => !col.dataKey.includes('updated_by')),
        body:data,
        styles: { fontSize: 9 }
        })
    
        doc.save('report' + generateReportDate('filename') + '.pdf')
    }catch(err){
        console.log(err)
    }
}

export const printElements = (elements) => {
    let str = ""
    for (let i = 0; i < elements.length; i++) {
      str = str + (i ? ', ' : '') + elements[i]
    }
    return str
  }

export function convertToLabel(inputString) {
    // replace any underscores with spaces
    let convertedString = inputString.replace(/_/g, ' ');
    
    // add a space before each uppercase letter
    convertedString = convertedString.replace(/([A-Z])/g, ' $1');
    
    // capitalize the first letter of each word
    convertedString = convertedString.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
    
    return convertedString;
  }

  export const CustomDatePicker = (props) => {
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
  
  export const CustomFilterTextField = (props) => {
    const [text, setText] = useState("");
    //const [showNulls, setShowNulls] = useState(false);
    const handleClearClick = () => {
      props.onFilterChanged(props.columnDef.tableData.id, undefined);
      setText("");
    };

    // const handleNullsClicks = () => {
    //   setShowNulls(prev => !prev)
    // }

    // useEffect(() => {
    //   if(showNulls){
    //     props.onFilterChanged(props.columnDef.tableData.id, '%BLANKS%');
    //   }else{
    //     props.onFilterChanged(props.columnDef.tableData.id, undefined);
    //   }

    //   setText("");
    // },[showNulls])
  
    return (
      <TextField
        variant="standard"
        value={text}
        //value={!showNulls ? text : ''}
        //disabled={showNulls}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* <IconButton onClick={handleNullsClicks}> */}
                <FilterListIcon/>
              {/* </IconButton> */}
            </InputAdornment>
          ),
          endAdornment: <IconButton title="Clear" fontSize="small" sx={{ visibility: text ? "visible" : "hidden" }} onClick={handleClearClick}><ClearIcon fontSize="small" /></IconButton>
        }}
        style={{ width: '100%' }}
        onChange={(event) => {
          setText(event.target.value);
          props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
        }}
      />
  
    );
  };