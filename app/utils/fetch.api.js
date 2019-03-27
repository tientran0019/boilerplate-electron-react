/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-02-14 16:30:11
*------------------------------------------------------- */
import merge from 'lodash/merge';
import { put, call } from 'redux-saga/effects';

import URL from 'app/constants/url';
import ENV from 'app/constants/env';

// import AuthStorage from 'app/utils/auth.storage';
import { REQUEST_ERROR } from 'app/redux/actions/type';

const { API_URL } = URL;

const fetching = (url, options) => fetch(API_URL + url, options)
	.then(response => {
		return response.status === 204 || response.statusText === 'No Content' ? {} : response.json();
	})
	.then(json => {
		if (json.error) {
			throw json.error;
		} else {
			return json;
		}
	})
	.catch(err => {
		throw err;
	});

/* The example data is structured as follows:

Params: {
	uri: ,
	params: ,
	opt: ,
	loading: ,
	uploadFile: ,
}
*/


export default function* ({ uri, params = {}, opt = {}, loading = true, uploadFile = false, messError = true }) {
	const defaultOptions = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	};

	if (!uri) {
		return;
	}

	const options = merge(defaultOptions, opt);

	if (uploadFile && params.files) {
		options.headers = {};
	}

	// // set token
	// if (AuthStorage.loggedIn) {
	// 	options.headers.Authorization = AuthStorage.token;
	// }

	let url = uri;

	if (params && Object.keys(params).length > 0) {
		if (options && options.method === 'GET') {
			url += '?' + Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
		} else if (uploadFile && params.files) {
			const formData = new FormData();
			params.files.forEach((file) => {
				formData.append('files', file, file.renameFile || file.name);
			});

			options.body = formData;
		} else {
			options.body = JSON.stringify(params);
		}
	}

	if (loading) {
		yield put({ type: 'START_LOADING' });
	}

	let response;
	try {
		if (ENV !== 'production') {
			// eslint-disable-next-line no-console
			console.info('====> Call ' + API_URL + url, ', options=', options);
		}

		response = yield call(fetching, url, options);

		if (loading) {
			yield put({ type: 'STOP_LOADING' });
		}

		return response;
	} catch (error) {
		response = { error };

		if (error.message !== 'Unexpected end of JSON input') {
			if (messError) {
				yield put({ type: REQUEST_ERROR, payload: error.message || error });
			}

			return response;
		}
		if (loading) {
			yield put({ type: 'STOP_LOADING' });
		}

		return {};
	}
}
