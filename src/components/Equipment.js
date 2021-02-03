import React, { Component } from 'react';
import qs from 'querystring';
import EquipmentList from './equipments/ListEquipment';
//import AddEquipmentForm from './addEquipment';
//import EditEquipmentForm from './EditEquipment';
import Box from '@material-ui/core/Box';
// import API from "../axios/Api";
// import Header from "./Header";Box
import { connect } from 'react-redux';
import { addProduct } from '../publics/actions/eng4900s';
import api from '../axios/Api';
import FormPropsTextFields from './forms/equipment';
//import './eng4900.css';

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
		//let categoriesDropDownItems = null

		//console.log(this.props)

		// const requestedActions = ["Issue","Transfer","Repair","Excess","FOI"]
		// const requestedActionDropDownItems = requestedActions.map((c, i)=>{
		// 	return(
		// 		<option value={c} name="requested_action">
		// 		{c}
		// 		</option>
		// 	)
		//   })

		// if(categories.length > 0 && categories != undefined){
		// 	categoriesDropDownItems = categories.map((c, i)=>{
		// 		return(
		// 			<option value={c.id} name="id_category">
		// 			{c.name}
		// 			</option>
		// 		)
		// 	  })
		// }

		//work in progress
		function ReturnTextField(name){
			return(
				<>
				<tr>
					<td>Name</td>
					<td>
						<input
							type="text"
							name="product_name"
							className="form-control"
							onChange={this.handlerChange}
						/>
					</td>
				</tr>
				<br />
				</>
			)
		}

		return(<>
			<FormPropsTextFields
			equipments={equipments}
			getEquipmentByHraID={this.getEquipmentByHraID}
			EquipmentTablePrint={this.EquipmentTablePrint}
			/>
			
			</>
		);
		
		// return (
		// 	<div className="container">
		// 		<h2>Add 4900</h2>
		// 		<br />
		// 		<form onSubmit={this.handlerSubmit}>
		// 			<table>
		// 				<tbody>
		// 					<tr>
		// 						<td>Requested Action</td>
		// 						<td>
		// 							<select
		// 								id="list"
		// 								name="requested_action"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							>
		// 								<option value="">----- Requested Action -----</option>
		// 								{requestedActionDropDownItems}
		// 							</select>
		// 						</td>
		// 						<td style={{paddingLeft: 30}}>Temporary Loan</td>
		// 						<td>
		// 						<input type="checkbox" id="temporary_loan" name="temporary_loan" value="1"/>
		// 						</td>
		// 						<td style={{paddingLeft: 30}}>Expiration Date</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="expiration_date"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br/>
		// 					<tr>
		// 						<td>LOSING HAND RECEIPT HOLDER</td>
		// 					</tr>
		// 					<br/>
		// 					<tr>
		// 						<td>Name</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Office Symbol</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br/>
		// 					<tr>
		// 						<td>Hand Receipt Account Number</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Work Phone Number</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br />
		// 					<tr>
		// 						<td>GAINING HAND RECEIPT HOLDER</td>
		// 					</tr>
		// 					<br/>
		// 					<tr>
		// 						<td>Name</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Office Symbol</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br />
		// 					<tr>
		// 						<td>Hand Receipt Account Number</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Work Phone Number</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br />
		// 					<tr>
		// 						<td>Number of BarTags</td>
		// 						<td>
		// 							<select
		// 								id="list"
		// 								name="requested_action"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							>
		// 								<option value="">----- Requested Action -----</option>
		// 								{requestedActionDropDownItems}
		// 							</select>
		// 						</td>
		// 					</tr>
		// 					<br/>
		// 					<Box display="flex">
		// 					<tr>
		// 						<td>Item No.</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Bar Tag No.</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Catalog</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Nomenclature (include make, model)</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br />
		// 					<tr>
		// 						<td>Cond Code</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Serial Number</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>ACQ. Date</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>ACQ. Price</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Document Number/Control ID#</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br />
		// 					</Box>
													
		// 					<tr>
		// 						<td>Individual/Vendor Removing or Recieving Property:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br/>
		// 					<tr>
		// 						<td>Transfer (PBO use only)</td>
		// 					</tr>
		// 					<br/>
		// 					<tr>
		// 						<td>Losing Command:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>UIC:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Gaining Command:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>UIC:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br />

		// 					<tr>
		// 						<td>Ship From:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Ship To:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br />

		// 					<tr>
		// 						<td>PBO:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>PBO:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br />
		// 					<tr>
		// 						<td>Logistics (supply use only)</td>
		// 					</tr>
		// 					<br/>
		// 					<tr>
		// 						<td>Recieved By:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Date:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Posted By:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="product_name"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>

		// 						<td style={{paddingLeft: 30}}>Date:</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="office_symbol"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br />

		// 					{/* <tr>
							
		// 						<td>Description</td>
		// 						<td>
		// 							<select
		// 								id="list"
		// 								name="description"
		// 								value={this.state.description}
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/> */}
		// 							{/* <option value="">----- Description -----</option>
        //             <option value="Registered">Registered</option>
        //             <option value="Unregistered">Unregistered</option>
        //             <option value="In Process">In Process</option>
        //           </select> */}
		// 						{/* </td>
		// 					</tr>
		// 					<br />
		// 					<tr>
		// 						<td>Image</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="image"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr>
		// 					<br />
		// 					<tr>
		// 						<td>Category</td>
		// 						<td>
		// 							<select
		// 								id="list"
		// 								name="id_category"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							>
		// 								<option value="">----- Category -----</option>
		// 								{categoriesDropDownItems}
		// 							</select>
		// 						</td>
		// 					</tr>
		// 					<br />
		// 					<tr>
		// 						<td>Quantity</td>
		// 						<td>
		// 							<input
		// 								type="text"
		// 								name="quantity"
		// 								className="form-control"
		// 								onChange={this.handlerChange}
		// 							/>
		// 						</td>
		// 					</tr> */}
		// 					<br />
		// 					<tr>
		// 						<td />
		// 						<td>
		// 							<input
		// 								type="submit"
		// 								value="Add"
		// 								// className="form-control"
		// 								className="btn btn-primary"
		// 							/>
		// 						</td>
		// 					</tr>
		// 				</tbody>
		// 			</table>
		// 		</form>
		// 	</div>
		// );



		//View Eng4900 work in progress

