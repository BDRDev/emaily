import React, { Component } from 'react';

//lets the reduxForm connect to the react store -> basically connect function
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import validateEmails from '../../utils/validateEmails';

import SurveyField from './SurveyField';

import formFields from './formFields';

class SurveyForm extends Component {

	renderFields = () => {
		return _.map(formFields, ({ label, name }) => {
			return <Field 
						key={name} 
						component={SurveyField} 
						type="text" 
						label={label} 
						name={name} 
					/>
		})
	}

	render(){

		return(
			<div>
				<h1>Survey Form</h1>
				<form 
					//handle submit is a function from redux-form, whenever the form is submitted 
					//the function passes to handleSubmit will automatically be run. Comes with values
					//prop that gets the values from the form 
					onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
				>
					{this.renderFields()}

					<button className="teal btn-flat right white-text" type="submit">
						Next
						<i className="material-icons right">done</i>
					</button>

					<Link to="/surveys" className="red btn-flat left white-text" type="submit">
						Cancel
						<i className="material-icons right">cancel</i>
					</Link>
				</form>
			</div>
		)
	}
}

//used for validation

const validate = values => {

	const errors = {};

	//validates email entry
	errors.recipients = validateEmails(values.recipients || '');

	_.each(formFields, ({ name }) => {

		if(!values[name]){
			errors[name] = `you must provide a value`
		}
	})

	

	//if errors is not an empty object, form will not get submitted
	return errors;
};


//initilizes and setsup the form
export default reduxForm({
	validate,
	//I think this is the name of the form in the store
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);