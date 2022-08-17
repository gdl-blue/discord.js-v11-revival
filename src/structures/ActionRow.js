'use strict';

const Component = require('./Component');
const Button = require('./Button');
const SelectMenu = require('./SelectMenu');

class ActionRow extends Component {
	constructor(data) { data = data || {};
		super(data);
		this.setup(data);
	}
	
	setup(data) {
		this.components = [];
		this.buttons = [];
		this.selectMenus = [];
		
		for(var item of data.components || []) {
			switch(item.type) {
				case 2: {
					const btn = new Button(item);
					this.components.push(btn);
					this.buttons.push(btn);
				} break; case 3: {
					const menu = new SelectMenu(item);
					this.components.push(menu);
					this.selectMenus.push(menu);
				}
			}
		}
	}
	
	button(btn) {
		this.components.push(btn);
		this.buttons.push(btn);
		
		return this;
	}
	
	addButton(btn) {
		return this.button(btn);
	}
	
	selectMenu(menu) {
		this.components.push(menu);
		this.buttons.push(menu);
		
		return this;
	}
	
	addSelectMenu(menu) {
		return this.selectMenu(menu);
	}
	
	toJSON() {
		return {
			type: 1,
			components: this.components.map(item => item.toJSON()),
		};
	}
}

module.exports = ActionRow;
