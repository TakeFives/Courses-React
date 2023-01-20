const coursesInitialState = [];

export default function coursesReduser(state = coursesInitialState, action) {
	switch (action.type) {
		case 'GET_COURSES':
			return action.payload;
		case 'GET_COURSE':
			return [...state, action.payload];
		case 'ADD_COURSE':
			return [...state, action.payload];
		case 'DELETE_COURSE':
			const index = state.findIndex((c) => c.id === action.payload.id);
			if (index > -1) {
				state.splice(index, 1);
			}
			return [...state];
		case 'EDIT_COURSE':
			const newState = state.map((course) => {
				if (course.id === action.payload.id) {
					return { ...action.payload };
				}
				return course;
			});
			return newState;
		default:
			return state;
	}
}
