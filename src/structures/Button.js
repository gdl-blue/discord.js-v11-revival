'use strict';

const Component = require('./Component');
const Emoji = require('./Emoji');

class Button extends Component {
	constructor(data, callback) { data = data || {};
		super(data);
		if(typeof data == 'string') this.setup({ label: data });
		else if(typeof data == 'function') this.callback = data, this.setup();
		else this.setup(data);
		this.callback = callback || this.callback || function() {};
	}
	
	setup(data) {
		this.style = [, 'primary', 'secondary', 'success', 'danger', 'link'][data.style];
		this.color = [, 'blurple', 'gray', 'green', 'red', 'gray'][data.style];
		this.label = data.label;
		this.emoji = data.emoji ? new Emoji(data.emoji) : null;
		this.id = data.custom_id || null;
		this.url = data.url || null;
		this.disabled = data.disabled || false;
	}
	
	setLabel(label) {
		this.label = label;
		
		return this;
	}
	
	setName(name) {
		return this.setLabel(name);
	}
	
	setID(id) {
		this.id = id;
		
		return this;
	}
	
	onClick(fn) {
		this.callback = fn;
		
		return this;
	}
	
	setDisabled(v) {
		this.disabled = v;
		
		return this;
	}
	
	disable() {
		return this.setDisabled(true);
	}
	
	setColor(color) {
		if(this.url) return;
		this.color = color;
		this.style = ({
			blurple: 'primary',
			gray: 'secondary',
			green: 'success',
			red: 'danger',
		})[color];
		
		return this;
	}
	
	setURL(url) {
		this.url = url;
		this.style = 'link';
		this.color = 'gray';
		
		return this;
	}
	
	setEmoji(emoji) {
		this.emoji = emoji;
		
		return this;
	}
	
	toJSON() {
		return {
			type: 2,
			style: ({
				primary: 1,
				secondary: 2,
				success: 3,
				danger: 4,
				link: 5,
			})[this.style],
			label: this.label || '',
			url: this.url || undefined,
			custom_id: this.id,
			disabled: this.disabled,
			emoji: this.emoji ? {
				id: this.emoji.id,
				name: this.emoji.name,
				animated: this.emoji.animated,
			} : undefined,
		};
	}
}

module.exports = Button;
