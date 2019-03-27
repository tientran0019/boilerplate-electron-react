/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-02-14 16:37:58
*------------------------------------------------------- */

const storage = window.localStorage;

const mandatory = () => {
	throw new Error('Storage Missing parameter!');
};

export default class Storage {
	constructor(name = mandatory()) {
		this.name = name;
	}

	set value(value) {
		storage.setItem(this.name, value);
	}

	get value() {
		return storage.getItem(this.name);
	}

	destroy = () => {
		storage.removeItem(this.name);
	}
}
