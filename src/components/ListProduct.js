import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
// import CardProductHome from "./CardProductHome";
import CardProduct from './CardProduct';
import '../img/style.css';
import { getProducts } from '../publics/actions/products';
import { Spinner, Container } from 'react-bootstrap';

export class ListProduct extends Component {
	state = {
		products: [],
		sort: localStorage.getItem('sort') || 'asc',
		sortBy: localStorage.getItem('sortBy') || 'id',
		limit: localStorage.getItem('limit') || 9,
		page: localStorage.getItem('page') || 1,
		search: localStorage.getItem('search') || ''
	};

	componentDidMount = async () => {
		const { sort, sortBy, limit, page, search } = this.state;
		await this.props.dispatch(getProducts(sort, sortBy, limit, page, search));
		console.log(this.props.products.productList.data.data);
		// .then(response =>
		this.setState({
			products: this.props.products.productList.data.data
		});
		// );
		// console.log(this.state);
	};

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = () => {
		localStorage.setItem('sortBy', this.state.sortBy);
		localStorage.setItem('sort', this.state.sort);
		localStorage.setItem('limit', this.state.limit);
		localStorage.setItem('page', this.state.page);
		localStorage.setItem('search', this.state.search);
	};

	render() {
		const renderData = this.state.products.map((product) => {
			return <CardProduct product={product} key={product.id} refresh={this.componentDidMount} />;
		});

		return this.props.products.isLoading ? (
			<Container>
				<h4>
					<Spinner animation="grow" variant="info" />
				</h4>
			</Container>
		) : (
			<div>
				<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
					<br />
					<form onSubmit={this.handlerSubmit}>
						<table>
							{/* <tbody> */}
							<tr>
								<td>
									<select
										id="list"
										name="sortBy"
										value={this.state.sortBy}
										className="form-control"
										onChange={this.handlerChange}
									>
										<option value="">----- SORT BY -----</option>
										<option value="id">sort by - ID</option>
										<option value="name">sort by - NAME</option>
										<option value="category">sort by - CATEGORY</option>
										<option value="quantity">sort by - QUANTITY</option>
									</select>
								</td>
								{/* </tr> */}
								{/* <tr> */}
								{/* <td>limit</td> */}
								<td>
									<select
										id="list"
										name="limit"
										value={this.state.limit}
										className="form-control"
										onChange={this.handlerChange}
									>
										<option value="">----- LIMIT -----</option>
										<option value="3">limit - 3</option>
										<option value="6">limit - 6</option>
										<option value="9">limit - 9</option>
										<option value="12">limit - 12</option>
										<option value="18">limit - 18</option>
									</select>
								</td>
								{/* </tr> */}
								{/* <tr> */}
								{/* <td>page</td> */}
								<td>
									<select
										id="list"
										name="page"
										value={this.state.page}
										className="form-control"
										onChange={this.handlerChange}
									>
										<option value="">----- PAGE -----</option>
										<option value="1">page - 1</option>
										<option value="2">page - 2</option>
										<option value="3">page - 3</option>
										<option value="4">page - 4</option>
										<option value="5">page - 5</option>
									</select>
								</td>
								{/* </tr> */}
								{/* <tr> */}
								{/* <td>Sort</td> */}
								<td>
									<select
										id="list"
										name="sort"
										value={this.state.sort}
										className="form-control"
										onChange={this.handlerChange}
									>
										<option value="">----- SORT -----</option>
										<option value="asc">ASCENDING</option>
										<option value="desc">DESCENDING</option>
									</select>
								</td>
								{/* </tr> */}
								{/* <tr> */}
								{/* <td>Search</td> */}
								<td>
									<input
										type="text"
										name="search"
										defaultValue=""
										value={this.state.search}
										className="form-control"
										onChange={this.handlerChange}
									/>
								</td>
								{/* </tr> */}
								{/* <tr> */}
								<td />
								<td>
									<input type="submit" value="Show" className="btn btn-success" />
								</td>
							</tr>
							{/* </tbody> */}
						</table>
					</form>
					<br />
					<br />
					<div>
						<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
							<h3 style={{ justifyContent: 'center' }}>List Of Available Products2222</h3>
							<div className="card-title">
								<div style={{ justifyContent: 'center' }}>{renderData}</div>
							</div>
						</div>
					</div>
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
export default connect(mapStateToProps)(ListProduct);
