import React, { Component } from 'react';
import qs from 'querystring';
import EquipmentList from './equipments/ListEquipment';
import { connect } from 'react-redux';
import { addProduct } from '../publics/actions/eng4900s';

//---
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

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
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';

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

import CircularProgress from '@material-ui/core/CircularProgress';

import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import orderBy from 'lodash/orderBy'

export class AddProduct extends Component {

	constructor(props) {
		super(props);

		this.state = {
			equipments: [],
			currentEquipment: { id: null, item_type: '' },
			editing: false,
			product_name: '',
			description: '',
			image: '',
			id_category: '',
			quantity: '',
			categories: [],
		};
	}

	componentDidMount() {
		//this.refreshCategoryTable();
		this.refreshEquipmentList();
	}

	refreshEquipmentList() {
		console.log('equipmentDataCALL')
		this.equipmentData = api.get('equipment', this.state).then((response) => response.data).then((data) => {
			console.log(data)
			// this.setState({
			// 	equipments: data.status != 400 ? data.values: data,
			// 	setequipment: data
			// });
			//console.log(this.state.equipment.values);
			// console.log(this.props, this.state);
		});
	}

	getEquipmentByHraID(hraID) {
		this.equipmentData = api.get(`/equipment/hra/${hraID}`, this.state).then((response) => response.data).then((data) => {
			console.log(data)
			// this.setState({
			// 	equipments: data.status != 400 ? data.values: data,
			// 	setequipment: data
			// });
			return(data.status != 400 ? data.values: data)
			//console.log(this.state.equipment.values);
			// console.log(this.props, this.state);
		});
	}

	addEquipment = (equipment) => {
		api.post('equipment', qs.stringify(equipment)).then((res) => {
			this.refreshEquipmentList();
		});
	};

	deleteEquipment = (id) => {
		api.delete(`equipment/${id}`).then((res) => {
			this.refreshEquipmentList();
		});
	};

	updateEquipment = (id, equipment) => {

		console.log(`equipment/${id}`,qs.stringify(equipment))
		api.patch(`equipment/${id}`, qs.stringify(equipment)).then((res) => {
			this.refreshEquipmentList();
		});

		this.setState({
			currentEquipment: { id: null, item_type: '' }
		});

		this.setEditing(false);
	};

	editRow = (equipment) => {
		console.log(equipment)
		this.setState({
			currentEquipment: { id: equipment.id, item_type: equipment.item_type }
		});

		this.setEditing(true);
	};

	setEditing = (isEditing) => {
		this.setState({ editing: isEditing });
	};

	// refreshCategoryTable() {
	// 	this.categoriesData = api.get('categories', this.state).then((response) => response.data).then((data) => {
	// 		this.setState({
	// 			categories: data.status != 400 ? data.values: data,
	// 			setCategories: data
	// 		});
	// 		//console.log(this.state.categories.values);
	// 		// console.log(this.props, this.state);
	// 	});
	// }

	// handlerChange = (e) => {
	// 	this.setState({ [e.target.name]: e.target.value });
	// };

	handlerSubmit = async () => {
		//window.event.preventDefault();
		//await this.props.dispatch(addProduct(this.state));
		//this.props.history.push('/products');
	};

	EquipmentTablePrint = (equipments) => {
		return(			
				<div classitem_type="container">
				<div classitem_type="row">
					{this.state.editing ? (
						null
						// <div classitem_type="col s12 l6">
						// 	<h4>Edit Equipment</h4>
						// 	<br />
						// 	<EditEquipmentForm
						// 		editing={this.state.editing}
						// 		setEditing={this.setEditing}
						// 		currentEquipment={this.state.currentEquipment}
						// 		updateEquipment={this.updateEquipment}
						// 	/>
						// </div>
					) : (
						null
						// <div classitem_type="col s12 l6">
						// 	<br />
						// 	<h4>Add Equipment</h4>
						// 	<AddEquipmentForm addEquipment={this.addEquipment} />
						// </div>
					)}

					<div classitem_type="col s12 l6">
						<br />
						<h5 style={{ justifyContent: 'center' }}>Equipment</h5>
						<EquipmentList
							equipments={equipments}
							editRow={this.editRow}
							deleteEquipment={this.deleteEquipment}
						/>
					</div>
				</div>
				</div>
		)
	}


	render() {
		const { equipments } = this.state;

		return (
            <div>
                <div style={{textAlign: 'center'}}>
                    <h2 >Equipment</h2>
                </div>
                <div style={{textAlign: 'center'}}>
                    <form className={classesTextField.root} noValidate autoComplete="off">
                        <div className={classesGrid.options}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                        <TextField id="outlined-search" label="Search by HRA Name" type="search" variant="outlined" value={hraName} onChange={handleHraNameChange}/>
                                        {hraName ? FormControlLabelPosition("hraName") : null}
            
                                        <TextField id="outlined-search" label="Search by HRA Number" type="search" variant="outlined" value={hraId} onChange={handleHraIdChange}/>
                                        {hraId ? FormControlLabelPosition("hraId") : null}
            
                                        <TextField id="outlined-search" label="Search by Item Name" type="search" variant="outlined" value={itemType} onChange={handleItemTypeChange}/>
                                        {itemType ? FormControlLabelPosition("itemType") : null}
            
                                        <TextField id="outlined-search" label="Search by Bar Tag" type="search" variant="outlined" value={bartagNum} onChange={handleBartagNumChange}/>
                                        {bartagNum ? FormControlLabelPosition("bartagNum") : null}
            
                                        <TextField id="outlined-search" label="Search by Employee Holder" type="search" variant="outlined" value={employeeName} onChange={handleEmployeeNameChange}/>
                                        {employeeName ? FormControlLabelPosition("employeeName") : null} 
                                        <IconButton aria-label="search" color="primary" onClick={handleSearch}>
                                            <SearchIcon style={{ fontSize: 40 }}/>
                                        </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                {loading ? LoadingCircle() : null}
                                {equipments.length > 0 ? materialTableSelect() : null}
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </div>
            </div>
          );
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	};
};

export default connect(mapStateToProps)(AddProduct);