// 		return(
// <div id="page_1">
// 	{/* <div id="p1dimg1">
// 	<img src={`data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCALRA8EDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0Pwn4L8K3Oj3Dz+GtGlcanfoGewiYhVu5lUcr0CgADsABW5/wgng//oVND/8ABdD/APE0eDf+QHc/9hXUv/S2augoA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+EE8H/wDQqaH/AOC6H/4mugooA5//AIQTwf8A9Cpof/guh/8AiaP+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sK6l/wCls1dBQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHwBRRRQB9v8Ag3/kB3P/AGFdS/8AS2augrn/AAb/AMgO5/7Cupf+ls1dBQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHwBRRRQB9v+Df8AkB3P/YV1L/0tmroK5/wb/wAgO5/7Cupf+ls1dBQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHwBRRRQB9v+Df+QHc/9hXUv/S2augrn/Bv/IDuf+wrqX/pbNXQUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB8AUUUUAfb/g3/kB3P8A2FdS/wDS2augrn/Bv/IDuf8AsK6l/wCls1dBQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRR
// 	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
// 	FABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB8AUUUUAfb/g3/kB3P8A2FdS/wDS2augrn/Bv/IDuf8AsK6l/wCls1dBQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHwBRRRQB9v8Ag3/kB3P/AGFdS/8AS2augrn/AAb/AMgO5/7Cupf+ls1dBQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHwBRRRQB9v+Df8AkB3P/YV1L/0tmroK5/wb/wAgO5/7Cupf+ls1dBQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHwBRRRQB9v+Df+QHc/9hXUv/S2augrn/Bv/IDuf+wrqX/pbNXQUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB8AUUUUAff8ARRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//Z`} id={"p1img1"}/></div>
//  */}

