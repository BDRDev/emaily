import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';

import { submitSurvey } from '../../actions';

//destructured props list
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

	const reviewFields = _.map(formFields, ({ name, label }) => {
		return(
			<div key={name}>
				<div>
					<label>{label}</label>
				</div>
				<div>
					{formValues[name]}
				</div>
			</div>
		)
	})

	return (

		<div>
			<h5>Survey Form Review</h5>
				{reviewFields}
			<button className="yellow white-text btn-flat darken-3" onClick={onCancel} >
				Back
			</button>

			<button onClick={() => submitSurvey(formValues, history)} className="green btn-flat right white-text">
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
}

const mapStateToProps = ({ form: { surveyForm } }) => {

	console.log(surveyForm);

	return { formValues: surveyForm.values }
}

export default connect(mapStateToProps, {
	submitSurvey
})(withRouter(SurveyFormReview));