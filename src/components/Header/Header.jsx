import Logotype from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import Welcome from './components/Welcome/Welcome';

import './header.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../selectors';

import { fetchLogoutUserThunk } from '../../store/user/thunk';

function Header() {
	const user = useSelector(getUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleLogClick() {
		if (user.isAuth) {
			dispatch(fetchLogoutUserThunk());
			localStorage.clear();
		}
		navigate('/login');
	}

	return (
		<div className='header-container wrapper'>
			<Logotype></Logotype>
			<Welcome username={user.name}></Welcome>
			<Button
				buttonText={user.isAuth ? 'Log out' : 'Log In'}
				onClick={handleLogClick}
			/>
		</div>
	);
}

export default Header;
