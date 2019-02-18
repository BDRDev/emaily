//css file
import 'materialize-css/dist/css/materialize.min.css';

//React
import React from 'react';
import ReactDOM from 'react-dom';

//Redux
import { Provider } from 'react-redux'; //component that allows other components to access application state
import { createStore, applyMiddleware } from 'redux';
//middleware
import reduxThunk from 'redux-thunk';

//Reducer
import reducers from './reducers';

//my Components
import App from './components/App';

//pass our reducers to the store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//sets App as a child of the Provider Component. This is what allows all components to access the store
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.querySelector('#root')
);

console.log('stripe key is', process.env.REACT_APP_STRIPE_KEY);
console.log(process.env.NODE_ENV);