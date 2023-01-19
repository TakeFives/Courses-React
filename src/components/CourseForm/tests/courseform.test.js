import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseForm from '../CourseForm';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { unmountComponentAtNode } from 'react-dom';
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
		{
			id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
			name: 'Test Author 3',
		},
		{
			id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
			name: 'Test Author 4',
		},
	],
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

const user = userEvent.setup();

const courseFormWrapped = (
	<Provider store={store}>
		<CourseForm />
	</Provider>
);

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

describe('CourseForm should display info correctly', () => {
	test('should show authors lists (all and course authors).', () => {
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		const authors = screen.getAllByTestId('authors-list-item');
		expect(authors).toHaveLength(initialState.authors.length);
	});
	test('renders courses display Empty container if courses array length is 0.', () => {
		initialState.authors = [];
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		expect(screen.getByTestId('authors-list')).toBeEmptyDOMElement();
		initialState.authors = [
			{
				id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
				name: 'Test Author 1',
			},
			{
				id: 'f762978b-61eb-4096-812b-ebde22838167',
				name: 'Test Author 2',
			},
			{
				id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
				name: 'Test Author 3',
			},
			{
				id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
				name: 'Test Author 4',
			},
		];
	});
});

describe('CourseForm `Create author` click button should call dispatch.', () => {
	test('`Create author` button to be in DOM', () => {
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		const button = screen.getByTestId('add-author-button');
		expect(button).toBeInTheDocument();
	});
	test('`Create author` input to be in DOM with no value', () => {
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		const input = screen.getByTestId('add-author-input');
		expect(input).toBeInTheDocument();
		expect(input.value).toEqual('');
	});
	test('`Create author` input to recieve typed value', async () => {
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		const name = 'Test';
		const input = screen.getByTestId('add-author-input');
		await user.type(input, name);
		expect(input.value).toEqual('Test');
	});
	test('`Create author` button to dispatch call when user entered new author name', async () => {
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		const name = 'Test';
		const input = screen.getByTestId('add-author-input');
		await user.type(input, name);
		const button = screen.getByTestId('add-author-button');
		await user.click(button);
		expect(mockDispatch).toHaveBeenCalled();
		expect(mockDispatch).toBeCalledTimes(1);
	});
	test('`Create author` button not to dispatch call if there is no new author name entered by user', async () => {
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		const input = screen.getByTestId('add-author-input');
		expect(input.value).toEqual('');
		const button = screen.getByTestId('add-author-button');
		await user.click(button);
		expect(mockDispatch).not.toHaveBeenCalled();
		expect(mockDispatch).toBeCalledTimes(0);
	});
});

describe('CourseForm `Add author` button click should add an author to course authors list.', () => {
	test(' `Add author` button to be in DOM', () => {
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		const name = 'Test Author 3';
		const button = screen.getByTestId(`select-author-${name}`);
		expect(button).toBeInTheDocument();
	});
	test('`Add author` button click sadds author to course authors list', async () => {
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		const name = 'Test Author 3';
		const button = screen.getByTestId(`select-author-${name}`);
		await user.click(button);
		const selectedAuthorsList = screen.getByTestId('course-authors-list');
		expect(screen.getAllByTestId('authors-list-item')).toHaveLength(
			initialState.authors.length - 1
		);
		const authorFound = within(selectedAuthorsList).getByText(name);
		expect(authorFound).toBeTruthy();
	});
});

describe('CourseForm `Delete author` button click should remove an author from course authors list.', () => {
	test(' `Delete author` button to be in DOM', async () => {
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		const name = 'Test Author 3';
		const buttonAdd = screen.getByTestId(`select-author-${name}`);
		await user.click(buttonAdd);
		const buttonDel = screen.getByTestId(`remove-author-${name}`);
		expect(buttonDel).toBeInTheDocument();
	});
	test('`Delete author` button click sadds author to course authors list', async () => {
		render(courseFormWrapped, { wrapper: BrowserRouter }, container);
		const name = 'Test Author 3';
		const buttonAdd = screen.getByTestId(`select-author-${name}`);
		await user.click(buttonAdd);
		const buttonDel = screen.getByTestId(`remove-author-${name}`);
		await user.click(buttonDel);
		const selectedAuthorsList = screen.getByTestId('course-authors-list');
		expect(
			within(selectedAuthorsList).getByText(`Author list is empty`)
		).toBeTruthy();
	});
});
