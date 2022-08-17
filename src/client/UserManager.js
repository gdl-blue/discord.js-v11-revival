'use strict';

// Original: https://github.com/discordjs/discord.js/blob/master/src/managers/UserManager.js

const BaseManager = require('./BaseManager');
const GuildMember = require('../structures/GuildMember');
const Message = require('../structures/Message');
const User = require('../structures/User');

class UserManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, User);
  }
  
  resolve(user) {
    if(user instanceof GuildMember) return user.user;
    if(user instanceof Message) return user.author;
    return super.resolve(user);
  }
  
  resolveID(user) {
    if(user instanceof GuildMember) return user.user.id;
    if(user instanceof Message) return user.author.id;
    return super.resolveID(user);
  }
  
  fetch(id) {
    return this.client.fetchUser(id);
  }
}

module.exports = UserManager;
