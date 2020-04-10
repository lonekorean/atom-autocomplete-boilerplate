'use babel'
import CallbacksProvider from './providers/callbacks'
import ClsProvider from './providers/classes'
import ConstProvider from './providers/constants'


export default {
  getProvider() {
    return [
      new CallbacksProvider(),
      new ClsProvider(),
      new ConstProvider()
    ]
  }
}
