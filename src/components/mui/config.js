import React, {forwardRef} from 'react';
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
import {TextField} from '@material-ui/core'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style= { {color:"#32CD32"} }/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{color:'#e04436'}}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} style= { {color:"#1E90FF"} }/>),
    Filter:forwardRef((props, ref) => <FilterList fontSize="small" color="disabled" {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    View: forwardRef((props, ref) => <VisibilityIcon {...props} ref={ref} />),
    Pdf: forwardRef((props, ref) => <PictureAsPdfIcon {...props} ref={ref} />),
    Update: forwardRef((props, ref) => <UpdateIcon {...props} ref={ref} />),
    Lock: forwardRef((props, ref) => <LockIcon {...props} ref={ref} />),
    Unlock: forwardRef((props, ref) => <LockOpenIcon {...props} ref={ref} />),
    EditOutlined: forwardRef((props, ref) => <EditOutlinedIcon {...props} ref={ref} />),
    Publish: forwardRef((props, ref) => <PublishIcon {...props} ref={ref} />),
    Send: forwardRef((props, ref) => <SendIcon {...props} ref={ref} />),
  };



export const form4900Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style= { {color:"#32CD32"} }/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{color:'#e04436'}}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//     Edit: forwardRef((props, ref) =>   <div style={{position: 'relative'}}>
//     <Edit  {...props} ref={ref} style={{position: 'absolute', width: 20, height: 20}}/>
//     <a style={{fontSize:5, position:'absolute'}}>Status</a>
// </div>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} style= { {color:"#1E90FF"} }/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    View: forwardRef((props, ref) => <VisibilityIcon {...props} ref={ref} />),
    Pdf: forwardRef((props, ref) => <PictureAsPdfIcon {...props} ref={ref} />),
    Update: forwardRef((props, ref) => <UpdateIcon {...props} ref={ref} />),
    Lock: forwardRef((props, ref) => <LockIcon {...props} ref={ref} />),
    Unlock: forwardRef((props, ref) => <LockOpenIcon {...props} ref={ref} />),
    EditOutlined: forwardRef((props, ref) => <EditOutlinedIcon {...props} ref={ref} />),
    Assignment: forwardRef((props, ref) => <AssignmentIcon {...props} ref={ref} />),
    Publish: forwardRef((props, ref) => <PublishIcon {...props} ref={ref} />),
    Send: forwardRef((props, ref) => <SendIcon {...props} ref={ref} />),
}

export const changeHistoryIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style= { {color:"#32CD32"} }/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <UndoIcon {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} style= { {color:"#1E90FF"} }/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}