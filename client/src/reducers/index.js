
//combine reducers

import { combineReducers } from 'redux';

import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
//for redux-form
import { reducer as reduxForm } from 'redux-form';


export default combineReducers({
	
	auth: authReducer,
	form: reduxForm,
	surveys: surveysReducer
})