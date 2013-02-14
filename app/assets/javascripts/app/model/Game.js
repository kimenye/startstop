/**
 * A Game model
 */
Ext.define('StartStop.model.Game', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'status',
            'opponents',
            'created_at',
            'status_text',
            'versus'
        ]
    }
});
