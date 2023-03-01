import reducer from './reducer';
import * as actions from './actionCreators';

describe('courses reducer', () => {
	const coursesInitialState = [];

	const courses = [
		{
			id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
			title: 'JavaScript',
			description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
			creationDate: '8/3/2021',
			duration: 160,
			authors: [
				'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
				'f762978b-61eb-4096-812b-ebde22838167',
			],
		},
		{
			id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
			title: 'Angular',
			description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
			creationDate: '10/11/2020',
			duration: 210,
			authors: [
				'df32994e-b23d-497c-9e4d-84e4dc02882f',
				'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
			],
		},
	];

	it('returns correct default state', () => {
		const givenState = undefined;
		const givenAction = { type: 'SOME_ACTION' };
		const newState = reducer(givenState, givenAction);
		expect(newState).toEqual(coursesInitialState);
	});

	it('should handle ADD_COURSE and returns new state.', () => {
		const givenState = undefined;
		const givenAction = actions.addCourse(courses[0]);
		const newState = reducer(givenState, givenAction);
		expect(newState).toEqual([courses[0]]);
		expect(newState).not.toEqual(coursesInitialState);
	});
	it('should handle GET_COURSE and returns new state.', () => {
		const givenState = [1, 2];
		const givenAction = actions.getCourse(courses[0]);
		const newState = reducer(givenState, givenAction);
		expect(newState).toEqual([1, 2, courses[0]]);
	});
	it('should handle EDIT_COURSE and returns new state.', () => {
		const editedCourse = { ...courses[0], title: 'New Title' };
		const givenState = courses;
		const givenAction = actions.editCourse(editedCourse);
		const newState = reducer(givenState, givenAction);
		expect(newState).toEqual([editedCourse, courses[1]]);
	});
	it('should handle DELETE_COURSE and returns new state.', () => {
		const givenState = [1, 2, courses[0]];
		const givenAction = actions.deleteCourse(courses[0]);
		const newState = reducer(givenState, givenAction);
		expect(newState).toEqual([1, 2]);
		expect(newState).not.toEqual([1, 2, courses[0]]);
	});
	it('should handle NOT DELETE_COURSE and returns new state.', () => {
		const givenState = [1, 2, courses[1]];
		const givenAction = actions.deleteCourse(courses[0]);
		const newState = reducer(givenState, givenAction);
		expect(newState).toEqual([1, 2, courses[1]]);
	});
	it('should handle GET_COURSES and returns new state', () => {
		const givenState = undefined;
		const givenAction = actions.getCourses(courses);
		const newState = reducer(givenState, givenAction);
		expect(newState).toEqual(courses);
	});
});
