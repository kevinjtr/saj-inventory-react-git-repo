import Axios from 'axios';

const token = window.localStorage.getItem('auth');

export const getProducts = (sort, sortBy, limit, page, search) => {
	return {
		type: 'GET_PRODUCTS',
		payload: Axios.get(`/products?sort=${sort}&sortBy=${sortBy}&limit=${limit}&page=${page}&search=${search}`)
	};
};

export const getProductsAuth = (sort, sortBy, limit, page, search) => {
	return {
		type: 'GET_PRODUCTS_AUTH',
		payload: Axios.get(`/products?sort=${sort}&sortBy=${sortBy}&limit=${limit}&page=${page}&search=${search}`, {
			headers: {
				auth: token
			}
		})
	};
};

export const getProductById = (productid) => {
	return {
		type: 'GET_PRODUCT_BY_ID',
		payload: Axios.get(`${process.env.REACT_APP_API}/products/${productid}/reduce=1`, {
			headers: {
				auth: token
			}
		})
	};
};

export const addQty = (productid) => {
	return {
		type: 'ADD_PRODUCT_QTY',
		payload: Axios.patch(`${process.env.REACT_APP_API}/products/${productid}/add=1`, {
			headers: {
				auth: token
			}
		})
	};
};

export const reduceQty = (productid) => {
	return {
		type: 'REDUCE_PRODUCT_QTY',
		payload: Axios.patch(`${process.env.REACT_APP_API}/products/${productid}/reduce=1/`, {
			headers: {
				auth: token
			}
		})
	};
};

export const addProduct = (data) => {
	return {
		type: 'ADD_PRODUCT',
		payload: Axios.post(`${process.env.REACT_APP_API}/products/`, data, {
			headers: {
				auth: token
			}
		})
	};
};

export const editProduct = (productid, data) => {
	return {
		type: 'EDIT_PRODUCT',
		payload: Axios.patch(`/products/${productid}`, data, {
			headers: {
				auth: token
			}
		})
	};
};

export const deleteProduct = (productid) => {
	return {
		type: 'DELETE_PRODUCT',
		payload: Axios.delete(`${process.env.REACT_APP_API}/products/${productid}`, {
			headers: {
				auth: token
			}
		})
	};
};
