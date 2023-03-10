import Input from '../../common/Input/Input';
import Loader from '../../common/Loader/Loader';
import Textarea from '../../common/Textarea/Textarea';
import Button from '../../common/Button/Button';
import CreateAuthor from './components/CreateAuthor/CreateAuthor';
import Duration from './components/Duration/Duration';

// import { formatDate } from '../../helpers/dateGenerator';

import { useState } from 'react';
import { useEffect } from 'react';

import './courseform.css';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuthors, selectCourseById } from '../../selectors';
import Authors from './components/Authors/Authors';
import CourseAuthors from './components/CourseAuthors/CourseAuthors';
import {
	fetchCreateCourseThunk,
	fetchUpdateCourseThunk,
} from '../../store/courses/thunk';

function CourseForm(props) {
	const [isLoading, setIsLoading] = useState(false);

	// on Create mode

	const authors = useSelector(getAuthors);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [selectedAuthors, setSelectedAuthors] = useState([]);
	const [duration, setDuration] = useState(0);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	// on Update mode

	const updateMode = props.mode === 'update' ? true : false;

	const { courseId } = useParams();
	const courseToEdit = useSelector((state) =>
		selectCourseById(state, courseId)
	);

	useEffect(() => {
		if (updateMode) {
			setTitle(courseToEdit.title);
			setDescription(courseToEdit.description);
			setDuration(courseToEdit.duration);

			const courseEditAuthors = authors.filter((author) => {
				return courseToEdit.authors.includes(author.id);
			});

			setSelectedAuthors(courseEditAuthors);
		}
	}, [updateMode, courseToEdit, authors]);

	function formSubmitHandler(event) {
		event.preventDefault();
		const isValid = formValidation();
		const authorsIds = selectedAuthors.map((author) => author.id);

		if (isValid) {
			setIsLoading(true);
			const course = {
				title: title,
				description: description,
				duration: +duration,
				authors: authorsIds,
			};
			if (updateMode) {
				dispatch(fetchUpdateCourseThunk(courseId, course));
			} else {
				dispatch(fetchCreateCourseThunk(course));
			}
			navigate('/courses');
		} else {
			alert('Please, fill in all fields');
		}
	}

	// form validation

	function formValidation() {
		let isValid = true;

		if (title.trim().length < 2) {
			isValid = false;
		}
		if (description.trim().length < 2) {
			isValid = false;
		}
		if (selectedAuthors.length < 1) {
			isValid = false;
		}
		if (duration < 1) {
			isValid = false;
		}

		return isValid;
	}

	return (
		<form
			className='create-course-container wrapper'
			onSubmit={formSubmitHandler}
			data-testid={`${props.mode}-course-form`}
		>
			<h1>
				{updateMode ? `Update course "${courseToEdit.title}"` : 'Add course'}
			</h1>
			{isLoading ? <Loader></Loader> : null}
			<div className='create-course-data'>
				<Input
					type='text'
					id='title'
					labelText='Title'
					placeholder={updateMode ? title : 'Enter title'}
					value={title}
					className='course-title'
					onChange={(event) => setTitle(event.target.value)}
					dataTestId='course-title'
				/>
				<Textarea
					labelText='Description'
					placeholder='Enter description'
					value={description}
					className='course-description'
					onChange={(event) => setDescription(event.target.value)}
					dataTestId='course-description'
				></Textarea>
				<Button
					buttonText={updateMode ? 'Update course' : 'Create course'}
					type='submit'
					dataTestId='course-submit-button'
				/>
			</div>
			<div className='create-course-extra-data'>
				<div className='create-course-add-author'>
					<CreateAuthor />
				</div>
				<div className='create-course-add-duration'>
					<Duration duration={duration} setDuration={setDuration} />
				</div>
				<div className='create-course-select-author'>
					<Authors
						selectedAuthors={selectedAuthors}
						setSelectedAuthors={setSelectedAuthors}
					/>
				</div>
				<div className='create-course-selected-authors'>
					<CourseAuthors
						selectedAuthors={selectedAuthors}
						setSelectedAuthors={setSelectedAuthors}
					/>
				</div>
			</div>
		</form>
	);
}

export default CourseForm;
