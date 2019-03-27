import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from 'app/routes';
import PropTypes from 'prop-types';

export default class Root extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		history: PropTypes.func.isRequired,
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
