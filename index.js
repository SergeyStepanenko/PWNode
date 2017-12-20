console.log('server started'); // eslint-disable-line
const axios = require('axios');
const firebase = require('firebase');

const config = {
	apiKey: 'AIzaSyCB1TfuGQegOrHOPcFJFqpxDmMTSElXQVg',
	authDomain: 'plastic-warriors.firebaseapp.com',
	databaseURL: 'https://plastic-warriors.firebaseio.com',
	projectId: 'plastic-warriors',
	storageBucket: '',
	messagingSenderId: '143541315246',
};

firebase.initializeApp(config);

const database = firebase.database();
const kidsTrackData = database.ref('/kidsTrackData');
const unitsRef = database.ref('/units');

unitsRef.on('value', (snap) => {
	const units = snap.val();
	const keys = Object.keys(units);

	for (let i = 0; i < keys.length; i += 1) {
		axios
			.get(`${units[keys[i]].url}&mode=poll`)
			.then((response) => {
				const updates = {};
				updates[keys[i]] = response.data.payload[0].data;
				kidsTrackData.update(updates);
			})
			.catch((error) => {
				console.log('error', error); // eslint-disable-line
			});
	}
});
