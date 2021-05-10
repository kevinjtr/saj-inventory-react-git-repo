import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import {LoadingCircle} from '../tools/tools';
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
  const handleTableUpdate = async (rowData) => {

    //console.log('equipmentbyHraCall')
    //setLoading(true)
      await api.post(`hra/update`,{params:rowData}).then((response) => response.data).then((data) => {
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
   
   const handleTableDelete = async (rowData) => {
  
    //console.log('equipmentbyHraCall')
    //setLoading(true)
      await api.post(`hra/destroy`,{params:rowData}).then((response) => response.data).then((data) => {
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
  
   const handleTableAdd = async (rowData) => {
  
    //console.log('equipmentbyHraCall')
    //setLoading(true)
   await api.post(`hra/add`,{params:rowData}).then((response) => response.data).then((data) => {
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
  const materialTableSelect = () => {

    const cols = Object.keys(hras[0])
    let columns = []
    //considering move to a config file.
    let hras_cols_config = [
      { title: 'Hra Number', field: 'hra_num', editable: 'onAdd', type:'numeric', validate: rowData => {
        // try{
        //    if(rowData.hra_num){
        //     if(rowData.hra_num.toString().length > 3){
        //       return ({ isValid: false, helperText: 'HRA digits exceed 3.' })
        //     }else if( findIndex(hras,h => h.hra_num == rowData.hra_num) != -1 ){
        //       return ({ isValid: false, helperText: 'Duplicated HRA num.' })
        //     }
        //   }else{
        //     return ({ isValid: false, helperText: 'HRA number is required.' })
        //   }
        // }catch(err){
        //   //do nothing
        // }
          return(true)
        }},
      { title: 'Employee ID', field: 'hra_employee_id',type:'numeric',
      editComponent: x => {
        console.log(x);
        let idx = -1

        if(x.rowData.hra_employee_id){
          idx = findIndex(employees,function(e){ return (e.id && (e.id == x.rowData.hra_employee_id)); })
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
      }},
      { title: 'Employee First Name', field: 'hra_employee_id',editable: 'never' },
      { title: 'Employee Last name', field: 'hra_last_name',editable: 'never' },
      { title: 'Title', field: 'hra_title',editable: 'never' },
      { title: 'Office Symbol', field: 'hra_office_symbol_alias',editable: 'never' },
      { title: 'Work Phone', field: 'hra_work_phone',editable: 'never' },
      { title: 'Equipment Quantity', field: 'hra_equipment_count',editable: 'never'}
    ]

    for(const col_config of hras_cols_config){
      if(cols.includes(col_config.field)) columns.push(col_config)
    }

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
              onBulkUpdate: async (changes) => {
                await handleTableUpdate({changes:changes})
                  new Promise((resolve, reject) => {
                    
                      setTimeout(() => {
                          //setHras([...hras, newData]);
                          //console.log('bulk update')
                          
                          resetHras()
                          resolve();
                      }, 1000);
                  })
                },
              onRowAddCancelled: rowData => console.log('Row adding cancelled'),
              onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
              onRowAdd: async (newData) =>{
                await handleTableAdd({changes:{'0':{newData:newData, oldData:null}}})
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          //setHras([...hras, newData]);
                          resetHras()
                          resolve();
                      }, 1000);
                  })
                },
              onRowUpdate: async(newData, oldData) =>{
                await handleTableUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          
                          //const dataUpdate = [...hras];
                          //const index = oldData.tableData.id;
                          //dataUpdate[index] = newData;
                          resetHras()
                          //setHras([...dataUpdate]);
      
                          resolve();
                      }, 1000);
                  })
                },
              onRowDelete: async (oldData) =>{
                await handleTableDelete({changes:{'0':{newData:null, oldData:oldData}}})
                  new Promise((resolve, reject) => {
                      setTimeout(() => {
                          const dataDelete = [...hras];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          setHras([...dataDelete]);
                          resolve();
                      }, 1000);
                  })
                }
          }}
          />
      </div>
    )
  }

  const resetHras = () => {
    api.get(`hra`).then((response) => response.data).then((data) => {
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
        console.log(data.data)
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
