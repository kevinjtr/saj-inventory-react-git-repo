import { useState, useEffect } from 'react';
import 'date-fns';
import { LoadingCircle } from '../tools/tools';
import MaterialTable from '@material-table/core'
import { changeHistoryIcons } from '../material-table/config'
import { ALERT} from '../tools/tools';
import { updateChangeHistoryByViewApi, getChangeHistoryByViewApi } from '../../publics/actions/change-history-api'
import { connect } from 'redux-bundler-react';
import { Computer as ComputerIcon, Person as PersonIcon, SupervisorAccount as SupervisorAccountIcon } from '@mui/icons-material';
import { Tabs, Tab, Alert, AppBar } from '@mui/material/';
import { TabPanel, a11yProps, tabClasses } from '../styles/mui';

const DEFAULT_CHANGES_VIEW = 'equipment'
const DB_ID_NAME = {equipment:'id', hra:'hra_num', employee:'id'}
// const ALERT = {
// 	SUCCESS: {success:{active:true,text:'Data was undo successful.'},error:{active:false,text:''}},
// 	FAIL: {success:{active:false,text:''},error:{active:true,text:'Could not undo data.'}},
// 	RESET: {success:{active:false,text:''},error:{active:false,text:''}},
// }

function ChangeHistory({history, userToken}) {
	//constant declarations
	const changeHistoryTabs = {0: {id:'equipment', label:'Equipment History'}, 1: {id:'employee', label:'Employee History'}, 2: {id:'hra', label:'HRA History'}}

	//Hooks Declarations
	const [alertUser, setAlertUser] = useState(ALERT.RESET);
	const [loading, setLoading] = useState({init:true,refresh:{
		0: false,
		1: false,
		2: false,
	  }});
	const [changeHistory, setChangeHistory] = useState({
		0: [],
		1: [],
		2: [],
	  });
	const [editable,setEditable] = useState({
	  0:false,
	  1:false,
	  2:false,
	})
	const [tabs, setTabs] = useState(0);
	const [serverDown, setServerDown] = useState(false);

	//Event Handlers.
	const handleUndo = async (rowData) => {
	let result = {error:true}

	await updateChangeHistoryByViewApi[changeHistoryTabs[tabs].id](rowData, userToken)
		.then((response) => response.data).then((data) => {
			result = data
		}).catch(function (error) {
		});

		return(result)
	}

	const handleTabChange = (event, newValue) => {
		setTabs(newValue);
	};
	
	const AlertUser = (x) => {

		if(x.error.active){
			return(<Alert variant="filled" severity="error">{x.error.text}</Alert>)
		}else if(x.success.active){
			return(<Alert variant="filled" severity="success">{x.success.text}</Alert>)
		}
	
		setAlertUser(ALERT.RESET)
		return(null)
	}

	//Functions.
	const TabsChangeHistory = () => {
		return (
		  <div className={tabClasses.root}>
			<AppBar position="static" color="default">
			  <Tabs value={tabs} onChange={handleTabChange} aria-label="simple tabs example" textColor="primary" centered indicatorColor="primary"> 
				<Tab label={changeHistoryTabs[0].label.toUpperCase()} icon={<ComputerIcon/>} {...a11yProps(0)} />
				<Tab label={changeHistoryTabs[1].label.toUpperCase()} icon={<PersonIcon/>} {...a11yProps(1)} />
				<Tab label={changeHistoryTabs[2].label.toUpperCase()} icon={<SupervisorAccountIcon/>} {...a11yProps(2)}/>  
			  </Tabs>
			</AppBar>
			<TabPanel value={tabs} index={0}>
			  <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[0] ? LoadingCircle() : null} </div>
			  {!loading.init ? materialTableSelect(0) : null}
			</TabPanel>
			<TabPanel value={tabs} index={1}>
			  <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[1] ? LoadingCircle() : null} </div>
			  {!loading.init ? materialTableSelect(1) : null}
			</TabPanel>
			<TabPanel value={tabs} index={2}>
			  <div style={{textAlign: 'center',position:'relative'}}> {loading.init || loading.refresh[2] ? LoadingCircle() : null} </div>
			  {!loading.init ? materialTableSelect(2) : null}
			</TabPanel>
		  </div>
		);
	  }

	const materialTableSelect = (tab_idx) => {

		if(changeHistory[tab_idx].length > 0){
			const cols = Object.keys(changeHistory[tab_idx][0])
			let columns = []
			//considering move to a config file.
			let cols_config = 
			{
				0: 	[//equipment
					{ title: 'Updated Date', field: 'updated_date', editable: 'never', type:'date'},
					{ title: 'HRA Number', field: 'hra_num', type:'numeric',editable: 'never'},
					{ title: 'HRA First', field: 'hra_first_name',editable: 'never' },
					{ title: 'HRA Last', field: 'hra_last_name',editable: 'never' },
					{ title: 'HRA Employee ID', field: 'hra_employee_id',editable: 'never' },
					{ title: 'Item Type', field: 'item_type', editable: 'never'},
					{ title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric', editable: 'never'},
					{ title: 'Employee ID', field: 'employee_id', type:'numeric', editable: 'never'},
					{ title: 'Employee First', field: 'employee_first_name', editable: 'never' },
					{ title: 'Employee Last', field: 'employee_last_name', editable: 'never'  },
					{ title:'Acquisition Date',field:'acquisition_date',  type: 'date', editable: 'never' },
					{ title:'Acquisition Price',field:'acquisition_price',type: 'numeric', editable: 'never' },
					{ title:'Catalog Num',field:'catalog_num', editable: 'never'},
					{ title:'Serial Num',field:'serial_num', editable: 'never' },
					{ title:'Manufacturer',field:'manufacturer', editable: 'never'},
					{ title:'Model',field:'model', editable: 'never'},
					{ title:'Condition',field:'condition', editable: 'never'},
					{ title: 'Deleted', field: 'deleted', editable: 'never', type:'boolean'},
					{title:'Updated By',field:'updated_by_full_name',editable:'never' }
				],
				1: [//employee
					{ title: 'Updated Date', field: 'updated_date', editable: 'never', type:'date'},
					{ title: 'ID', field: 'id', editable: 'never'},
					{ title: 'First Name', field: 'first_name', editable: 'never' },
					{ title: 'Last name', field: 'last_name', editable: 'never' },
					{ title: 'Title', field: 'title', editable: 'never' },
					{ title: 'Office Symbol ID', field: 'office_symbol',type:'numeric', editable: 'never'},
					{ title: 'Office Symbol Alias',field:'office_symbol_alias',editable: 'never'},
					{ title: 'Work Phone', field: 'work_phone',type:'numeric', editable: 'never'},
					{ title: 'Equipment Quantity',field:'employee_equipment_count',editable: 'never'},
					{ title: 'Deleted', field: 'deleted', editable: 'never', type:'boolean'},
					{title:'Updated By',field:'updated_by_full_name',editable:'never' }
				],
				2: [//hra
					{ title: 'Updated Date', field: 'updated_date', editable: 'never', type:'date'},
					{ title: 'HRA Number', field: 'hra_num', editable: 'never', type:'numeric'},
					{ title: 'Employee ID', field: 'hra_employee_id',type:'numeric', editable: 'never'},
					{ title: 'Employee First Name', field: 'hra_first_name',editable: 'never' },
					{ title: 'Employee Last name', field: 'hra_last_name',editable: 'never' },
					{ title: 'Title', field: 'hra_title',editable: 'never' },
					{ title: 'Office Symbol', field: 'hra_office_symbol_alias',editable: 'never' },
					{ title: 'Work Phone', field: 'hra_work_phone',editable: 'never' },
					{ title: 'Equipment Quantity', field: 'hra_equipment_count',editable: 'never'},
					{ title: 'Deleted', field: 'deleted', editable: 'never', type:'boolean'},
					{title:'Updated By',field:'updated_by_full_name',editable:'never' }
				],
				3: [//eng4900
					//{ title: 'Item No.', field: 'hra_num', type:'numeric', editable:'never'},
					{ title: 'Requested Action', field: 'requested_action',editable: 'never'},
					{ title: 'Losing HRA Num', field: 'losing_hra_num',editable: 'never' },
					{ title: 'Losing HRA First', field: 'losing_hra_first_name',editable: 'never' },
					{ title: 'Losing HRA Last', field: 'losing_hra_last_name',editable: 'never' },
					{ title: 'Gaining HRA Num', field: 'gaining_hra_num',editable: 'never' },
					{ title: 'Gaining HRA First', field: 'gaining_hra_first_name',editable: 'never' },
					{ title: 'Gaining HRA Last', field: 'gaining_hra_last_name',editable: 'never' },
					{ title: 'Date Created', field: 'date_created',editable: 'never' },
					{ title: 'Serial Number', field: 'serial_num',editable: 'never' },
					{ title: 'Folder Link', field: 'folder_link',editable: 'never',type:'date' },
					{ title: 'Equipment Group ID', field: 'equipment_group_id',editable: 'never'},
					{ title: 'Expiration Date', field: 'expiration_date',editable: 'never'},
					{title:'Updated By',field:'updated_by_full_name',editable:'never' }
				  ]
		}
		
		for(const col_config of cols_config[tab_idx]){
			if(cols.includes(col_config.field)) columns.push(col_config)
		}

		return(
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
				icons={changeHistoryIcons}
				localization={{
					toolbar: {
						searchPlaceholder: "Filter"
					},
					body: {
						editRow: {
							deleteText: 'Are you sure you want to revert back to this data?',saveTooltip:"Yes",cancelTooltip:"No"
						},
						deleteTooltip : "Undo" 
					}
				}}
				columns={columns}
				data={changeHistory[tab_idx]}
				options={{
					headerStyle: {
					backgroundColor: "#969696",
					color: "#FFF",
					fontWeight: 'bold',
				}
				}}
				title=""
				{...(editable[tab_idx] && {editable:{
					onRowDelete: async (oldData) => {
						setAlertUser(ALERT.RESET)
						let result = await handleUndo({changes:{'0':{newData:oldData, oldData:{ [DB_ID_NAME[tab_idx]] : oldData[DB_ID_NAME[tab_idx]] }}},undo:true})
							return (new Promise((resolve, reject) => {
								setTimeout(() => {

									if(!result.error){
										setAlertUser(ALERT.SUCCESS)
										resolve()
										return;
									}

									setAlertUser(ALERT.FAIL())
									reject()

								}, 1000);
							}))
						}
				}})}
				/>
			</div>
		)
		}

		return(<p>No Changes Found.</p>)
	}

	//render variables
	const displayTop = (
		<div style={{textAlign: 'center'}}>
		  <h2>Change History</h2>     
		</div>
	)
    
	//Effects.
	useEffect(() => {
	console.log('change-history call')
	setLoading({...loading,init:true})

	getChangeHistoryByViewApi({tab:null,init:true}, userToken)
		.then((response) => response.data).then((data) => {
		console.log(data)

		if(Object.keys(data.editable).length > 0){
			setEditable(data.editable)
		}
	
		if(data.status == 200){
		setChangeHistory(data.data)
		}

		setLoading({...loading,init:false})

	}).catch(function (error) {
		setServerDown(true)
		setLoading({...loading,init:false})
	});
	}, []);

	//Render return.
	return (
	    <div>
      	{displayTop}
      	{alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
      	{loading.init ? <div style={{textAlign:'center'}}>{LoadingCircle()}</div> : null}
		{!loading.init && !serverDown ? TabsChangeHistory() : null}
    	</div>
	);
}

export default connect(
	'selectUserToken',
	ChangeHistory);  