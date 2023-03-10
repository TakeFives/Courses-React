import {
	ADD_COURSE,
	DELETE_COURSE,
	EDIT_COURSE,
	GET_COURSES,
	GET_COURSE,
} from './actionTypes';

export function getCourses(courses) {
	return { type: GET_COURSES, payload: courses };
}
export function getCourse(course) {
	return { type: GET_COURSE, payload: course };
}
export function addCourse(course) {
	return { type: ADD_COURSE, payload: course };
}
export function deleteCourse(course) {
	return { type: DELETE_COURSE, payload: course };
}
export function editCourse(course) {
	return { type: EDIT_COURSE, payload: course };
}
