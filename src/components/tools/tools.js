import {CircularProgress} from '@mui/material/';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import React, { useState } from 'react';
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

export const downloadExcel = (arrayOfObjects, name="exported_doc", ignore=[]) => {
    try{
        const temp_array = JSON.parse(JSON.stringify(arrayOfObjects))
        const newData = temp_array?.map(row=>{
            delete row.tableData
            ignore.map(x => {
              delete row[x]
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

export const downloadPdf = (columns, dataArray, viewType) => {
    try{
        const cols = JSON.parse(JSON.stringify(columns))
        const data = JSON.parse(JSON.stringify(dataArray))
        const doc = new jsPDF({orientation:"landscape"})
        doc.setFontSize(12)
        doc.text("Report",15,10)
        doc.setFontSize(8)
        doc.text("Generated on " + generateReportDate('footer'),240,200)
        doc.autoTable({
        columns:cols.map(col=>({...col,dataKey:col.field})),
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
  
    const handleClearClick = () => {
      props.onFilterChanged(props.columnDef.tableData.id, "");
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
        style={{ width: '100%' }}
        onChange={(event) => {
          setText(event.target.value);
          props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
        }}
  
      />
  
    );
  };