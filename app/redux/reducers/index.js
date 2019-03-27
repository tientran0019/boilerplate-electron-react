/* --------------------------------------------------------
 * Copyright Wata Solutions
 *
 * Author Trần Đức Tiến
 * Email tientran0019@gmail.com
 * Phone 0972970075
 *
 * Created: 2019-03-27 14:32:02
 *------------------------------------------------------- */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';

import auth, { initialState as initialAuth } from './auth';
import loading, { initialState as initialLoading } from './loading';

import user, { initialState as initialUser } from './user';

export const initialState = {
	auth: initialAuth,
	loading: initialLoading,
	user: initialUser,
};

export default function createRootReducer(history) {
	return combineReducers({
		router: connectRouter(history),
		auth,
		loading,
		user,
	});
}
