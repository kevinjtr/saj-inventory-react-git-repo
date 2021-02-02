import React from 'react';
// import { Link } from 'react-router-dom';
// import errorImage from '../img/errorImage.svg';
// import API from "../axios/Api";

import 'react-confirm-alert/src/react-confirm-alert.css';

function CardProductHome({ product }) {
	return (
		<div className="container" style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '21px' }}>
			<div className="col-md-12 card" style={{ textAlign: 'left', margin: 10 }}>
				<h3 style={{ marginTop: '20px' }}>{product.product_name}</h3>
				<hr />
				<img
					src={product.image}
					alt=""
					// onError={() => {
					//   product.image = errorImage;
					//   forceUpdate();
					// }}
				/>
				<p>Quantity: {product.quantity}</p>
				<small>Description: {product.description}</small>
				<div />
				<br />
			</div>
		</div>
	);
}

export default CardProductHome;
