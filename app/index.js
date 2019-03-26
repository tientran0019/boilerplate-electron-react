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
import { configureStore, history } from 'app/redux/store/configureStore';
import Root from 'app/containers/Root';

import './app.global.scss';

const store = configureStore();

render(
	<AppContainer>
		<Root store={store} history={history} />
	</AppContainer>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./containers/Root', () => {
		// eslint-disable-next-line global-require
		const NextRoot = require('./containers/Root').default;
		render(
			<AppContainer>
				<NextRoot store={store} history={history} />
			</AppContainer>,
			document.getElementById('root')
		);
	});
}
