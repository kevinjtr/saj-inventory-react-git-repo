import React from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import UndoIcon from '@material-ui/icons/Undo';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import UpdateIcon from '@material-ui/icons/Update';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PublishIcon from '@material-ui/icons/Publish';
import SendIcon from '@material-ui/icons/Send';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SearchIcon from '@material-ui/icons/Search';
import {TextField} from '@material-ui/core'

export const tableIcons = {
    Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} style= { {color:"#32CD32"} }/>),
    Check: React.forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: React.forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{color:'#FF0000'}}/>),
    DetailPanel: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: React.forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: React.forwardRef((props, ref) => <SaveAlt {...props} ref={ref} style= { {color:"#1E90FF"} }/>),
    Filter:React.forwardRef((props, ref) => <SearchIcon fontSize="small" color="disabled" {...props} ref={ref} />),
    FirstPage: React.forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: React.forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: React.forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: React.forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: React.forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: React.forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: React.forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    View: React.forwardRef((props, ref) => <VisibilityIcon {...props} ref={ref} />),
    Pdf: React.forwardRef((props, ref) => <PictureAsPdfIcon {...props} ref={ref} />),
    Update: React.forwardRef((props, ref) => <UpdateIcon {...props} ref={ref} />),
    Lock: React.forwardRef((props, ref) => <LockIcon {...props} ref={ref} />),
    Unlock: React.forwardRef((props, ref) => <LockOpenIcon {...props} ref={ref} />),
    EditOutlined: React.forwardRef((props, ref) => <EditOutlinedIcon {...props} ref={ref} />),
    Publish: React.forwardRef((props, ref) => <PublishIcon {...props} ref={ref} />),
    Send: React.forwardRef((props, ref) => <SendIcon {...props} ref={ref} />),
  };



export const form4900Icons = {
  Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} style= { {color:"#32CD32"} }/>),
    Check: React.forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: React.forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{color:'#FF0000'}}/>),
    DetailPanel: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: React.forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//     Edit: React.forwardRef((props, ref) =>   <div style={{position: 'relative'}}>
//     <Edit  {...props} ref={ref} style={{position: 'absolute', width: 20, height: 20}}/>
//     <a style={{fontSize:5, position:'absolute'}}>Status</a>
// </div>),
    Export: React.forwardRef((props, ref) => <SaveAlt {...props} ref={ref} style= { {color:"#1E90FF"} }/>),
    Filter: React.forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: React.forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: React.forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: React.forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: React.forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: React.forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: React.forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: React.forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    View: React.forwardRef((props, ref) => <VisibilityIcon {...props} ref={ref} />),
    Pdf: React.forwardRef((props, ref) => <PictureAsPdfIcon {...props} ref={ref} />),
    Update: React.forwardRef((props, ref) => <UpdateIcon {...props} ref={ref} />),
    Lock: React.forwardRef((props, ref) => <LockIcon {...props} ref={ref} />),
    Unlock: React.forwardRef((props, ref) => <LockOpenIcon {...props} ref={ref} />),
    EditOutlined: React.forwardRef((props, ref) => <EditOutlinedIcon {...props} ref={ref} />),
    Assignment: React.forwardRef((props, ref) => <AssignmentIcon {...props} ref={ref} />),
    Publish: React.forwardRef((props, ref) => <PublishIcon {...props} ref={ref} />),
    Send: React.forwardRef((props, ref) => <SendIcon {...props} ref={ref} />),
}

export const changeHistoryIcons = {
  Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} style= { {color:"#32CD32"} }/>),
    Check: React.forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: React.forwardRef((props, ref) => <UndoIcon {...props} ref={ref}/>),
    DetailPanel: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: React.forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: React.forwardRef((props, ref) => <SaveAlt {...props} ref={ref} style= { {color:"#1E90FF"} }/>),
    Filter: React.forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: React.forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: React.forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: React.forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: React.forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: React.forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: React.forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: React.forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}