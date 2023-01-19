const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export default function userReduser(state = userInitialState, action) {
	switch (action.type) {
		case 'GET_USER':
			if (action.payload.successful) {
				return {
					isAuth: true,
					name: action.payload.result.name,
					email: action.payload.result.email,
					token: localStorage.getItem('token'),
					role: action.payload.result.role,
				};
			}
			return userInitialState;
		case 'LOGIN_USER':
			return {
				isAuth: true,
				name: action.payload.user.name,
				email: action.payload.user.email,
				token: action.payload.result,
				role: action.payload.user.role,
			};
		case 'LOGOUT_USER':
			return userInitialState;
		default:
			return state;
	}
}
