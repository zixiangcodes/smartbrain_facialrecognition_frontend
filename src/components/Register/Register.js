import React from 'react';
import './Register.css';

// Add this line at the top of your file, after the imports
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			error: ''
		}
	}

	onNameChange = (event) => {
		this.setState({ name: event.target.value })
	}

	onEmailChange = (event) => {
		this.setState({ email: event.target.value })
	}

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value })
	}

	onSubmitSignIn = () => {
		this.setState({ error: '' }); // Clear any previous errors
		fetch(`${BACKEND_URL}/register`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
			.then(response => {
				if (!response.ok) {
					return response.json().then(err => Promise.reject(err));
				}
				return response.json();
			})
			.then(data => {
				if (data.user && data.user.id) {
					this.props.loadUser(data.user)
					this.props.onRouteChange('Home');
				} else {
					this.setState({ error: 'Registration failed. Please try again.' });
				}
			})
			.catch(error => {
				console.error('Error:', error);
				this.setState({ error: error.error || 'An error occurred. Please try again later.' });
			});
	}

	render() {
		return (
			<article className="register-form">
				<main className="register-main">
					<div className="register-content">
						<fieldset id="sign_up" className="register-fieldset">
							<legend className="register-legend">Register</legend>
							{this.state.error && <div className="error-message">{this.state.error}</div>}
							<div className="input-group">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									name="name"
									id="name"
									onChange={this.onNameChange}
								/>
							</div>
							<div className="input-group">
								<label htmlFor="email-address">Email</label>
								<input
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="input-group">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									name="password"
									id="password"
									onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="register-button-container">
							<input
								onClick={this.onSubmitSignIn}
								className="register-button"
								type="submit"
								value="Register"
							/>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Register;