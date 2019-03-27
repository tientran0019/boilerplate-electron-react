/* eslint-disable no-restricted-syntax */
/* --------------------------------------------------------
 * Copyright Wata Solutions
 *
 * Author Trần Đức Tiến
 * Email tientran0019@gmail.com
 * Phone 0972970075
 *
 * Created: 2019-03-27 14:36:44
 *------------------------------------------------------- */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reduxReset from 'redux-reset';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router/immutable';
import { Iterable } from 'immutable';

import ENV from 'app/constants/env';
import createRootReducer, { initialState } from 'app/redux/reducers';
import rootSaga from 'app/redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
	// stateTransformer,
	collapsed: (getState, action, logEntry) => !logEntry.error,
	predicate: (getState, action) => !['@@redux-form/CHANGE', '@@redux-form/REGISTER_FIELD'].includes(
		action.type,
	),
	stateTransformer: state => {
		const newState = {};

		for (const i of Object.keys(state)) {
			if (Iterable.isIterable(state[i])) {
				newState[i] = state[i].toJS();
			} else {
				newState[i] = state[i];
			}
		}

		return newState;
	},
});

export const history = createHashHistory();

const router = routerMiddleware(history);

export const configureStore = (state = initialState) => {
	const composeMiddleware =
		ENV === 'production'
			? compose(
				applyMiddleware(sagaMiddleware, router),
				reduxReset({
					type: 'LOGOUT_SUCCESS',
					data: initialState,
				}),
			)
			: compose(
				applyMiddleware(sagaMiddleware, router),
				applyMiddleware(logger),
				reduxReset({
					type: 'LOGOUT_SUCCESS',
					data: initialState,
				}),
			);

	const store = createStore(
		createRootReducer(history),
		state,
		composeMiddleware,
	);

	store.sagaTask = sagaMiddleware.run(rootSaga);

	if (ENV !== 'production' && module.hot) {
		module.hot.accept(
			'../reducers',
			// eslint-disable-next-line global-require
			() => store.replaceReducer(require('../reducers').default),
		);
	}

	return store;
};
