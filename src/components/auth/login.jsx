import React from 'react';
import loginImg from '../../login.svg';

const initialState = {
	email: '',
	password: '',
	emailError: '',
	passwordError: ''
};

export class Login extends React.Component {
	state = initialState;

	handleChange = (event) => {
		const isCheckbox = event.target.type === 'checkbox';
		this.setState({
			[event.target.email]: isCheckbox ? event.target.checked : event.target.value
		});
	};

	validate = () => {
		// let nameError = "";
		let emailError = '';
		let passwordError = '';

		if (!this.state.email) {
			emailError = 'Email cannot be blank dude!';
		}

		if (!this.state.password) {
			passwordError = 'Password cannot be blank dude!';
		}

		if (emailError || passwordError || 0) {
			this.setState({ emailError, passwordError });
			return false;
		}

		return true;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			console.log(this.state);
			// clear form
			this.setState(initialState);
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="base-container" ref={this.props.containerRef}>
					<div className="header">Login</div>
					<div className="content">
						<div className="image">
							<img src={loginImg} />
						</div>
						<div className="form">
							<div className="form-group">
								<div style={{ fontSize: 12, color: 'red' }} value={this.state.email}>
									{this.state.emailError}
								</div>
								<label htmlFor="email">Email</label>
								<input
									type="text"
									name="email"
									placeholder="Enter Email"
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group">
								<div style={{ fontSize: 12, color: 'red' }}>{this.state.passwordError}</div>
								<label htmlFor="password">Password</label>
								<input
									type="password"
									name="password"
									placeholder="Enter"
									onChange={this.handleChange}
								/>
							</div>
						</div>
					</div>
					<div className="footer">
						<button type="submit" className="btn">
							Login
						</button>
					</div>
				</div>
			</form>
		);
	}
}
