Ext.define('StartStop.model.Message', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'status',
            'from',
            'message',
            'sent_at'
        ]
    }
});