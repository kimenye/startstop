Ext.define('StartStop.view.messages.List', {
    extend: 'Ext.List',
    xtype: 'messagesList',
    id: 'messagesList',

    initialize: function() {
        this.callParent();
        var self = this;
    },
    config: {
        store: 'Messages',
        title: 'Your Messages',
        grouped: true,
        cls: 'messages',
        emptyText: '<p class="empty">You have not received any messages yet:-(</p>',
        itemTpl: Ext.create('Ext.XTemplate',
            '<img src="https://graph.facebook.com/{from}/picture?type=square" />',
            '<div class="msg">',
                '<span class="posted">{[this.posted(values.sent_at)]}</span>',
                '<h2>{sender}</h2>',
            '<p>{message}</p>',
            '</div>',
            {
                posted: helpers.time_ago
            }
        )
    }
});