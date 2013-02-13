Ext.define('StartStop.model.Message', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'status',
            'from',
            'sender',
            'message',
            'sent_at'
        ]
    }
});