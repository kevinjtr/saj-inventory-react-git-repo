import React, { Component } from 'react';
import '../img/style.css';
import Header from './Header'

export class Home extends Component {

	render() {

		return (
			<>
			<Header/>
			<div>
				<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
					{/* <TextField onClick={this.tfSubmit}/> */}
					<h2>Home</h2>
					<img src="usace-inventory.png" alt="image" />
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
			</>
		);
	}
}

export default Home;
