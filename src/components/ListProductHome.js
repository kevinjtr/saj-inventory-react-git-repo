import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from "axios";
import CardProductHome from './CardProductHome';
import '../img/style.css';
import { getProducts } from '../publics/actions/products';
import { Spinner, Container } from 'react-bootstrap';

import TextField from './forms/textfield'
import { makeStyles } from '@material-ui/core/styles';

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

	tfSubmit = () => {
		console.log('submit')
	};

	render() {
		const renderData = this.state.products.map((product) => {
			return <CardProductHome product={product} key={product.id} refresh={this.componentDidMount} />;
		});

		console.log(this.state.products)

		return this.props.products.isLoading ? (
			<Container>
				<Spinner animation="border" variant="info" style={{ position: 'absolute', left: '50%', top: '35%' }} />
			</Container>
		) : (
			<div>
				<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
					{/* <TextField onClick={this.tfSubmit}/> */}
					<h2>Home</h2>
					
					<br />
					<br />
					{/* <div>
						<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
							<h3 style={{ justifyContent: 'center' }}>List Of Available Products1111</h3>
							<div className="card-title">
								<div style={{ justifyContent: 'center' }}>{renderData}</div>
							</div>
						</div>
					</div> */}
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
