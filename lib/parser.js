'use babel'
import luaparse from 'dapetcu21-luaparse'
import callbacks from '../data/callbacks'
import globals from '../data/globals'
import methods from '../data/methods'


export default class Parser {
  static OPTIONS = {
    wait: false,
    comments: false,
    scope: true,
    locations: false,
    ranges: false,
    onCreateNode: Parser.onCreateNode,
    onCreateScope: Parser.onCreateScope,
    onDestroyScope: Parser.onDestroyScope,
    onScopeIdentifierName: Parser.onScopeIdentifierName,
    luaVersion: '5.3'
  }

  static checkStaticCall(baseID, indexer) {
    return indexer == '.' && methods.find(g => g.cls == baseID)
  }

  static inferTypeFromCode(id, code) {
    Parser.scopes = [{}]
    try {
      luaparse.parse(code, Parser.OPTIONS)
    } catch(e) { } finally {
      return Parser.getCurrentTypeMethods(id)
    }
  }

  static inferTypeFromID(id) {
    const lastChar = id.match(/(.)\d*$/)[1]
    return methods.find(g => g.infer == lastChar)
  }

  static getLastScope() {
    return Parser.scopes[Parser.scopes.length - 1]
  }

  static getGlobalScope() {
    return Parser.scopes[0]
  }

  static getCurrentType(id) {
    const scopes = Parser.scopes
    for (let i = scopes.length - 1; i >= 0; i--) {
      const type = scopes[i][id]
      if (type !== null)
        return type
    }
    return null
  }

  static onCreateNode(node) {
    if (node.type != 'LocalStatement' && node.type != 'AssignmentStatement')
      return
    let { variables, init } = node
    const lastIndex = init.length - 1
    init = init.map(i => {
      switch (i.type) {
        case 'Identifier': return Parser.handleIDAssignment(i)
        case 'CallExpression': return Parser.handleCallAssignment(i)
        // case 'NumericLiteral': return 'number'
        // case 'StringLiteral': return 'string'
        // case 'TableConstructorExpression': return 'table'
        default: return null
      }
    }).map((r, i) => Array.isArray(r) && i < lastIndex && r[0] || r).flat()
    const localScope = Parser.getLastScope()
    const globalScope = Parser.getGlobalScope()
    variables.forEach((v, i) => {
      const { name, isLocal } = v
      if (isLocal)
        localScope[name] = init[i]
      else
        globalScope[name] = init[i]
    })
  }

  static handleIDAssignment(node) {
    return Parser.getCurrentType(node.name)
  }

  static handleCallAssignment(node) {
    const { base } = node
    switch (base.type) {
      case 'Identifier': return Parser.handleCallBaseID(base)
      case 'MemberExpression': return Parser.handleCallBaseMember(base)
      default: return null
    }
  }

  static handleCallBaseID(node) {
    const { name } = node
    const globalFn = globals.find(g => g.id == name)
    return globalFn ? globalFn.ret : null
  }

  static handleCallBaseMember(node) {
    const { base, indexer, identifier } = node
    const baseID = base && base.name
    const memberID = identifier && identifier.name
    if (!baseID || !memberID)
      return null
    const methodGroup = Parser.checkStaticCall(baseID, indexer)
      || Parser.getCurrentTypeMethods(baseID)
      || Parser.inferTypeFromID(baseID)
    if (!methodGroup)
      return null
    const method = methodGroup.methods.find(g => g.id == memberID)
    return method && method.ret
  }

  static getCurrentTypeMethods(id) {
    const type = Parser.getCurrentType(id)
    return type && methods.find(g => g.cls == type)
  }

  static onCreateScope() {
    Parser.scopes.push({})
  }

  static onDestroyScope() {
    Parser.scopes.pop()
  }

  static onScopeIdentifierName(id, data) {
    const scope = Parser.getLastScope()
    scope[id] = data ? Parser.handleParamName(data) : null
  }

  static handleParamName({ parameterOf, parameterIndex }) {
    const { type, name, identifier } = parameterOf
    let fnID = type == 'Identifier' ? name : identifier && identifier.name
    if (!fnID)
      return null
    fnID = fnID.match(/(.*?)\d*$/)[1]
    const cb = callbacks.find(cb => fnID.endsWith(cb.id))
    if (!cb || parameterIndex >= cb.args.length)
      return null
    return cb.args[parameterIndex].type
  }
}
