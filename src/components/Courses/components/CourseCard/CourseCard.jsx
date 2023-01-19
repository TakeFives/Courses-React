import { formatDuration } from '../../../../helpers/pipeDuration';
import { getCourseAuthors } from '../../../../selectors';

import Button from '../../../../common/Button/Button';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './coursecard.css';
import { fetchDeleteCourseThunk } from '../../../../store/courses/thunk';

function CourseCard({ course, user }) {
	let isAdmin = checkIfAdmin();
	const dispatch = useDispatch();

	function checkIfAdmin() {
		return user.role === 'admin' ? true : false;
	}

	const courseAuthorList = useSelector((state) => {
		return getCourseAuthors(state, course.authors);
	});
	const authorsNames = courseAuthorList.map((el) => el.name).join(', ');

	function handleDeleteCourse(courseId, userToken) {
		dispatch(fetchDeleteCourseThunk(courseId, userToken));
	}

	return (
		<div className='course-item' data-testid='test-course-card'>
			<div className='course-item__about'>
				<h2 className='course-item__title'>{course.title}</h2>
				<div className='course-item__description'>{course.description}</div>
			</div>
			<div className='course-item__details'>
				<div className='course-item__authors'>
					<strong>Authors: </strong>
					{authorsNames}
				</div>
				<div className='course-item__created-date'>
					<strong>Created: </strong>
					{course.creationDate}
				</div>
				<div className='course-item__duration'>
					<strong>Duration: </strong>
					{formatDuration(course.duration) + ' hours'}
				</div>
				<div className='course-item__controls'>
					<Link to={`/courses/${course.id}`} data-testid='show-course-link'>
						<Button buttonText='Show course' />
					</Link>
					{isAdmin ? (
						<Link to={`/courses/update/${course.id}`}>
							<Button buttonText='Edit course' title='Edit course' />
						</Link>
					) : null}
					{isAdmin ? (
						<Button
							buttonText='Delete course'
							title='Delete course'
							onClick={() => handleDeleteCourse(course.id, user.token)}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
