'use babel';

import { CompositeDisposable } from 'atom';

// TODO: import the providers you want (remove the ones you don't)
import basicProvider from './basicProvider';
//import intermediateProvider from './intermediateProvider';
//import advancedProvider from './advancedProvider';

export default {
    subscriptions: null,

    activate() {
        this.subscriptions = new CompositeDisposable();
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    getProvider() {
        // TODO: also try intermediateProvider or advancedProvider here, or try
        //       multiple providers by returning an array:
        //       [basicProvider, intermediateProvider, advancedProvider]
        return basicProvider;
    }
};
