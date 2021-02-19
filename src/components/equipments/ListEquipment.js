import React from 'react';
import '../../App.css';

const EquipmentList = (props) => 
	(
	
	<table className="table">
		<thead>
			<tr>
				<th>HRA Name</th>
				<th>HRA ID</th>
				<th>Item Type</th>
				<th>Bar Tag Number</th>
				<th>Employee Holding Equipment</th>
				{/* <th>Actions</th> */}
			</tr>
		</thead>
		<tbody>
			{props.equipments && props.equipments.length > 0 ? (
				props.equipments.map((equipment) => (
					<tr key={equipment.id}>
						<td>{equipment.hra_full_name}</td>
						<td>{equipment.hra_num}</td>
						<td>{equipment.item_type}</td>
						<td>{equipment.bar_tag_num}</td>
						<td>{equipment.employee_full_name}</td>
						{/* <td className="center-align">
							<button
								className="waves-effect waves-light btn-small"
								//onClick={() => props.editRow(equipment)}
							>
								edit
							</button>

							<button
								className="waves-effect waves-light btn-small red darken-4"
								//onClick={() => props.deleteEquipment(equipment.id)}
							>
								delete
							</button>
						</td> */}
					</tr>
				))
			) : (
				<tr>
					<td style={{ textAlign: 'center', paddingLeft: '40px' }} colSpan={3}>
						{props.equipments[1]}Equipments is Empty
					</td>
				</tr>
			)}
		</tbody>
	</table>
);

export default EquipmentList;