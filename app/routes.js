/* --------------------------------------------------------
* Copyright Wata Solutions
*
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-03-26 15:53:49
*------------------------------------------------------- */

import React from 'react';
import { Switch, Route } from 'react-router';

import routes from 'app/constants/routes';
import HomePage from 'app/containers/Home';
import CounterPage from 'app/containers/Counter';

export default () => (
	<Switch>
		<Route path={routes.COUNTER} component={CounterPage} />
		<Route path={routes.HOME} component={HomePage} />
	</Switch>
);
