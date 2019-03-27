/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-03-27 14:16:45
*------------------------------------------------------- */
import { REQUEST_ERROR } from 'app/redux/actions/type';

export const initialState = true;

export default function (state = initialState, action) {
	switch (action.type) {
		case 'TOGGLE_LOADING':
			return !state;

		case 'START_LOADING':
			return true;

		case 'STOP_LOADING':
			return false;

		case REQUEST_ERROR: {
			return false;
		}
		default:
			return state;
	}
}
