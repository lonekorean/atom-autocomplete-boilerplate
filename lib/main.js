'use babel';

import direct from './direct-provider';
import prefix from './prefix-provider';

export default {
    getProvider() {
        return [direct, prefix];
    }
};
