'use strict';

const Emoji = require('./Emoji');

class SelectOption {
	constructor(data) { data = data || {};
		this.setup(data);
	}
	
	setup(data) {
		this.label = data.label;
		this.value = data.value;
		this.description = data.description;
		this.emoji = data.emoji ? new Emoji(data.emoji) : null;
		this.default = data.default || false;
	}
	
	toJSON() {
		return {
			label: this.label,
			value: this.value,
			description: this.description,
			emoji: this.emoji ? {
				id: this.emoji.id,
				name: this.emoji.name,
				animated: this.emoji.animated,
			} : undefined,
			default: this.default,
		};
	}
}

module.exports = SelectOption;
