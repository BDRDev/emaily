
//for ajax calls
import axios from 'axios';

import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {

	const res = await axios.get('api/current_user');

	dispatch({
		type: FETCH_USER,
		payload: res.data
	})
}

//gets called when stripe calls its callback function
//gets a stripe token and sends it to the api, api responds with updated user model
export const handleToken = token => async dispatch => {

	//pass the token we got from stripe to our server at the link
	const res = await axios.post('/api/stripe', token);

	dispatch({
		type: FETCH_USER,
		payload: res.data
	})
}

//history is from react-router { withRouter } from the surveyReview component
export const submitSurvey = (values, history) => async dispatch => {

	console.log('submitSurvey action');

	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');

	dispatch({
		type: FETCH_USER,
		payload: res.data
	})
}

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	console.log('res surveys', res)

	dispatch({
		type: FETCH_SURVEYS,
		payload: res.data
	})
}
