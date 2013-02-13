Ext.define('StartStop.view.Messages', {
    extend: 'Ext.navigation.View',
    xtype: 'messagesContainer',
    id: 'messagesContainer',
    config: {
        tab: {
            title: 'Messages',
            iconCls: 'messages'
        },
        items: [
            {
                xtype: 'messagesList'
            }
        ]
    },
    initialize: function() {
        var self = this;
    }
});