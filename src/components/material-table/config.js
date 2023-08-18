import React from 'react';
import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import UndoIcon from '@mui/icons-material/Undo';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import UpdateIcon from '@mui/icons-material/Update';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PublishIcon from '@mui/icons-material/Publish';
import SendIcon from '@mui/icons-material/Send';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from '@mui/material/'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export const tableIcons = {
    Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} style= { {color:"#32CD32"} }/>),
    Check: React.forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: React.forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{color:'#e04436'}}/>),
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
    Delete: React.forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{color:'#e04436'}}/>),
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