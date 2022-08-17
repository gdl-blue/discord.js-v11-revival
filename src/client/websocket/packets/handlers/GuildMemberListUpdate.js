'use strict';

const AbstractHandler = require('./AbstractHandler');
const GuildMember = require('./../../../../structures/GuildMember');

class GuildMemberListUpdateHandler extends AbstractHandler {
  handle(packet) {
    const client = this.packetManager.client;
    const data = packet.d;
    const guild = client.guilds.get(data.guild_id);
    if(guild && data && data.ops && data.ops[0]) {
      for(let item of data.ops[0].items) {
        const member = item.member;
        if(!member) continue;
		if(!guild.members.has(member.user.id))
          guild.members.set(member.user.id, new GuildMember(guild, member));
      }
    }
  }
}

module.exports = GuildMemberListUpdateHandler;
