import React from 'react';
import axios from 'axios';

function getServer() {
	function getServerResponse() {
		axios.get("http://localhost:5000", { crossdomain: true })
			.then(response => {
				setText(response.data);
			})
	}

	return (
		<div>
			<button onClick={getServerResponse}>
				Get Backend Server
			</button>
			<h1>{text}</h1>
		</div>
	);
}

export default getServer;