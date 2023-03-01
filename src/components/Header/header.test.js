import Header from './Header';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';

function renderWithStore(initialState) {
	const middlewares = [thunk];

	const mockStore = configureStore(middlewares);
	const store = mockStore(initialState);

	render(
		<BrowserRouter>
			<Provider store={store}>
				<Header />
			</Provider>
		</BrowserRouter>
	);
}

describe('Header should have a logo and user`s name', () => {
	const name = 'Some name';

	beforeEach(() => {
		renderWithStore({
			user: {
				id: 1,
				name: name,
			},
		});
	});

	test('renders a logo in Header component', () => {
		const logo = screen.getByAltText(/logo/i);
		expect(logo).toBeInTheDocument();
	});
	test('renders a user`s name in Header component', () => {
		const username = screen.getByText(name, { exact: false });
		expect(username).toBeInTheDocument();
	});
	test('user`s name tag in Header component not to be empty', () => {
		const username = screen.getByText(name, { exact: false });
		expect(username).not.toBeEmptyDOMElement();
	});
});

describe('Header should handle welcome stranger without user', () => {
	beforeEach(() => {
		renderWithStore({});
	});

	test('renders a `welcome, stranger` in Header component', () => {
		const stranger = screen.getByText('stranger', { exact: false });
		expect(stranger).toBeInTheDocument();
	});
	test('renders a `log in button` in Header component', () => {
		const loginButton = screen.getByText('Log in', { exact: false });
		expect(loginButton).toBeInTheDocument();
	});
});

describe('Header should handle `login/out` button click', () => {
	test('if no user navigates to login component', async () => {
		renderWithStore({});
		const loginButton = screen.getByText('Log in', { exact: false });
		const user = userEvent.setup();
		await user.click(loginButton);
		expect(window.location.pathname).toBe('/login');
	});
	test('if user navigates to login', async () => {
		renderWithStore({
			user: {
				id: 1,
				name: 'test',
				isAuth: true,
			},
		});
		const logoutButton = screen.getByText('Log out', { exact: false });
		const user = userEvent.setup();
		await user.click(logoutButton);
		expect(window.location.pathname).toBe('/');
	});
});
