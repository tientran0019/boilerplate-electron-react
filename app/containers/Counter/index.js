import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import routes from 'app/constants/routes';
import * as CounterActions from 'app/redux/actions/counter';

import styles from './style.scss';

function mapStateToProps(state) {
	return {
		counter: state.counter
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(CounterActions, dispatch);
}

@connect(
	mapStateToProps,
	mapDispatchToProps
)
export default class Counter extends Component {
	render() {
		const {
			increment,
			incrementIfOdd,
			incrementAsync,
			decrement,
			counter
		} = this.props;
		return (
			<div>
				<div className={styles.backButton} data-tid="backButton">
					<Link to={routes.HOME}>
						<i className="fa fa-arrow-left fa-3x" />
					</Link>
				</div>
				<div className={`counter ${styles.counter}`} data-tid="counter">
					{counter}
				</div>
				<div className={styles.btnGroup}>
					<button
						className={styles.btn}
						onClick={increment}
						data-tclass="btn"
						type="button"
					>
						<i className="fa fa-plus" />
					</button>
					<button
						className={styles.btn}
						onClick={decrement}
						data-tclass="btn"
						type="button"
					>
						<i className="fa fa-minus" />
					</button>
					<button
						className={styles.btn}
						onClick={incrementIfOdd}
						data-tclass="btn"
						type="button"
					>
						odd
					</button>
					<button
						className={styles.btn}
						onClick={() => incrementAsync()}
						data-tclass="btn"
						type="button"
					>
						async
					</button>
				</div>
			</div>
		);
	}
}
