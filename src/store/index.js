import { legacy_createStore as createStore } from 'redux';
import { combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import userReduser from './user/reducer';
import coursesReduser from './courses/reducer';
import authorsReduser from './authors/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	user: userReduser,
	courses: coursesReduser,
	authors: authorsReduser,
});

const middlewareEnhancer = applyMiddleware(thunk);

export const store = createStore(
	rootReducer,
	composeWithDevTools(middlewareEnhancer)
);
