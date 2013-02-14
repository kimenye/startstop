Ext.define('StartStop.view.games.List', {
    extend: 'Ext.List',
    xtype: 'gamesList',
    id: 'gamesList',

    initialize: function() {
        this.callParent();
        var self = this;
    },
    config: {
        store: 'Games',
        title: 'Your Games',
        cls: 'games',
        grouped: true,
        emptyText: '<p class="empty">You are not currently playing any games:-(</p>',
        onItemDisclosure: function(record, btn, index) {
        },
        itemTpl: Ext.create('Ext.XTemplate',
                '{[this.vs_images(values.opponents)]}',
                '<div class="game">',
                    '<span class="posted">{[this.posted(values.created_at)]}</span>',
                    '<h2>{[this.vs_text(values.versus)]}</h2>',
                    '<p>{status_text}</p>',
                '</div>',
            {
                posted: helpers.time_ago,
                vs_text: function(raw) {
                    var opponents = raw.split(",");
                    opponents = _.without(opponents, StartStop.user.name);
                    return opponents[0];
                },
                vs_images: function(raw) {
                    var opponents = raw.split(",");
                    opponents = _.without(opponents, StartStop.user.fb_id);
                    var str = "";
                    var urls = [];
                    _.each(opponents, function(opponent) {
                        urls.push("https://graph.facebook.com/" + opponent + "/picture?type=square");
                    });

                    _.each(urls, function(url) {
                        str += "<img src=\"" + url + "\" />";
                    });
                    return str;
                }
            }
        )
    }
});