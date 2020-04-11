'use babel'
import data from '../../data/globals'
import Config from '../config'


export default class GlobalsProvider {
  PRIORITY = 2
  MIN_LEN = 3

  constructor() {
    this.selector = '.source.lua'
    this.disableForSelector = '.source.lua .comment'
    this.suggestionPriority = this.PRIORITY
  }

  getSuggestions(options) {
    const { prefix } = options
    this.space = Config.get('useSpacing') ? ' ' : ''
    this.opt = Config.get('suggestOptionalArguments')
    this.ret = Config.get('showReturnTypes')
    if (prefix.length >= this.MIN_LEN)
      return this.match(prefix).map(e => this.format(e))
	}

  match(prefix) {
    prefix = prefix.toLowerCase()
    const starts = [], includes = []
    data.forEach((e) => {
      const id = e.id.toLowerCase()
      if (id.startsWith(prefix))
        starts.push(e)
      else if (id.includes(prefix))
        includes.push(e)
    })
    return starts.concat(includes)
  }

  format = (entry) => {
    let { id, argstr, args, desc, ret } = entry
    const [ argids, argidsSnippet ] = this.fmtArgs(id, args)
    ret = ret ? ret.reduce((a, b) => `${a}, ${b}`) : ''
    return {
      displayText: `${id}(${argids})`,
      description: `${id}(${argstr || ''})${ret && (': ' + ret)}\n${desc}`,
      leftLabel: this.ret && ret ? ret : null,
      type: 'function',
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
