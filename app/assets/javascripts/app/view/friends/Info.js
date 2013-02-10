Ext.define('StartStop.view.friends.Info', {

    extend: 'Ext.Panel',
    xtype: 'friendInfo',
    id: 'friendDetail',

    config: {

        cls: 'friendInfo',
        tpl: [
            '<div class="header">',
                '<div class="avatar" style="background-image: url(https://graph.facebook.com/{fb_id}/picture?type=square);"></div>',
                '<h2>{name}</h2>',
            '</div>'
        ]
    }
});