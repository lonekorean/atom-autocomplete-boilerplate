'use babel';

import classes from '../data/classes';
import functions from '../data/functions';
import constants from '../data/constants';

const suggestions = []
  .concat(classes.map(f => ({ ...f, type: 'class' })))
  .concat(functions.map(f => ({ ...f, type: 'function' })))
  .concat(constants.map(c => ({ ...c, type: 'value' })));

class DirectProvider {
  constructor() {
		this.selector = '.source.lua';
		this.disableForSelector = '.source.lua .comment';
		this.suggestionPriority = 2;
  }

  getSuggestions(options) {
    const { prefix } = options;
		if (prefix.length >= 3)
			return this.findMatchingSuggestions(prefix);
	}

  findMatchingSuggestions(prefix) {
    prefix = prefix.toLowerCase();
		return suggestions
      .filter(suggestion => suggestion.text.toLowerCase().startsWith(prefix));
  }
}
export default new DirectProvider();
