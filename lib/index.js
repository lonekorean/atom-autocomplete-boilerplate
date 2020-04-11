'use babel'
import CallbacksProvider from './providers/callbacks'
import ClsProvider from './providers/classes'
import ConstProvider from './providers/constants'
import GlobalsProvider from './providers/globals'
import MethodsProvider from './providers/methods'


export default {
  getProvider() {
    return [
      new CallbacksProvider(),
      new ClsProvider(),
      new ConstProvider(),
      new GlobalsProvider(),
      new MethodsProvider()
    ]
  }
}
