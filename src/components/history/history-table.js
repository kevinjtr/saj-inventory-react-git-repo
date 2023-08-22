import MaterialTable from '@material-table/core'
import { changeHistoryIcons } from '../material-table/config'

let cols_config = {
    equipment: [//equipment
        { title: 'Updated Date', field: 'updated_date', editable: 'never', type: 'date' },
        { title: 'HRA Number', field: 'hra_num', type: 'numeric', editable: 'never' },
        { title: 'HRA First', field: 'hra_first_name', editable: 'never' },
        { title: 'HRA Last', field: 'hra_last_name', editable: 'never' },
        { title: 'HRA Employee ID', field: 'hra_employee_id', editable: 'never' },
        { title: 'Item Type', field: 'item_type', editable: 'never' },
        { title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric', editable: 'never' },
        { title: 'Employee ID', field: 'employee_id', type: 'numeric', editable: 'never' },
        { title: 'Employee First', field: 'employee_first_name', editable: 'never' },
        { title: 'Employee Last', field: 'employee_last_name', editable: 'never' },
        { title: 'Acquisition Date', field: 'acquisition_date', type: 'date', editable: 'never' },
        { title: 'Acquisition Price', field: 'acquisition_price', type: 'numeric', editable: 'never' },
        { title: 'Catalog Num', field: 'catalog_num', editable: 'never' },
        { title: 'Serial Num', field: 'serial_num', editable: 'never' },
        { title: 'Manufacturer', field: 'manufacturer', editable: 'never' },
        { title: 'Model', field: 'model', editable: 'never' },
        { title: 'Condition', field: 'condition', editable: 'never' },
        { title: 'Deleted', field: 'deleted', editable: 'never', type: 'boolean' },
        { title: 'Updated By', field: 'updated_by_full_name', editable: 'never' }
    ],
    employee: [//employee
        { title: 'Updated Date', field: 'updated_date', editable: 'never', type: 'date' },
        { title: 'ID', field: 'id', editable: 'never' },
        { title: 'First Name', field: 'first_name', editable: 'never' },
        { title: 'Last name', field: 'last_name', editable: 'never' },
        { title: 'Title', field: 'title', editable: 'never' },
        { title: 'Office Symbol ID', field: 'office_symbol', type: 'numeric', editable: 'never' },
        { title: 'Office Symbol Alias', field: 'office_symbol_alias', editable: 'never' },
        { title: 'Work Phone', field: 'work_phone', type: 'numeric', editable: 'never' },
        { title: 'Equipment Quantity', field: 'employee_equipment_count', editable: 'never' },
        { title: 'Deleted', field: 'deleted', editable: 'never', type: 'boolean' },
        { title: 'Updated By', field: 'updated_by_full_name', editable: 'never' }
    ],
    hra: [//hra
        { title: 'Updated Date', field: 'updated_date', editable: 'never', type: 'date' },
        { title: 'HRA Number', field: 'hra_num', editable: 'never', type: 'numeric' },
        { title: 'Employee ID', field: 'hra_employee_id', type: 'numeric', editable: 'never' },
        { title: 'Employee First Name', field: 'hra_first_name', editable: 'never' },
        { title: 'Employee Last name', field: 'hra_last_name', editable: 'never' },
        { title: 'Title', field: 'hra_title', editable: 'never' },
        { title: 'Office Symbol', field: 'hra_office_symbol_alias', editable: 'never' },
        { title: 'Work Phone', field: 'hra_work_phone', editable: 'never' },
        { title: 'Equipment Quantity', field: 'hra_equipment_count', editable: 'never' },
        { title: 'Deleted', field: 'deleted', editable: 'never', type: 'boolean' },
        { title: 'Updated By', field: 'updated_by_full_name', editable: 'never' }
    ],
    eng4900: [//eng4900
        //{ title: 'Item No.', field: 'hra_num', type:'numeric', editable:'never'},
        { title: 'Requested Action', field: 'requested_action', editable: 'never' },
        { title: 'Losing HRA Num', field: 'losing_hra_num', editable: 'never' },
        { title: 'Losing HRA First', field: 'losing_hra_first_name', editable: 'never' },
        { title: 'Losing HRA Last', field: 'losing_hra_last_name', editable: 'never' },
        { title: 'Gaining HRA Num', field: 'gaining_hra_num', editable: 'never' },
        { title: 'Gaining HRA First', field: 'gaining_hra_first_name', editable: 'never' },
        { title: 'Gaining HRA Last', field: 'gaining_hra_last_name', editable: 'never' },
        { title: 'Date Created', field: 'date_created', editable: 'never' },
        { title: 'Serial Number', field: 'serial_num', editable: 'never' },
        { title: 'Folder Link', field: 'folder_link', editable: 'never', type: 'date' },
        { title: 'Equipment Group ID', field: 'equipment_group_id', editable: 'never' },
        { title: 'Expiration Date', field: 'expiration_date', editable: 'never' },
        { title: 'Updated By', field: 'updated_by_full_name', editable: 'never' }
    ]
}

export default function HistoryTable  ({ history, componentName }) {

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                icons={changeHistoryIcons}
                localization={{
                    toolbar: {
                        searchPlaceholder: "Filter"
                    },
                    body: {
                        editRow: {
                            deleteText: 'Are you sure you want to revert back to this data?', saveTooltip: "Yes", cancelTooltip: "No"
                        },
                        deleteTooltip: "Undo"
                    }
                }}
                columns={cols_config[componentName]}
                data={history}
                options={{
                    headerStyle: {
                        backgroundColor: "#969696",
                        color: "#FFF",
                        fontWeight: 'bold',
                    }
                }}
                title=""
            />
        </div>
    )
}