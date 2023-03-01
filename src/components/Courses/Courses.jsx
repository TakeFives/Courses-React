import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import { fetchCoursesThunk } from '../../store/courses/thunk';
import { fetchAuthorsThunk } from '../../store/authors/thunk';
import { getCourses, getUser } from '../../selectors';

import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './courses.css';
import Loader from '../../common/Loader/Loader';

function Courses(props) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredCourses, setFilteredCourses] = useState([]);

	const user = useSelector(getUser);
	const courseList = useSelector(getCourses);
	console.log(courseList);
	const dispatch = useDispatch();

	function searchInputHandler(event) {
		if (event.target.value === '') {
			setFilteredCourses(courseList);
		}
		setSearchTerm(event.target.value);
	}

	function searchClickHandler() {
		if (searchTerm) {
			const filteredData = courseList.filter((course) => {
				return (
					course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					course.id === searchTerm
				);
			});
			setFilteredCourses(filteredData);
		}
		return courseList;
	}

	useEffect(() => {
		dispatch(fetchCoursesThunk());
		dispatch(fetchAuthorsThunk());
	}, [dispatch]);

	useEffect(() => {
		setFilteredCourses(courseList);
	}, [courseList]);

	return (
		<div className='course-list-container wrapper'>
			<div className='course-list-top-bar'>
				<div className='search-bar'>
					<SearchBar
						searchInputHandler={searchInputHandler}
						searchClickHandler={searchClickHandler}
					></SearchBar>
				</div>
				<div>
					<Link to={'/courses/add'} data-testid='add-course-link'>
						<Button buttonText='Add course' dataTestId='add-course-button' />
					</Link>
				</div>
			</div>
			{!courseList.length && <Loader></Loader>}
			<section className='course-list' data-testid='test-courses-list'>
				{courseList.length
					? filteredCourses?.map((course) => {
							return (
								<CourseCard
									course={course}
									user={user}
									key={course.id.toString()}
								></CourseCard>
							);
					  })
					: ''}
			</section>
		</div>
	);
}

export default Courses;
