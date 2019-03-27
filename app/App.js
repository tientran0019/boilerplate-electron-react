/* --------------------------------------------------------
* Copyright Wata Solutions
*
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-03-27 14:58:24
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';

import Routes from 'app/routes';

export default class App extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	}

	render() {
		const { store, history } = this.props;

		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Routes />
				</ConnectedRouter>
			</Provider>
		);
	}
}
