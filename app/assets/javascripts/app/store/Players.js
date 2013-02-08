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
        },


        emptyText: 'Invite some of your friends!',

        grouper: function(record) {
            return record.get("name")[0];
        },

        itemTpl: '{name}'

    }
});