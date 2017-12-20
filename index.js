console.log('started')
// const firebase = require('firebase');
// firebase.initializeApp(config);

const requestData = ({ CORS, url, key, ...rest }) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		const wrappedUrl = `${url}&mode=poll`;

		xhr.open('GET', wrappedUrl, true);
		xhr.onload = function x() {
			if (this.status === 200) {
				let response = {};

				try {
					response = JSON.parse(this.response).payload[0].data;
				} catch (e) {
					console.error('JSON.parse error', e); // eslint-disable-line
				} finally {
					resolve({
						response,
						// ...rest,
						// key,
						// url,
					});
				}
			} else {
				const error = new Error(this.statusText);
				error.code = this.status;
				reject({
					// ...rest,
					// key,
					// url,
					error
				});
			}
		};

		xhr.send();
		xhr.onerror = () => reject(new Error('oops'));
	});
};

const url = 'https://www.izhforum.info/forum/izhevsk/tracker_live_map.php?id=motorola.H6ZG8MKE3ZNPBN&pin1=0ac04678341515627428372bfeff4a7f';

setInterval(() => {
    console.log('tick')
    requestData({ url }).then(result => {
        console.log(result)
    })
}, 10000)
