import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';


//action creator
import { handleToken } from '../actions';

class Payments extends Component {

	render(){
		//debugger statement?
		// debugger;

		return(
			<StripeCheckout 
				//amount of money from the user, in cents for some reason
				amount={500}
				//poorly named - receives a callback function, 
				//called back after we receive a success token from stripe
				token={ token => this.props.handleToken(token)}
				//api publishable key
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
				//name - displayed as a header at the top
				name="Emaily"
				//description - displayed in the header
				description="$5 form 5 Email Credits"
			>

				<button className="btn">
					Add Credits
				</button>

			</StripeCheckout>
		);	
	}
}

export default connect(null, {
	handleToken
})(Payments);