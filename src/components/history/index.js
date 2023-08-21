//import  HistoryTable  from './history-table'
import api from '../../axios/Api';
import { useState } from 'react'
import Popover from '@mui/material/Popover';

export default function FetchChangeHistory( userToken, table_name, id) {
    //const [open, setOpen] = useState(false)
    //const [data, setData] = useState([])
    //let popOver = null

    api.get(`change-history/${table_name}/${id}`,{},{headers:{auth:userToken}}).then((response) => response.data).then((data) => {
        console.log(data.data)
        //setData(data.data)
        //setOpen(true)
        }).catch(function (error) {
            //setOpen(false)
            //setData([])
        });
    const handleClose = () => {
        //setOpen(false)
    }
    
    // if(open) {
    //     popOver =(<Popover
    //         id={id}
    //         open={open}
    //         //anchorEl={anchorEl}
    //         onClose={handleClose}
    //         anchorOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //             }}
    //             transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'left',
    //             }}
    //     >
    //         <HistoryTable data={data} table_name={table_name}/>
    //     </Popover>  )
    // }
}

// export default connect(
//     "selectUserToken",
//     HistoryIconComponent
// );