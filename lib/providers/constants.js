'use babel'
import data from '../../data/constants'
import Config from '../config'


export default class ConstProvider {
  PRIORITY = 3
  MIN_LEN = 3

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
    const matchCase = Config.get("matchCaseForConstants")
    const getID = matchCase ? e => e.id : e => e.id.toLowerCase()
    if (!matchCase)
      prefix = prefix.toLowerCase()
    const starts = [], includes = []
    data.forEach((e) => {
      const id = getID(e)
      if (id.startsWith(prefix))
        starts.push(e)
      else if (id.includes(prefix))
        includes.push(e)
    })
    return starts.concat(includes)
  }

  format = (entry) => ({
    text: entry.id,
    description: entry.desc,
    rightLabel: `= ${entry.value}`,
    type: 'constant'
  })
}
