
//for ajax calls
import axios from 'axios';

import { FETCH_USER } from './types';

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
