import React, {useEffect} from 'react';
import { Stack, Box, TextField, FormHelperText, FormControl, Grid, FormControlLabel,
  IconButton, Radio, RadioGroup, FormLabel, Autocomplete, DialogContent, DialogTitle,
  Tooltip } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import { green, grey } from '@mui/material/colors';
import 'date-fns';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MaterialTable from '@material-table/core'
import { tableIcons } from '../../../components/material-table/config'
import { LoadingCircle } from '../../../components/tools/tools'
import { condition } from '../../../components/config/constants'
import { findIndex } from 'lodash'
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import debounce from 'lodash/debounce'
import { addEng4900Api, getEng4900ByIdApi } from '../../../publics/actions/eng4900-api'
import { connect } from 'redux-bundler-react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { find } from "lodash"
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  float:'right'
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
}));

const errorStyles = {
  "& .MuiFormLabel-root.Mui-error": {
    color: "orange !important"
  },
  "& .MuiInput-underline.Mui-error:after": {
    borderBottomColor: "orange !important"
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "orange !important"
  }
}

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ( theme.palette.mode === "dark" ? {
  ...errorStyles
} : null));

const StyledFormControl = styled(FormControl)(({ theme }) => (theme.palette.mode === "dark" ? {
  ...errorStyles
} : null));

const StyledLoadingButton = styled(LoadingButton)(({ theme, active }) => ({
    color: theme.palette.common.white,
    backgroundColor: active ? green[500] : grey[500],
    '&:hover': {
      backgroundColor: active ? green[600]: grey[600],
    },
    height:'50px',
    width:'20%',
    marginTop: '50px',
    marginBottom:'50px'
}));

const RESET_HRA = {
  hra_employee_id: "",
  hra_equipment_count: "",
  hra_first_name: "",
  hra_full_name: "",
  hra_last_name: "",
  hra_num: null,
  hra_office_symbol_alias: "",
  hra_title: "",
  hra_work_phone: ""  
}

const RESET_FORM = {
  formId: "",
  requested_action: null,
  individual_ror_prop: "",
  expiration_date: null,
  expiration_date_print: "",
  //new_equipments: 0,
  temporary_loan: 2,
  hra: {
    losing: RESET_HRA,
    gaining: RESET_HRA,
  },
  equipment_group: []
}

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

