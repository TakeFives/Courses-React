import {
	getCourses,
	getCourse,
	addCourse,
	editCourse,
	deleteCourse,
} from './actionCreators';
import {
	fetchAllCourses,
	fetchCourseById,
	fetchCreateCourse,
	fetchDeleteCourse,
	fetchUpdateCourse,
} from '../../services';

export function fetchCoursesThunk() {
	return async function fetchAllCoursesThunk(dispatch) {
		const response = await fetchAllCourses();
		dispatch(getCourses(response.result));
	};
}
export function fetchCourseThunk(id) {
	return async function fetchOneCourseThunk(dispatch) {
		const response = await fetchCourseById(id);
		dispatch(getCourse(response.result));
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
