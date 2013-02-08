Ext.define('StartStop.view.Friends', {
    extend: 'Ext.List',
    xtype: 'friendscard',
    config: {
        store: 'Players',
        mode: 'MULTI',
        itemTpl: '{name}',
        iconCls: 'friends',
        title: 'Friends',
        listeners: {
            select: function(view, record) {
                Ext.Msg.alert('Selected!', 'You selected ' + record.get('name'));
            }
        }
    }
});