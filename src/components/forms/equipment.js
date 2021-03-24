import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from 'material-table'
import {tableIcons} from '../material-table/config'
import FormControl from '@material-ui/core/FormControl';
import {Autocomplete,Alert} from '@material-ui/lab';
import api from '../../axios/Api';
import orderBy from 'lodash/orderBy'
import findIndex from 'lodash/findIndex'

const texFieldStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  options: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      textAlign: 'center',
    },
  },
}));

const gridStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    options: {
        flexGrow: 1,
        textAlign: 'center',
      },
  }));

const itemMenuStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
  
  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };
  
  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };


export default function FormPropsTextFields(props) {
  
  //React Hooks Declarations.
  const [loading, setLoading] = React.useState(false);
  const [alertUser,setAlertUser] = React.useState({success:{active:false,text:''},error:{active:false,text:''}});
  const [equipments, setEquipments] = React.useState([]);
  const [hras, setHras] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [hraName, setHraName] = React.useState('');
  const [hraNum, sethraNum] = React.useState('');
  const [employeeName, setEmployeeName] = React.useState('');
  const [itemType, setItemType] = React.useState('');
  const [bartagNum, setBartagNum] = React.useState('');
  const [includes_, setIncludes] = React.useState({
    hraName:"includes",
    hraNum:"includes",
    itemType:"includes",
    bartagNum:"includes",
    employeeName:"includes"
  });
  const [blanks_, setBlanks] = React.useState({
    hraName:"includeBlanks",
    hraNum:"includeBlanks",
    itemType:"includeBlanks",
    bartagNum:"includeBlanks",
    employeeName:"includeBlanks"
  });

  
  // Style Declarations.
  const classesTextField = texFieldStyles();
  const classesItemMenu = itemMenuStyles();
  const classesGrid = gridStyles();

  //Event Handlers.
  const handleHraNameChange = (event) => {
    setHraName(event.target.value);
    if(event.target.value == ''){
      setIncludes({...includes_,  [event.target.name]: 'includes'})
    }
  };

  const handlehraNumChange = (event) => {
    sethraNum(event.target.value);
    if(event.target.value == ''){
      setIncludes({...includes_,  [event.target.name]: 'includes'})
    }
  };

  const handleEmployeeNameChange = (event) => {
    setEmployeeName(event.target.value);
    if(event.target.value == ''){
      setIncludes({...includes_,  [event.target.name]: 'includes'})
    }
  };

  const handleItemTypeChange = (event) => {
    setItemType(event.target.value);
    if(event.target.value == ''){
      setIncludes({...includes_,  [event.target.name]: 'includes'})
    }
  };

  const handleBartagNumChange = (event) => {
    setBartagNum(event.target.value);
    if(event.target.value == ''){
      setIncludes({...includes_,  [event.target.name]: 'includes'})
    }
  };

  const handleIncludes = (event) => {
    setIncludes({...includes_,  [event.target.name]: event.target.value})
  };

  const handleBlanks = (event) => {
    console.log(event.target)
    //console.log(event.target.name,(event.target.value == "Includes" ? true : false))
    setBlanks({...blanks_,  [event.target.name]: event.target.value})
  };

  const handleSearch = () => {

  console.log('equipmentbyHraCall')
  setLoading(true)
  setAlertUser({success:{active:false,text:''},error:{active:false,text:''}})
    api.post(`equipment/search`,{
      'fields':{hraNum:hraNum,
      bartagNum:bartagNum,
      hraName:hraName,
      employeeName:employeeName,
      itemType:itemType},
      'options':{'includes':includes_,'blanks':blanks_}

    }).then((response) => response.data).then((data) => {
      console.log(data)
      setLoading(false)
      setEquipments(data.status != 400 ? data.data : data)
      // this.setState({
      // 	equipments: data.status != 400 ? data.values: data,
      // 	setequipment: data
      // });
      //console.log(this.state.equipment.values);
      // console.log(this.props, this.state);
    }).catch(function (error) {
      setLoading(false)
      setEquipments([])
    });
    

  // const tempProps = {...props};
  //  const searchResult = await tempProps.getEquipmentByhraNum(hraNum)
  //  if(!searchResult.error){
  //   equipments = searchResult.data
  //  }
  }

  const handleUpdate = async (rowData) => {

    let result = {}
  console.log('equipmentbyHraCall')
  //setLoading(true)
    await api.post(`equipment/update`,{params:rowData}).then((response) => response.data).then((data) => {
      result = data.columnErrors
      //setLoading(false)
      //setEquipments(data.status != 400 ? data.data : data)
      // this.setState({
      // 	equipments: data.status != 400 ? data.values: data,
      // 	setequipment: data
      // });
      //console.log(this.state.equipment.values);
      // console.log(this.props, this.state);
    }).catch(function (error) {
      //setLoading(false)
      //setEquipments([])
    });

    return(result)
  }

  const handleDelete = (rowData) => {

  //console.log('equipmentbyHraCall')
  //setLoading(true)
    api.post(`equipment/destroy`,{params:rowData}).then((response) => response.data).then((data) => {
      console.log(data)
      //setLoading(false)
      //setEquipments(data.status != 400 ? data.data : data)
      // this.setState({
      // 	equipments: data.status != 400 ? data.values: data,
      // 	setequipment: data
      // });
      //console.log(this.state.equipment.values);
      // console.log(this.props, this.state);
    }).catch(function (error) {
      //setLoading(false)
      //setEquipments([])
    });
    
  }

  const handleAdd = (rowData) => {

  //console.log('equipmentbyHraCall')
  //setLoading(true)
    api.post(`equipment/add`,{params:rowData}).then((response) => response.data).then((data) => {
      console.log(data)
      //setLoading(false)
      //setEquipments(data.status != 400 ? data.data : data)
      // this.setState({
      // 	equipments: data.status != 400 ? data.values: data,
      // 	setequipment: data
      // });
      //console.log(this.state.equipment.values);
      // console.log(this.props, this.state);
    }).catch(function (error) {
      //setLoading(false)
      //setEquipments([])
    });
    
  }


  //Functions.
  const LoadingCircle = () => {
  return (
    <CircularProgress />
  );
  }

  const SearchCriteriaOptions = (val,text="Options") => {
  return (
  <FormControl variant="outlined" className={classesItemMenu.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">{text}</InputLabel>
                      <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={includes_[val] ? includes_[val] : null}
                      name={val}
                      onChange={handleIncludes}
                      label="Sort By"
                      >
                      <MenuItem value={"includes"}>Includes</MenuItem>
                      <MenuItem value={"excludes"}>Excludes</MenuItem>
                      <MenuItem value={"equals"}>Equals</MenuItem>
                      <MenuItem value={"notEquals"}>Not Equals</MenuItem>
                      </Select>
                  </FormControl>
  );
  }

  const SearchBlanksOptions = (val,text="Blanks Options") => {
    return (
    <FormControl variant="outlined" className={classesItemMenu.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">{text}</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={blanks_[val] ? blanks_[val] : null}
                        name={val}
                        onChange={handleBlanks}
                        //label="Sort By"
                        style={{width:200}}
                        >
                        <MenuItem value={"includeBlanks"}>Include Blanks</MenuItem>
                        <MenuItem value={"excludeBlanks"}>Exclude Blanks</MenuItem>
                        <MenuItem value={"onlyBlanks"}>Only Blanks</MenuItem>
                        
                        </Select>
                    </FormControl>
    );
    }

  const AlertUser = (x) => {
    
    if(x.error.active){
      return(<Alert variant="filled" severity="error">{x.error.text}</Alert>)
    }else if(x.success.active){
      return(<Alert variant="filled" severity="success">Sucessfully added data to database!</Alert>)
    }

    setAlertUser({success:{active:false,text:''},error:{active:false,text:''}})
    return(null)
  }

  const materialTableSelect = () => {
  const type = "simple"

  const dataIsOnDatabase = {
    bar_tag_num:false
  }

  let columns = [
    //{ title: 'HRA Name', field: 'hra_full_name',col_id:2,hidden:isEditingTable },
    { title: 'HRA Number', field: 'hra_num', type:'numeric', col_id:2.0,
    editComponent: x => {
      //console.log(x);
      let idx = -1

      if(x.rowData.hra_num){
        idx = findIndex(hras,function(e){ return (e.hra_num && (e.hra_num == x.rowData.hra_num)); })
      }

      return(
        <Autocomplete
        //onChange={e => x.onChange(e)}
        id={`combo-box-employee`}
        size="small"
        options={hras}
        getOptionLabel={(option) => option.hra_num + ' - ' + option.first_name + ' ' + option.last_name}
        value={idx != -1 ? hras[idx] : null}
        //defaultValue={idx != -1 ? employees[idx] : null}
        onChange ={e => {
          const hraNum_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
          console.log(hraNum_);
          x.onChange(hraNum_)
        }}
        //style={{ verticalAlign: 'top' }}
        renderInput={(params) => <TextField {...params} label="HRA" margin="normal"/>}
      />
      )
    }
  },
    { title: 'HRA First', field: 'hra_first_name',col_id:2.1,editable: 'never' },
    { title: 'HRA Last', field: 'hra_last_name',col_id:2.2,editable: 'never' },
    { title: 'Item Type', field: 'item_type',col_id:4  },
    { title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric',col_id:5, validate: rowData => {
      if(rowData.bar_tag_num.toString().length > 5){
        return({ isValid: false, helperText: 'bar tag digits length cannot exceed 5.' })
      }else if(dataIsOnDatabase.bar_tag_num){
        dataIsOnDatabase.bar_tag_num = false
        return({ isValid: false, helperText: 'bar tag exists in database.' })
      }
      
      return(true)
    }},
    { title: 'Employee ID', field: 'employee_id', type:'numeric',col_id:6.0,
    editComponent: x => {
      //console.log(x);
      let idx = -1

      if(x.rowData.employee_id){
        idx = findIndex(employees,function(e){ return (e.id && (e.id == x.rowData.employee_id)); })
      }

      return(
        <Autocomplete
        //onChange={e => x.onChange(e)}
        id="combo-box-employee"
        size="small"
        options={employees}
        getOptionLabel={(option) => option.id + ' - ' + option.first_name + ' ' + option.last_name}
        value={idx != -1 ? employees[idx] : null}
        //defaultValue={idx != -1 ? employees[idx] : null}
        onChange ={e => {

          const id_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
          console.log(id_);
          x.onChange(id_)
        }}
        //style={{ verticalAlign: 'top' }}
        renderInput={(params) => <TextField {...params} label="Employee" margin="normal"/>}
      />
      )
    }},
    //{ title: 'Employee Holding Equipment', field: 'employee_full_name',col_id:6,hidden:isEditingTable  },
    { title: 'Employee First', field: 'employee_first_name',col_id:6.1 ,editable: 'never' },
    { title: 'Employee Last', field: 'employee_last_name',col_id:6.2,editable: 'never'  }]

  const extended_columns = [
    {title:'acquisition_date',field:'acquisition_date',  type: 'date',col_id:1 },
    {title:'acquisition_price',field:'acquisition_price',type: 'numeric',col_id:7 },
    {title:'catalog_num',field:'catalog_num',col_id:8 },
    {title:'serial_num',field:'serial_num',col_id:9 },
    {title:'manufacturer',field:'manufacturer',col_id:10 },
    {title:'model',field:'model',col_id:11 },
    {title:'condition',field:'condition',col_id:12 }]

  if(type != "simple"){
    columns = [...columns,...extended_columns]
    columns = orderBy(columns,'col_id','asc')
  }

  return(
    <div style={{ maxWidth: '100%',paddingTop:'25px' }}>
        <MaterialTable
        icons={tableIcons}
          columns={columns}
          data={equipments}
          options={{
            exportButton: true,
            exportAllData: true,
            headerStyle: {
              backgroundColor: "#969696",
              color: "#FFF",
              fontWeight: 'bold',
          }
          }}
          title=""
          
          editable={{
            
            // isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
            //isEditHidden: rowData => rowData.name === 'x',
            // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
            // isDeleteHidden: rowData => rowData.name === 'y',
            onBulkUpdate: async (changes) => {
              let errorResult = await handleUpdate({changes:changes})
              let {errorFound} = errorResult
              return(
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                      /* setEquipments([...equipments, newData]); */
                      console.log('bulk update')
                      //console.log(changes)
                      const keys = Object.keys(changes)//0 ,1,2
                      let alert_ = ''

                      for(const key of keys){
                        const {newData,oldData} = changes[key]
                        const errorStatus = errorResult.rows[key]

                        console.log(newData,errorStatus)
                        if(!errorFound){
                          //no error
                          const dataUpdate = [...equipments];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          setEquipments([...dataUpdate]);
                        }else{
                          //error found.
                          console.log('error found')
                          //dataIsOnDatabase[Object.keys(errorStatus)[0]] = true
                          const col_name = Object.keys(errorStatus)[0]
                          const errorText = errorStatus[col_name]
                          alert_ = alert_ + `row ${Number(key)+1}: ${col_name} - ${errorText}\n`
                        }

                        
                        //console.log(errorStatus,newData)
                        //const dataUpdate = [...equipments];
                        //const index = oldData.tableData.id;
                        //dataUpdate[index] = newData;
                        //setEquipments([...dataUpdate]);
                        //resolve();
                      }

                      if(alert_){
                        setAlertUser({success:{active:false,text:''},error:{active:true,text:alert_}})
                        reject();
                      }else{
                        setAlertUser({success:{active:true,text:''},error:{active:false,text:''}})
                        resolve();
                      }
                      //for(const rowid of errorResult){}
                      // if(Object.keys(errorResult).length > 0){
                      //   console.log(errorResult)
                      //   dataIsOnDatabase[Object.keys(errorResult)[0]] = true
                      //   reject();
                      // }else{
                      //   for(const {newData,oldData} of changes){
                      //     const dataUpdate = [...equipments];
                      //     const index = oldData.tableData.id;
                      //     dataUpdate[index] = newData;
                      //     setEquipments([...dataUpdate]);
                      //     resolve();
                      //   }
                      // }
                  }, 1000);
              }))
            },
            onRowAddCancelled: rowData => console.log('Row adding cancelled'),
            onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
            onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        handleAdd({changes:{'0':{newData:newData, oldData:null}}})
                        setEquipments([...equipments, newData]);
                        resolve();
                    }, 1000);
                }),
            onRowUpdate: async (newData, oldData) => {
              let errorResult = await handleUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
                  return (new Promise((resolve, reject) => {
                    setTimeout(() => {
                      
                      if(errorResult.errorFound){
                        const col_name = Object.keys(errorResult.rows[0])[0]
                        dataIsOnDatabase[col_name] = true
                        reject();
                      }else{
                        const dataUpdate = [...equipments];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setEquipments([...dataUpdate]);
                        resolve();
                      }
                    }, 1000);
                }))
              }
                
                ,
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                      handleDelete({changes:{'0':{newData:null, oldData:oldData}}})
                        const dataDelete = [...equipments];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
                        setEquipments([...dataDelete]);
                        resolve();
                    }, 1000);
                })
        }}
        />
  </div>
  )
  }

  //will run once.
  React.useEffect(() => {
    //setLoading(true)

    console.log('employeeCall')
    api.get(`employee`,{}).then((response) => response.data).then((data) => {
        console.log(data)
      // setLoading(false)
        setEmployees(data.status != 400 ? data.data : data)
        // this.setState({
        // 	equipments: data.status != 400 ? data.values: data,
        // 	setequipment: data
        // });
        //console.log(this.state.equipment.values);
        // console.log(this.props, this.state);
      }).catch(function (error) {
        //setLoading(false)
        setEmployees([])
      });

    console.log('hraCall')
    api.get(`hra`,{}).then((response) => response.data).then((data) => {
        console.log(data)
        //setLoading(false)
        setHras(data.status != 400 ? data.data : data)
        // this.setState({
        // 	equipments: data.status != 400 ? data.values: data,
        // 	setequipment: data
        // });
        //console.log(this.state.equipment.values);
        // console.log(this.props, this.state);
      }).catch(function (error) {
        //setLoading(false)
        setHras([])
      });

      console.log('equipmentCall')
    //setLoading(true)
    api.get(`equipment`,{}).then((response) => response.data).then((data) => {
        console.log(data)
        //setLoading(false)
        setEquipments(data.status != 400 ? data.data : data)
        // this.setState({
        // 	equipments: data.status != 400 ? data.values: data,
        // 	setequipment: data
        // });
        //console.log(this.state.equipment.values);
        // console.log(this.props, this.state);
      }).catch(function (error) {
        //setLoading(false)
        setEquipments([])
      });
      
    //setLoading(false)
  }, []);

  //Render return.
  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <h2 >Equipment</h2>
      </div>
      <div style={{textAlign: 'center'}}>
        <form className={classesTextField.root} noValidate autoComplete="off">
            <div className={classesGrid.options}>
                <Grid container spacing={3}>
                    {/* <Grid item xs={12}> */}
                      <Grid item xs={Math.floor(12/5)}>
                        <TextField id="outlined-search-hraName" name="hraName" label="Search by HRA Name" type="search" variant="outlined" value={hraName} onChange={handleHraNameChange}/>
                        {hraName ? <><br/>{SearchCriteriaOptions("hraName","HRA Name Options")}</> : null}
                        <br/>
                        {SearchBlanksOptions("hraName","HRA Name Blanks Options")}
                      </Grid>

                      <Grid item xs={Math.floor(12/5)}>
                        <TextField id="outlined-search-hraNum" name="hraNum" label="Search by HRA Number" type="search" variant="outlined" value={hraNum} onChange={handlehraNumChange}/>
                        {hraNum ? <><br/> {SearchCriteriaOptions("hraNum","HRA Number Options")}</> : null}
                        <br/>
                        {SearchBlanksOptions("hraNum","HRA Number Blanks Options")}
                      </Grid>

                      <Grid item xs={Math.floor(12/5)}>
                        <TextField id="outlined-search-itemType" name="itemType" label="Search by Item Description" type="search" variant="outlined" value={itemType} onChange={handleItemTypeChange}/>
                        {itemType ? <><br/>{SearchCriteriaOptions("itemType","Item Description Options")}</> : null}
                        <br/>
                        {SearchBlanksOptions("itemType","Item Description Blanks Options")}
                      </Grid>

                      <Grid item xs={Math.floor(12/5)}>
                        <TextField id="outlined-search-bartagNum" name="bartagNum" label="Search by Bar Tag" type="search" variant="outlined" value={bartagNum} onChange={handleBartagNumChange}/>
                        {bartagNum ? <><br/>{SearchCriteriaOptions("bartagNum","Bartag Options")}</>: null}
                        <br/>
                        {SearchBlanksOptions("bartagNum","Bartag Blanks Options")}
                      </Grid>

                      <Grid item xs={Math.floor(12/5)}>
                        <TextField style={{width:250}}id="outlined-search-employeeName" name="employeeName" label="Search by Employee Holder" type="search" variant="outlined" value={employeeName} onChange={handleEmployeeNameChange}/>
                        {employeeName ? <><br/>{SearchCriteriaOptions("employeeName","Employee Holder Options")}</> : null}
                        <br/>
                        {SearchBlanksOptions("employeeName","Employee Holder Blanks Options")} 
                      </Grid>

                      <Grid item xs={Math.floor(12/5)}>
                        <IconButton aria-label="search" color="primary" onClick={handleSearch}>
                          <SearchIcon style={{ fontSize: 40 }}/>
                        </IconButton>
                      </Grid>
                    {/* </Grid> */}

                </Grid>                    
            </div>
        </form>
      </div>
      {alertUser.success.active || alertUser.error.active ? AlertUser(alertUser) : null}
      <div style={{textAlign: 'center'}}>
        {loading ? LoadingCircle() : null}
        {equipments.length > 0 ? materialTableSelect() : null}
      </div>
    </div>
  );
}
