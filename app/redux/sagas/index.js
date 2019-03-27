/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-03-27 13:42:22
*------------------------------------------------------- */

import { fork } from 'redux-saga/effects';

import auth from './auth';
import middleware from './middleware';

export default function* rootSaga() {
	yield fork(middleware);

	// combine your saga here
	yield fork(auth);
}
