'use strict';

const BitField = require('./BitField');
const util = require('util');

/**
 * Data structure that makes it easy to interact with a permission bitfield. All {@link GuildMember}s have a set of
 * permissions in their guild, and each channel in the guild may also have {@link PermissionOverwrites} for the member
 * that override their default permissions.
 * @extends {BitField}
 */
class Permissions extends BitField {
  /**
   * @param {GuildMember} [member] Member the permissions are for **(deprecated)**
   * @param {number|PermissionResolvable} permissions Permissions or bitfield to read from
   */
  constructor(member, permissions) {
    super(typeof member === 'object' && !(member instanceof Array) ? permissions : member);

    Object.defineProperty(this, '_member', {
      writable: true,
      value: typeof member === 'object' && !(member instanceof Array) ? member : null,
    });
  }

  /**
     * Member the permissions are for
     * @type {GuildMember}
     * @deprecated
     */
  get member() {
    return this._member;
  }

  set member(value) {
    this._member = value;
  }

  /**
   * Bitfield of the packed permissions
   * @type {number}
   * @see {@link Permissions#bitfield}
   * @deprecated
   * @readonly
   */
  get raw() {
    return this.bitfield;
  }

  set raw(raw) {
    this.bitfield = raw;
  }

  /**
   * Checks whether the bitfield has a permission, or any of multiple permissions.
   * @param {PermissionResolvable} permission Permission(s) to check for
   * @param {boolean} [checkAdmin=true] Whether to allow the administrator permission to override
   * @returns {boolean}
   */
  any(permission, checkAdmin) { if(checkAdmin === undefined) checkAdmin = true;
    return (checkAdmin && super.has(this.constructor.FLAGS.ADMINISTRATOR)) || super.any(permission);
  }

  /**
   * Checks whether the bitfield has a permission, or multiple permissions.
   * @param {PermissionResolvable} permission Permission(s) to check for
   * @param {boolean} [checkAdmin=true] Whether to allow the administrator permission to override
   * @returns {boolean}
   */
  has(permission, checkAdmin) { if(checkAdmin === undefined) checkAdmin = true;
    return (checkAdmin && super.has(this.constructor.FLAGS.ADMINISTRATOR)) || super.has(permission);
  }

  /**
   * Checks whether the user has a certain permission, e.g. `READ_MESSAGES`.
   * @param {PermissionResolvable} permission The permission to check for
   * @param {boolean} [explicit=false] Whether to require the user to explicitly have the exact permission
   * @returns {boolean}
   * @see {@link Permissions#has}
   * @deprecated
   */
  hasPermission(permission, explicit) {
    return this.has(permission, !explicit);
  }

  /**
   * Checks whether the user has all specified permissions.
   * @param {PermissionResolvable} permissions The permissions to check for
   * @param {boolean} [explicit=false] Whether to require the user to explicitly have the exact permissions
   * @returns {boolean}
   * @see {@link Permissions#has}
   * @deprecated
   */
  hasPermissions(permissions, explicit) {
    return this.has(permissions, !explicit);
  }

  /**
   * Checks whether the user has all specified permissions, and lists any missing permissions.
   * @param {PermissionResolvable} permissions The permissions to check for
   * @param {boolean} [explicit=false] Whether to require the user to explicitly have the exact permissions
   * @returns {PermissionResolvable}
   * @see {@link Permissions#missing}
   * @deprecated
   */
  missingPermissions(permissions, explicit) {
    return this.missing(permissions, !explicit);
  }
}

/**
 * Data that can be resolved to give a permission number. This can be:
 * * A string (see {@link Permissions.FLAGS})
 * * A permission number
 * @typedef {string|number|Permissions|PermissionResolvable[]} PermissionResolvable
 */

/**
 * Numeric permission flags. All available properties:
 * - `ADMINISTRATOR` (implicitly has *all* permissions, and bypasses all channel overwrites)
 * - `CREATE_INSTANT_INVITE` (create invitations to the guild)
 * - `KICK_MEMBERS`
 * - `BAN_MEMBERS`
 * - `MANAGE_CHANNELS` (edit and reorder channels)
 * - `MANAGE_GUILD` (edit the guild information, region, etc.)
 * - `ADD_REACTIONS` (add new reactions to messages)
 * - `VIEW_AUDIT_LOG`
 * - `PRIORITY_SPEAKER`
 * - `STREAM`
 * - `VIEW_CHANNEL`
 * - `READ_MESSAGES` **(deprecated)**
 * - `SEND_MESSAGES`
 * - `SEND_TTS_MESSAGES`
 * - `MANAGE_MESSAGES` (delete messages and reactions)
 * - `EMBED_LINKS` (links posted will have a preview embedded)
 * - `ATTACH_FILES`
 * - `READ_MESSAGE_HISTORY` (view messages that were posted prior to opening Discord)
 * - `MENTION_EVERYONE`
 * - `USE_EXTERNAL_EMOJIS` (use emojis from different guilds)
 * - `EXTERNAL_EMOJIS` **(deprecated)**
 * - `CONNECT` (connect to a voice channel)
 * - `SPEAK` (speak in a voice channel)
 * - `MUTE_MEMBERS` (mute members across all voice channels)
 * - `DEAFEN_MEMBERS` (deafen members across all voice channels)
 * - `MOVE_MEMBERS` (move members between voice channels)
 * - `USE_VAD` (use voice activity detection)
 * - `CHANGE_NICKNAME`
 * - `MANAGE_NICKNAMES` (change other members' nicknames)
 * - `MANAGE_ROLES`
 * - `MANAGE_ROLES_OR_PERMISSIONS` **(deprecated)**
 * - `MANAGE_WEBHOOKS`
 * - `MANAGE_EMOJIS`
 * @type {Object}
 * @see {@link https://discord.com/developers/docs/topics/permissions}
 */
