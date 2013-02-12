Ext.define('StartStop.view.games.List', {
    extend: 'Ext.List',
    xtype: 'gamesList',
    id: 'gamesList',

    initialize: function() {
        this.callParent();
        var self = this;
        console.log("The list of games has been initialized");
    },
    config: {
        store: 'Games',
        title: 'Your Games',
        emptyText: '<p class="empty">You are not currently playing any games:-(</p>',
        itemTpl: ['{status}' ]
    }
});