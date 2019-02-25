//Survey Field contains logic to render a single label and text input

import React from 'react';


export default ({ input, label, meta: { error, touched } }) => {



	return(
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '2px' }}/>

			<div className="red-text" style={{ marginBottom: '20px', fontSize: '12px' }}>
				{touched && error}
			</div>
		</div>
	)
}