Permissions.FLAGS = {
  CREATE_INSTANT_INVITE: 1 << 0,
  KICK_MEMBERS: 1 << 1,
  BAN_MEMBERS: 1 << 2,
  ADMINISTRATOR: 1 << 3,
  MANAGE_CHANNELS: 1 << 4,
  MANAGE_GUILD: 1 << 5,
  ADD_REACTIONS: 1 << 6,
  VIEW_AUDIT_LOG: 1 << 7,
  PRIORITY_SPEAKER: 1 << 8,
  STREAM: 1 << 9,

  VIEW_CHANNEL: 1 << 10,
  READ_MESSAGES: 1 << 10,
  SEND_MESSAGES: 1 << 11,
  SEND_TTS_MESSAGES: 1 << 12,
  MANAGE_MESSAGES: 1 << 13,
  EMBED_LINKS: 1 << 14,
  ATTACH_FILES: 1 << 15,
  READ_MESSAGE_HISTORY: 1 << 16,
  MENTION_EVERYONE: 1 << 17,
  EXTERNAL_EMOJIS: 1 << 18,
  USE_EXTERNAL_EMOJIS: 1 << 18,

  CONNECT: 1 << 20,
  SPEAK: 1 << 21,
  MUTE_MEMBERS: 1 << 22,
  DEAFEN_MEMBERS: 1 << 23,
  MOVE_MEMBERS: 1 << 24,
  USE_VAD: 1 << 25,

  CHANGE_NICKNAME: 1 << 26,
  MANAGE_NICKNAMES: 1 << 27,
  MANAGE_ROLES: 1 << 28,
  MANAGE_ROLES_OR_PERMISSIONS: 1 << 28,
  MANAGE_WEBHOOKS: 1 << 29,
  MANAGE_EMOJIS: 1 << 30,
  
  MANAGE_THREADS: 0x0400000000,
  USE_PUBLIC_THREADS: 0x0800000000,
  USE_PRIVATE_THREADS: 0x1000000000,
};

/**
 * Bitfield representing every permission combined
 * @type {number}
 */
Permissions.ALL = Object.keys(Permissions.FLAGS).reduce((all, p) => all | Permissions.FLAGS[p], 0);

/**
 * Bitfield representing the default permissions for users
 * @type {number}
 */
Permissions.DEFAULT = 104324673;

/**
 * @class EvaluatedPermissions
 * @classdesc The final evaluated permissions for a member in a channel
 * @see {@link Permissions}
 * @deprecated
 */

Permissions.prototype.hasPermission = util.deprecate(Permissions.prototype.hasPermission,
  'EvaluatedPermissions#hasPermission is deprecated, use Permissions#has instead');
Permissions.prototype.hasPermissions = util.deprecate(Permissions.prototype.hasPermissions,
  'EvaluatedPermissions#hasPermissions is deprecated, use Permissions#has instead');
Permissions.prototype.missingPermissions = util.deprecate(Permissions.prototype.missingPermissions,
  'EvaluatedPermissions#missingPermissions is deprecated, use Permissions#missing instead');
Object.defineProperty(Permissions.prototype, 'raw', {
  get: util
    .deprecate(Object.getOwnPropertyDescriptor(Permissions.prototype, 'raw').get,
      'EvaluatedPermissions#raw is deprecated use Permissions#bitfield instead'),
  set: util.deprecate(Object.getOwnPropertyDescriptor(Permissions.prototype, 'raw').set,
    'EvaluatedPermissions#raw is deprecated use Permissions#bitfield instead'),
});
Object.defineProperty(Permissions.prototype, 'member', {
  get: util
    .deprecate(Object.getOwnPropertyDescriptor(Permissions.prototype, 'member').get,
      'EvaluatedPermissions#member is deprecated'),
  set: util
    .deprecate(Object.getOwnPropertyDescriptor(Permissions.prototype, 'member').set,
      'EvaluatedPermissions#member is deprecated'),
});

module.exports = Permissions;
