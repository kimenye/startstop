Ext.define('StartStop.view.Games', {
//    extend: 'Ext.Container',
    extend: 'Ext.navigation.View',
    xtype: 'gamesContainer',
    id: 'gamesContainer',
    config: {
        tab: {
            title: 'Games',
            iconCls: 'games'
        },
//        layout: 'card',
        items: [
            {
                xtype: 'gamesList'
            }
        ]
    },
    initialize: function() {
        var self = this;
    }
});