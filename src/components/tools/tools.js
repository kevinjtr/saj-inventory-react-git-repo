import React from 'react'
import {CircularProgress} from '@mui/material/';
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
  const newData = arrayOfObjects.map(row=>{
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
}

export const downloadPdf = (columns, equipment_array, viewType) => {
    const doc = new jsPDF({orientation:"landscape"})
    doc.setFontSize(12)
    doc.text("Equipment Report",15,10)
    doc.setFontSize(8)
    doc.text("Generated on " + generateReportDate('footer'),240,200)
    doc.autoTable({
    columns:columns.map(col=>({...col,dataKey:col.field})),
    body:equipment_array,
    styles: { fontSize: 9 }
    })

    doc.save('EquipmentReport' + generateReportDate('filename') + '.pdf')
}