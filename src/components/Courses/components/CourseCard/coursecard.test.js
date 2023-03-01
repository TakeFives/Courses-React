import CourseCard from './CourseCard';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import userEvent from '@testing-library/user-event';

const course = {
	id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
	title: 'JavaScript',
	description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
	creationDate: '8/3/2021',
	duration: 160,
	authors: [
		'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		'f762978b-61eb-4096-812b-ebde22838167',
	],
};

const user = {
	isAuth: true,
	name: 'Admin4ik',
	email: 'admin@email.com',
	token:
		'Bearer JMYB3CjoWx/OQdpjBVFicYaaK8GotDz/KKnFkEfWVX3kkvaq4HVzCng33Tu36L80v5MHoO6apFTm4r3uVQ/Wy+lOAMAithPU05znCLOvRNbtIZnggv1IzvFvL9GBLwqgWmMHhZHGkDwvpcYhaBPLX6ed7r4qHpU2v7dRl6NYCunggnktZZ8L0S2CPcXxssekzmqfaTCZvDOctvo0wElX+dsFW7C/QzZpn4klupF4jqMZXRCfNxxPzmFi7ALBYG1wb8dkjY5xZqy2pfk94IrdVjTLHf/Gn2LuyomLJd87LwxM/rwQe8iH6fbFZnEZUfSTMTyAbtybxZ8Sm9VruPQaVw==',
	role: 'admin',
};

const initialState = {
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

const mockStore = configureStore([]);
const store = mockStore(initialState);

const courseCardWrapped = (
	<Provider store={store}>
		<CourseCard course={course} user={user} />
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

describe('Course Card should display course details', () => {
	test('renders course title in Course component', () => {
		render(courseCardWrapped, { wrapper: BrowserRouter }, container);
		const title = screen.getByText(/JavaScript/i);
		expect(title).toBeInTheDocument();
	});
	test('renders course description in Course component', () => {
		render(courseCardWrapped, { wrapper: BrowserRouter }, container);

		const description = screen.getByText(course.description, { exact: false });
		expect(description).toBeInTheDocument();
	});
	test('renders course duration in Course component in respective format', () => {
		render(courseCardWrapped, { wrapper: BrowserRouter }, container);

		const duration = screen.getByText('02:40 hours', { exact: false });
		expect(duration).toBeInTheDocument();
	});
	test('renders course authors names in Course component', () => {
		render(courseCardWrapped, { wrapper: BrowserRouter }, container);

		const authors = screen.getByText('Test Author 1, Test Author 2', {
			exact: false,
		});
		expect(authors).toBeInTheDocument();
	});
	test('renders course date in Course component in respective format', () => {
		render(courseCardWrapped, { wrapper: BrowserRouter }, container);

		const date = screen.getByText(course.creationDate, {
			exact: false,
		});
		expect(date).toBeInTheDocument();
	});
});

describe('Course details should be showed after a click on a button "Show course".', () => {
	test('Button "Show course" is in DOM', () => {
		render(courseCardWrapped, { wrapper: BrowserRouter }, container);
		const button = screen.getByText(/show course/i, {
			selector: 'button',
			exact: false,
		});
		expect(button).toBeInTheDocument();
	});
	test('Button "Show course" calls onClick when clicked', async () => {
		render(courseCardWrapped, { wrapper: BrowserRouter });
		const user = userEvent.setup();
		const link = screen.getByTestId('show-course-link');
		await user.click(link);
		expect(window.location.pathname).toBe(
			'/courses/de5aaa59-90f5-4dbc-b8a9-aaf205c551ba'
		);
	});
});
