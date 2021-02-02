import React, { Component } from 'react';
// import API from "../axios/Api";
// import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { login } from '../publics/actions/users';
import { connect } from 'react-redux';
import logo from '../login.svg';

export class Login extends Component {
	state = {
		email: '',
		password: ''
		// token: ""
	};

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = async () => {
		window.event.preventDefault();
		await this.props.dispatch(login(this.state));
		this.setState({
			token: this.props.users.usersProfile
		});
		// console.log(this.props.users.usersProfile)

		localStorage.setItem('auth', this.props.users.token.data.token);
		if (localStorage.getItem('auth') === 'undefined') {
			confirmAlert({
				title: 'Email or Password Incorrect!',
				message: 'Try Again?',
				buttons: [
					{
						label: 'Yes',
						onClick: () => {}
					},
					{
						label: 'No',
						onClick: () => {
							this.props.history.push('/home');
						}
					}
				]
			});
		} else {
			this.props.history.push('/products');
			// window.location.replace('/products')
		}
	};

	render() {
		return (
			<div>
				<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
					<div className="row">
						<div className="card-body" style={{ paddingLeft: '350px' }}>
							<div className="card" style={{ position: 'relative', width: '50%' }}>
								<div className="form">
									<h2 style={{ textAlign: 'center', marginTop: '20px' }}>Login User</h2>
									<div style={{ width: '100%', height: '100%', padding: '20px' }}>
										<img id="logo" src={logo} alt="" style={{ width: '100%', height: '100%' }} />
									</div>
									<br />
									<form onSubmit={this.handlerSubmit}>
										<table>
											<tbody>
												<tr>
													<td>
														<input
															type="text"
															name="email"
															className="form-control"
															placeholder="Enter Email"
															onChange={this.handlerChange}
															style={{ width: '100%', padding: '12px' }}
														/>
													</td>
												</tr>
												<br />
												<tr>
													<td>
														<input
															type="password"
															name="password"
															placeholder="Enter Password"
															className="form-control"
															onChange={this.handlerChange}
															style={{ width: '100%', padding: '12px' }}
														/>
													</td>
												</tr>
												<br />
												<tr>
													<td>
														<input
															type="submit"
															value="Login"
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
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	};
};

export default connect(mapStateToProps)(Login);
