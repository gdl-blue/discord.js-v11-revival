'use strict';

const Action = require('./Action');
const Message = require('../../structures/Message');

class InteractionCreateAction extends Action {
  handle(data) {
    const client = this.client;

    // 

    return {
      message: null,
    };
  }
}

module.exports = InteractionCreateAction;
