import { addAuthor, getAuthor, getAuthors } from './actionCreators';
import {
	fetchAllAuthors,
	fetchAllAuthorById,
	fetchCreateAuthor,
} from '../../services';

export function fetchAuthorsThunk() {
	return async function fetchAllAuthorsThunk(dispatch) {
		const response = await fetchAllAuthors();
		dispatch(getAuthors(response.result));
	};
}
export function fetchAuthorThunk(id) {
	return async function fetchOneAuthorsThunk(dispatch) {
		const response = await fetchAllAuthorById(id);
		dispatch(getAuthor(response.result));
	};
}
export function fetchCreateAuthorThunk(author) {
	return async function fetchCreateNewAuthorThunk(dispatch) {
		const response = await fetchCreateAuthor(author);
		console.log(response);
		dispatch(addAuthor(response.result));
	};
}
