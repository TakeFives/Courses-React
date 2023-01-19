import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../selectors';

function PrivateRouter({ children, redirectPath }) {
	const user = useSelector(getUser);

	if (user.role !== 'admin') {
		alert('Only admins have access to this feature');
		return <Navigate to={redirectPath} replace />;
	}

	return children;
}

export default PrivateRouter;
