import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from 'material-table'
import {tableIcons} from '../material-table/config'
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

  //Hooks Declarations
  const [loading, setLoading] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [hras, setHras] = React.useState([]);

  //Event Handlers.
  const handleTableUpdate = (rowData) => {

    //console.log('equipmentbyHraCall')
    //setLoading(true)
      api.post(`hra/update`,{params:rowData}).then((response) => response.data).then((data) => {
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
      api.post(`hra/destroy`,{params:rowData}).then((response) => response.data).then((data) => {
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
  api.post(`hra/add`,{params:rowData}).then((response) => response.data).then((data) => {
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

  //Functions.

  const LoadingCircle = () => {
    return (
        <CircularProgress />
    );
  }

  const materialTableSelect = () => {

    let columns = [
      { title: 'Hra Number', field: 'hra_num',editable: 'onAdd'},
      { title: 'Employee ID', field: 'employee_id',type:'numeric',
      editComponent: x => {
        console.log(x);
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
          onChange ={e => {

            const id_ = e.target.textContent ? Number(e.target.textContent.split(' - ')[0]) : null
            console.log(id_);
            x.onChange(id_)
          }}
          //style={{ verticalAlign: 'top' }}
          renderInput={(params) => <TextField {...params} label="Employee" margin="normal"/>}
        />
        )
      }
    },
      { title: 'Employee First Name', field: 'first_name',editable: 'never' },
      { title: 'Employee Last name', field: 'last_name',editable: 'never' },
      { title: 'Title', field: 'title',editable: 'never' },
      { title: 'Office Symbol', field: 'office_symbol_alias',editable: 'never' },
      { title: 'Work Phone', field: 'work_phone',editable: 'never' }]

    return(
      <div style={{ maxWidth: '100%' }}>
          <MaterialTable
          icons={tableIcons}
            columns={columns}
            data={hras}
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
                          //setHras([...hras, newData]);
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
                          setHras([...hras, newData]);
      
                          resolve();
                      }, 1000);
                  }),
              onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
                          const dataUpdate = [...hras];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          setHras([...dataUpdate]);
      
                          resolve();
                      }, 1000);
                  }),
              onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          handleTableDelete({changes:{'0':{newData:null, oldData:oldData}}})
                          const dataDelete = [...hras];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          setHras([...dataDelete]);
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
    console.log('HraCall')
    setLoading(true)
      api.get(`hra`).then((response) => response.data).then((data) => {
        console.log(data)
        setLoading(false)
        setHras(data.status != 400 ? data.data : data)
        // this.setState({
        // 	equipments: data.status != 400 ? data.values: data,
        // 	setequipment: data
        // });
        //console.log(this.state.equipment.values);
        // console.log(this.props, this.state);
      }).catch(function (error) {
        setLoading(false)
        setHras([])
      });

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


  }, []);

  //Render return.
  return (
    <div>
        <div style={{textAlign: 'center'}}>
            <h2 >Hra</h2>
        </div>
        <div style={{textAlign: 'center'}}>
            {loading ? LoadingCircle() : null}
            {hras.length > 0 ? materialTableSelect() : null}
        </div>
    </div>
  );
}
