'use babel';

// data source is a simple array of strings
import suggestions from '../data/basic';

class BasicProvider {
	constructor() {
		// offer suggestions when editing any file type
		this.selector = '*';
	}

	getSuggestions(options) {
		const { prefix } = options;
		return this.findMatchingSuggestions(prefix);
	}

	findMatchingSuggestions(prefix) {
		// filter list of words to those with a matching prefix
		let matchingWords = suggestions.filter((suggestion) => {
			return suggestion.startsWith(prefix);
		});

		// convert the array of words into an array of objects with a text property
		let matchingSuggestions = matchingWords.map((word) => {
			return { text: word };
		});

		return matchingSuggestions;
	}
}
export default new BasicProvider();
