'use babel';

// data source is an array of objects
import suggestions from '../data/basic';

class AdvancedProvider {
	constructor() {
		// offer suggestions when editing any file type
		this.selector = '*';
	}

	getSuggestions(options) {
		const { prefix } = options;
		return this.findMatchingSuggestions(prefix);
	}

	findMatchingSuggestions(prefix) {
	}
}
export default new AdvancedProvider();
