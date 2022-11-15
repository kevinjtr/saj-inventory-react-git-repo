import React, { Component } from 'react';
// import API from "../axios/Api";
import { connect } from 'react-redux';
import { addProduct } from '../publics/actions/products';
import api from '../axios/Api';

export class AddProduct extends Component {

	constructor(props) {
		super(props);

		this.state = {
			product_name: '',
			description: '',
			image: '',
			id_category: '',
			quantity: '',
			categories: [],
		};
	}

	componentDidMount() {
		this.refreshCategoryTable();
	}

	refreshCategoryTable() {
		this.categoriesData = api.get('categories', this.state).then((response) => response.data).then((data) => {
			this.setState({
				categories: data.status != 400 ? data.values: data,
				setCategories: data
			});
			//console.log(this.state.categories.values);
			// console.log(this.props, this.state);
		});
	}

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = async () => {
		window.event.preventDefault();
		await this.props.dispatch(addProduct(this.state));
		this.props.history.push('/products');
	};

	render() {

		const {categories} = this.state
		let categoriesDropDownItems = null

		console.log(this.props)

		if(categories.length > 0 && categories != undefined){
			categoriesDropDownItems = categories.map((c, i)=>{
				return(
					<option value={c.id} name="id_category">
					{c.name}
					</option>
				)
			  })
		}

		return (
			<div className="container">
				<h2>Add Product</h2>
				<br />
				<form onSubmit={this.handlerSubmit}>
					<table>
						<tbody>
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
							<tr>
								<td>Description</td>
								<td>
									<select
										id="list"
										name="description"
										value={this.state.description}
										className="form-control"
										onChange={this.handlerChange}
									/>
									{/* <option value="">----- Description -----</option>
                    <option value="Registered">Registered</option>
                    <option value="Unregistered">Unregistered</option>
                    <option value="In Process">In Process</option>
                  </select> */}
								</td>
							</tr>
							<br />
							<tr>
								<td>Image</td>
								<td>
									<input
										type="text"
										name="image"
										className="form-control"
										onChange={this.handlerChange}
									/>
								</td>
							</tr>
							<br />
							<tr>
								<td>Category</td>
								<td>
									<select
										id="list"
										name="id_category"
										className="form-control"
										onChange={this.handlerChange}
									>
										<option value="">----- Category -----</option>
										{categoriesDropDownItems}
									</select>
								</td>
							</tr>
							<br />
							<tr>
								<td>Quantity</td>
								<td>
									<input
										type="text"
										name="quantity"
										className="form-control"
										onChange={this.handlerChange}
									/>
								</td>
							</tr>
							<br />
							<tr>
								<td />
								<td>
									<input
										type="submit"
										value="Add"
										// className="form-control"
										className="btn btn-primary"
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
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
