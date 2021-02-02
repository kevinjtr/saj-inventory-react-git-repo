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
    
    let btPrint = ""
    product.barTags.map(function(x,i){
        btPrint = (i!=1 ? btPrint + ", " + x : x)
    })

	return (
		<div className="container" style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '21px' }}>
			<div className="col-md-12 card" style={{ textAlign: 'left', margin: 10 }}>
            <div style={{display:'inline'}}>
            {/* <img src={product.image} alt="" style={{height:"25%",width:"25%",display:'inline'}} /> */}
				<h4 style={{ marginTop: '20px' }}>ENG4900 - Doc Num:</h4>
                <h4 >{product.id}</h4>
            </div>
            
				<hr />
				
				<h6>Bar Tags Quantity: {product.quantity}</h6>
                <small>HRA Name: {product.hraName}</small>
                <small>Bar Tags: </small>
                <small>{btPrint} </small>
				<div className="row" style={{ margin: 3,marginTop:'10px' }}>
					<Link /*to={'/edit/' + product.id}*/ style={{ margin: 2 }}>
						<input type="submit" value="View" className="btn btn-primary" />
					</Link>
					<Link onClick={deleteConfirm} style={{ margin: 2 }}>
						<input type="submit" value="Edit" className="btn btn-warning" />
					</Link>
				</div>
				<br />
			</div>
		</div>
	);
}

export default CardProduct;
