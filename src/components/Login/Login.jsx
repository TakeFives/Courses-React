import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import './login.css';
import { fetchLoginUserThunk } from '../../store/user/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../selectors';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [touchedEmail, setTouchedEmail] = useState(false);
	const [touchedPassword, setTouchedPassword] = useState(false);
	let error = null;
	const user = useSelector(getUser);
	const navigate = useNavigate();

	if (user.isAuth) {
		navigate('/courses');
	}

	const dispatch = useDispatch();

	function handleSubmit(event) {
		event.preventDefault();
		const isValid = formValidation();

		const user = {
			email,
			password,
		};
		if (isValid && !user.isAuth) {
			dispatch(fetchLoginUserThunk(user));
		}
	}
	function emailValidation() {
		let isValid = true;
		// eslint-disable-next-line prettier/prettier
		const reg = /^(?=.{8,252})[\w]+[.\-+]?((([^.]\.)|([^-]-)|([^+]\+))|([\w])|('))*([\w]|[-])@[A-Za-z\d][-.\w]*[A-Za-z\d]\.([A-Za-z]{2,13})$/;

		if (!email) {
			error = 'Email is required';
			isValid = false;
		}
		if (!reg.test(email)) {
			error = 'Email should be valid email adress';
			isValid = false;
		}
		return isValid;
	}

	function passwordValidation() {
		let isValid = true;
		if (!password) {
			error = 'Password is required';
			isValid = false;
		}
		if (password.length < 6 && password.length > 0) {
			error = 'Password should be more than 6 characters';
			isValid = false;
		}
		if (password.length > 10) {
			error = 'Password should be less than 10 characters';
			isValid = false;
		}
		if (password.includes('666')) {
			error = 'Password not contain 666';
			isValid = false;
		}
		return isValid;
	}

	function formValidation() {
		let isValid = true;
		if (!passwordValidation()) {
			isValid = false;
		}
		return isValid;
	}

	return (
		<div className='wrapper'>
			<div className='login-container'>
				<form className='login-form' onSubmit={handleSubmit}>
					<h1>Login</h1>
					<Input
						type='text'
						name='email'
						labelText='Email'
						placeholder='Enter valid email'
						id='email'
						onChange={(event) => setEmail(event.target.value)}
						onBlur={() => setTouchedEmail(true)}
						required
						className={
							touchedEmail
								? emailValidation()
									? 'valid'
									: 'invalid'
								: 'untouched'
						}
						inputHint={
							!touchedEmail ? 'Email should be actual and valid' : null
						}
						inputError={
							touchedEmail ? (emailValidation() ? null : error) : null
						}
					/>
					<Input
						type='text'
						name='password'
						labelText='Password'
						placeholder='Enter password'
						id='password'
						onChange={(event) => setPassword(event.target.value)}
						onBlur={() => setTouchedPassword(true)}
						className={
							touchedPassword
								? passwordValidation()
									? 'valid'
									: 'invalid'
								: 'untouched'
						}
						required
						inputHint={
							!touchedPassword
								? 'Password should be at least 6 characters'
								: null
						}
						inputError={
							touchedPassword ? (passwordValidation() ? null : error) : null
						}
					/>
					<Button
						buttonText='Login'
						type='submit'
						disabled={!formValidation()}
					/>
					<span>
						If you don't have an account you can{' '}
						<Link to={'/registration'}>Register</Link>
					</span>
				</form>
			</div>
		</div>
	);
}

export default Login;
