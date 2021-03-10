import React, { Component } from 'react';
//import Box from '@material-ui/core/Box';
// import API from "../axios/Api";
// import Header from "./Header";Box
import { connect } from 'react-redux';
import { addProduct } from '../publics/actions/eng4900s';
import api from '../axios/Api';
import Eng4900Form from './forms/eng4900';
//import './eng4900.css';

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
		//this.refreshCategoryTable();
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
		return(
			<Eng4900Form/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	};
};

export default connect(mapStateToProps)(AddProduct);
