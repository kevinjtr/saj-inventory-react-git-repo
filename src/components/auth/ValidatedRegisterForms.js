import React from 'react';
import { Formik } from 'formik';
// import * as EmailValidator from 'email-validator';
import * as Yup from 'yup';
import loginImg from '../../login.svg';
import API from '../auth/API';
import '../../App.scss';
import { connect } from 'react-redux';
import { register } from '../../publics/actions/users';

export class ValidatedRegisterForms extends React.Component {
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		await this.props.register(this.state);
	};
	// handleSubmit = async () => {
	// 	window.event.preventDefault();
	// 	await API.post('/register', this.state).then((response) =>
	// 		this.setState({
	// 			full_name: this.state.full_name,
	// 			email: this.state.email,
	// 			password: this.state.passsword
	// 		})
	// 	);
	// 	// console.log(this.state.token);
	// 	// console.log(this.state);
	// 	// this.props.history.push('/About');
	// };
	render() {
		return (
			<div>
				<Formik
					initialValues={{ full_name: '', email: '', password: '' }}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							// console.log('Successfully Create Users!');
							setSubmitting(true);
						}, 500);
						this.props.registerUser(values);
						// console.log(this.values);
					}}
					//********Handling validation messages yourself*******/
					// validate={values => {
					//   let errors = {};
					//   if (!values.email) {
					//     errors.email = "Required";
					//   } else if (!EmailValidator.validate(values.email)) {
					//     errors.email = "Invalid email address";
					//   }

					//   const passwordRegex = /(?=.*[0-9])/;
					//   if (!values.password) {
					//     errors.password = "Required";
					//   } else if (values.password.length < 8) {
					//     errors.password = "Password must be 8 characters long.";
					//   } else if (!passwordRegex.test(values.password)) {
					//     errors.password = "Invalida password. Must contain one number";
					//   }

					//   return errors;
					// }}
					//********Using Yum for validation********/

					validationSchema={Yup.object().shape({
						full_name: Yup.string()
							.required('Please enter Full Name!')
							.min(5, 'Fullname is too short - should be 5 chars minimum.'),
						// .matches(/(?=.*[0-9])/, 'Fullname must contain a number.'),
						email: Yup.string().email().required('Please enter email!'),
						password: Yup.string()
							.required('No password provided.')
							.min(8, 'Password is too short - should be 8 chars minimum.')
							.matches(/(?=.*[0-9])/, 'Password must contain a number.')
					})}
				>
					{(props) => {
						const { values, touched, errors, isSubmitting, handleBlur, handleSubmit, handleChange } = props;
						return (
							<form onSubmit={handleSubmit}>
								<div className="base-container">
									<div className="header">Register</div>
									<div className="content">
										<div className="image">
											<img src={loginImg} alt="logo" />
										</div>
										<div className="form">
											<div className="form-group">
												{/* <label htmlFor="full_name">Full Name</label> */}
												<input
													name="full_name"
													type="text"
													placeholder="Enter Your Full Name"
													value={values.full_name}
													onChange={handleChange}
													onBlur={handleBlur}
													className={errors.full_name && touched.full_name && 'error'}
												/>
											</div>
											{errors.full_name &&
											touched.full_name && (
												<div className="input-feedback">{errors.full_name}</div>
											)}
											<div className="form-group">
												{/* <label htmlFor="email">Email</label> */}
												<input
													name="email"
													type="text"
													placeholder="Enter your email"
													value={values.email}
													onChange={handleChange}
													onBlur={handleBlur}
													className={errors.email && touched.email && 'error'}
													autoComplete="off"
												/>
											</div>
											{errors.email &&
											touched.email && <div className="input-feedback">{errors.email}</div>}
											<div className="form-group">
												{/* <label htmlFor="password">Password</label> */}
												<input
													name="password"
													type="password"
													placeholder="Enter your password"
													value={values.password}
													onChange={handleChange}
													onBlur={handleBlur}
													className={errors.password && touched.password && 'error'}
												/>
											</div>
											{errors.password &&
											touched.password && <div className="input-feedback">{errors.password}</div>}
										</div>
									</div>
								</div>
								<button type="submit" className="btn" disabled={isSubmitting}>
									Register
								</button>
							</form>
						);
					}}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	};
};

export default connect(mapStateToProps, { register })(ValidatedRegisterForms);
