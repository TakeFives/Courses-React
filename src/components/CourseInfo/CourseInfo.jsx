import { useState } from 'react';
import { useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import { formatDuration } from '../../helpers/pipeDuration';

import './courseinfo.css';

function CourseInfo() {
	let { courseId } = useParams();

	const [course, setCourse] = useState({});
	const [authorList, setAuthorsList] = useState([]);

	function getAuthors(authorsIds) {
		const authors = authorList.filter((el) => {
			return authorsIds.indexOf(el.id) !== -1;
		});
		return authors;
	}

	useEffect(() => {
		fetch(`http://localhost:4000/courses/${courseId}`)
			.then((res) => res.json())
			.then((data) => {
				setCourse(data.result);
			});
	}, [courseId]);

	useEffect(() => {
		fetch('http://localhost:4000/authors/all')
			.then((res) => res.json())
			.then((data) => setAuthorsList(data.result));
	}, []);

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
						{getAuthors(course.authors).map((author) => {
							return <div key={author.name}>{author.name}</div>;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseInfo;
