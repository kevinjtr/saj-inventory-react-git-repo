import React, { Component } from 'react';
import '../img/style.css';

export class Home extends Component {

	render() {

		return (
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

export default Home;
