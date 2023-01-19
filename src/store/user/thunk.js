import { getUser, loginUser, logoutUser } from './actionCreators';
import { fetchLoginUser, fetchGetUser, fetchLogoutUser } from '../../servises';

export function fetchGetUserThunk() {
	return async function fetchGetUserInfoThunk(dispatch) {
		const response = await fetchGetUser();
		dispatch(getUser(response));
	};
}
export function fetchLoginUserThunk(user) {
	return async function fetchLoginOneUserThunk(dispatch) {
		const response = await fetchLoginUser(user);
		console.log(response);
		dispatch(loginUser(response));
		dispatch(fetchGetUserThunk(response.result));
	};
}
export function fetchLogoutUserThunk() {
	return async function fetchLogoutOneUserThunk(dispatch) {
		const response = await fetchLogoutUser();
		console.log(response);
		dispatch(logoutUser(response));
	};
}
