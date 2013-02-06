/**
 * The Friends Store. Contains a list of all a players friends who are using the app..
 */
Ext.define('StartStop.store.Players', {
    extend  : 'Ext.data.Store',

    config: {
        model: 'StartStop.model.Player',

        proxy: {
            type: 'ajax',
            url: '/players',
            headers: {
                'Accept' : 'application/json'
            }
        }
    }
});