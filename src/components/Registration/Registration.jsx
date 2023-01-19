import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import './registration.css';

function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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

	function formValidation() {
		let isValid = true;

		if (password.length < 6) {
			isValid = false;
		}

		return isValid;
	}

	return (
		<div className='registration-container wrapper'>
			<h1>Registration</h1>
			<form className='registration-form' onSubmit={handleSubmit}>
				<Input
					type='text'
					name='name'
					labelText='Name'
					placeholder='Enter name'
					id='name'
					onChange={(event) => setName(event.target.value)}
					required={true}
				/>
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
	);
}

export default Registration;
