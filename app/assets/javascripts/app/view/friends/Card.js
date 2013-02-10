Ext.define('StartStop.view.Friends', {
//    extend: 'Ext.dataview.List',
    extend: 'Ext.Container',
    xtype: 'friendsContainer',
    id: 'friendsContainer',
    config: {
        tab: {
            title: 'Friends',
            iconCls: 'friends'
//            action: 'speakersTab'
        },

        layout: 'vbox',

        items: [
            {
                flex: 1,
                scrollable: 'vertical',
                xtype: 'friendInfo',
                data: StartStop.user
            }
        ]

//        store: 'Players',
//        mode: 'MULTI',
//        plugins: [
//            {
//                xclass: 'Ext.plugin.PullRefresh',
//                pullRefreshText: 'Pull down for more Friends!'
//            }
//        ],
//        itemTpl: [
//            '<div class="avatar" style="background-image: url(https://graph.facebook.com/{fb_id}/picture?type=square);"></div>',
//            '<h4>{name}</h3>'
//        ],
//        iconCls: 'friends',
//        title: 'Friends'
//        listeners: {
//            select: function(view, record) {
////                Ext.Msg.alert('Selected!', 'You selected ' + record.get('name'));
//            }
//        }
    }
});