/**
 * A Player model
 */
Ext.define('StartStop.model.Player', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'fb_id', type: 'string' },
            { name: 'name',  type: 'string' },
            { name: 'email',  type: 'string' },
            { name: 'location',  type: 'string' }
        ]
    }
});
