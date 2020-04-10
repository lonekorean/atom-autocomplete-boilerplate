'use babel'
import data from '../../data/callbacks'
import Config from '../config'


export default class CallbacksProvider {
  PRIORITY = 2
  MIN_LEN = 2

  constructor() {
    const tabType = Config.getFromEditor('tabType')
    const tabLen = Config.getFromEditor('tabLength')
    this.selector = '.source.lua'
    this.disableForSelector = '.source.lua .comment'
    this.suggestionPriority = this.PRIORITY
    this.tab = tabType == 'soft' ? " ".repeat(tabLen) : '\t'
  }

  getSuggestions(options) {
    const { editor, bufferPosition } = options
    const prefix = this.getPrefix(editor, bufferPosition)
    this.space = Config.get('useSpacing') ? ' ' : ''
    return prefix ? this.match(prefix) : []
	}

  getPrefix(editor, bufferPosition) {
    const line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition])
    const fndef = line.match(/function\s+(.+)$/)
    if (!fndef)
      return null
    const prefix = fndef[1].match(/[^\.]+$/)
    return prefix && prefix[0]
  }

  match(prefix) {
    switch (prefix[0]) {
      case '(': return null
      case '$': return this.matchUse(prefix)
      default: return this.matchID(prefix)
    }
  }

  matchUse(prefix) {
    const pat = prefix.toLowerCase().slice(1)
    return data.filter(e => e.used_by)
      .filter(e => e.used_by.some(u => u.toLowerCase().includes(pat)))
      .map(e => this.format(prefix, e))
  }

  matchID(prefix) {
    const pat = prefix.toLowerCase()
    if (prefix.length >= this.MIN_LEN)
      return data.filter(e => e.id.startsWith(pat))
        .map(e => this.format(prefix, e))
  }

  format = (prefix, entry) => ({
    replacementPrefix: prefix,
    displayText: entry.id,
    description: this.fmtDescription(entry),
    rightLabel: entry.used_as,
    type: 'snippet',
    snippet: this.fmtSnippet(entry)
  })

  fmtDescription(entry) {
    const args = entry.args
    const arglist = args.map(a => a.id).reduce((a, b) => `${a}, ${b}`)
    const argdesc = args.map(a => `${a.id}: ${a.type} | ${a.desc};`)
      .reduce((a, b) => a + '\n' + b)
    let uses = entry.used_by
    uses = uses ? "\n\nUsed by: " + uses.reduce((a, b) => `${a}, ${b}`) : ""
    return `${entry.id}(${arglist})
${entry.desc}

${argdesc}${uses}`
  }

  fmtSnippet(entry) {
    const args = entry.args.map(a => a.id).reduce((a, b) => `${a},${this.space}${b}`)
    return `${entry.id}(${args})
${this.tab}$1
end
`
  }
}
