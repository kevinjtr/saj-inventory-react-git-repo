import React from 'react';
import '../../App.css';

const CategoryTable = (props) => (
	<table className="table">
		<thead>
			<tr>
				<th>ID Categories</th>
				<th>Name</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{props.categories && props.categories.length > 0 ? (
				props.categories.map((category) => (
					<tr key={category.id}>
						<td>{category.id}</td>
						<td>{category.name}</td>
						<td className="center-align">
							<button
								className="waves-effect waves-light btn-small"
								onClick={() => props.editRow(category)}
							>
								edit
							</button>

							<button
								className="waves-effect waves-light btn-small red darken-4"
								onClick={() => props.deleteCategory(category.id)}
							>
								delete
							</button>
						</td>
					</tr>
				))
			) : (
				<tr>
					<td style={{ textAlign: 'center', paddingLeft: '40px' }} colSpan={3}>
						{props.categories[1]}Categories is Empty
					</td>
				</tr>
			)}
		</tbody>
	</table>
);

export default CategoryTable;
