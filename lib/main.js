'use babel';

import basicProvider from './basicProvider';
import intermediateProvider from './intermediateProvider';
import advancedProvider from './advancedProvider';

export default {
    getProvider() {
        // return a single provider, or an array of providers to use together
        return [basicProvider, intermediateProvider, advancedProvider];
    }
};
