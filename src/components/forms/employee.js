import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import {tableIcons} from '../material-table/config'
import MaterialTable from 'material-table'
import FormControl from '@material-ui/core/FormControl';
import api from '../../axios/Api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import findIndex from 'lodash/findIndex'
  
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
        onValueChange={(phoneNumbers) => {
          onChange({
            target: {
              name: props.name,
              value: phoneNumbers.value,
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

  //Hooks Declarations.
  const [loading, setLoading] = React.useState(false);
  const [officesSymbol, setOfficesSymbol] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [phoneNumbers, setPhoneNumbers] = React.useState({
    textmask: '(   )    -    ',
    numberformat: '1320',
  });

  //Event Handlers.
  const handlePhoneTextFieldChange = (event) => {
    setPhoneNumbers({
      ...phoneNumbers,
      [event.target.name]: event.target.value,
    });
  };

  const handleTableUpdate = (rowData) => {

    //console.log('equipmentbyHraCall')
    //setLoading(true)
      api.post(`employee/update`,{params:rowData}).then((response) => response.data).then((data) => {
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
      
    
    // const tempProps = {...props};
    //  const searchResult = await tempProps.getEquipmentByHraID(hraId)
    //  if(!searchResult.error){
    //   equipments = searchResult.data
    //  }
   }
   
  const handleTableDelete = (rowData) => {
  
    //console.log('equipmentbyHraCall')
    //setLoading(true)
      api.post(`employee/destroy`,{params:rowData}).then((response) => response.data).then((data) => {
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
      
    
    // const tempProps = {...props};
    //  const searchResult = await tempProps.getEquipmentByHraID(hraId)
    //  if(!searchResult.error){
    //   equipments = searchResult.data
    //  }
   }
  
  const handleTableAdd = (rowData) => {
  
    //console.log('equipmentbyHraCall')
    //setLoading(true)
  api.post(`employee/add`,{params:rowData}).then((response) => response.data).then((data) => {
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
      
    
    // const tempProps = {...props};
    //  const searchResult = await tempProps.getEquipmentByHraID(hraId)
    //  if(!searchResult.error){
    //   equipments = searchResult.data
    //  }
   }

  //Styles Declarations

  //Functions Declarations.
  const LoadingCircle = () => {
    return (
        <CircularProgress />
    );
  }

  const materialTableSelect = () => {

    let columns = [
      { title: 'ID', field: 'id',editable: 'never'},
      { title: 'First Name', field: 'first_name' },
      { title: 'Last name', field: 'last_name' },
      { title: 'Title', field: 'title' },
      { title: 'Office Symbol ID', field: 'office_symbol',type:'numeric',
      editComponent: x => {
        //const table_id = x.rowData.tableData.id
        console.log(x);
        let idx = -1

        if(x.rowData.office_symbol){
          idx = findIndex(officesSymbol,function(o){ return (o.id && (o.id == x.rowData.office_symbol)); })
        }

        return(
          <Autocomplete
          //onChange={e => x.onChange(e)}
          id={`combo-box-employee-`}
          size="small"
          options={officesSymbol}
          getOptionLabel={(option) => option.id + ' - ' + option.alias}
          value={idx != -1 ? officesSymbol[idx] : null}
          onChange ={e => {

            const id_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
            console.log(id_);
            x.onChange(id_)
          }}
          //style={{ verticalAlign: 'top' }}
          renderInput={(params) => <TextField {...params} label="Office Symbol" margin="normal"/>}
        />
        )
      }
    },
    {title: 'Office Symbol Alias',field:'office_symbol_alias',editable: 'never'},
    { title: 'Work Phone', field: 'work_phone',type:'numeric',validate: rowData => {
      if(rowData.work_phone){
        return(rowData.work_phone.toString().length > 10 ? { isValid: false, helperText: 'phone number digits exceed 10.' } : true)
      }
      return(true)
  },
        // editComponent: x => {
        //   console.log(x.rowData)
        // let idx = -1

        // if(x.rowData.id){
        //   idx = findIndex(employees,function(e){ return (e.id && (e.id == x.rowData.id));})
        // }

        // return(
        //   <FormControl>
        //     <InputLabel htmlFor="formatted-text-mask-input">Work Phone Number</InputLabel>
        //     <Input 
        //       style={{ height: 40,width:300 }}
        //       //value={values.textmaskghr}
        //       value={idx != -1 ? employees[idx].work_phone : '(   )    -    '}
        //       //onChange={handlePhoneTextFieldChange}
        //       name={`workphone-${x.rowData.tableData.id}`}
        //       id={`workphone-input-${x.rowData.tableData.id}`}
        //       key={`workphone-input-${x.rowData.tableData.id}`}
        //       inputComponent={TextMaskCustom}
        //       onChange ={e => {
        //         console.log(e.currentTarget)
        //         //console.log(employees[idx].work_phone)
        //         // const dataUpdate = [...employees];
        //         // const index = x.rowData.id;
        //         // dataUpdate[index] = newData;
        //         // setEmployees([...dataUpdate]);
        //        // x.onChange(phone)
        //       }}/>
        //   </FormControl>
        // )}
    }]

    return(
      <div style={{ maxWidth: '100%' }}>
          <MaterialTable
          icons={tableIcons}
            columns={columns}
            data={employees}
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
              
              //isEditable: rowData => rowData.field !== 'id', // only name(a) rows would be editable
              //isEditHidden: rowData => rowData.name === 'x',
              // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
              // isDeleteHidden: rowData => rowData.name === 'y',
              onBulkUpdate: changes => 
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          //setEmployees([...employees, newData]);
                          console.log('bulk update')
                          handleTableUpdate({changes:changes})
                          resolve();
                      }, 1000);
                  }),
              onRowAddCancelled: rowData => console.log('Row adding cancelled'),
              onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
              onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
                          setEmployees([...employees, newData]);
      
                          resolve();
                      }, 1000);
                  }),
              onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
                          const dataUpdate = [...employees];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          setEmployees([...dataUpdate]);
      
                          resolve();
                      }, 1000);
                  }),
              onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          handleTableDelete({changes:{'0':{newData:null, oldData:oldData}}})
                          const dataDelete = [...employees];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          setEmployees([...dataDelete]);
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
    console.log('employeeCall')
    setLoading(true)
      api.get(`employee`).then((response) => response.data).then((data) => {
        console.log(data)
        setLoading(false)
        setEmployees(data.status != 400 ? data.data : data)
        // this.setState({
        // 	equipments: data.status != 400 ? data.values: data,
        // 	setequipment: data
        // });
        //console.log(this.state.equipment.values);
        // console.log(this.props, this.state);
      }).catch(function (error) {
        setLoading(false)
        setEmployees([])
      });

      console.log('officeSymbolCall')
    api.get(`officesymbol`,{}).then((response) => response.data).then((data) => {
        console.log(data)
      // setLoading(false)
      setOfficesSymbol(data.status != 400 ? data.data : data)
        // this.setState({
        // 	equipments: data.status != 400 ? data.values: data,
        // 	setequipment: data
        // });
        //console.log(this.state.equipment.values);
        // console.log(this.props, this.state);
      }).catch(function (error) {
        //setLoading(false)
        setOfficesSymbol([])
      });


  }, []);


  //Render return.
    return (
      <div>
          <div style={{textAlign: 'center'}}>
              <h2 >Employee</h2>
          </div>
          <div style={{textAlign: 'center'}}>
              {loading ? LoadingCircle() : null}
              {employees.length > 0 ? materialTableSelect() : null}
          </div>
      </div>
    );
  }
