'use babel'
import data from '../../data/methods'
import Config from '../config'
import Parser from '../parser'


export default class MethodsProvider {
  PRIORITY = 5
  MIN_LEN = 3

  constructor() {
    this.selector = '.source.lua'
    this.disableForSelector = '.source.lua .comment'
    this.suggestionPriority = this.PRIORITY
  }

  getSuggestions(options) {
    this.space = Config.get('useSpacing') ? ' ' : ''
    const [ tableID, sep, prefix ] = this.getPrefix(options)
    if (!tableID)
      return []
    const group = this.getMethodGroup(tableID, sep, options)
    const suggestions = this.match(group, prefix)
    return suggestions.map(e => this.format(e))
	}

  getMethodGroup(tableID, sep, { editor, bufferPosition }) {
    // check if it's a static call first and sep == '.'
    // else, infer type from code
    // else, infer type from identifier
    // else, return []
    return []
  }

  getPrefix({ editor, bufferPosition }) {
    const line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition])
    const match = line.match(/([a-zA-Z_]\w*)([\.:])((?:[a-zA-Z_]\w)*)$/)
    return match ? match.slice(1) : [ null, null, null ]
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
