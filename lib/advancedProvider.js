'use babel';

// data source is an array of objects
import suggestions from '../data/advanced';

// fetch suggestions from this URL
const API_URL = 'http://codersblock.com/downloads/advanced.json';

class AdvancedProvider {
	constructor() {
		// offer suggestions when editing any file type
		this.selector = '*';

		// make these suggestions appear above default suggestions
		this.suggestionPriority = 2;
	}

	getSuggestions(options) {
		const { editor, bufferPosition } = options;

		// getting the prefix on our own instead of using the one Atom provides
		let prefix = this.getPrefix(editor, bufferPosition);

		// all of our snippets start with "@"
		if (prefix.startsWith('@')) {
			return this.findMatchingSuggestions(prefix);
		}
	}

	getPrefix(editor, bufferPosition) {
		// the prefix normally only includes characters back to the last word break
		// this expands the prefix back until a whitespace character is met
		// you can tweak this logic/regex to suit your needs
		let line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
		let match = line.match(/\S+$/);
		return match ? match[0] : '';
	}

	findMatchingSuggestions(prefix) {
		// using a Promise lets you fetch and return suggestions asynchronously
		// this is useful for hitting an external API without causing Atom to freeze
		return new Promise((resolve) => {
			// fire off an async request to the external API
			fetch(API_URL)
				.then((response) => {
					// convert raw response data to json
					return response.json();
				})
				.then((json) => {
					// filter list of suggestions to those matching the prefix
					let matchingSuggestions = suggestions.filter((suggestion) => {
						return suggestion.displayText.startsWith(prefix);
					});

					// bind a version of inflateSuggestion() that always passes in prefix
					// then run each matching suggestion through the bound inflateSuggestion()
					let inflateSuggestion = this.inflateSuggestion.bind(this, prefix);
					let inflatedSuggestions = matchingSuggestions.map(inflateSuggestion);

					// resolve the promise to show suggestions
					resolve(inflatedSuggestions);
				})
				.catch((err) => {
					// something went wrong
					console.log(err);
				});
		});
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(replacementPrefix, suggestion) {
		return {
			displayText: suggestion.displayText,
			snippet: suggestion.snippet,
			description: suggestion.description,
			replacementPrefix: replacementPrefix // ensures the entire prefix is replaced
		};
	}

	onDidInsertSuggestion(options) {
	}
}
export default new AdvancedProvider();
