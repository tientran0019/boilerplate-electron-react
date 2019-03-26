/* --------------------------------------------------------
* Copyright Wata Solutions
*
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-03-26 16:37:18
*------------------------------------------------------- */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from 'app/constants/routes';

import styles from './style.scss';

export default class Home extends Component {
	render() {
		return (
			<div className={styles.container} data-tid="container">
				<h2>Home</h2>
				<Link to={routes.COUNTER}>to Counter</Link>
			</div>
		);
	}
}
