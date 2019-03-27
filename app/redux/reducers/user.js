/* eslint-disable no-param-reassign */
/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email tientran0019@gmail.com
 * Phone 0972970075
 *
 * Created: 2019-03-27 14:30:49
 *-------------------------------------------------------*/
import { fromJS } from 'immutable';

import { spliceOne } from 'app/utils';

import { MODEL_NAME } from 'app/redux/actions/user';

export const initialState = fromJS({
	list: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	view: {},
});

export default (state = initialState, action) => {
	switch (action.type) {
		case `GET_${MODEL_NAME}_LIST_REQUEST`:
			return state.update('list', () => {
				return initialState.get('list');
			});

		case `GET_${MODEL_NAME}_LIST_SUCCESS`: {
			return state.update('list', list => {
				return {
					...list,
					data: [...list.data, ...action.payload],
					loading: false,
				};
			});
		}

		case `GET_${MODEL_NAME}_DATA_REQUEST`:
			return state.update('view', () => {
				return initialState.get('view');
			});

		case `GET_${MODEL_NAME}_DATA_SUCCESS`:
			return state.update('view', () => {
				return {
					...action.payload,
					loading: false,
				};
			});

		case `UPDATE_${MODEL_NAME}_SUCCESS`: {
			return state
				.update('list', list => {
					const { id } = action.payload;

					if (list.data) {
						const index = list.data.findIndex(row => {
							return row.id === id;
						});

						if (index >= 0) {
							list.data[index] = {
								...list.data[index],
								...action.payload,
							}; // eslint-disable-line
						}
						return { ...list, data: [...list.data] };
					}

					return initialState.get('list');
				})
				.update('view', view => {
					return { ...view, ...action.payload };
				});
		}

		case `DELETE_${MODEL_NAME}_SUCCESS`: {
			return state
				.update('list', list => {
					const { id } = action.payload;

					if (list.data) {
						const index = list.data.findIndex(row => {
							return row.id === id;
						});

						spliceOne(list.data, index);
						list.total = list.total - 1; // eslint-disable-line
						list.skip = list.skip - 1; // eslint-disable-line

						return { ...list, data: [...list.data] };
					}

					return initialState.get('list');
				})
				.update('view', () => {
					return {};
				});
		}

		default:
			return state;
	}
};
