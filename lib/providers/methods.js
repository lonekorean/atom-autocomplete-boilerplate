'use babel'
import Config from '../config'
import Parser from '../parser'


export default class MethodsProvider {
  PRIORITY = 5
  MIN_LEN = 3
  NO_MATCH = [ null, null, null ]

  constructor() {
    this.selector = '.source.lua'
    this.disableForSelector = '.source.lua .comment'
    this.suggestionPriority = this.PRIORITY
  }

  getSuggestions(options) {
    this.space = Config.get('useSpacing') ? ' ' : ''
    const [ tableID, indexer, prefix ] = this.getPrefix(options)
    if (!tableID)
      return []
    const group = this.getMethodGroup(tableID, indexer, prefix, options)
    if (!group)
      return []
    console.log(group.cls)
    const suggestions = this.match(group, prefix)
    return suggestions.map(e => this.format(e))
	}

  getPrefix({ editor, bufferPosition }) {
    const line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition])
    const match = line.match(/([a-zA-Z_]\w*)([\.:])((?:[a-zA-Z_]\w*)*)$/)
    return match ? match.slice(1) : this.NO_MATCH
  }

  getMethodGroup(tableID, indexer, prefix, options) {
    return Parser.checkStaticCall(tableID, indexer)
      || this.inferFromCode(tableID, prefix, options)
      || Parser.inferTypeFromID(tableID)
  }

  inferFromCode(tableID, prefix, { editor, bufferPosition }) {
    // const code = editor.getTextInRange([[0, 0], /* bufferPosition - prefix.length */])
    return Parser.inferTypeFromCode(tableID, '')
  }

  match(group, prefix) {
    return []
  }

  format = (entry) => {
    let { id, argstr, args, desc, ret } = entry
    const [ argids, argidsSnippet ] = this.fmtArgs(id, args)
    ret = ret ? ret.reduce((a, b) => `${a}, ${b}`) : ''
    return {
      displayText: `${id}(${argids})`,
      description: `${id}(${argstr || ''})${ret && (': ' + ret)}\n${desc}`,
      leftLabel: this.ret && ret ? ret : null,
      type: 'method',
      snippet: `${id}(${argidsSnippet})`
    }
  }

  fmtArgs(id, args) {
    const sp = this.space
    if (!this.opt)
      args = args.filter(a => !a.opt)
    if (args.length == 0)
      return [ '', '' ]
    args = args.map(({ id }) => id)
    return [
      args.reduce((a, b) => `${a}, ${b}`),
      args.map((a, i) => `\${${i + 1}:${a}}`).reduce((a, b) => `${a},${sp}${b}`)
    ]
  }
}
