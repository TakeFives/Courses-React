import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import './registration.css';

function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [touchedName, setTouchedName] = useState(false);
	const [touchedEmail, setTouchedEmail] = useState(false);
	const [touchedPassword, setTouchedPassword] = useState(false);
	const [touchedConfirmPassword, setTouchedComfirmPassword] = useState(false);
	let error = null;

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		const isValid = formValidation();

		const newUser = {
			name,
			password,
			email,
		};

		if (isValid) {
			fetch('http://localhost:4000/register', {
				method: 'POST',
				body: JSON.stringify(newUser),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					if (!data.successful) {
						throw new Error(data.errors);
					}
					console.log(data);
					navigate('/login');
				})
				.catch((error) => {
					alert(error);
				});
		}
	}
	function nameValidation() {
		let isValid = true;
		if (name.length === 0) {
			error = 'Name is required';
			isValid = false;
		}
		if (name.length < 2 && name.length > 0) {
			error = 'Name must be as least 2 characters long';
			isValid = false;
		}
		if (name.match('[0-9]+')) {
			error = 'Name must not include numbers';
			isValid = false;
		}
		return isValid;
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
		if (confirmPassword !== password) {
			error = 'Passwords do not match';
			isValid = false;
		}
		return isValid;
	}

	function formValidation() {
		let isValid = true;

		if (!passwordValidation()) {
			isValid = false;
		}
		if (!emailValidation()) {
			isValid = false;
		}
		if (!nameValidation()) {
			isValid = false;
		}
		return isValid;
	}

	return (
		<div className='wrapper'>
			<div className='registration-container'>
				<form className='registration-form' onSubmit={handleSubmit}>
					<h1>Registration</h1>
					<Input
						type='text'
						name='name'
						labelText='Name'
						placeholder='Enter name'
						id='name'
						onChange={(event) => setName(event.target.value)}
						required
						onBlur={() => setTouchedName(true)}
						className={
							touchedName
								? nameValidation()
									? 'valid'
									: 'invalid'
								: 'untouched'
						}
						inputHint={
							!touchedName ? 'Name should be at least 2 characters' : null
						}
						inputError={touchedName ? (nameValidation() ? null : error) : null}
					/>
					<Input
						type='text'
						name='email'
						labelText='Email'
						placeholder='Enter email'
						id='email'
						onChange={(event) => setEmail(event.target.value)}
						required
						onBlur={() => setTouchedEmail(true)}
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
					<Input
						type='text'
						name='confirm-password'
						labelText='Confirm password'
						placeholder='Enter password to confirm'
						id='confirm-password'
						onChange={(event) => setConfirmPassword(event.target.value)}
						onBlur={() => setTouchedComfirmPassword(true)}
						className={
							touchedConfirmPassword
								? passwordValidation()
									? 'valid'
									: 'invalid'
								: 'untouched'
						}
						required
						inputHint={
							!touchedConfirmPassword
								? 'Password should be at least 6 characters'
								: null
						}
						inputError={
							touchedConfirmPassword
								? passwordValidation()
									? null
									: error
								: null
						}
					/>
					<Button
						buttonText='Registration'
						type='submit'
						disabled={!formValidation()}
					/>
					<span>
						If you have an account you can <Link to={'/login'}>Login</Link>
					</span>
				</form>
			</div>
		</div>
	);
}

export default Registration;
