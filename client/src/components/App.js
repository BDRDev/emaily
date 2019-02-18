import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

//my Components
import Header from './Header';
import Landing from './Landing';

//action creator
import { fetchUser } from '../actions';

class App extends React.Component {

	componentDidMount = () => {
		console.log('componentDidMount');
		
		this.props.fetchUser();
	}

	render(){

		return(
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route path="/" component={Landing} exact />
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

export default connect(null, {
	fetchUser
})(App);


// <Route path="/surveys" component={Dashboard} exact />
// <Route path="/surveys/new" component={SurveysNew} exact />