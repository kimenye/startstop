Ext.define('StartStop.view.messages.List', {
    extend: 'Ext.List',
    xtype: 'messagesList',
    id: 'messagesList',

    initialize: function() {
        this.callParent();
        var self = this;

        SHOTGUN.listen("handle-message", function(message) {
            self.handleMessage(message);
        });
    },

    handleMessage: function(message) {
        this.currentMessage = message;
        Ext.Msg.confirm("Accept invite?", "Do you want to play this game?",
            this.handleMessageConfirmation, this);
    },

    handleMessageConfirmation: function(buttonId) {
        var accepted = (buttonId == "yes");
        var status = accepted ? "Accepted" : "Rejected";
        var message = this.currentMessage;
        SHOTGUN.fire("update-message-counter", [2,-1]);

        var scope = {
            view: this,
            message: message
        }

        Ext.Ajax.request({
            url: "/games/" + message.get('game') + "/invites?authenticity_token=" + helpers.csrf_token(),
            method: "POST",
            headers: {
                "Accept" : "application/json"
            },
            params: {
                status: status,
                player_id: StartStop.user.id
            },
            callback: function(rsp, status, obj) {
                if (status) {
                    this.message.set('status', 'Read');
                }
            },
            scope: scope
        });
    },

    config: {
        store: 'Messages',
        title: 'Your Messages',
        grouped: true,
        cls: 'messages',
        emptyText: '<p class="empty">You have not received any messages yet:-(</p>',
        onItemDisclosure: function(record, btn, index) {
            SHOTGUN.fire("handle-message", [record]);
        },
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