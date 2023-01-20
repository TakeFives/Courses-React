export const getCourses = (state) => state.courses;
export const getAuthors = (state) => state.authors;
export const getUser = (state) => state.user;

export const getCourseAuthors = (state, authorsIds) => {
	return state.authors.filter((author) => {
		return authorsIds.indexOf(author.id) !== -1;
	});
};
export const selectCourseById = (state, courseId) => {
	return (
		state.courses &&
		state.courses.find((course) => {
			return courseId?.indexOf(course.id) !== -1;
		})
	);
};
