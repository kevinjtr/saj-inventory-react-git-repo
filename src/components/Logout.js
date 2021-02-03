import React, { Component } from 'react';
import API from '../axios/Api';
// import axios from "axios";

export class Logout extends Component {
	state = {
		email: '',
		password: '',
		token: ''
	};

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = async () => {
		window.event.preventDefault();
		await API.post('/login', this.state).then((response) =>
			this.setState({
				token: response.data.token
			})
		);
		console.log(this.state.token);

		localStorage.setItem('auth', this.state.token);
		// console.log(token);
		this.props.history.push('/home');
	};

	render() {
		return (
			<div className="container">
				<h2>Logout</h2>

				<form onSubmit={this.handlerSubmit}>
					<table>
						<tbody>
							<tr>
								<td />
								<td>
									<input type="submit" value="Logout" className="btn btn-danger" />
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}

export default Logout;
