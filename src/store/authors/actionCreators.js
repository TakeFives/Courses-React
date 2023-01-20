import { ADD_AUTHOR, GET_AUTHOR, GET_AUTHORS } from './actionTypes';

export function getAuthors(authors) {
	return { type: GET_AUTHORS, payload: authors };
}
export function getAuthor(author) {
	return { type: GET_AUTHOR, payload: author };
}
export function addAuthor(author) {
	return { type: ADD_AUTHOR, payload: author };
}