function Eng4900Form({formData, formId, action, create4900, setCreate4900, setSelectedRow, type, eng4900s, setEng4900s, tab, hras, userToken}) {
  console.log(hras)
  //Constants Declarations.

  //Variables Declarations.

  //Styles Declarations.
  const theme = useTheme();

  //Hooks Declarations.
  const [loading, setLoading] = React.useState({
    init:false,
    hra:false,
    equipment:false,
    submit:false
  });
  const [submitButton, setSubmitButton] = React.useState({
    active:false,
    send:false,
  });
  const [equipments,setEquipments] = React.useState([])
  const [selectedForm, setSelectedForm] = React.useState(RESET_FORM);
  //const [hras, setHras] = React.useState(RESET_HRAS_HOOK);
  const [editEnabled, setEditEnabled] = React.useState(false);
  //const [condition, setCondition] = React.useState([]);

  const handleCheckBoxChange = (event) => {
    setSelectedForm({ ...selectedForm, temporary_loan: (event.target.checked ? 1 : 2) });
  };

  const handleRequestedActionChange = (event) => {
    setSelectedForm( {...selectedForm,hra: { ...selectedForm.hra, losing: RESET_HRA, gaining: RESET_HRA}, equipment_group: [], requested_action: event.target.value} )
  };

  const handleFormSelect = async () => {
    setLoading({...loading,init:true})

    if(action === "CREATE"){
      setEditEnabled(true)
      setLoading({...loading,init:false})
      //getHrasAndEquipments()
      return;
    }

    if((action === "EDIT" || action === "VIEW") && formId){
      await getEng4900ByIdApi(formId, userToken)
      //await api.get(`${ENG4900}/${formId}`)
      .then((response) => response.data).then(async (data) => {

        if(data.data.status != 1 && action === "EDIT"){
          setEditEnabled(false)
        }

        setSelectedForm(data.status != 400 ? data.data : null)
        setLoading({...loading,init:false})

        if(action === "EDIT" && data.data.status === 1){
          setEditEnabled(true)
          //getHrasAndEquipments()
        }
  
        }).catch(function (error) {
          setLoading({...loading,init:false,hra:false,equipment:false})
          setSelectedForm(RESET_FORM)
          //setEng4900s([])
        });
        return;
    }
  }

  const isDateValid = (date) => {

    if(date){
        return (date instanceof Date && !isNaN(date))
    }
    
    return true
  }

  const handleRorPropChange = (e) => {
    setSelectedForm({...selectedForm,  individual_ror_prop: e.target.value})
  }

  const handleDateChange = (date) => {
    setSelectedForm({...selectedForm,  expiration_date: date})
  }

  const handleGainingHraChange = (event,val) => {
    const new_value = val ? val : RESET_HRA

    if(selectedForm.hra.losing.hra_num && ["FOI","Transfer","Repair"].includes(selectedForm.requested_action)){
      setSelectedForm({...selectedForm,  hra: {...selectedForm.hra, gaining: new_value} })
    }else{
      setSelectedForm({...selectedForm,  hra: {...selectedForm.hra, gaining: new_value}, equipment_group:[] })
    }
      
    return;
  }

  const handleLosingHraChange = (event,val) => {

    if(val){
      setSelectedForm({...selectedForm,  hra: {...selectedForm.hra, losing: val}, equipment_group:[] })
      setEquipments([])

      const idx = findIndex(hras.losing,function(h){ return h.hra_num === val.hra_num})
      if(idx != -1){
        setEquipments(hras.losing[idx].equipments)
      }

      return;
    }

    
    setSelectedForm({...selectedForm,  hra: {...selectedForm.hra, losing: RESET_HRA}, equipment_group:[] })
    setEquipments([])
  }

  const handleHraChange = (event,val) => {
    const hra_type = event.target.id.split('-')[2]

    if(hra_type){
      setSelectedForm({...selectedForm,  hra: {...selectedForm.hra, [hra_type]: val} })
    }
  }

  const submitForm = debounce(async () => {
    if(editEnabled && action == "CREATE"){
      addEng4900Api({form:selectedForm,type:action, tab:tab},userToken)
      .then((response) => response.data).then((data) => {
        if(!data.error){
          setEng4900s({...eng4900s, [tab]: [data.data, ...eng4900s[tab]]})
          resetCreate4900Data()
          toast.success('Action was completed')
        }else{
          toast.error('Could not complete action')
        }
        
        setSubmitButton({...submitButton,send:false})
        setSelectedRow({[tab]:data.data.form_id})
    
      }).catch(function (error) {
        toast.error('Could not complete action')
        setSubmitButton({...submitButton,send:false})
      });

    }else if(editEnabled && action == "EDIT"){

    }
  }, 1000, {maxWait:2000})

  const handleSubmit = async (event) => {
    setSubmitButton({...submitButton,send:true})
    submitForm()
  }

  const resetCreate4900Data = () => {
    setCreate4900({...create4900,show:false,formId:null,formData:null})
    return;
  }

  const form = () => {
        return(
          <>
          <form noValidate autoComplete="off">
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{py: 1.5}}>
                  <Stack spacing={3} direction='row'>
                    {editEnabled ? (
                      <StyledFormControl error={!selectedForm.requested_action} component="fieldset">
                      <FormLabel component="legend">Requested Action:</FormLabel>
                      <RadioGroup row aria-label="position" name="position" value={selectedForm.requested_action} onChange={handleRequestedActionChange}>
                        <FormControlLabel id="radio-issue" key="radio-issue" value="Issue" control={<Radio color="primary" />} label="Issue" />
                        <FormControlLabel id="radio-transfer" key="radio-transfer" value="Transfer" control={<Radio color="primary" />} label="Transfer" />
                        <FormControlLabel id="radio-end" key="radio-end" value="Repair" control={<Radio color="primary" />} label="Repair" />
                        <FormControlLabel id="radio-excess" key="radio-excess" value="Excess" control={<Radio color="primary" />} label="Excess" />
                        <FormControlLabel id="radio-foi" key="radio-foi" value="FOI" control={<Radio color="primary" />} label="FOI" />
                      </RadioGroup>
                      {!selectedForm.requested_action ? <FormHelperText>Selection Required.</FormHelperText> : null}
                    </StyledFormControl>
                    ) : (
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Requested Action:</FormLabel>
                      <RadioGroup row aria-label="position" name="position" value={selectedForm.requested_action}>
                        <FormControlLabel id="radio-issue" key="radio-issue" value="Issue" control={<Radio color="primary" />} label="Issue" />
                        <FormControlLabel id="radio-transfer" key="radio-transfer" value="Transfer" control={<Radio color="primary" />} label="Transfer" />
                        <FormControlLabel id="radio-end" key="radio-end" value="Repair" control={<Radio color="primary" />} label="Repair" />
                        <FormControlLabel id="radio-excess" key="radio-excess" value="Excess" control={<Radio color="primary" />} label="Excess" />
                        <FormControlLabel id="radio-foi" key="radio-foi" value="FOI" control={<Radio color="primary" />} label="FOI" />
                      </RadioGroup>
                    </FormControl>
                    )}

                    {editEnabled ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                          <DemoItem label={'Expiration Date'}>
                            <DatePicker value={selectedForm.expiration_date}/>
                          </DemoItem>
                      </LocalizationProvider>
                      // <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      //   <KeyboardDatePicker
                      //   disableToolbar
                      //   variant="inline"
                      //   format="MM/dd/yyyy"
                      //   margin="normal"
                      //   id="date-picker-inline-expiration-date"
                      //   key="date-picker-inline-expiration-date"
                      //   label="Expiration Date"
                      //   value={selectedForm.expiration_date}
                      //   onChange={handleDateChange}
                      //   KeyboardButtonProps={{
                      //       'aria-label': 'change date',
                      //   }}/>
                      // </MuiPickersUtilsProvider>
                    ) : (
                      <TextField
                      id="date-picker-inline-expiration-date"
                      key="date-picker-inline-expiration-date"
                      label="Expiration Date"
                      name={"expiration_date"}
                      value={selectedForm.expiration_date_print}
                      //onChange={handleFormChange}
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ width: 200 }}/>
                    )}
                  </Stack>
                </Box>
          </Grid>
          {selectedForm.requested_action ? (
            <>
            <Grid item xs={6}>
            {selectedForm.requested_action != "Issue" ? (
              <>
              <p>LOSING HAND RECEIPT HOLDER</p>
              <Stack spacing={3} direction='row' sx={{py:2}}>
              <TextField
                  id="standard-helperText-f-name"
                  key="standard-helperText-f-name"
                  label="2a. First Name"
                  name={"losing_hra_first_name"}
                  //disabled={selectedForm.requested_action == "Issue"}
                  value={selectedForm.hra.losing.hra_first_name}
                  //onChange={handleFormChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ width: 200 }}/>
                <TextField
                  id="standard-helperText-l-name"
                  key="standard-helperText-l-name"
                  label="2a. Last Name"
                  name={"losing_hra_last_name"}
                  //disabled={selectedForm.requested_action == "Issue"}
                  value={selectedForm.hra.losing.hra_last_name}
                  //onChange={handleFormChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ width: 200 }}/>
                <TextField
                  id="standard-helperText-os-alias"
                  key="standard-helperText-os-alias"
                  label="b. Office Symbol"
                  name={"losing_hra_os_alias"}
                  //disabled={selectedForm.requested_action == "Issue"}
                  value={selectedForm.hra.losing.hra_office_symbol_alias}
                  //onChange={handleFormChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ width: 200 }}/>
              </Stack>
              <Stack spacing={3} direction='row' sx={{py:2}}>
              {editEnabled ?
                  <StyledAutocomplete
                    style={{ display:'inline-block' }}
                    id="combo-box-losing"
                    options={hras.losing}
                    loading={loading.hra}
                    getOptionLabel={(option) => {
                      const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
                      return `${option.hra_num}${full_name && ` - ${full_name}`}`
                    }}
                    renderOption={(props, option, state) => {
                      const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
                      return <li {...props} style={{fontSize: '1rem'}}>{`${option.hra_num}${full_name && ` - ${full_name}`}`}</li>
                    }}
                    value={selectedForm.hra.losing.hra_num ? selectedForm.hra.losing : null}
                    style={{ width: 300 }}
                    onChange={handleLosingHraChange}
                    renderInput={(params) => <TextField {...(!selectedForm.hra.losing.hra_num && {error:true, helperText:"Selection Required."})} {...params} label="Losing HRA" />}
                    />
                  :
                  <TextField
                    id="standard-helperText-l-hra-num"
                    key="standard-helperText-l-hra-num"
                    label="c. Hand Receipt Account Number"
                    value={selectedForm.hra.losing.hra_num}
                    style={{ width: 300 }}/>
                  }
                  <TextField
                  id="standard-helperText-l-hra-pnum"
                  key="standard-helperText-l-hra-pnum"
                  label="d. Work Phone Number"
                  name="losing_hra_work_phone"
                  //disabled={selectedForm.requested_action == "Issue"}
                  value={selectedForm.hra.losing.hra_work_phone ? formatPhoneNumber(selectedForm.hra.losing.hra_work_phone) : ""}
                  style={{ width: 200 }}/>
              </Stack>
              </>
            ) : null}
            </Grid>
            <Grid item xs={6}>
                <p>GAINING HAND RECEIPT HOLDER</p>
                <Stack spacing={3} direction='row' sx={{py:2}}>
                <TextField
                  id="standard-helperText-g-first-name"
                  key="standard-helperText-g-first-name"
                  label="3a. Name"
                  name={"gaining_hra_first_name"}
                  value={selectedForm.hra.gaining.hra_first_name}
                  //onChange={handleFormChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ width: 200 }}/>
                <TextField
                  id="standard-helperText-g-last-name"
                  key="standard-helperText-g-last-name"
                  label="3a. Name"
                  name={"gaining_hra_last_name"}
                  value={selectedForm.hra.gaining.hra_last_name}
                  //onChange={handleFormChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ width: 200 }}/>
                  <TextField
                  id="standard-helperText-g-name"
                  key="standard-helperText-g-name"
                  label="b. Office Symbol"
                  name={"gaining_hra_os_alias"}
                  value={selectedForm.hra.gaining.hra_office_symbol_alias}
                  //onChange={handleFormChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ width: 200 }}/>
                </Stack>
                <Stack spacing={3} direction='row' sx={{py:2}}>
                {editEnabled ? 
                <StyledAutocomplete
                    style={{ display:'inline-block' }}
                    id="combo-box-gaining"
                    options={selectedForm.requested_action == "Issue" ? hras.losing : hras.gaining}
                    getOptionDisabled={(option) => selectedForm.hasOwnProperty('gaining') ? selectedForm.hra.gaining.hra_num === option.hra_num : selectedForm.hra.losing.hra_num === option.hra_num}
                    loading={loading.hra}
                    getOptionLabel={(option) => {
                      const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
                      return `${option.hra_num}${full_name && ` - ${full_name}`}`
                    }}
                    renderOption={(props, option, state) => {
                      const full_name = (option.hra_first_name ? option.hra_first_name + ' ' : '') + (option.hra_last_name || '')
                      return <li {...props} style={{fontSize: '1rem'}}>{`${option.hra_num}${full_name && ` - ${full_name}`}`}</li>
                    }}

                    value={selectedForm.hra.gaining.hra_num ? selectedForm.hra.gaining : null}
                    style={{ width: 300 }}
                    onChange={handleGainingHraChange}
                    renderInput={(params) => <TextField {...(!selectedForm.hra.gaining.hra_num && {error:true, helperText:"Selection Required."})} {...params} label="Gaining HRA" />}
                  />
                :
                <TextField
                  id="standard-helperText-g-hra-num"
                  key="standard-helperText-g-hra-num"
                  label="c. Hand Receipt Account Number"
                  value={selectedForm.hra.gaining.hra_num}
                  style={{ width: 300 }}/>
                }
                
                <TextField
                  id="standard-helperText-g-hra-pnum"
                  key="standard-helperText-g-hra-pnum"
                  label="d. Work Phone Number"
                  name="gaining_hra_work_phone"
                  value={selectedForm.hra.gaining.hra_work_phone ? formatPhoneNumber(selectedForm.hra.gaining.hra_work_phone ) : ""}
                  style={{ width: 200 }}/>
                </Stack>
            </Grid>
          </>
          ) : null}    
          
          {selectedForm.requested_action ? (
            selectedForm.requested_action == "Issue" ? materialTableNewEquipment() : materialTableSelect()
          ) : null}
          <Grid item xs={8}>
            {editEnabled ? 
            <TextField
              id="standard-helperText-ror-prop"
              key="standard-helperText-ror-prop"
              label="13a. Individual/Vendor Removing or Recieving Property"
              value={selectedForm.individual_ror_prop ? selectedForm.individual_ror_prop : ""}
              onChange={handleRorPropChange}
              style={{ width: '80%' }}/>
            :
            <TextField
                id="standard-helperText-ror-prop"
                key="standard-helperText-ror-prop"
                label="13a. Individual/Vendor Removing or Recieving Property"
                value={selectedForm.individual_ror_prop ? selectedForm.individual_ror_prop : ""}
                style={{ width: '80%' }}/>
            }
          </Grid>
            </Grid>
          </div>
        </form>
        {(action === "CREATE" || action === "EDIT") && editEnabled ? (
          <div style={{textAlign:'center'}}>

          {/* <LoadingButton className={ submitButton ? clsx(plusButtonClasses.fabGreen) : clsx(plusButtonClasses.fabGrey)} {...(!submitButton && {disabled:true})}
            onClick={handleSubmit}
            endIcon={tableIcons.Send}
            loading={loading.submit}
            loadingPosition="end"
            variant="contained"
          >
            Send
          </LoadingButton> */}

          <LoadingButton
            sx={{width: 250, mt: 3}}
            color="success"
            loading={submitButton.send}
            loadingPosition="start"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
            variant="contained"
            disabled={!submitButton.active || submitButton.send}
          >
            <span>Save</span>
          </LoadingButton>
          {/* <StyledLoadingButton active={submitButton.active}  {...((!submitButton.active || submitButton.send) && {disabled:true})} > 
            Submit
          </StyledLoadingButton> */}
          </div>
        ) : null}
        </>
        )
  }

  const materialTableSelect = () => {

    //considering move to a config file.
    const columns = [
      //{ title: 'Item No.', field: 'hra_num', type:'numeric', editEnabled:'never'},
      { title: 'Bar Tag No.', field: 'bar_tag_num', type:'numeric',
      editComponent: props => {
        return (
          <Autocomplete
                value={props.value ? find(equipments,function(c){ return c.bar_tag_num === props.value}) : null}
                onChange={(e, nv) => {
                  if(nv?.bar_tag_num){
                    props.onChange(nv.bar_tag_num) 
                    return;
                  }
                  props.onChange(nv)
                }}
                options={equipments}
                getOptionDisabled={(option) => selectedForm.equipment_group.map(x => x.bar_tag_num)?.includes(option.bar_tag_num)}
                getOptionLabel={(option) => option.bar_tag_num + ' - ' + option.item_type}
                renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.bar_tag_num + ' - ' + option.item_type}</li>}
                style={{ width: 250 }}
                renderInput={(params) => <TextField {...params} variant={"standard"} helperText="Equipments"/>}
            />)
      },
      },
      { title: 'Catalog', field: 'catalog_num',editable: 'never' },
      { title: 'Nomenclature (include make, model)', field: 'item_type',editable: 'never' },
      { title: 'Cond Code', field: 'condition_alias',editable: 'never' },
      { title: 'Serial Number', field: 'serial_num',editable: 'never' },
      { title: 'ACQ Date', field: 'acquisition_date',editable: 'never',type:'date' },
      { title: 'ACQ Price', field: 'acquisition_price',editable: 'never'},
      { title: 'Document Number/Control ID#', field: 'document_num',editable: 'never'}
    ]

    
  
    return(
      <div style={{ width: '100%', marginLeft:5,marginRight:5 }}>
        <MaterialTable
        style={{ alignSelf: 'center' }}
        icons={tableIcons}
        columns={columns}
        data={selectedForm.equipment_group}
        
        localization={{ body:{ emptyDataSourceMessage:<h6 style={{color: theme.palette.mode === 'dark' ? 'orange':'#e04436'}}>Equipments are required</h6> } }}
        options={{
          search:false,
          headerStyle: {
          backgroundColor: "#969696",
          color: "#FFF",
          fontWeight: 'bold',
        }
        }}
        title= { selectedForm.equipment_group.length >= 5 ? "Note: ENG4900 has a limit of 5 equipments." : ""}
        {...(editEnabled && {editable:{
          // onBulkUpdate: (changes) => {
          // //await handleTableUpdate({changes:changes})
          //   new Promise((resolve, reject) => {
            
          //     setTimeout(() => {
          //       //setHras([...hras, newData]);
          //       //console.log('bulk update')
                
          //       //resetHras()
          //       resolve();
          //     }, 1000);
          //   })
          // },
          //onRowAddCancelled: rowData => console.log('Row adding cancelled'),
          //onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
          onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              //const equipments_losing_hra = selectedForm.hra.losing.hra_num && Object.keys(equipments) > 0 ? equipments[selectedForm.hra.losing.hra_num] : []
              const idx = findIndex(equipments,function(e){ return e.bar_tag_num === newData.bar_tag_num})

              if(idx != -1 && selectedForm.equipment_group.length < 5){
                setSelectedForm({...selectedForm,equipment_group:[...selectedForm.equipment_group, equipments[idx]]});
                resolve();
                return
              }

              reject();             
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...selectedForm.equipment_group];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setSelectedForm({...selectedForm,equipment_group:[...dataUpdate]});

              resolve();
            }, 1000)
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...selectedForm.equipment_group];
                const index = findIndex(dataDelete, (data) => data.bar_tag_num === oldData.bar_tag_num)

                if(index != -1){
                  dataDelete.splice(index, 1);
                  setSelectedForm({...selectedForm,equipment_group:[...dataDelete]});
                  resolve();
                  return;
                }
                
                reject();
              }, 1000);
            }),
        }})}
        />
      </div>
    )
  }

  const materialTableNewEquipment = () => {

		const equipment_cols = [
      { title: 'Item Description', field: 'item_type',col_id:4  },
			{ title: 'Bar Tag', field: 'bar_tag_num', type: 'numeric', cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }, col_id:5, validate: (rowData) => {
				if(rowData.hasOwnProperty('bar_tag_num')){
					if(!isNaN(rowData.bar_tag_num)) {
						if(typeof rowData.bar_tag_num === "number"){
							if(rowData.bar_tag_num.toString().length > 5){
								return ({ isValid: false, helperText: 'Bar Tag digits exceed 5.' })
							}else{
								const idx = findIndex(equipments,e => e.bar_tag_num == rowData.bar_tag_num)
								const propTableData = rowData.hasOwnProperty('tableData')//exists: editing, not exists: adding.

								if(propTableData && idx != -1){
									if(rowData.tableData.id != idx){
										return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
									}
								}else if (idx != -1 && !propTableData && !rowData.hasOwnProperty('id')){
									return ({ isValid: false, helperText: 'Duplicated Bar Tag.' })
								}								
							}
							return true
						}
			
						if(typeof rowData.bar_tag_num === "string"){
							return ({ isValid: false, helperText: 'Bar Tag needs to be numeric.' })
						}
					}
				}
				return ({ isValid: false, helperText: 'Bar Tag is required.' })
	
			}
			// , validate: (rowData,dataIsOnDatabase) => {
			// 	try{
			// 	if(rowData.bar_tag_num.toString().length > 5){
			// 		return({ isValid: false, helperText: 'bar tag digits length cannot exceed 5.' })
			// 	}else if(dataIsOnDatabase.bar_tag_num){
			// 		dataIsOnDatabase.bar_tag_num = false
			// 		return({ isValid: false, helperText: 'bar tag exists in database.' })
			// 	}
			// 	}catch(err){
		
			// 	}
				
			// 	return(true)
			// }
			},
			{title:'Acquisition Date',field:'acquisition_date',  type: 'date',col_id:1 },
			{title:'Acquisition Price',field:'acquisition_price',type: 'numeric',col_id:7 },
			{title:'Catalog Num',field:'catalog_num',col_id:8 },
			{title:'Serial Num',field:'serial_num',col_id:9, cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }, validate: (rowData) => {
				if(rowData.hasOwnProperty('serial_num')){
          if(rowData.serial_num.toString().length > 0){
            return true
          }
        }
				  return ({ isValid: false, helperText: 'Serial Number is required.' })
      }},
			{title:'Manufacturer',field:'manufacturer',col_id:10 },
			{title:'Model',field:'model',col_id:11 },
			{title:'Condition',field:'condition',col_id:12, render: rowData => find(condition,(c) => c.id === rowData.condition)?.name,
      editComponent: props => {
        return (
          <Autocomplete
                value={props.value ? find(condition,function(c){ return c.id === props.value}) : null}
                onChange={(e, nv) => {
                  if(nv?.id){
                    props.onChange(nv.id) 
                    return;
                  }
                  props.onChange(nv)
                }}
                options={condition}
                getOptionLabel={(option) => option.id + ' - ' + option.name}
                renderOption={(props, option, state) => <li {...props} style={{fontSize: '1rem'}}>{option.id + ' - ' + option.name}</li>}
                style={{ width: 250 }}
                renderInput={(params) => <TextField {...params} variant={"standard"} helperText="Condition"/>}
            />)
      },
			}
			]

		return(
			<div style={{ width: '100%', marginLeft:5, marginRight:5 }}>
				<MaterialTable
				icons={tableIcons}
				columns={equipment_cols}
				data={selectedForm.equipment_group}
        localization={{ body:{ emptyDataSourceMessage:<h6 style={{color: theme.palette.mode === 'dark' ? 'orange':'#e04436'}}>Equipments are required</h6> } }}
        options={{
          //exportButton: true,
          //exportAllData: true,
          search:false,
          headerStyle: {
          backgroundColor: "#969696",
          color: "#FFF",
          fontWeight: 'bold',
        }
        }}
				title= { selectedForm.equipment_group.length >= 5 ? "Note: ENG4900 has a limit of 5 equipments." : ""}
        {...(editEnabled && {editable:{
					// isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
					//isEditHidden: rowData => rowData.name === 'x',
					// isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
					// isDeleteHidden: rowData => rowData.name === 'y',
					// onBulkUpdate: async (changes) => {
					// let result = await handleUpdate({changes:changes})
					// let errorResult = result.columnErrors
					// let {errorFound} = errorResult
					// return(
					// 	new Promise((resolve, reject) => {
					// 	setTimeout(() => {
					// 		/* setEquipments([...equipments, newData]); */
					// 		console.log('bulk update')
					// 		//console.log(changes)
					// 		const keys = Object.keys(changes)//0 ,1,2
					// 		let alert_ = ''

					// 		for(const key of keys){
					// 			const {newData,oldData} = changes[key]
					// 			const errorStatus = errorResult.rows[key]

					// 			console.log(newData,errorStatus)
					// 			if(!errorFound){
					// 			//no error
					// 			resetEquipments()
					// 			//const dataUpdate = [...equipments];
					// 			//const index = oldData.tableData.id;
					// 			//dataUpdate[index] = newData;
					// 			//setEquipments([...dataUpdate]);
					// 			}else{
					// 			//error found.
					// 			console.log('error found')
					// 			//dataIsOnDatabase[Object.keys(errorStatus)[0]] = true
					// 			const col_name = Object.keys(errorStatus)[0]
					// 			const errorText = errorStatus[col_name]
					// 			alert_ = alert_ + `row ${Number(key)+1}: ${col_name} - ${errorText}\n`
					// 			}

								
					// 			//console.log(errorStatus,newData)
					// 			//const dataUpdate = [...equipments];
					// 			//const index = oldData.tableData.id;
					// 			//dataUpdate[index] = newData;
					// 			//setEquipments([...dataUpdate]);
					// 			//resolve();
					// 		}

					// 		if(alert_){
					// 			reject();
					// 		}else{
					// 			resolve();
					// 		}
					// 		//for(const rowid of errorResult){}
					// 		// if(Object.keys(errorResult).length > 0){
					// 		//   console.log(errorResult)
					// 		//   dataIsOnDatabase[Object.keys(errorResult)[0]] = true
					// 		//   reject();
					// 		// }else{
					// 		//   for(const {newData,oldData} of changes){
					// 		//     const dataUpdate = [...equipments];
					// 		//     const index = oldData.tableData.id;
					// 		//     dataUpdate[index] = newData;
					// 		//     setEquipments([...dataUpdate]);
					// 		//     resolve();
					// 		//   }
					// 		// }
					// 	}, 1000);
					// }))
					// },
          onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if(selectedForm.equipment_group.length < 5){
                const idx = findIndex(selectedForm.equipment_group,function(e){ return e.bar_tag_num === newData.bar_tag_num})

                if(idx === -1 && selectedForm.equipment_group.length < 5){
                  setSelectedForm({...selectedForm, equipment_group:[...selectedForm.equipment_group, newData]});
                  resolve();
                  return;
                }
              }
              
              reject();
            }, 1000)
          }),
          onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...selectedForm.equipment_group];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setSelectedForm({...selectedForm,equipment_group:[...dataUpdate]});

              resolve();
            }, 1000)
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...selectedForm.equipment_group];
              const index = findIndex(dataDelete, (data) => data.bar_tag_num === oldData.bar_tag_num)

              if(index != -1){
                dataDelete.splice(index, 1);
                setSelectedForm({...selectedForm,equipment_group:[...dataDelete]});
                resolve();
                return;
              }
              
              reject();
            }, 1000);
          }),
					// onRowUpdate: async (newData, oldData) => {
					// let result = await handleUpdate({changes:{'0':{newData:newData, oldData:oldData}}})
					// let errorResult = result.columnErrors
					// 	return (new Promise((resolve, reject) => {
					// 		setTimeout(() => {
								
					// 		if(errorResult.errorFound){
					// 			const col_name = Object.keys(errorResult.rows[0])[0]
					// 			dataIsOnDatabase[col_name] = true
					// 			reject();
					// 			return;
					// 		}
					// 			resetEquipments();
					// 			//const dataUpdate = [...equipments];
					// 			//const index = oldData.tableData.id;
					// 			//dataUpdate[index] = newData;
					// 			//setEquipments([...dataUpdate]);
					// 			resolve();
					// 		}, 1000);
					// 	}))
					// },
					// onRowDelete: async (oldData) => {
					// await handleDelete({changes:{'0':{newData:null, oldData:oldData}}})
					// 	new Promise((resolve, reject) => {
					// 		setTimeout(() => {
					// 			//const dataDelete = [...equipments];
					// 			//const index = oldData.tableData.id;
					// 			//dataDelete.splice(index, 1);
					// 			//setEquipments([...dataDelete]);
					// 			resolve();
					// 		}, 1000);
					// 	})
					// }
        }})}
				/>
		</div>
		)
	}

  //Effects
  useEffect(() => {
    handleFormSelect()
  }, []);//will run once.


  const IsSelectedHrasValid = (form) => {
    let return_result = false

    switch (form.requested_action) {
      case "Issue":
        return_result = !form.hra.losing.hra_num && form.hra.gaining.hra_num
        break;
      case "Transfer":
      case "Repair":
      case "Excess":
      case "FOI":
      default:
        return_result = form.hra.losing.hra_num && form.hra.gaining.hra_num
        break;
    }

    // return return_result

    return return_result
  }

  useEffect(()=>{
    if(action === "CREATE"){
      if(isDateValid(selectedForm.expiration_date) && IsSelectedHrasValid(selectedForm) && selectedForm.equipment_group.length > 0){
        setSubmitButton({...submitButton,active:true})
        return;
      }
        
      setSubmitButton({...submitButton,active:false})
    }else if(action === "EDIT"){
      if(isDateValid(selectedForm.expiration_date) && IsSelectedHrasValid(selectedForm) && selectedForm.equipment_group.length > 0){
        setSubmitButton({...submitButton,active:true})
        return;
      }
        
      setSubmitButton({...submitButton,active:false})
    }
  },[selectedForm])

  useEffect(()=>{
    if(!selectedForm.hra.losing.hra_num){
      //setSelectedForm({...selectedForm,equipment_group:[]})
    }
    
  },[selectedForm.hra.losing.hra_num])

  //Render Variables
  const displayTop = () => {
    if(action.includes("EDIT"))
    {
      return(
      <div style={{textAlign: 'center'}}>
        <h2>ENG 4900 - Edit Form</h2>
      </div>
      )
    }

    if(action.includes("VIEW"))
    {
      return(
      <div style={{textAlign: 'center'}}>
        <h2>ENG 4900 - View Form</h2>
      </div>
      )
    }

    if(action.includes("CREATE"))
    {
      return(
      <div style={{textAlign: 'center'}}>
        <h2>ENG 4900 - Create Form</h2>
      </div>
      )
    }

    return(<div style={{textAlign: 'center'}}> <h2>ENG 4900</h2> </div>)
  }

  //Render return.

  if((type ? type : "FORM").toUpperCase() !== "FORM"){
    return (
      <>
        <StyledDialog maxWidth='xl' fullWidth={true} open={create4900 ? create4900.show : false} onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
              //setModal({...modal,active:false})
          }
          }}>
          
          <div >
          <StyledDialogTitle>
            <IconButton onClick={()=>resetCreate4900Data()}>
                <CloseIcon />
            </IconButton>
          </StyledDialogTitle>
    
          </div>
          <DialogContent>
          
          {displayTop()}
          <div style={{textAlign: 'center'}}> {loading.init ? LoadingCircle() : null} </div>
          {form()}

          </DialogContent>
        </StyledDialog>
      </>
    )
  }

  return (
    <>
      {displayTop()}
      <div style={{textAlign: 'center'}}> {loading.init ? LoadingCircle() : null} </div>
      {!loading.init ? form() : null}
      </>
  )

  // return (
  //   <>
  //   <div>
  //   <IconButton onClick={()=>resetCreate4900Data()}>
  //           <CloseIcon />
  //       </IconButton>
  //     {displayTop()}
  //     <div style={{textAlign: 'center'}}> {loading ? LoadingCircle() : null} </div>
  //     {form()}
  //   </div>
  //   </>
  // );
}

export default connect(
  'selectUserToken',
  Eng4900Form);