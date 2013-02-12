/**
 * The Friends Store. Contains a list of all a players friends who are using the app..
 */
Ext.define('StartStop.store.Games', {
    extend  : 'Ext.data.Store',

    config: {
        model: 'StartStop.model.Game',

        proxy: {
            type: 'ajax',
            headers: {
                'Accept' : 'application/json'
            }
        },
        emptyText: 'You are not involved in any games!'
    }
});