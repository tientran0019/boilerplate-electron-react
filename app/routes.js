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

import HomePage from 'app/containers/Home';

export default () => (
	<Switch>
		<Route path="/" component={HomePage} />
	</Switch>
);
