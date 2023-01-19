import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/logo.png';
import './logo.css';

function Logotype() {
	return (
		<div className='logo-container'>
			<Link to={'/'}>
				<img src={logo} className='logo-image' alt='logo' />
			</Link>
		</div>
	);
}

export default Logotype;
