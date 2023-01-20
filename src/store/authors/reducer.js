const authorsInitialState = [];

export default function authorsReduser(state = authorsInitialState, action) {
	switch (action.type) {
		case 'GET_AUTHORS':
			return action.payload;
		case 'GET_AUTHOR':
			return [...state, action.payload];
		case 'ADD_AUTHOR':
			return [...state, action.payload];
		case 'DELETE_AUTHOR':
			const index = state.findIndex((a) => a.id === action.payload.author.id);
			if (index > -1) {
				state.splice(index, 1);
			}
			return [...state];
		default:
			return state;
	}
}
