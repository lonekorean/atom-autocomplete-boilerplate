'use babel';

import selectors from '../data/fruits.selectors';
import fruits from '../data/fruits';

class FruitsProvider {
	constructor() {
		this.selector = selectors.join(', ');
	}

	getSuggestions(options) {
		const { prefix } = options;
		return this.findMatchingSuggestions(prefix).map(this.inflateSuggestion);
	}

	findMatchingSuggestions(prefix) {
		return fruits.filter((fruit) => {
			return fruit.text.startsWith(prefix);
		});
	}

	inflateSuggestion(suggestion) {
		return {
			text: suggestion.text,
			rightLabel: 'Fruit'
		};
	}
}
export default new FruitsProvider();
