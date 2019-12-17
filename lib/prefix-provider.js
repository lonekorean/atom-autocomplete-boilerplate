'use babel';

import methods from '../data/methods';

const methodgroups = methods;

class PrefixProvider {
  constructor() {
		this.selector = '.source.lua';
		this.disableForSelector = '.source.lua .comment';
		this.suggestionPriority = 3;
  }

  getSuggestions(options) {
    const { editor, bufferPosition } = options;
    const [ hint, sep, prefix ] = this.getHintPrefix(editor, bufferPosition);
    if (hint == null)
      return [];
    return this.findMatchingSuggestions(hint, sep, prefix);
	}

  getHintPrefix(editor, bufferPosition) {
    const line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
		const match = line.match(/(\S+)([\.:])(\S*)$/);
		return match ? match.slice(1) : [ null, null, null ];
  }

  findMatchingSuggestions(hint, sep, prefix) {
  	let key, isMethod;
  	if (sep == '.')
  	  key = 'cls', isMethod = false;
  	else
  	  key = 'hintChar', isMethod = true, hint = hint.match(/(.)\d*$/)[1];
    prefix = prefix.toLowerCase();
    for (let mg of methodgroups)
      if (mg[key] == hint)
        return mg.methods
          .filter(m => m.text.toLowerCase().startsWith(prefix))
          .map(m => ({
            displayText: m.text,
            description: m.desc,
            leftLabel: m.ret,
            snippet: this.fmtSnippet(mg.cls, m, isMethod),
            type: 'method'
          }));
  }

  fmtSnippet(cls, m, isMethod) {
    const { text, args, desc } = m;
    const match = desc.match(/^.+\..+\(..*?:\s+([\w_]+)/);
    const paramtype = match && match[1];
    const i = isMethod && cls == paramtype ? 1 : 0;
    return `${text}(${args.slice(i)
      .map((a, i) => `\${${i + 1}:${a}}`)
      .reduce((a, b) => a + ", " + b, "")
      .slice(2)})`
  }
}
export default new PrefixProvider();
