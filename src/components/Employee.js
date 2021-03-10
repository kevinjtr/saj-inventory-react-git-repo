import React, { Component } from 'react';
import qs from 'querystring';
import { connect } from 'react-redux';
import { addProduct } from '../publics/actions/eng4900s';
import api from '../axios/Api';
import EmployeeForm from './forms/employee';

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
		//this.refreshEquipmentList();
	}

	refreshEquipmentList() {
		console.log('equipmentDataCALL')
		this.equipmentData = api.get('employee', this.state).then((response) => response.data).then((data) => {
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

	render() {
		//const { equipments } = this.state;

		return(
			<EmployeeForm
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	};
};

export default connect(mapStateToProps)(AddProduct);
