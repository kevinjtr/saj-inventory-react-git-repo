import React, { Component } from 'react';
// import API from "../axios/Api";
import { register } from '../publics/actions/users';
import { connect } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import logo from '../login.svg';

export class Register extends Component {
	state = {
		full_name: '',
		email: '',
		password: ''
		// date_added: ""
	};

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = async () => {
		window.event.preventDefault();
		await this.props.dispatch(register(this.state));
		// await API.post("/register", this.state);
		console.log(this.state);

		confirmAlert({
			title: 'Register Success',
			message: 'Get Products?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						this.props.history.push('/login');
					}
				},
				{
					label: 'No',
					onClick: () => {
						this.props.history.push('/home');
					}
				}
			]
		});
		// this.props.history.push("/");
	};

	render() {
		return (
			<div className="container" style={{ textAlign: 'center' }}>
				<div className="row">
					<div className="card-body" style={{ paddingLeft: '350px' }}>
						<div className="card" style={{ position: 'relative', width: '50%' }}>
							<div className="form">
								<h2 style={{ textAlign: 'center', marginTop: '20px' }}>Register User</h2>
								<img
									id="logo"
									src={logo}
									alt=""
									style={{ width: '100%', height: '100%', width: '21em' }}
								/>
								<br />
								<br />
								<form onSubmit={this.handlerSubmit}>
									<table>
										<tbody>
											<tr>
												<td>
													<input
														type="text"
														name="full_name"
														className="form-control"
														placeholder="Enter Full Name"
														onChange={this.handlerChange}
													/>
												</td>
											</tr>
											<br />
											<tr>
												<td>
													<input
														type="text"
														name="email"
														className="form-control"
														placeholder="Enter Email"
														onChange={this.handlerChange}
													/>
												</td>
											</tr>
											<br />
											<tr>
												<td>
													<input
														type="password"
														name="password"
														className="form-control"
														placeholder="Enter Password"
														onChange={this.handlerChange}
													/>
												</td>
											</tr>
											<br />
											<tr>
												<td>
													<input
														type="submit"
														value="Sign Up"
														className="btn btn-primary"
														style={{ marginBottom: '20px' }}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</form>
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
		users: state.users
	};
};

export default connect(mapStateToProps)(Register);
