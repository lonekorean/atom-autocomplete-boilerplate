'use babel';

// TODO: import the providers you want (remove the ones you don't)
import basicProvider from './basicProvider';
//import intermediateProvider from './intermediateProvider';
//import advancedProvider from './advancedProvider';

export default {
    getProvider() {
        // TODO: also try intermediateProvider or advancedProvider here, or try
        //       multiple providers by returning an array:
        //       [basicProvider, intermediateProvider, advancedProvider]
        return basicProvider;
    }
};
