'use strict';

const Component = require('./Component');
const SelectOption = require('./SelectOption');

class SelectMenu extends Component {
	constructor(data) { data = data || {};
		super(data);
		if(typeof data == 'function') this.callback = data, this.setup();
		else this.setup(data);
		this.callback = data || this.callback || function() {};
	}
	
	setup(data) {
		this.options = [];
		for(var opt of data.options || []) {
			this.options.push(new SelectOption(opt));
		}
		this.id = data.custom_id || null;
		this.placeholder = data.placeholder || null;
		this.minimumValues = data.min_values || 1;
		this.maximumValues = data.max_values || 1;
		this.disabled = data.disabled || false;
	}
	
	setID(id) {
		this.id = id;
		return this;
	}
	
	setMinimumValues(min) {
		this.minimumValues = min;
		return this;
	}
	
	setMaximumValues(max) {
		this.maximumValues = max;
		return this;
	}
	
	setPlaceholder(placeholder) {
		this.placeholder = placeholder;
		return this;
	}
	
	setDisabled(v) {
		this.disabled = v;
		
		return this;
	}
	
	disable() {
		return this.setDisabled(true);
	}
	
	addOption(label, value, opt) {
		opt = opt || {};
		opt.label = label;
		opt.value = value;
		this.options.push(new SelectOption(opt));
		
		return this;
	}
	
	addDefaultOption(label, value, opt) {
		opt = opt || {};
		opt.label = label;
		opt.value = value;
		opt.default = true;
		this.options.push(new SelectOption(opt));
		
		return this;
	}
	
	option(label, value, opt) {
		return this.addOption(label, value, opt);
	}
	
	defaultOption(label, value, opt) {
		return this.addDefaultOption(label, value, opt);
	}
	
	toJSON() {
		return {
			type: 3,
			placeholder: this.placeholder || undefined,
			custom_id: this.id,
			disabled: this.disabled,
			options: this.options.map(item => item.toJSON()),
			min_values: this.minimumValues,
			max_values: this.maximumValues,
		};
	}
}

module.exports = SelectMenu;
