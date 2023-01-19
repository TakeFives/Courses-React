//courses
export function fetchAllCourses() {
	return fetch(`http://localhost:4000/courses/all`)
		.then((res) => res.json())
		.then((data) => data);
}
export function fetchCourseById(courseId) {
	return fetch(`http://localhost:4000/courses/${courseId}`)
		.then((res) => res.json())
		.then((data) => data);
}
export function fetchCreateCourse(course) {
	return fetch(`http://localhost:4000/courses/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
		body: JSON.stringify(course),
	})
		.then((res) => res.json())
		.then((data) => {
			if (!data.successful) {
				throw new Error(data.result);
			}
			alert('Course added successfully');
			return data;
		})
		.catch((error) => {
			alert(error);
		});
}
export function fetchDeleteCourse(id) {
	return fetch(`http://localhost:4000/courses/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (!data.successful) {
				throw new Error(data.result);
			}
			alert('Course deleted successfully');
			return data;
		})
		.catch((error) => {
			alert(error);
		});
}
export function fetchUpdateCourse(id, course) {
	return fetch(`http://localhost:4000/courses/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
		body: JSON.stringify(course),
	})
		.then((res) => res.json())
		.then((data) => {
			if (!data.successful) {
				throw new Error(data.result);
			}
			alert('Course updated successfully');
			return data;
		})
		.catch((error) => {
			alert(error);
		});
}

//authors
export default function fetchAllAuthors() {
	return fetch(`http://localhost:4000/authors/all`)
		.then((res) => res.json())
		.then((data) => data);
}
export function fetchCreateAuthor(author) {
	return fetch(`http://localhost:4000/authors/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
		body: JSON.stringify({ name: author }),
	})
		.then((res) => res.json())
		.then((data) => {
			if (!data.successful) {
				throw new Error(data.result);
			}
			alert('Author added successfully');
			return data;
		})
		.catch((error) => {
			alert(error);
		});
}
// user

export function fetchGetUser() {
	return fetch('http://localhost:4000/users/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	})
		.then((res) => res.json())
		.then((data) => data);
}

export function fetchLoginUser(user) {
	return fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (!data.successful) {
				throw new Error(data.result);
			}
			alert(`You have loged in successfully, ${data.user.name}`);
			localStorage.setItem('token', data.result);
			return data;
		})
		.catch((error) => {
			alert(error);
		});
}
export function fetchLogoutUser() {
	console.log('fetchLogoutUser');
	return fetch('http://localhost:4000/logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'Bearer Token',
			Authorization: localStorage.getItem('token'),
		},
	}).then((res) => console.log(res.json()));
}
