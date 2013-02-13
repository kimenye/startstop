Ext.define('StartStop.model.Message', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'status',
            'from',
            'sender',
            'game',
            'message',
            'sent_at'
        ]
    }
});