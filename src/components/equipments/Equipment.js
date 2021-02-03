import React, { Component } from 'react';
import qs from 'querystring';

import api from '../../axios/Api';

import EquipmentList from './ListEquipment';
//import AddEquipmentForm from './addEquipment';
//import EditEquipmentForm from './EditEquipment';
import Axios from 'axios';

class Equipment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			equipments: [],
			currentEquipment: { id: null, item_type: '' },
			editing: false
		};
	}

	componentDidMount() {
		this.refreshEquipmentList();
	}

	refreshEquipmentList() {
		console.log('equipmentDataCALL')
		this.equipmentData = api.get('equipment', this.state).then((response) => response.data).then((data) => {
			console.log(data)
			this.setState({
				equipments: data.status != 400 ? data.values: data,
				setequipment: data
			});
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

	render() {
        const { equipments } = this.state;
        console.log(equipments)
		return (
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
		);
	}
}

export default Equipment;
