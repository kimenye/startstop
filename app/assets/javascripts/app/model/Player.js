/**
 * A Player model
 */
Ext.define('StartStop.model.Player', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'profileId', type: 'string' },
            { name: 'name',      type: 'string' }
        ]
    }
});
