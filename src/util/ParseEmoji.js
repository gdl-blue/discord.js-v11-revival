module.exports = function parseEmoji(text) {
  if (text.includes('%')) {
    text = decodeURIComponent(text);
  }
  if (text.includes(':')) {
    const _arr = text.split(':');
	const name = _arr[0], id = _arr[1];
    return { name, id };
  } else {
    return {
      name: text,
      id: null,
    };
  }
};
