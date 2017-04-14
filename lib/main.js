'use babel';

import basicProvider from './basic-provider';
import intermediateProvider from './intermediate-provider';
import advancedProvider from './advanced-provider';

export default {
    getProvider() {
        // return a single provider, or an array of providers to use together
        return [basicProvider, intermediateProvider, advancedProvider];
    }
};
