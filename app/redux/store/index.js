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
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';

import ENV from 'app/constants/env';
import createRootReducer, { initialState } from 'app/redux/reducers';
import rootSaga from 'app/redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
	transforms: [immutableTransform()],
	key: 'root',
	storage,
};

const logger = createLogger({
	// stateTransformer,
	collapsed: (getState, action, logEntry) => !logEntry.error,
	predicate: (getState, action) => !['@@redux-form/CHANGE', '@@redux-form/REGISTER_FIELD'].includes(
		action.type,
	),
	stateTransformer: (state) => {
		const newState = {};

		Object.keys(state).forEach((key) => {
			newState[key] = Iterable.isIterable(state[key]) ? state[key].toJS() : state[key];
		});

		return newState;
	},
});

export const history = createHashHistory();

const rootReducer = createRootReducer(history);

const router = routerMiddleware(history);

export const configureStore = (next = f => f, state = initialState) => {
	const persistedReducer = persistReducer(persistConfig, rootReducer);

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
		persistedReducer,
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

	persistStore(store, {}, () => {
		next(store);
	});
};
