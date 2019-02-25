import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSurveys } from '../../actions';

class SurveyList extends Component {

	componentDidMount = () => {
		this.props.fetchSurveys();

		console.log('this.props', this.props);
	}

	renderSurveys = () => {

		console.log('renderSurveys', this.props.surveys)

		return this.props.surveys.reverse().map(survey => {
			console.log('ran');
				return (
					<div className="card blue-grey darken-1" >
						<div className="card-content white-text">
							<span className="card-title">{survey.title}</span>
							<p>
								{survey.body}
							</p>
							<p className="right">
								Sent on: {new Date(survey.dateSent).toLocaleDateString()}
							</p>
						</div>

						<div className="card-action">
							<a> Yes: {survey.yes}</a>
							<a> No: {survey.no}</a>
						</div>
					</div>
				);
		})
	}

	render(){

		return(
			<div>
				{this.renderSurveys()}
			</div>
		)
	}
}

const mapStateToProps = ({ surveys }) => {

	console.log('mapStateToProps surveys', surveys)
	return { surveys }
}

export default connect(mapStateToProps, {
	fetchSurveys
})(SurveyList)