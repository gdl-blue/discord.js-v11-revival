'use strict';

class Component {
	constructor(data) { data = data || {};
		this.type = [, 'actionRow', 'button', 'selectMenu'][data.type];
	}

	toJSON() {
		return {
			type: ({
				actionRow: 1,
				button: 2,
				selectMenu: 3,
			})[this.type],
		};
	}
}

module.exports = Component;
