import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './eng4900.css';
import Card4900 from '../Card4900';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import api from '../../axios/Api';

const plusButtonStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    alignSelf: 'flex-end'
  },
}));

const textFieldSizes = {
    input1: {
      height: 50
    },
    input2: {
      height: 200,
      fontSize: "3em"
    }
  };

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

  const phoneTextFieldStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const AvatarStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      height:20,
      width:20
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
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


export default function FormPropsTextFields() {
  
  //Constants Declarations.
  const requestedActions = ["Issue","Transfer","Repair","Excess","FOI"]
    
  //Variables Declarations.
  let showForm = false

  //Styles Declarations.
  const classesTextField = texFieldStyles();
  const classesItemMenu = itemMenuStyles();
  const classesPhoneTextField = phoneTextFieldStyles();
  const classesGrid = gridStyles();
  const avatarClasses = AvatarStyles();
  const plusButtonClasses = plusButtonStyles();

  //Hooks Declarations.
  const [eng4900s, setEng4900s] = React.useState([]);
  const [reqAction, setReqAction] = React.useState('');
  const [numOfBarTags, setNumOfBarTags] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [values, setValues] = React.useState({
    textmaskghr: '(   )    -    ',
    textmasklhr: '(   )    -    ',
    numberformat: '1320',
  });
  const [state, setState] = React.useState({
    issue: false,
    transfer: false,
    repair: false,
    excess: false,
    foi: false,
    temporaryLoan: false
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id_, setId] = React.useState('');
  const [selectedForm, setSelectedForm] = React.useState(null);

  
  //Events Declarations.
  const handle4900sChange = (event) => {
    setEng4900s(event.target.value);
  };

  const handleItemMenuChange = (event) => {
    setReqAction(event.target.value);
  };

  const handleBarTagMenuChange = (event) => {
    setNumOfBarTags(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePhoneTextFieldChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckBoxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleIdChange = (event) => {
    setId(event.target.value);
    // if(event.target.value == ''){
    //   setIncludes({...includes_,  [event.target.name]: 'includes'})
    // }
  };

  const handleViewFormFromCard = (event) => {
    setSelectedForm(eng4900s[event.target.id]);
    // if(event.target.value == ''){
    //   setIncludes({...includes_,  [event.target.name]: 'includes'})
    // }
  };

  

  //Function Declarations.
  const bartagsData = (n) => {
      const returnArray = [];
      for(let x=0; x<n;x++){
          returnArray.push(
              <>
              <Grid item xs={6}>
                  <Paper className={classesGrid.paper}>
                  <Avatar className={avatarClasses.orange}>{x+1}</Avatar>
                      <TextField
                      id= {`item_no_${x}`}
                      label="Item No."
                      style={{ width: 200 }}
                      />
                      <TextField
                      id= {`bar_tag_no_${x}`}
                      label="Bar Tag No."
                      style={{ width: 200 }}
                      />
                      <TextField
                      id= {`catalog_${x}`}
                      label="Catalog"
                      style={{ width: 200 }}
                      />
                      <TextField
                      id= {`nomenclature_${x}`}
                      label="Nomenclature (include make, model)"
                      style={{ width: 200 }}
                      />
                      </Paper>
                      </Grid>
                      <Grid item xs={6}>
                      <Paper className={classesGrid.paper}>
                      <Avatar className={avatarClasses.orange}>{x+1}</Avatar>
                      <TextField
                      id= {`cond_code_${x}`}
                      label="Cond Code"
                      style={{ width: 150 }}
                      />
                      <TextField
                      id= {`serial_number_${x}`}
                      label="Serial Number"
                      style={{ width: 150 }}
                      />
                      <TextField
                      id= {`acq_date_${x}`}
                      label="ACQ. Date"
                      style={{ width: 150 }}
                      />
                      <TextField
                      id= {`acq_price_${x}`}
                      label="ACQ. Price"
                      style={{ width: 150 }}
                      />
                      <TextField
                      id= {`document_number_${x}`}
                      label="Document Number/Control ID#"
                      style={{ width: 175 }}
                      />
                  </Paper>
              </Grid>
          </>
          );
      }
      return(returnArray)
  }

  const menuItemsBarTags = () => {
      const returnArray = []
      for(let i=0; i < 10;i++){
          returnArray.push(<><MenuItem value={i}>{i}</MenuItem></>)
      }
      return(returnArray);
  }

  const handle4900Search = () => {

    setSelectedForm(null)
    console.log('4900SearchCall')
      api.post(`eng4900/search`,{fields:{id:id_}}).then((response) => response.data).then((data) => {
        console.log(data)
        setEng4900s(data.status != 400 ? data.data : data)
        // this.setState({
        // 	equipments: data.status != 400 ? data.values: data,
        // 	setequipment: data
        // });
        //console.log(this.state.equipment.values);
        // console.log(this.props, this.state);
      }).catch(function (error) {
        setEng4900s([])
      });
  }

  const form = (f) => {
    //console.log(f)

      return(
          <>
        <Grid item xs={12}>
              <Paper className={classesGrid.paper}>
              {/* <FormControl className={classesItemMenu.formControl}>
              <InputLabel id="demo-simple-select-label">Req Action</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={reqAction}
              onChange={handleItemMenuChange}
              >
              <MenuItem value={"Issue"}>Issue</MenuItem>
              <MenuItem value={"Transfer"}>Transfer</MenuItem>
              <MenuItem value={"Repair"}>Repair</MenuItem>
              <MenuItem value={"Excess"}>Excess</MenuItem>
              <MenuItem value={"FOI"}>FOI</MenuItem>
              </Select>
          </FormControl> */}
          <p>{`Form - ${f[0].form_id}`}</p>
              <FormControlLabel
                  control={<Checkbox checked={state.issue} onChange={handleCheckBoxChange} name="issue" />}
                  label="Issue"
              />
              
              <FormControlLabel
                  control={<Checkbox checked={state.transfer} onChange={handleCheckBoxChange} name="transfer" />}
                  label="Transfer"
              />
              
              <FormControlLabel
                  control={<Checkbox checked={state.repair} onChange={handleCheckBoxChange} name="repair" />}
                  label="Repair"
              />
              
              <FormControlLabel
                  control={<Checkbox checked={state.excess} onChange={handleCheckBoxChange} name="excess" />}
                  label="Excess"
              />
              
              <FormControlLabel
                  control={<Checkbox checked={state.foi} onChange={handleCheckBoxChange} name="foi" />}
                  label="FOI"
              />

              <FormControlLabel
                  control={<Checkbox checked={state.temporaryLoan} onChange={handleCheckBoxChange} name="temporaryLoan" />}
                  label="Temporary Loan"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Expiration Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                      'aria-label': 'change date',
                  }}
                  />
              </MuiPickersUtilsProvider>
          
              </Paper>

      </Grid>
      
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
        <p>LOSING HAND RECEIPT HOLDER</p>
        <TextField
        label="2a. Name"
        style={{ width: 300 }}
      />
      <TextField
        id="standard-helperText"
        label="b. Office Symbol"
        style={{ width: 300 }}
      />
      <TextField
        id="standard-helperText"
        label="c. Hand Receipt Account Number"
        style={{ width: 300 }}
      />
      
    <FormControl>
      <InputLabel htmlFor="formatted-text-mask-input">d. Work Phone Number</InputLabel>
      <Input 
      
        style={{ height: 40,width:300 }}
        value={values.textmasklhr}
        onChange={handlePhoneTextFieldChange}
        name="textmasklhr"
        id="formatted-text-mask-input"
        inputComponent={TextMaskCustom}
      />
    </FormControl>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
        <p>GAINING HAND RECEIPT HOLDER</p>
        <TextField
        label="3a. Name"
        style={{ width: 300 }}
      />
      <TextField
        id="standard-helperText"
        label="b. Office Symbol"
        style={{ width: 300 }}
      />
      <TextField
        id="standard-helperText"
        label="c. Hand Receipt Account Number"
        style={{ width: 300 }}
      />
      <FormControl>
      <InputLabel htmlFor="formatted-text-mask-input">d. Work Phone Number</InputLabel>
      <Input 
        style={{ height: 40,width:300 }}
        value={values.textmaskghr}
        onChange={handlePhoneTextFieldChange}
        name="textmaskghr"
        id="formatted-text-mask-input"
        inputComponent={TextMaskCustom}
      />
    </FormControl>
        </Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper className={classesGrid.paper}>
      <FormControl className={classesItemMenu.formControl}>
              <InputLabel id="demo-simple-select-label-bt">Number of Equipment Items</InputLabel>
              <Select
              labelId="demo-simple-select-label-bt"
              id="demo-simple-select-bt"
              value={numOfBarTags}
              onChange={handleBarTagMenuChange}
              >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              </Select>
      </FormControl>
      </Paper>
      </Grid>
      {bartagsData(numOfBarTags)}
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
        <TextField
        label="13a. Individual/Vendor Removing or Recieving Property"
        style={{ width: 600 }}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
        <TextField
        label="b. Date"
        style={{ width: 120 }}
      />
        <TextField
        label="c. Signature"
        style={{ width: 120 }}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
        <TextField
        label="14a. Losing HRH Signature"
        style={{ width: 300 }}
      />
        <TextField
        label="b. Date"
        style={{ width: 120 }}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classesGrid.paper}>
        <TextField
        label="15a. Gaining HRH Signature"
        style={{ width: 300 }}
      />
        <TextField
        label="b. Date"
        style={{ width: 120 }}
      />
      </Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper className={classesGrid.paper}>
        <p>Transfer (PBO use only)</p>
      </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
      <TextField
        label="16a. Losing Command"
        style={{ width: 250 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
        <TextField
        label="b. UIC"
        style={{ width: 120 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
      <TextField
        label="17a. Gaining Command"
        style={{ width: 250 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
        <TextField
        label="b. UIC"
        style={{ width: 120 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
      <TextField
        label="c. Ship From"
        style={{ width: 120 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
      <TextField
        label="c. Ship To:"
        style={{ width: 120 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
      <TextField
        label="d. PBO"
        style={{ width: 120 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
      <TextField
        label="d. PBO"
        style={{ width: 120 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
      <TextField
        label="e. Losing Command Signature"
        style={{ width: 300 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
        <TextField
        label="f. Date"
        style={{ width: 120 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
      <TextField
        label="e. Gaining Command Signature"
        style={{ width: 300 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
        <TextField
        label="f. Date"
        style={{ width: 120 }}
        InputProps={{
          readOnly: disableFields.PBO,
        }}
        {...(disableFields.PBO && {variant:"filled"})}
      />
      </Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper className={classesGrid.paper}>
        <p>Logistics (supply use only)</p>
      </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
      <TextField
        label="18a. Received By"
        style={{ width: 300 }}
        InputProps={{
          readOnly: disableFields.logistics,
        }}
        {...(disableFields.logistics && {variant:"filled"})}
      />
        <TextField
        label="b. Date"
        style={{ width: 120 }}
        InputProps={{
          readOnly: disableFields.logistics,
        }}
        {...(disableFields.logistics && {variant:"filled"})}
      />
      </Paper>
      </Grid>
      <Grid item xs={6}>
      <Paper className={classesGrid.paper}>
      <TextField
        label="19a. Posted By"
        style={{ width: 300 }}
        InputProps={{
          readOnly: disableFields.logistics,
        }}
        {...(disableFields.logistics && {variant:"filled"})}
      />
        <TextField
        label="b. Date"
        style={{ width: 120 }}
        InputProps={{
          readOnly: disableFields.logistics,
        }}
        {...(disableFields.logistics && {variant:"filled"})}
      />
      </Paper>
      </Grid>
      </>
      )
  }

  function CardProduct(form){

    let bartags = ''

    Object.keys(form).map(function(key) {
      bartags = bartags + (bartags ? ', ':'') + form[key].bar_tag_num
    });

    return (
      <div className="container" style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '21px' }}>
        <div id={form[0].form_id} className="col-md-12 card" style={{ textAlign: 'left', margin: 10 }}>
              <div style={{display:'inline'}}>
              {/* <img src={product.image} alt="" style={{height:"25%",width:"25%",display:'inline'}} /> */}
          <h4 style={{ marginTop: '20px' }}>ENG4900 - ID:</h4>
                  <h4 >{form[0].form_id}</h4>
              </div>
              
          <hr />
          
          <h6>Bar Tags Quantity: {form.length}</h6>
          <small>Losing HRA: {form[0].losing_hra + ' - ' + form[0].losing_hra_first_name + ' ' + form[0].losing_hra_last_name }</small>
          <small>Gaining HRA: {form[0].gaining_hra + ' - ' + form[0].gaining_hra_first_name + ' ' + form[0].gaining_hra_last_name}</small>
          <small>Bar Tags: {bartags}</small>
                  {/* <small>Bar Tags: </small>
                  <small>{btPrint} </small> */}
          <div className="row" style={{ margin: 3,marginTop:'10px' }}>
              <input id={form[0].form_id} type="submit" value="View" className="btn btn-primary" onClick={handleViewFormFromCard}/>
            {/* <Link onClick={deleteConfirm} style={{ margin: 2 }}>
              <input type="submit" value="Edit" className="btn btn-warning" />
            </Link> */}
          </div>
          <br />
        </div>
      </div>
    );
  }

  //Render Variables
  const RequestedActionDropDownItems = requestedActions.map((c, i)=>{
    return(
      <MenuItem value={c}>
      {c}
      </MenuItem>
    )
        })

  const cards = Object.keys(eng4900s).map(function(key) {
    return CardProduct(eng4900s[key]);
  });

  // const cards = eng4900s.map((form) => {
  //   return CardProduct(form);
  // });

  const disableFields = {
    PBO: true,
    logistics: true,
    HRA: false,
    user: false
  }

//Render return.
  return (
    <div>
        <div style={{textAlign: 'center'}}>
      <h2 >Eng 4900 Form</h2>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
                Open Menu - Search
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Open Menu - Search</MenuItem>
                <MenuItem onClick={handleMenuClose}>Open Menu - Update</MenuItem>
                <MenuItem onClick={handleMenuClose}>Open Menu - Create</MenuItem>
            </Menu> */}
            
      </div>
      <div style={{textAlign: 'center'}}>
      
    </div>
    <div style={{textAlign: 'center'}}>
        <form className={classesTextField.root} noValidate autoComplete="off">
            <div className={classesGrid.options}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                            <TextField id="outlined-search-id" name="id" label="Search by ID" type="search" variant="outlined" value={id_} onChange={handleIdChange}/> 
                            {/* <TextField id="outlined-search" label="Search by Bar Tag" type="search" variant="outlined" /> 
                            <TextField id="outlined-search" label="Search by HRA" type="search" variant="outlined"/> 
                            <TextField id="outlined-search" label="Search by Bar Tag" type="search" variant="outlined" />  */}

                    <IconButton id="search-4900" aria-label="search" color="primary" onClick={handle4900Search}>
                            <SearchIcon style={{ fontSize: 40 }}/>
                    </IconButton>
                    </Grid>
                </Grid>
            </div>
        </form>
    </div>

    {cards.length > 0 && !selectedForm ? (<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <h3 style={{ justifyContent: 'center' }}>List Of Available 4900s</h3>
            <div style={{ justifyContent: 'center' }}>{cards}</div>
    </div>) : null}

    <form className={classesTextField.root} noValidate autoComplete="off">
      
      <div className={classesGrid.root}>
      <Grid container spacing={3}>
        
						


      
          {/* <Paper className={classesGrid.paper}> */}
          {selectedForm ? form(selectedForm) : null}
          
          
          {/* </Paper> */}
        {/* </Grid> */}
        
        {/* <Grid item xs={3}>
          <Paper className={classesGrid.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classesGrid.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classesGrid.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classesGrid.paper}>xs=3</Paper>
        </Grid> */}
      </Grid>

      
      {/* <div className={classesPhoneTextField.root}>
      <FormControl>
        <InputLabel htmlFor="formatted-text-mask-input">react-text-mask</InputLabel>
        <Input
          value={values.textmask}
          onChange={handlePhoneTextFieldChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
      </FormControl>
      { <TextField
        label="react-number-format"
        value={values.numberformat}
        onChange={handlePhoneTextFieldChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      /> }
    </div> */}
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /> 
      </Grid>
    </MuiPickersUtilsProvider> */}
{/*       
        <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
        <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="standard-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="standard-search" label="Search field" type="search" />
        <TextField
          id="standard-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        /> */}
      </div>
      {/* <div>
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField id="filled-search" label="Search field" type="search" variant="filled" />
        <TextField
          id="filled-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="filled"
        />
      </div> */}
      {/* <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField id="outlined-search" label="Search field" type="search" variant="outlined" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="outlined"
        />
      </div> */}
    </form>
    {/* <Tooltip title="Add" aria-label="add">
        <Fab color="secondary" className={plusButtonClasses.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip> */}
    </div>
  );
}
