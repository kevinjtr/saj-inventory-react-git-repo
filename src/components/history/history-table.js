import MaterialTable from '@material-table/core'
import { changeHistoryIcons } from '../material-table/config'
import moment from 'moment'

let cols_config = {
    equipment: [//equipment
        { title: 'Updated Date', field: 'updated_date', editable: 'never', type: 'date',render: rowData => {
            if(rowData.updated_date){
              return <a>{moment(rowData.updated_date).format("MM/DD/YY HH:mm:ss")}</a>
            }
            return <a></a>
        }, defaultSort: 'desc',},
        { title: 'Updated By', field: 'updated_by_full_name', editable: 'never', sorting: false },
        { title: 'HRA Number', field: 'hra_num', type: 'numeric', editable: 'never', sorting: false },
        { title: 'HRA First', field: 'hra_first_name', editable: 'never', sorting: false },
        { title: 'HRA Last', field: 'hra_last_name', editable: 'never', sorting: false },
        { title: 'HRA Employee ID', field: 'hra_employee_id', editable: 'never', sorting: false },
        { title: 'Item Type', field: 'item_type', editable: 'never', sorting: false },
        { title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric', editable: 'never', sorting: false },
        { title: 'Employee ID', field: 'employee_id', type: 'numeric', editable: 'never', sorting: false },
        { title: 'Employee First', field: 'employee_first_name', editable: 'never', sorting: false },
        { title: 'Employee Last', field: 'employee_last_name', editable: 'never', sorting: false },
        { title: 'Acquisition Date', field: 'acquisition_date', type: 'date', editable: 'never', sorting: false },
        { title: 'Acquisition Price', field: 'acquisition_price', type: 'numeric', editable: 'never', sorting: false },
        { title: 'Catalog Num', field: 'catalog_num', editable: 'never', sorting: false },
        { title: 'Serial Num', field: 'serial_num', editable: 'never', sorting: false },
        { title: 'Manufacturer', field: 'manufacturer', editable: 'never', sorting: false },
        { title: 'Model', field: 'model', editable: 'never', sorting: false },
        { title: 'Condition', field: 'condition', editable: 'never', sorting: false },
        { title: 'Deleted', field: 'deleted', editable: 'never', sorting: false, type: 'boolean' },
    ],
    employee: [//employee
        { title: 'Updated Date', field: 'updated_date', editable: 'never', type: 'date', render: rowData => {
            if(rowData.updated_date){
              return <a>{moment(rowData.updated_date).format("MM/DD/YY HH:mm:ss")}</a>
            }
            return <a></a>
        }, defaultSort: 'desc'},
        { title: 'Updated By', field: 'updated_by_full_name', editable: 'never', sorting: false },
        { title: 'ID', field: 'id', editable: 'never', sorting: false },
        { title: 'First Name', field: 'first_name', editable: 'never', sorting: false },
        { title: 'Last name', field: 'last_name', editable: 'never', sorting: false },
        { title: 'Title', field: 'title', editable: 'never', sorting: false },
        { title: 'Office Symbol ID', field: 'office_symbol', type: 'numeric', editable: 'never', sorting: false },
        { title: 'Office Symbol Alias', field: 'office_symbol_alias', editable: 'never', sorting: false },
        { title: 'Work Phone', field: 'work_phone', type: 'numeric', editable: 'never', sorting: false },
        { title: 'Equipment Quantity', field: 'employee_equipment_count', editable: 'never', sorting: false },
        { title: 'Deleted', field: 'deleted', editable: 'never', sorting: false, type: 'boolean' },
    ],
    hra: [//hra
        { title: 'Updated Date', field: 'updated_date', editable: 'never', type: 'date', render: rowData => {
            if(rowData.updated_date){
              return <a>{moment(rowData.updated_date).format("MM/DD/YY HH:mm:ss")}</a>
            }
            return <a></a>
        },defaultSort: 'desc' },
        { title: 'Updated By', field: 'updated_by_full_name', editable: 'never', sorting: false },
        { title: 'HRA Number', field: 'hra_num', editable: 'never', sorting: false, type: 'numeric' },
        { title: 'Employee ID', field: 'hra_employee_id', type: 'numeric', editable: 'never', sorting: false },
        { title: 'HRA Full Name', field: 'hra_full_name', editable: 'never', sorting: false },
    ],
    
    // bar_tags: printElements(form_groups[id].map(x => x.bar_tag_num)),
    // document_source: document_source,
    // form_id: form_id,
    // gaining_hra: gaining_hra_num ? `${gaining_hra_num} - ${gaining_hra_full_name}` : '',
    // losing_hra: losing_hra_num ? `${losing_hra_num} - ${losing_hra_full_name}` : '',
    // status: status,
    // originator: originator,
    // is_losing_hra: is_losing_hra,
    // is_gaining_hra: is_gaining_hra,
    // requested_action: requested_action,
    // status_alias: status_alias,
    // updated_date: updated_date,
    
    eng4900: [//eng4900
        //{ title: 'Item No.', field: 'hra_num', type:'numeric', editable:'never'},
        { title: 'Requested Action', field: 'requested_action', editable: 'never', sorting: false },
        { title: 'Losing HRA Num', field: 'losing_hra_num', editable: 'never', sorting: false },
        { title: 'Losing HRA First', field: 'losing_hra_first_name', editable: 'never', sorting: false },
        { title: 'Losing HRA Last', field: 'losing_hra_last_name', editable: 'never', sorting: false },
        { title: 'Gaining HRA Num', field: 'gaining_hra_num', editable: 'never', sorting: false },
        { title: 'Gaining HRA First', field: 'gaining_hra_first_name', editable: 'never', sorting: false },
        { title: 'Gaining HRA Last', field: 'gaining_hra_last_name', editable: 'never', sorting: false },
        { title: 'Date Created', field: 'date_created', editable: 'never', sorting: false },
        { title: 'Serial Number', field: 'serial_num', editable: 'never', sorting: false },
        { title: 'Folder Link', field: 'folder_link', editable: 'never', sorting: false, type: 'date' },
        { title: 'Equipment Group ID', field: 'equipment_group_id', editable: 'never', sorting: false },
        { title: 'Expiration Date', field: 'expiration_date', editable: 'never', sorting: false },
        { title: 'Updated By', field: 'updated_by_full_name', editable: 'never', sorting: false }
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