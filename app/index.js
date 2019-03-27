/* --------------------------------------------------------
* Copyright Wata Solutions
*
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-03-26 15:54:48
*------------------------------------------------------- */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { configureStore, history } from 'app/redux/store';

import { toggleLoader } from 'app/redux/actions/loader';

import App from './App';

import './app.global.scss';

configureStore((store) => {
	console.log('Redux persist rehydration complete');

	store.dispatch(toggleLoader());

	render(
		<AppContainer>
			<App store={store} history={history} />
		</AppContainer>,
		document.getElementById('root'),
	);

	if (module.hot) {
		module.hot.accept('./App', () => {
			// eslint-disable-next-line global-require
			const NextApp = require('./App').default;
			render(
				<AppContainer>
					<NextApp store={store} history={history} />
				</AppContainer>,
				document.getElementById('root'),
			);
		});
	}
});
