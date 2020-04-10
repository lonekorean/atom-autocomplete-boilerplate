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
    let { id, arglist, args, desc, ret } = entry
    let argids = '', argidsSnippet = ''
    ret = ret ? ret.reduce((a, b) => `${a}, ${b}`) : ''
    if (!this.opt)
      args = args.filter(a => !a.opt)
    args = args.map(({ id }) => id)
    if (args.length > 0) {
      argids = args.reduce((a, b) => `${a}, ${b}`)
      argidsSnippet = args.map((a, i) => `\${${i + 1}:${a}}`)
        .reduce((a, b) => `${a},${this.space}${b}`)
    }
    return {
      displayText: `${id}(${argids})`,
      description: `${id}(${arglist || ''})${ret && (': ' + ret)}\n${desc}`,
      leftLabel: this.ret && ret ? ret : null,
      type: 'function',
      snippet: `${id}(${argidsSnippet})`
    }
  }
}
