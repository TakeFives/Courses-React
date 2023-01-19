import { GET_USER, LOGIN_USER, LOGOUT_USER } from './actionTypes';

export function getUser(user) {
	return { type: GET_USER, payload: user };
}
export function loginUser(user) {
	return { type: LOGIN_USER, payload: user };
}
export function logoutUser(user) {
	return { type: LOGOUT_USER, payload: user };
}
