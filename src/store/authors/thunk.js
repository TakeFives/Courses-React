import { addAuthor, getAuthors } from './actionCreators';
import fetchAllAuthors, { fetchCreateAuthor } from '../../services';

export function fetchAuthorsThunk() {
	return async function fetchAllAuthorsThunk(dispatch) {
		const response = await fetchAllAuthors();
		dispatch(getAuthors(response.result));
	};
}
export function fetchCreateAuthorThunk(author) {
	return async function fetchCreateNewAuthorThunk(dispatch) {
		const response = await fetchCreateAuthor(author);
		console.log(response);
		dispatch(addAuthor(response.result));
	};
}
