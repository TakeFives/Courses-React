import Header from './Header';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';

const name = 'Some name';

const initialState = {
	user: {
		id: 1,
		name: name,
	},
};
const mockStore = configureStore([]);
const store = mockStore(initialState);

const headerWrapped = (
	<Provider store={store}>
		<Header />
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

describe('Header should have logo and user`s name.', () => {
	test('renders a logo in Header component', () => {
		render(headerWrapped, { wrapper: BrowserRouter }, container);

		const logo = screen.getByAltText(/logo/i);
		expect(logo).toBeInTheDocument();
	});
	test('renders a user`s name in Header component', () => {
		render(headerWrapped, { wrapper: BrowserRouter }, container);

		const username = screen.getByText(name, { exact: false });
		expect(username).toBeInTheDocument();
	});
	test('user`s name tag in Header component not to be ampty', () => {
		render(headerWrapped, { wrapper: BrowserRouter }, container);

		const username = screen.getByText(name, { exact: false });
		expect(username).not.toBeEmptyDOMElement();
	});
});
