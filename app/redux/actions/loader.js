/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2019-03-27 16:59:34
 *-------------------------------------------------------*/

export function toggleLoader() {
	return {
		type: 'TOGGLE_LOADING',
	};
}

export function startLoader() {
	return {
		type: 'START_LOADING',
	};
}

export function stopLoader() {
	return {
		type: 'STOP_LOADING',
	};
}
