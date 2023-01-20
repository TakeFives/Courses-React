import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useParams } from 'react-router-dom';

import { formatDuration } from '../../helpers/pipeDuration';
import { getCourseAuthors, selectCourseById } from '../../selectors';
import { fetchCourseThunk } from '../../store/courses/thunk';
import { fetchAuthorThunk } from '../../store/authors/thunk';

import './courseinfo.css';

function CourseInfo() {
	let { courseId } = useParams();
	const dispatch = useDispatch();

	const course = useSelector((state) => selectCourseById(state, courseId));
	const authors = useSelector((state) => {
		return getCourseAuthors(state, course?.authors);
	});

	useEffect(() => {
		if (!course) {
			dispatch(fetchCourseThunk(courseId));
		}
		course?.authors.map((author) => dispatch(fetchAuthorThunk(author)));
	}, [course, dispatch, courseId]);

	if (!course) {
		return <div>Loading course ...</div>;
	}

	return (
		<div className='wrapper'>
			<Link to={'/courses'} className='go-back-link'>
				<span>&#8592;</span> Back to courses
			</Link>
			<div className='course-info'>
				<h1 className='course-info-title'>{course.title}</h1>
				<div className='course-info-description'>{course.description}</div>
				<div className='course-info-details'>
					<div>
						<strong>id: </strong>
						{course.id}
					</div>
					<div>
						<strong>duration: </strong>
						{formatDuration(course.duration) + ' hours'}
					</div>
					<div>
						<strong>created: </strong>
						{course.creationDate}
					</div>
					<div>
						<strong>authors: </strong>
						{authors.map((author) => {
							return <div key={author.name}>{author.name}</div>;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseInfo;
