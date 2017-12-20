console.log('server started')
const fetch = require("node-fetch");
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

const url = 'https://www.izhforum.info/forum/izhevsk/tracker_live_map.php?id=motorola.H6ZG8MKE3ZNPBN&pin1=0ac04678341515627428372bfeff4a7f&mode=poll';

// setInterval(() => {
    fetch(url)
        .then(response => {
            response.json().then(json => {
                kidsTrackData.set(json.payload[0].data);
                console.log('data submited')
            });
        })
        .catch(error => {
            console.log(error);
        });
// }, 10000)
