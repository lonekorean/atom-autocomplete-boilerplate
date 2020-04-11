'use babel'
import data from '../../data/classes'


export default class ClsProvider {
  PRIORITY = 6
  MIN_LEN = 2

  constructor() {
    this.selector = '.source.lua'
    this.disableForSelector = '.source.lua .comment'
    this.suggestionPriority = this.PRIORITY
  }

  getSuggestions(options) {
    const { prefix } = options
    if (prefix.length >= this.MIN_LEN)
      return this.match(prefix).map(e => this.format(e))
	}

  match(prefix) {
    prefix = prefix.toLowerCase()
    return data.filter(e => e.id.toLowerCase().startsWith(prefix))
  }

  format = (entry) => ({
    text: entry.id,
    description: entry.desc,
    type: 'class'
  })
}
