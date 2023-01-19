import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';

import { Route, Routes } from 'react-router-dom';

import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGetUserThunk } from './store/user/thunk';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';

function App() {
	const token = localStorage.getItem('token');
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			dispatch(fetchGetUserThunk());
		}
	}, [dispatch, token]);

	return (
		<div className='app-container'>
			<header>
				<Header></Header>
			</header>
			<main>
				<Routes>
					<Route path='/' element={<Courses />} />
					<Route path='/courses' element={<Courses />} />
					<Route
						path='/courses/add'
						element={
							<PrivateRouter redirectPath='/courses'>
								<CourseForm mode='create' />
							</PrivateRouter>
						}
					/>
					<Route
						path='/courses/update/:courseId'
						element={
							<PrivateRouter redirectPath='/courses'>
								<CourseForm mode='update' />
							</PrivateRouter>
						}
					/>
					<Route path='/courses/:courseId' element={<CourseInfo />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='*'
						element={<p className='wrapper'>There's nothing here: 404!</p>}
					/>
				</Routes>
			</main>
			<footer>
				<Footer></Footer>
			</footer>
		</div>
	);
}
export default App;
