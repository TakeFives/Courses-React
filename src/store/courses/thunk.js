import {
	getCourses,
	addCourse,
	editCourse,
	deleteCourse,
} from './actionCreators';
import {
	fetchAllCourses,
	fetchCreateCourse,
	fetchDeleteCourse,
	fetchUpdateCourse,
} from '../../servises';

export function fetchCoursesThunk() {
	return async function fetchAllCoursesThunk(dispatch) {
		const response = await fetchAllCourses();
		dispatch(getCourses(response.result));
	};
}

export function fetchCreateCourseThunk(course) {
	return async function fetchCreateNewCourseThunk(dispatch) {
		const response = await fetchCreateCourse(course);
		dispatch(addCourse(response.result));
	};
}

export function fetchUpdateCourseThunk(id, course) {
	return async function fetchUpdateOldCourseThunk(dispatch) {
		const response = await fetchUpdateCourse(id, course);
		dispatch(editCourse(response.result));
	};
}

export function fetchDeleteCourseThunk(id) {
	return async function fetchDeleteOldCourseThunk(dispatch) {
		const response = await fetchDeleteCourse(id);
		response.id = id;
		dispatch(deleteCourse(response));
	};
}
