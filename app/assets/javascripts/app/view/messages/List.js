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
        emptyText: '<p class="empty">You have not received any messages yet:-(</p>',
        onItemDisclosure: function(record, btn, index) {
//            Ext.Msg.alert('Tap', 'Disclose for more info', Ext.emptyFn);
        },
        itemTpl: [
            '<div class="game"><div class="title">{[this.preprocess_opponents(values.opponents)]}</div><div class="room">{[this.posted(values.created_at)]}</div></div>',
            {
                posted: helpers.time_ago
            }

        ]
    }
});