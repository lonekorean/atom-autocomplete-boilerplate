'use babel'
import Config from '../config'
import Parser from '../parser'


export default class MethodsProvider {
  PRIORITY = 5
  NO_MATCH = [ null, null, null ]

  constructor() {
    this.selector = '.source.lua'
    this.disableForSelector = '.source.lua .comment'
    this.suggestionPriority = this.PRIORITY
  }

  getSuggestions(options) {
    this.space = Config.get('useSpacing') ? ' ' : ''
    this.opt = Config.get('suggestOptionalArguments')
    this.ret = Config.get('showReturnTypes')
    const [ tableID, indexer, prefix ] = this.getPrefix(options)
    if (!tableID)
      return []
    const group = this.getMethodGroup(tableID, indexer, prefix, options)
    if (!group)
      return []
    const suggestions = this.match(group, prefix)
    return this.format(group, indexer, suggestions)
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
    const end = [bufferPosition.row, bufferPosition.column - prefix.length]
    const code = editor.getTextInRange([[0, 0], end])
    return Parser.inferTypeFromCode(tableID, code)
  }

  match(group, prefix) {
    prefix = prefix.toLowerCase()
    return group.methods.filter(m => m.id.toLowerCase().startsWith(prefix))
  }

  format({ cls }, indexer, suggestions) {
    const sschk = indexer == ':' ? cls : null
    const sp = this.space
    const opt = this.opt
    const fmtArgs = (id, args) => {
      if (args[0] && sschk === args[0].type)
        args = args.slice(1)
      if (!opt)
        args = args.filter(a => !a.opt)
      if (args.length == 0)
        return [ '', '' ]
      args = args.map(({ id }) => id)
      return [
        args.reduce((a, b) => `${a}, ${b}`),
        args.map((a, i) => `\${${i + 1}:${a}}`).reduce((a, b) => `${a},${sp}${b}`)
      ]
    }
    const fmt = (entry) => {
      let { id, argstr, args, desc, ret } = entry
      const [ argids, argidsSnippet ] = fmtArgs(id, args)
      ret = ret ? ret.reduce((a, b) => `${a}, ${b}`) : ''
      return {
        displayText: `${id}(${argids})`,
        description: `${cls}.${id}(${argstr || ''})${ret && (': ' + ret)}\n${desc}`,
        leftLabel: this.ret && ret ? ret : null,
        type: 'method',
        snippet: `${id}(${argidsSnippet})`
      }
    }
    return suggestions.map(e => fmt(e))
  }


}
