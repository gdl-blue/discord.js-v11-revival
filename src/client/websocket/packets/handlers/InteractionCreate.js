'use strict';

const AbstractHandler = require('./AbstractHandler');
const Constants = require('../../../../util/Constants');

class InteractionCreateHandler extends AbstractHandler {
  handle(packet) {
    const client = this.packetManager.client;
    const data = packet.d;
	// console.log(data);
    const response = client.actions.InteractionCreate.handle(data);
    if (response.message) client.emit(Constants.Events.INTERACTION_CREATE, response.message);
  }
}

/**
 * Emitted whenever a message is created.
 * @event Client#message
 * @param {Message} message The created message
 */

module.exports = InteractionCreateHandler;
