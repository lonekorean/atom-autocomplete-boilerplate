'use babel';

// TODO: import the provider(s) you want
import basicProvider from './basicProvider';
import intermediateProvider from './intermediateProvider';
//import advancedProvider from './advancedProvider';

export default {
    getProvider() {
        // TODO: return the provider you want to use, or use multiple providers
        //       together by returning them in an array
        //return basicProvider;
        return [basicProvider, intermediateProvider];
    }
};
