import React from 'react';
import './SignIn.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			error: null,
		}
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value })
	}

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value })
	}

	onSubmitSignIn = async (event) => {
		event.preventDefault(); // Prevent form default submission

		try {
			console.log('Attempting to sign in with:', {
				email: this.state.signInEmail,
				password: this.state.signInPassword
			});

			const response = await fetch(`${BACKEND_URL}/signin`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Remove Accept header if not needed
				},
				body: JSON.stringify({
					email: this.state.signInEmail,
					password: this.state.signInPassword
				}),
				// Remove credentials unless you're actually using cookies
				// credentials: 'include' 
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Check for the success status and user data structure from your backend
			if (data.status === 'success' && data.user) {
				this.props.loadUser(data.user);
				this.props.onRouteChange('Home');
			} else {
				throw new Error(data.message || 'Failed to sign in. Please check your credentials.');
			}
		} catch (error) {
			console.error('SignIn Error:', error);
			this.setState({
				error: error.message || 'An error occurred while signing in. Please try again.'
			});
		}
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="signin-container">
				<main className="signin-main">
					<form className="signin-form" onSubmit={this.onSubmitSignIn}>
						<fieldset id="sign_up">
							<legend>[ SIGN IN ]</legend>
							<div className="form-group">
								<label htmlFor="email-address">Email</label>
								<input
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									name="password"
									id="password"
									onChange={this.onPasswordChange}
									required
								/>
							</div>
						</fieldset>
						<div className="signin-button">
							<button
								type="submit"
								className="signin-submit">
								Login
							</button>
						</div>
						{this.state.error && (
							<p className="error-message">{this.state.error}</p>
						)}
						<div className="new-account-button-container">
							<input
								onClick={() => onRouteChange('register')}
								className="new-account-button"
								type="submit"
								value="New Account"
							/>
						</div>
					</form>
				</main>
			</article>

		);
	}
}

export default SignIn;