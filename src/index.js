'use strict';

if(!Array.prototype.includes) {
    Array.prototype.includes = (function(fnd) {
        for(let item of this) {
            if(item == fnd) return 1;
        }
        
        return 0;
    });
}

if(!process.emitWarning) {
    process.emitWarning = (function(msg) {
        
    });
}

/*
if(process.versions.node.split('.')[0] < 6) {
    // Unhandled promise rejection warning
    Promise.prototype._catchCount = 0;
    Promise.prototype._catch = Promise.prototype.catch;
    
    Promise.prototype.catch = (function(fn) {
        this._catchCount++;
        return Promise.prototype._catch.apply(this, arguments);
    });
    
    var _Promise = Promise;
    function Promise(fn) {
        var pr = new _Promise(fn);
        pr.catch(e => {
            if(pr._catchCount <= 1) {
                console.error('Unhandled promise Rejection: ' + (e.stack || e));
            }
        });
        return pr;
    }
}
*/

const Util = require('./util/Util');

module.exports = {
  // "Root" classes (starting points)
  Client: require('./client/Client'),
  Shard: require('./sharding/Shard'),
  ShardClientUtil: require('./sharding/ShardClientUtil'),
  ShardingManager: require('./sharding/ShardingManager'),
  WebhookClient: require('./client/WebhookClient'),

  // Utilities
  BitField: require('./util/BitField'),
  Collection: require('./util/Collection'),
  Constants: require('./util/Constants'),
  DiscordAPIError: require('./client/rest/DiscordAPIError'),
  EvaluatedPermissions: require('./util/Permissions'),
  MessageFlags: require('./util/MessageFlags'),
  Permissions: require('./util/Permissions'),
  Snowflake: require('./util/Snowflake'),
  SnowflakeUtil: require('./util/Snowflake'),
  SystemChannelFlags: require('./util/SystemChannelFlags'),
  Util: Util,
  util: Util,
  version: require('../package').version,

  // Shortcuts to Util methods
  escapeMarkdown: Util.escapeMarkdown,
  fetchRecommendedShards: Util.fetchRecommendedShards,
  resolveString: Util.resolveString,
  splitMessage: Util.splitMessage,

  // Structures
  Attachment: require('./structures/Attachment'),
  CategoryChannel: require('./structures/CategoryChannel'),
  Channel: require('./structures/Channel'),
  ClientUser: require('./structures/ClientUser'),
  ClientUserSettings: require('./structures/ClientUserSettings'),
  Collector: require('./structures/interfaces/Collector'),
  DMChannel: require('./structures/DMChannel'),
  Emoji: require('./structures/Emoji'),
  Game: require('./structures/Presence').Game,
  GroupDMChannel: require('./structures/GroupDMChannel'),
  Guild: require('./structures/Guild'),
  GuildAuditLogs: require('./structures/GuildAuditLogs'),
  GuildChannel: require('./structures/GuildChannel'),
  GuildMember: require('./structures/GuildMember'),
  Integration: require('./structures/Integration'),
  Invite: require('./structures/Invite'),
  Message: require('./structures/Message'),
  MessageAttachment: require('./structures/MessageAttachment'),
  MessageCollector: require('./structures/MessageCollector'),
  MessageEmbed: require('./structures/MessageEmbed'),
  MessageMentions: require('./structures/MessageMentions'),
  MessageReaction: require('./structures/MessageReaction'),
  Component: require('./structures/Component'),
  ActionRow: require('./structures/ActionRow'),
  Button: require('./structures/Button'),
  SelectMenu: require('./structures/SelectMenu'),
  SelectOption: require('./structures/SelectOption'),
  NewsChannel: require('./structures/NewsChannel'),
  OAuth2Application: require('./structures/OAuth2Application'),
  ClientOAuth2Application: require('./structures/OAuth2Application'),
  PartialGuild: require('./structures/PartialGuild'),
  PartialGuildChannel: require('./structures/PartialGuildChannel'),
  PermissionOverwrites: require('./structures/PermissionOverwrites'),
  Presence: require('./structures/Presence').Presence,
  ReactionEmoji: require('./structures/ReactionEmoji'),
  ReactionCollector: require('./structures/ReactionCollector'),
  RichEmbed: require('./structures/RichEmbed'),
  Role: require('./structures/Role'),
  Sticker: require('./structures/Sticker'),
  StoreChannel: require('./structures/StoreChannel'),
  TextChannel: require('./structures/TextChannel'),
  User: require('./structures/User'),
  VoiceChannel: require('./structures/VoiceChannel'),
  Webhook: require('./structures/Webhook'),
};
