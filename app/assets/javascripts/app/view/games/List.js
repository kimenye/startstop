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
        grouped: true,
        emptyText: '<p class="empty">You are not currently playing any games:-(</p>',
        onItemDisclosure: function(record, btn, index) {
//            Ext.Msg.alert('Tap', 'Disclose for more info', Ext.emptyFn);
        },
        itemTpl: [
            '<div class="game"><div class="title">{[this.preprocess_opponents(values.opponents)]}</div><div class="time">{[this.posted(values.created_at)]}</div></div>',
            {
                posted: helpers.time_ago,

                preprocess_opponents: function(raw) {
                    var opponents = raw.split(",");
                    opponents = _.without(opponents, StartStop.user.fb_id);
//                    return "Me vs " + opponents.join(" vs ");  /
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

        ]
    }
});