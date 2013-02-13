/**
 * The Messages Store. Contains a list of the messages received.
 */
Ext.define('StartStop.store.Messages', {
    extend  : 'Ext.data.Store',

    config: {
        model: 'StartStop.model.Message',
        grouper: {
            sortProperty: 'status',
            groupFn: function(record) {
                return record.get('status').capitalize();
            }
        },
        emptyText: 'No messages received yet!'
    }
});