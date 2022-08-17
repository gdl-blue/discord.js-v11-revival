'use strict';

const BaseManager = require('./BaseManager');
const Channel = require('../structures/Channel');
const Events = require('../util/Constants').Events;

class ChannelManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, Channel);
  }

  add(data, guild, cache) {
    const existing = this.cache.get(data.id);
    if (existing) {
      if (existing._patch && cache) existing._patch(data);
      if (guild) guild.channels.add(existing);
      return existing;
    }

    const channel = Channel.create(this.client, data, guild);

    if(!channel) {
      this.client.emit(Events.DEBUG, `Failed to find guild, or unknown type for channel ${data.id} ${data.type}`);
      return null;
    }

    if(cache === undefined || cache) this.cache.set(channel.id, channel);

    return channel;
  }

  remove(id) {
    const channel = this.cache.get(id);
    channel.guild.channels.cache.delete(id);
    this.cache.delete(id);
  }
  
  fetch(id, cache, force) {
    return Promise.reject(Error('Not implemented'));
  }
}

module.exports = ChannelManager;
