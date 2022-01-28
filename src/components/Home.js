import React, { Component } from 'react';
import '../img/style.css';
import Header from './Header'
import { connect } from 'redux-bundler-react';

function Home({userName})  {
		return (
			<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
				{/* <TextField onClick={this.tfSubmit}/> */}
				{/* <h2>Home</h2> */}
				<h2>Welcome {userName}</h2>
				<h4>You're currently in the Home Page</h4>
				{/* <img src="usace-inventory.png" alt="image" />
				<br />
				<br /> */}
				{/* <div>
					<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
						<h3 style={{ justifyContent: 'center' }}>List Of Available Products1111</h3>
						<div className="card-title">
							<div style={{ justifyContent: 'center' }}>{renderData}</div>
						</div>
					</div>
				</div> */}
			</div>
		);
}

export default connect(
	'selectUserName',
	Home);  
