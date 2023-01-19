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

	function formValidation() {
		let isValid = true;

		if (password.length < 6) {
			isValid = false;
		}

		return isValid;
	}

	return (
		<div className='login-container wrapper'>
			<h1>Login</h1>
			<form className='login-form' onSubmit={handleSubmit}>
				<Input
					type='text'
					name='email'
					labelText='Email'
					placeholder='Enter email'
					id='email'
					onChange={(event) => setEmail(event.target.value)}
					required={true}
				/>
				<Input
					type='text'
					name='password'
					labelText='Password'
					placeholder='Enter password'
					id='password'
					onChange={(event) => setPassword(event.target.value)}
					required={true}
				/>
				<Button buttonText='Login' type='submit' disabled={!formValidation()} />
				<span>
					If you don't have an account you can{' '}
					<Link to={'/registration'}>Register</Link>
				</span>
			</form>
		</div>
	);
}

export default Login;
