import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Courses from './Courses';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

let initialState = {
	user: {
		isAuth: true,
		name: 'Admin4ik',
		email: 'admin@email.com',
		token:
			'Bearer JMYB3CjoWx/OQdpjBVFicYaaK8GotDz/KKnFkEfWVX3kkvaq4HVzCng33Tu36L80v5MHoO6apFTm4r3uVQ/Wy+lOAMAithPU05znCLOvRNbtIZnggv1IzvFvL9GBLwqgWmMHhZHGkDwvpcYhaBPLX6ed7r4qHpU2v7dRl6NYCunggnktZZ8L0S2CPcXxssekzmqfaTCZvDOctvo0wElX+dsFW7C/QzZpn4klupF4jqMZXRCfNxxPzmFi7ALBYG1wb8dkjY5xZqy2pfk94IrdVjTLHf/Gn2LuyomLJd87LwxM/rwQe8iH6fbFZnEZUfSTMTyAbtybxZ8Sm9VruPQaVw==',
		role: 'admin',
	},
	courses: [
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
	],
	authors: [
		{
			id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			name: 'Test Author 1',
		},
		{
			id: 'f762978b-61eb-4096-812b-ebde22838167',
			name: 'Test Author 2',
		},
	],
};

function renderWithStore(initialStoreState) {
	const middlewares = [thunk];

	const mockStore = configureStore(middlewares);
	const store = mockStore(initialStoreState);

	render(
		<BrowserRouter>
			<Provider store={store}>
				<Courses />
			</Provider>
		</BrowserRouter>
	);
}

describe('Course list should display courses correctly', () => {
	test('renders courses display amount of CourseCard equal length of courses array', () => {
		renderWithStore(initialState);
		const courses = screen.getAllByTestId('test-course-card');
		expect(courses).toHaveLength(initialState.courses.length);
	});
	test('renders courses display Empty container if courses array length is 0.', () => {
		renderWithStore({
			...initialState,
			courses: [],
		});
		expect(screen.queryByTestId('test-courses-list')).toBeEmptyDOMElement();
	});
});

describe('Course list should display courses correctly according to search', () => {
	beforeEach(() => {
		renderWithStore(initialState);
	});
	test('Input for search term is in DOM', () => {
		const inputSearch = screen.getByPlaceholderText('Enter course name...', {
			selector: 'input',
			exact: false,
		});
		expect(inputSearch).toBeInTheDocument();
	});
	test('Button "Search" is in DOM', () => {
		const buttonSearch = screen.getByText('Search', {
			selector: 'button',
			exact: false,
		});
		expect(buttonSearch).toBeInTheDocument();
	});
	test('Entering search term in search input chages it`s value', async () => {
		const searchTerm = 'React';
		const inputSearch = screen.getByPlaceholderText('Enter course name...', {
			selector: 'input',
			exact: false,
		});
		const user = userEvent.setup();
		await user.type(inputSearch, searchTerm);
		expect(inputSearch.value).toBe(searchTerm);
	});
	test('Search button calls handler with wrong searchterm', async () => {
		const searchTerm = 'React';
		const inputSearch = screen.getByPlaceholderText('Enter course name...', {
			selector: 'input',
			exact: false,
		});
		const buttonSearch = screen.getByText('Search', {
			selector: 'button',
			exact: false,
		});
		const user = userEvent.setup();
		await user.type(inputSearch, searchTerm);
		await user.click(buttonSearch);
		expect(inputSearch.value).toBe(searchTerm);
		expect(screen.queryByTestId('test-courses-list')).toBeEmptyDOMElement();
	});
	test('Search button calls handler with correct searchterm', async () => {
		const searchTerm = 'Angular';
		const inputSearch = screen.getByPlaceholderText('Enter course name...', {
			selector: 'input',
			exact: false,
		});
		const buttonSearch = screen.getByText('Search', {
			selector: 'button',
			exact: false,
		});
		const user = userEvent.setup();
		await user.type(inputSearch, searchTerm);
		await user.click(buttonSearch);
		const courses = screen.getAllByTestId('test-course-card');
		expect(inputSearch.value).toBe(searchTerm);
		expect(screen.queryByTestId('test-courses-list')).not.toBeEmptyDOMElement();
		expect(courses).toHaveLength(1);
	});
	test('Search button calls handler with no searchterm', async () => {
		const inputSearch = screen.getByPlaceholderText('Enter course name...', {
			selector: 'input',
			exact: false,
		});
		const buttonSearch = screen.getByText('Search', {
			selector: 'button',
			exact: false,
		});
		inputSearch.value = 'some text';
		const user = userEvent.setup();
		await user.clear(inputSearch);
		await user.click(buttonSearch);
		const courses = screen.getAllByTestId('test-course-card');
		expect(screen.queryByTestId('test-courses-list')).not.toBeEmptyDOMElement();
		expect(courses).toHaveLength(initialState.courses.length);
	});
	test('Clearing search input shows all courses', async () => {
		const courses = screen.getAllByTestId('test-course-card');
		const inputSearch = screen.getByPlaceholderText('Enter course name...', {
			selector: 'input',
			exact: false,
		});
		inputSearch.value = 'react';
		const user = userEvent.setup();
		await user.clear(inputSearch);
		expect(screen.queryByTestId('test-courses-list')).not.toBeEmptyDOMElement();
		expect(courses).toHaveLength(initialState.courses.length);
	});
});

describe('CourseForm should be showed after a click on a button "Add new course".', () => {
	beforeEach(() => {
		renderWithStore(initialState);
	});
	test('Button "Add new course" is in DOM', () => {
		const button = screen.getByText('Add course', {
			selector: 'button',
			exact: false,
		});
		expect(button).toBeInTheDocument();
	});
	test('Button "Add new course" calls onClick when clicked', async () => {
		const user = userEvent.setup();
		await user.click(screen.getByTestId('add-course-link'));
		expect(window.location.pathname).toBe('/courses/add');
	});
});
