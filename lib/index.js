'use babel'
import ClsProvider from './providers/classes'
import ConstProvider from './providers/constants'


export default {
  getProvider() {
    return [
      new ClsProvider(),
      new ConstProvider()
    ]
  }
}
