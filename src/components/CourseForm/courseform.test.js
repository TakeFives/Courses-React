import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseForm from './CourseForm';
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

const mockDispatch = jest.fn();
const user = userEvent.setup();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({
		companyId: initialState.courses[0].id,
	}),
	// useRouteMatch: () => ({ url: '/company/company-id1/team/team-id1' }),
}));

function renderWithStore(storeInitialState, mode) {
	const middlewares = [thunk];
	const mockStore = configureStore(middlewares);
	let store = mockStore(storeInitialState);

	render(
		<BrowserRouter>
			<Provider store={store}>
				<CourseForm mode={mode} />
			</Provider>
		</BrowserRouter>
	);
}

describe('CourseForm should display info correctly', () => {
	test('should show authors lists (all and course authors).', () => {
		renderWithStore(initialState, 'create');
		const authors = screen.getAllByTestId('authors-list-item');
		expect(authors).toHaveLength(initialState.authors.length);
	});
	test('renders courses display Empty container if courses array length is 0.', () => {
		renderWithStore({ ...initialState, authors: [] }, 'create');
		expect(screen.getByTestId('authors-list')).toBeEmptyDOMElement();
	});
});

describe('CourseForm `Create author` click button should call dispatch.', () => {
	test('`Create author` button to be in DOM', () => {
		renderWithStore(initialState, 'create');
		const button = screen.getByTestId('add-author-button');
		expect(button).toBeInTheDocument();
	});
	test('`Create author` input to be in DOM with no value', () => {
		renderWithStore(initialState, 'create');
		const input = screen.getByTestId('add-author-input');
		expect(input).toBeInTheDocument();
		expect(input.value).toEqual('');
	});
	test('`Create author` input to recieve typed value', async () => {
		renderWithStore(initialState, 'create');
		const name = 'Test';
		const input = screen.getByTestId('add-author-input');
		await user.type(input, name);
		expect(input.value).toEqual('Test');
	});
	test('`Create author` description textarea to recieve typed value', async () => {
		renderWithStore(initialState, 'create');
		const desc = 'Some new description';
		const textarea = screen.getByPlaceholderText('Enter description');
		await user.type(textarea, desc);
		expect(textarea.value).toEqual(desc);
	});
	test('`Create author` button to dispatch call when user entered new author name', async () => {
		renderWithStore(initialState, 'create');
		const name = 'Test';
		const input = screen.getByTestId('add-author-input');
		await user.type(input, name);
		const button = screen.getByTestId('add-author-button');
		await user.click(button);
		expect(mockDispatch).toHaveBeenCalled();
		expect(mockDispatch).toBeCalledTimes(1);
	});
	test('`Create author` button not to dispatch call if there is no new author name entered by user', async () => {
		renderWithStore(initialState, 'create');
		const input = screen.getByTestId('add-author-input');
		expect(input.value).toEqual('');
		const button = screen.getByTestId('add-author-button');
		await user.click(button);
		expect(mockDispatch).not.toHaveBeenCalled();
		expect(mockDispatch).toBeCalledTimes(0);
	});
});

describe('CourseForm `Add author` button click should add an author to course authors list.', () => {
	beforeEach(() => {
		renderWithStore(initialState, 'create');
	});

	test(' `Add author` button to be in DOM', () => {
		const name = 'Test Author 3';
		const button = screen.getByTestId(`select-author-${name}`);
		expect(button).toBeInTheDocument();
	});
	test('`Add author` button click sadds author to course authors list', async () => {
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
	beforeEach(() => {
		renderWithStore(initialState, 'create');
	});

	test(' `Delete author` button to be in DOM', async () => {
		const name = 'Test Author 3';
		const buttonAdd = screen.getByTestId(`select-author-${name}`);
		await user.click(buttonAdd);
		const buttonDel = screen.getByTestId(`remove-author-${name}`);
		expect(buttonDel).toBeInTheDocument();
	});
	test('`Delete author` button click sadds author to course authors list', async () => {
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

describe('CourseForm should display info correctly on `edit` mode', () => {
	test('should show exact title data of edited course', () => {
		renderWithStore(initialState, 'update');
		const title = screen.getByTestId('course-title');
		expect(title.value).toBe(initialState.courses[0].title);
	});
	test('should handle title change of edited course', async () => {
		renderWithStore(initialState, 'update');
		const title = screen.getByTestId('course-title');
		await user.clear(title);
		await user.type(title, 'test');
		expect(title.value).toBe('test');
	});
	test('should show exact description data of edited course', () => {
		renderWithStore(initialState, 'update');
		const description = screen.getByTestId('course-description');
		expect(description.innerHTML).toBe(initialState.courses[0].description);
	});
	test('should show exact duration data of edited course', () => {
		renderWithStore(initialState, 'update');
		const duration = screen.getByTestId('course-duration');
		expect(+duration.value).toEqual(initialState.courses[0].duration);
	});
});

describe('CourseForm should handle submit on any mode', () => {
	test('`Edit` submit button to be in DOM', () => {
		renderWithStore(initialState, 'update');
		const button = screen.getByTestId('course-submit-button');
		expect(button).toBeInTheDocument();
		expect(button.innerHTML).toBe('Update course');
	});
	test('`Create` submit button to be in DOM', () => {
		renderWithStore(initialState, 'create');
		const button = screen.getByTestId('course-submit-button');
		expect(button).toBeInTheDocument();
		expect(button.innerHTML).toBe('Create course');
	});
	test('Submit button to call handler function on `edit` mode', async () => {
		renderWithStore(initialState, 'update');
		const button = screen.getByTestId('course-submit-button');
		await user.click(button);
		expect(mockDispatch).toHaveBeenCalled();
		expect(mockDispatch).toBeCalledTimes(1);
	});
	test('Submit button to call handler function on `create` mode', async () => {
		renderWithStore(initialState, 'create');
		const course = {
			title: 'React',
			description: `Lorem Ipsum is simply dummy text.`,
			creationDate: '11/11/2020',
			duration: '100',
		};
		const title = screen.getByTestId('course-title');
		const description = screen.getByTestId('course-description');
		const duration = screen.getByTestId('course-duration');
		const buttonSelectAuthor = screen.getByTestId(
			'select-author-Test Author 3'
		);
		const buttonSubmit = screen.getByTestId('course-submit-button');
		await user.type(title, course.title);
		await user.type(description, course.description);
		await user.type(duration, course.duration);
		await user.click(buttonSelectAuthor);
		await user.click(buttonSubmit);
		expect(mockDispatch).toHaveBeenCalled();
		expect(mockDispatch).toBeCalledTimes(1);
	});
	test('Submit button not to call handler function without fill in all data', async () => {
		renderWithStore(initialState, 'create');
		const button = screen.getByTestId('course-submit-button');
		await user.click(button);
		expect(mockDispatch).not.toHaveBeenCalled();
	});
});
