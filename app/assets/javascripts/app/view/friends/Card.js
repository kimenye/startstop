Ext.define('StartStop.view.Friends', {
    extend: 'Ext.Container',
    xtype: 'friendsContainer',
    id: 'friendsContainer',
    config: {
        tab: {
            title: 'Friends',
            iconCls: 'friends'
        },

        layout: 'vbox',

        items: [
            {
                xtype: 'friendInfo',
                data: StartStop.user
            },
            {
                flex: 1,
                xtype: 'list',
                mode: 'MULTI',
                store: 'Players',
                emptyText: '<p class="empty">No friends currently playing :-(</p>',
                items: [
                    {
                        xtype: 'listitemheader',
                        cls: 'dark',
                        html: 'Your Friends playing this game'
                    }
                ],
                itemTpl: [
                    '<div class="header friend">',
                        '<div class="avatar" style="background-image: url(https://graph.facebook.com/{fb_id}/picture?type=square);"></div>',
                        '<h2>{name}</h2>',
                    '</div>'
                ],
                plugins: [
                {
                   xclass: 'Ext.plugin.PullRefresh',
                    pullRefreshText: 'Pull down for more Friends!'
                }]
            }
        ]
//        listeners: {
//            select: function(view, record) {
////                Ext.Msg.alert('Selected!', 'You selected ' + record.get('name'));
//            }
//        }
    },

    initialize: function() {
    }
});