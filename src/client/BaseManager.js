'use strict';

// Original: https://github.com/discordjs/discord.js/blob/master/src/managers/BaseManager.js

const Collection = require('../util/Collection');

class BaseManager {
    constructor(client, iterable, holds) {
		this.cache = new Collection();
		Object.defineProperty(this, 'holds', { value: holds });
		Object.defineProperty(this, 'client', { value: client });
	    this.cacheType = Collection;
		if(iterable) for(const i of iterable) this.add(i);
    }
	
	add(data, cache, opt) {
		var id = opt.id;
		var extras = opt.extras || [];
		
		const existing = this.get(id || data.id);
		if(existing && existing._patch && cache) existing._patch(data);
		if(existing) return existing;

		const entry = this.holds ? new this.holds(this.client, data, ...extras) : data;
		if(cache === undefined || cache) this.set(id || entry.id, entry);
		return entry;
	}

	resolve(idOrInstance) {
		if(idOrInstance instanceof this.holds) return idOrInstance;
		if(typeof idOrInstance === 'string') return this.get(idOrInstance) || null;
		return null;
	}

	resolveID(idOrInstance) {
		if(idOrInstance instanceof this.holds) return idOrInstance.id;
		if(typeof idOrInstance === 'string') return idOrInstance;
		return null;
	}

	valueOf() {
		return this.cache;
	}
}

// Get Collection methods to work here
for(let cls of [Map, Collection]) {
	for(let fn of Object.getOwnPropertyNames(cls.prototype)) {
		if(fn == 'constructor') continue;
		
		const func = (function() {
			return this.cache[fn].apply(this.cache, arguments);
		});
		
		const gf = (function() {
			return this.cache[fn];
		});
		
		const sf = (function(val) {
			return this.cache[fn] = val;
		});
		
		const gt = cls.prototype.__lookupGetter__(fn), st = cls.prototype.__lookupSetter__(fn);
		
		if(gt) {
			try {
				Object.defineProperty(gf, 'name', { value: 'get ' + fn });
				BaseManager.prototype.__defineGetter__(fn, gf);
			} catch(e) { 0 }
		} if(st) {
			try {
				Object.defineProperty(sf, 'name', { value: 'set ' + fn });
				BaseManager.prototype.__defineSetter__(fn, sf);
			} catch(e) { 0 }
		} if(!gt && !st) {
			try { 
				Object.defineProperty(func, 'name', { value: fn });
				BaseManager.prototype[fn] = func;
			} catch(e) { 0 }
		}
	}
}

module.exports = BaseManager;

// BaseManager = require('./BaseManager'), b = new BaseManager
