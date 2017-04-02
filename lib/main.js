'use babel';

import { CompositeDisposable } from 'atom';
import fruitsProvider from './fruitsProvider';

export default {
    subscriptions: null,

    activate() {
        this.subscriptions = new CompositeDisposable();
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    getProvider() {
        return [fruitsProvider];
    }
};
