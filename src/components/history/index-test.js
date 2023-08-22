//import  HistoryTable  from './history-table'
import api from '../../axios/Api';
import { useState } from 'react'
import {Popover, Tooltip, IconButton} from '@mui/material';
EventNoteIcon

function FetchChangeHistory( {userToken, table_name, id}) {
    const [open, setOpen] = useState(false)

    const fetchHistory = () => {
        api.get(`change-history/${table_name}/${id}`,{},{headers:{auth:userToken}}).then((response) => response.data).then((data) => {
            console.log(JSON.stringify(data.data[0]))
            //setData(data.data)
            //setOpen(true)
            }).catch(function (error) {
                //setOpen(false)
                //setData([])
            });
    }

    return (
        <Tooltip title="View Change History">
            <IconButton onClick={fetchHistory}>
                <EventNoteIcon aria-label="View History"  />
            </IconButton>
        </Tooltip>
    )
    
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

export default FetchChangeHistory

// export default connect(
//     "selectUserToken",
//     HistoryIconComponent
// );


// WORK IN PROGRESS:

// SELECT
//     e.ID,
//     h.UPDATED_DATE AS change_date,
//     CASE WHEN e.bar_tag_num != h.bar_tag_num THEN h.bar_tag_num ELSE NULL END AS old_bar_tag_num,
//     CASE WHEN e.catalog_num != h.catalog_num THEN h.catalog_num ELSE NULL END AS old_catalog_num,
//     CASE WHEN e.manufacturer != h.manufacturer THEN h.manufacturer ELSE NULL END AS old_manufacturer,
//     CASE WHEN e.model != h.model THEN h.model ELSE NULL END AS old_model,
//     CASE WHEN e.condition != h.condition THEN h.condition ELSE NULL END AS old_condition,
//     CASE WHEN e.serial_num != h.serial_num THEN h.serial_num ELSE NULL END AS old_serial_num,
//     CASE WHEN e.acquisition_date != h.acquisition_date THEN h.acquisition_date ELSE NULL END AS old_acquisition_date,
//     CASE WHEN e.acquisition_price != h.acquisition_price THEN h.acquisition_price ELSE NULL END AS old_acquisition_price,
//     CASE WHEN e.item_type != h.item_type THEN h.item_type ELSE NULL END AS old_item_type,
//     CASE WHEN e.hra_num != h.hra_num THEN h.hra_num ELSE NULL END AS old_hra_num,
//     CASE WHEN e.user_employee_id != h.user_employee_id THEN h.user_employee_id ELSE NULL END AS old_user_employee_id,
// --    CASE WHEN e.status != h.status THEN h.status ELSE NULL END AS old_status,
// --    CASE WHEN e.status_date != h.status_date THEN h.status_date ELSE NULL END AS old_status_date,
//     CASE WHEN e.updated_by != h.updated_by THEN h.updated_by ELSE NULL END AS old_updated_by,
    
//     h.bar_tag_num AS new_bar_tag_num,
//     h.catalog_num AS new_catalog_num,
//     h.manufacturer AS new_manufacturer,
//     h.model AS new_model,
//     h.condition AS new_condition,
//     h.serial_num AS new_serial_num,
//     h.acquisition_date AS new_acquisition_date,
//     h.acquisition_price AS new_acquisition_price,
//     h.item_type AS new_item_type,
//     h.hra_num AS new_hra_num,
//     h.user_employee_id AS new_user_employee_id,
// --    h.status AS new_status,
// --    h.status_date AS new_status_date,
//     h.updated_by AS new_updated_by,
//     /* Repeat the above pattern for each column you want to compare */
//     h.UPDATED_DATE
// FROM
//     EQUIPMENT e
// JOIN
//     EQUIPMENT_HISTORY h ON e.ID = h.ID
// WHERE
//     e.bar_tag_num = 65381
//     AND (
//         e.bar_tag_num != h.bar_tag_num OR
//         e.catalog_num != h.catalog_num OR
//         e.manufacturer != h.manufacturer OR
//         e.model != h.model OR
//         e.condition != h.condition OR
//         e.serial_num != h.serial_num OR
//         e.acquisition_date != h.acquisition_date OR
//         e.acquisition_price != h.acquisition_price OR
//         e.item_type != h.item_type OR
//         e.hra_num != h.hra_num OR
//         e.user_employee_id != h.user_employee_id OR
// --        e.status != h.status OR
// --        e.status_date != h.status_date OR
//         e.updated_by != h.updated_by
        
//         /* OR
//         Repeat the above pattern for each column you want to compare */
//     )
// ORDER BY
//     h.UPDATED_DATE DESC;