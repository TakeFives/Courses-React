import { useSelector } from 'react-redux';

import { Link, useParams } from 'react-router-dom';

import { formatDuration } from '../../helpers/pipeDuration';
import { getCourseAuthors, selectCourseById } from '../../selectors';

import './courseinfo.css';

function CourseInfo() {
	let { courseId } = useParams();

	const course = useSelector((state) => selectCourseById(state, courseId));
	const authors = useSelector((state) => {
		return getCourseAuthors(state, course.authors);
	});

	return (
		<div className='wrapper'>
			<Link to={'/courses'} className='go-back-link'>
				Back to courses
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
