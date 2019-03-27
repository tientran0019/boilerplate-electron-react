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
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getList } from 'app/redux/actions/user';

import styles from './style.scss';

function mapStateToProps(state) {
	return {
		store: {
			userList: state.user.toJS().list,
		},
	};
}

function mapDispatchToProps(dispatch) {
	return {
		action: bindActionCreators(
			{
				getList,
			},
			dispatch,
		),
	};
}

@connect(
	mapStateToProps,
	mapDispatchToProps,
)
export default class Home extends Component {
	static propTypes = {
		// store
		store: PropTypes.shape({
			userList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getList: PropTypes.func.isRequired,
		}).isRequired,
	};

	static defaultProps = {};

	componentDidMount() {
		this.props.action.getList();
	}

	render() {
		const {
			store: { userList },
		} = this.props;

		return (
			<div className={styles.container} data-tid="container">
				<h2>Home</h2>
				<pre>{JSON.stringify(userList.data, null, '\t')}</pre>
			</div>
		);
	}
}