// 		<div className="dclr"></div>
// 		<div id="id1_1">
// 		<p className="p0 ft0">1. REQUESTED ACTION:</p>
// 		<table cellpadding='0' cellspacing='0' className="t0">
// 		<tr>
// 			<td className="tr0 td0"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td1"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td2"><p className="p1 ft1">&nbsp;</p></td>
// 			<td rowspan="2" className="tr1 td3"><p className="p2 ft0">Issue</p></td>
// 			<td className="tr0 td4"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td5"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td6"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td5"><p className="p1 ft1">&nbsp;</p></td>
// 			<td colspan="2" rowspan="2" className="tr1 td7"><p className="p1 ft0">Transfer</p></td>
// 			<td className="tr0 td5"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td6"><p className="p1 ft1">&nbsp;</p></td>
// 			<td colspan="3" rowspan="2" className="tr1 td8"><p className="p2 ft0">Repair</p></td>
// 			<td className="tr0 td9"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td5"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td6"><p className="p1 ft1">&nbsp;</p></td>
// 			<td colspan="2" rowspan="2" className="tr1 td10"><p className="p2 ft0">Excess</p></td>
// 			<td className="tr0 td5"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td6"><p className="p1 ft1">&nbsp;</p></td>
// 			<td colspan="3" rowspan="2" className="tr1 td10"><p className="p3 ft0">FOI</p></td>
// 			<td className="tr0 td11"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td12"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td13"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td14"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td15"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td5"><p className="p1 ft1">&nbsp;</p></td>
// 			<td colspan="2" rowspan="2" className="tr1 td16"><p className="p1 ft0">Temporary Loan</p></td>
// 			<td className="tr0 td17"><p className="p1 ft1">&nbsp;</p></td>
// 			<td colspan="5" rowspan="2" className="tr1 td18"><p className="p4 ft0">Expiration Date:</p></td>
// 			<td className="tr0 td19"><p className="p1 ft1">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr2 td20"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td22"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td23"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td26"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td27"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td28"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td29"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td30"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td31"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td32"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td33"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr0 td20"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td21"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td22"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td34"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td23"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td24"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td25"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td24"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td21"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td35"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td24"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td25"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td36"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td21"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td37"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td26"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td24"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td25"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td36"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td38"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td24"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td25"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td39"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td40"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td41"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td27"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td28"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td29"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td30"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td31"><p className="p1 ft1">&nbsp;</p></td>
// 			<td colspan="2" className="tr0 td42"><p className="p1 ft1">&nbsp;</p></td>
// 			<td colspan="2" className="tr0 td43"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td27"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td44"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td45"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td46"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td47"><p className="p1 ft1">&nbsp;</p></td>
// 			<td className="tr0 td33"><p className="p1 ft1">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr3 td48"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td49"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td50"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td51"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td52"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td54"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td49"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td55"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td54"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td56"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td49"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td57"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td58"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td54"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td56"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td59"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td54"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td60"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td61"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td62"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td63"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td64"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td65"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td66"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td67"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td68"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td69"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td70"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td63"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td71"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td72"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td73"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td74"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td75"><p className="p1 ft3">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr2 td76"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td77"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td78"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td79"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td80"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td82"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="7" className="tr2 td83"><p className="p5 ft0">LOSING HAND RECEIPT HOLDER</p></td>
// 			<td className="tr2 td84"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td82"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td85"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td86"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td82"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td87"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td88"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td89"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td90"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td91"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td92"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td93"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="8" className="tr2 td94"><p className="p1 ft0">GAINING HAND RECEIPT HOLDER</p></td>
// 			<td className="tr2 td80"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td95"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td96"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr4 td97"><p className="p1 ft4">&nbsp;</p></td>
// 			<td colspan="3" className="tr4 td98"><p className="p1 ft4">&nbsp;</p></td>
// 			<td colspan="4" className="tr4 td99"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td100"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td101"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td102"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td103"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td104"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td100"><p className="p1 ft4">&nbsp;</p></td>
// 			<td colspan="2" className="tr4 td105"><p className="p1 ft4">&nbsp;</p></td>
// 			<td colspan="3" className="tr4 td105"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td106"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td102"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td103"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td107"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td108"><p className="p1 ft4">&nbsp;</p></td>
// 			<td colspan="3" className="tr4 td109"><p className="p1 ft4">&nbsp;</p></td>
// 			<td colspan="2" className="tr4 td98"><p className="p1 ft4">&nbsp;</p></td>
// 			<td colspan="2" className="tr4 td110"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td111"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td112"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td113"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td114"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td115"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td116"><p className="p1 ft4">&nbsp;</p></td>
// 			<td className="tr4 td105"><p className="p1 ft4">&nbsp;</p></td>
// 			<td colspan="2" className="tr4 td117"><p className="p1 ft4">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="8" className="tr5 td118"><p className="p6 ft5"><span className="ft0">2a. Name: </span>Kevin Alemany</p></td>
// 			<td className="tr5 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td119"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td120"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="7" className="tr5 td121"><p className="p2 ft0">b. Office Symbol: <span className="ft5">USACE</span></p></td>
// 			<td className="tr5 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td122"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="8" className="tr5 td123"><p className="p1 ft5"><span className="ft0">3a. Name: </span>David J Robar</p></td>
// 			<td className="tr5 td124"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td125"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td32"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td126"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="5" className="tr5 td127"><p className="p2 ft0">b. Office Symbol: <span className="ft5">USACE</span></p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr3 td128"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="3" className="tr3 td129"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="5" className="tr3 td130"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="3" className="tr3 td131"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td132"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td49"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td73"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="3" className="tr3 td73"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="4" className="tr3 td133"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td61"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="3" className="tr3 td65"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td129"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="3" className="tr3 td134"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td69"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td70"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td135"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td71"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td72"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td73"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td136"><p className="p1 ft3">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="12" className="tr5 td137"><p className="p6 ft0">c. Hand Receipt Account Number: <span className="ft5">555444555</span></p></td>
// 			<td className="tr5 td120"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="10" className="tr5 td138"><p className="p7 ft0">d. Work Phone Number:<span className="ft5">(787) </span><span className="ft5" style={{whiteSpace: "nowrap"}} >399-6630</span></p></td>
// 			<td colspan="10" className="tr5 td139"><p className="p1 ft0">c. Hand Receipt Account Number: <span className="ft5">555444555</span></p></td>
// 			<td className="tr5 td32"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td126"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="5" className="tr5 td127"><p className="p7 ft0">d. Work Phone Number:<span className="ft5">(787) </span><span className="ft5" style={{whiteSpace: "nowrap"}}>399-6630</span></p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr3 td128"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td49"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td140"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td73"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td54"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td49"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td141"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td54"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td132"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td49"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td57"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td142"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td140"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td143"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td54"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td144"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td61"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td145"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td64"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td129"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td142"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td68"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td69"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td146"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td71"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td72"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td73"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td136"><p className="p1 ft3">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr2 td147"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="2" className="tr2 td148"><p className="p8 ft0">4.</p></td>
// 			<td className="tr2 td46"><p className="p9 ft0">5.</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td149"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td119"><p className="p9 ft0">6.</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td149"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td37"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td150"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr2 td151"><p className="p10 ft0">7. Nomenclature</p></td>
// 			<td className="tr2 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td122"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td152"><p className="p11 ft0">8. Cond</p></td>
// 			<td colspan="2" className="tr2 td153"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr2 td154"><p className="p1 ft0">9. Serial</p></td>
// 			<td colspan="2" className="tr2 td150"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td155"><p className="p12 ft0">10.</p></td>
// 			<td className="tr2 td125"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="2" className="tr2 td34"><p className="p13 ft0">11.</p></td>
// 			<td className="tr2 td156"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr2 td45"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr2 td157"><p className="p1 ft0">12. Document Number/</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr6 td147"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="2" className="tr6 td148"><p className="p1 ft0">Item No.</p></td>
// 			<td colspan="4" className="tr6 td158"><p className="p14 ft0">Bar Tag No.</p></td>
// 			<td className="tr6 td149"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr6 td159"><p className="p15 ft0">Catalog</p></td>
// 			<td className="tr6 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td149"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td37"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="5" className="tr6 td160"><p className="p16 ft7"><span className="ft6">(</span>include make, model<span className="ft6">)</span></p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td122"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td152"><p className="p17 ft0">Code</p></td>
// 			<td colspan="2" className="tr6 td153"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr6 td154"><p className="p18 ft0">Number</p></td>
// 			<td colspan="2" className="tr6 td150"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td155"><p className="p19 ft0">ACQ. Date</p></td>
// 			<td className="tr6 td125"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr6 td161"><p className="p16 ft0">ACQ. Price</p></td>
// 			<td className="tr6 td45"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr6 td157"><p className="p20 ft0">Control ID#</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr3 td128"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td49"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td162"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="5" className="tr3 td163"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="5" className="tr3 td164"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td57"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td142"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td54"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td56"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td143"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td53"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td54"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td144"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td165"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td145"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td64"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td166"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="2" className="tr3 td142"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td167"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td69"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td70"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td63"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td168"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td72"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td73"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td74"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td169"><p className="p1 ft3">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr7 td170"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td171"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td172"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td173"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td174"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td176"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td177"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td178"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td176"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td179"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td177"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td180"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td181"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td176"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td179"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td182"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td176"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td183"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td184"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td185"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td186"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td187"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td188"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td189"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td190"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td191"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td192"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td193"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td194"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td195"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td196"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td174"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td197"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td198"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr8 td128"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td50"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td146"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td73"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td199"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td141"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td56"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td199"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td57"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td142"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td56"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td143"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td144"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td165"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td200"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td63"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td64"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td65"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td201"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td67"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td167"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td69"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td70"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td63"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td168"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td72"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td73"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td74"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr8 td169"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr7 td170"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td171"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td172"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td173"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td174"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td176"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td177"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td178"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td176"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td179"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td177"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td180"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td181"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td176"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td179"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td182"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td176"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td183"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td184"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td185"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td186"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td187"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td188"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td189"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td190"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td175"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td191"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td192"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td193"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td194"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td195"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td196"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td174"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td197"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr7 td198"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="2" className="tr6 td202"><p className="p6 ft0">13a.</p></td>
// 			<td colspan="13" className="tr6 td203"><p className="p1 ft0">Individual/Vendor Removing or Recieving Property:</p></td>
// 			<td className="tr6 td150"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td204"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td122"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr6 td205"><p className="p1 ft0">b. Date</p></td>
// 			<td className="tr6 td206"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="4" className="tr6 td207"><p className="p2 ft0">c. Signature</p></td>
// 			<td className="tr6 td124"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td125"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td32"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td27"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td44"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td45"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td46"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td47"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td208"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="2" className="tr9 td209"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="6" className="tr9 td210"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td141"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td56"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td57"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td142"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td56"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td143"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td144"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="4" className="tr9 td211"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="4" className="tr9 td212"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td68"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td69"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td70"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td63"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td71"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td72"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr9 td73"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="2" className="tr9 td136"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="2" className="tr10 td213"><p className="p1 ft8">&nbsp;</p></td>
// 			<td colspan="6" className="tr10 td214"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td100"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td101"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td102"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td103"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td104"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td100"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td215"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td216"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td102"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td103"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td104"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td106"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td102"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td103"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td217"><p className="p1 ft8">&nbsp;</p></td>
// 			<td colspan="8" className="tr10 td218"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td111"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td112"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td113"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td114"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td115"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td116"><p className="p1 ft8">&nbsp;</p></td>
// 			<td className="tr10 td105"><p className="p1 ft8">&nbsp;</p></td>
// 			<td colspan="2" className="tr10 td117"><p className="p1 ft8">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="2" className="tr6 td202"><p className="p6 ft0">14a.</p></td>
// 			<td colspan="6" className="tr6 td219"><p className="p1 ft0">Losing HRH Signature</p></td>
// 			<td className="tr6 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td119"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td37"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td150"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td120"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td204"><p className="p2 ft0">b. Date</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td122"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="8" className="tr6 td123"><p className="p1 ft0">15a. Gaining HRH Signature</p></td>
// 			<td className="tr6 td124"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td125"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td32"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td27"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td44"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td45"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td23"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="2" className="tr6 td220"><p className="p2 ft0">b. Date</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr11 td128"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td50"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td51"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td73"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td141"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td56"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td57"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td142"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td132"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="4" className="tr11 td133"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr11 td221"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td64"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td65"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td66"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td67"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td68"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td69"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td70"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td63"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td71"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td72"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td52"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td74"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td169"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr5 td76"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td77"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td78"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td79"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td80"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td82"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td222"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td223"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td82"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td85"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td222"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td224"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td84"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td82"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td85"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="7" className="tr5 td225"><p className="p21 ft7"><span className="ft9">Transfer </span>(PBO use only<span className="ft6">)</span></p></td>
// 			<td className="tr5 td91"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td92"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td93"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td226"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td227"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td228"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td229"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td230"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td231"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td232"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td80"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td95"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr5 td96"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="2" className="tr3 td213"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="6" className="tr3 td214"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td100"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td101"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td102"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td103"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td104"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td100"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td215"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td216"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td102"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="3" className="tr3 td233"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td102"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td103"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td217"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="8" className="tr3 td218"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td111"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td112"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td113"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td114"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td115"><p className="p1 ft3">&nbsp;</p></td>
// 			<td className="tr3 td116"><p className="p1 ft3">&nbsp;</p></td>
// 			<td colspan="3" className="tr3 td234"><p className="p1 ft3">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="2" className="tr1 td202"><p className="p6 ft0">16a.</p></td>
// 			<td colspan="6" className="tr1 td219"><p className="p1 ft0">Losing Command:</p></td>
// 			<td className="tr1 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td119"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td37"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td26"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr1 td151"><p className="p1 ft0">b. UIC:</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td122"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="8" className="tr1 td123"><p className="p1 ft0">17a. Gaining Command:</p></td>
// 			<td className="tr1 td124"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td125"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td32"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td27"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td44"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td235"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr1 td157"><p className="p2 ft0">b. UIC:</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="4" className="tr12 td236"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td73"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td54"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td49"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td141"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td54"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td56"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td49"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td57"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td58"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td54"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td56"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td143"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td54"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td144"><p className="p1 ft10">&nbsp;</p></td>
// 			<td colspan="3" className="tr12 td221"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td64"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td65"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td66"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td67"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td68"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td69"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td70"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td63"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td71"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td237"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td73"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td74"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td169"><p className="p1 ft10">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="4" className="tr1 td238"><p className="p6 ft0">c. Ship From:</p></td>
// 			<td className="tr1 td46"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td119"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td37"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td150"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td204"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td122"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr1 td205"><p className="p1 ft0">c. Ship To:</p></td>
// 			<td className="tr1 td28"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td29"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td30"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td31"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td124"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td125"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td32"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td27"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td44"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td45"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td46"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td47"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td208"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="4" className="tr12 td236"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td73"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td54"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td49"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td141"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td54"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td56"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td49"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td57"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td142"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td54"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td56"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td143"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td54"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td144"><p className="p1 ft10">&nbsp;</p></td>
// 			<td colspan="3" className="tr12 td221"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td64"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td65"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td66"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td67"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td68"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td69"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td70"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td63"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td71"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td72"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td73"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td74"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td169"><p className="p1 ft10">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="4" className="tr1 td238"><p className="p6 ft0">d. PBO:</p></td>
// 			<td className="tr1 td46"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td119"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td37"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td150"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td204"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td122"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr1 td205"><p className="p1 ft0">d. PBO:</p></td>
// 			<td className="tr1 td28"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td29"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td30"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td31"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td124"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td125"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td32"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td27"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td44"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td45"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td46"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td47"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr1 td208"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="12" className="tr12 td239"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td56"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td49"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td57"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td142"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td54"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td56"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td143"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td53"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td54"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td144"><p className="p1 ft10">&nbsp;</p></td>
// 			<td colspan="8" className="tr12 td240"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td68"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td69"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td70"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td63"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td71"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td72"><p className="p1 ft10">&nbsp;</p></td>
// 			<td className="tr12 td73"><p className="p1 ft10">&nbsp;</p></td>
// 			<td colspan="2" className="tr12 td136"><p className="p1 ft10">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="12" className="tr6 td137"><p className="p6 ft0">e. Losing Command Signature</p></td>
// 			<td className="tr6 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td37"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td150"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td120"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td204"><p className="p2 ft0">f. Date</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td122"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="8" className="tr6 td123"><p className="p1 ft0">e. Gaining Command Signature</p></td>
// 			<td className="tr6 td124"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td125"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td32"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td27"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td44"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td45"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td23"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="2" className="tr6 td220"><p className="p2 ft0">f. Date</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr13 td128"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td50"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td51"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td73"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td141"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td56"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td57"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td142"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td132"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="4" className="tr13 td133"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr13 td221"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td64"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td65"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td66"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td67"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td68"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td69"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td70"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td63"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td71"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td72"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td52"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td74"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr13 td169"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr14 td76"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td77"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td78"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td79"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td80"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td82"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td222"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td223"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td82"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td85"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td222"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td224"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td84"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td82"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td85"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="7" className="tr14 td225"><p className="p21 ft7"><span className="ft9">Logistics </span>(supply use only<span className="ft6">)</span></p></td>
// 			<td className="tr14 td91"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td92"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td93"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td226"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td81"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td227"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td228"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td229"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td230"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td231"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td232"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td80"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td95"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td96"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="2" className="tr15 td213"><p className="p1 ft11">&nbsp;</p></td>
// 			<td colspan="6" className="tr15 td214"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td100"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td101"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td102"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td103"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td104"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td100"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td215"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td216"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td102"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td103"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td104"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td106"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td102"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td103"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td217"><p className="p1 ft11">&nbsp;</p></td>
// 			<td colspan="3" className="tr15 td241"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td242"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td243"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td244"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td245"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td102"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td111"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td112"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td113"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td114"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td115"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td116"><p className="p1 ft11">&nbsp;</p></td>
// 			<td className="tr15 td105"><p className="p1 ft11">&nbsp;</p></td>
// 			<td colspan="2" className="tr15 td117"><p className="p1 ft11">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="2" className="tr6 td202"><p className="p6 ft0">18a.</p></td>
// 			<td colspan="6" className="tr6 td219"><p className="p1 ft0">Received By</p></td>
// 			<td className="tr6 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td119"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td37"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td150"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td120"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td204"><p className="p2 ft0">b. Date</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td122"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="3" className="tr6 td205"><p className="p1 ft0">19a. Posted By</p></td>
// 			<td className="tr6 td28"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td29"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td30"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td31"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td124"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td125"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td32"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td27"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td44"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td45"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr6 td23"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="2" className="tr6 td220"><p className="p2 ft0">b. Date</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr11 td128"><p className="p1 ft2">&nbsp;</p></td>
// 			<td colspan="2" className="tr11 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td51"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td73"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td141"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td56"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td57"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td142"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td132"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td143"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td144"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td61"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td200"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td63"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td64"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td65"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td66"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td67"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td68"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td69"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td70"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td63"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td71"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td72"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td52"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td74"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr11 td169"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td className="tr16 td48"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td50"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td51"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td73"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td141"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td56"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td49"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td57"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td142"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td56"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td143"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td54"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td60"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td61"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td200"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td63"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td64"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td65"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td66"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td67"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td53"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td68"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td69"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td70"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td63"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td71"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td72"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td73"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td74"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr16 td75"><p className="p1 ft2">&nbsp;</p></td>
// 		</tr>
// 		<tr>
// 			<td colspan="8" className="tr14 td246"><p className="p2 ft12">ENG FORM 4900, JUL 2016</p></td>
// 			<td className="tr14 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td119"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td21"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td37"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td150"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td36"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td204"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td24"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td25"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td39"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td40"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td247"><p className="p1 ft2">&nbsp;</p></td>
// 			<td className="tr14 td27"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td28"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td29"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td30"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td31"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td24"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td124"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td125"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td32"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td27"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td44"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td45"><p className="p1 ft2">&nbsp;</p></td>
// 		<td className="tr14 td46"><p className="p1 ft2">&nbsp;</p></td>
// 		{/* <td colspan="2" className="tr14 td248"><p className="p22 ft0">Page 2 of 2</p></td> */}
// 		</tr>
// 		</table>
// 		</div>
// 		{/* <div id="id1_2">
		
// 		<p className="p23 ft13">This HTML is created from PDF at <a href="https://www.pdfonline.com/convert-pdf-to-html/" style={{whiteSpace: "nowrap"}}>https://www.pdfonline.com/convert-pdf-to-html/</a></p>
// 		</div> */}
// </div>
// 		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	};
};

export default connect(mapStateToProps)(AddProduct);
