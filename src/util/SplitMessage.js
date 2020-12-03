"use strict";

module.exports = function splitMessage(text, obj) {
	var _obj = obj;
	var _obj$maxLength = _obj.maxLength;
	var maxLength = _obj$maxLength === undefined ? 1950 : _obj$maxLength;
	var _obj$char = _obj.char;
	var char = _obj$char === undefined ? "\n" : _obj$char;
	var _obj$prepend = _obj.prepend;
	var prepend = _obj$prepend === undefined ? "" : _obj$prepend;
	var _obj$append = _obj.append;
	var append = _obj$append === undefined ? "" : _obj$append;

    if (text.length <= maxLength) return text;
    const splitText = text.split(char);
    if (splitText.length === 1) throw new Error('Message exceeds the max length and contains no split characters.');
    const messages = [''];
    let msg = 0;
    for (let i = 0; i < splitText.length; i++) {
        if (messages[msg].length + splitText[i].length + 1 > maxLength) {
            messages[msg] += append;
            messages.push(prepend);
            msg++;
        }
        messages[msg] += (messages[msg].length > 0 && messages[msg] !== prepend ? char : '') + splitText[i];
    }
    return messages;
};
