import React from 'react';
import { Link } from 'react-router-dom';
import API from '../axios/Api';

import '../img/style.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function CardProduct({ product, refresh }) {
	var JWTToken = localStorage.getItem('auth');
	async function deleteProduct() {
		window.event.preventDefault();
		await API.delete('/products/' + product.id, {
			headers: { auth: `${JWTToken}` }
		});
		// await API.delete("/products/users/" + product.id);

		return refresh();
	}

	async function addQuantity() {
		var JWTToken = localStorage.getItem('auth');
		window.event.preventDefault();
		await API.patch(`/products/${product.id}/add=1`, {
			headers: { auth: `${JWTToken}` }
		});
		return refresh();
	}

	async function reduceQuantity() {
		var JWTToken = localStorage.getItem('auth');
		window.event.preventDefault();
		await API.patch(`/products/${product.id}/reduce=1`, {
			headers: { auth: `${JWTToken}` }
		});
		return refresh();
	}

	function deleteConfirm() {
		confirmAlert({
			title: 'Furniture Inventory',
			message: 'Are you sure delete ' + product.product_name + ' ?',
			buttons: [
				{
					label: 'Yes, Delete',
					onClick: () => deleteProduct()
				},
				{
					label: 'No',
					onClick: () => {}
				}
			]
		});
	}

	return (
		<div className="container" style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '21px' }}>
			<div className="col-md-12 card" style={{ textAlign: 'left', margin: 10 }}>
				<h3 style={{ marginTop: '20px' }}>{product.product_name}</h3>
				<hr />
				<img src={product.image} alt="" />
				<h6>Quantity: {product.quantity}</h6>
				<small>Description: {product.description}</small>
				<hr />
				<div className="row" style={{ margin: 3 }}>
					<Link /*to={'/edit/' + product.id}*/ style={{ margin: 2 }}>
						<input type="submit" value="Edit" className="btnku btn-primary" />
					</Link>
					<Link onClick={deleteConfirm} style={{ margin: 2 }}>
						<input type="submit" value="Delete" className="btnku btn-danger" />
					</Link>
					<Link onClick={addQuantity} style={{ margin: 2 }}>
						<input type="submit" value="+" className="btnadd btn-success" />
					</Link>
					<Link onClick={reduceQuantity} style={{ margin: 2 }}>
						<input type="submit" value="-" className="btnadd btn-warning" />
					</Link>
				</div>
				<br />
			</div>
		</div>
	);
}

export default CardProduct;
