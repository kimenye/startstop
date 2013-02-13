Ext.define('StartStop.view.games.List', {
    extend: 'Ext.List',
    xtype: 'gamesList',
    id: 'gamesList',

    initialize: function() {
        this.callParent();
        var self = this;
        console.log("The list of games has been initialized");
    },
    config: {
        store: 'Games',
        title: 'Your Games',
        grouped: true,
        emptyText: '<p class="empty">You are not currently playing any games:-(</p>',
        itemTpl: [
            '<div class="game"><div class="title">{[this.preprocess_opponents(values.opponents)]}</div><div class="room">{[this.posted(values.created_at)]}</div></div>',
            {
                posted: function(date) {
                    try {
                        var now = Math.ceil(Number(new Date()) / 1000),
                            dateTime = Math.ceil(Number(new Date(date)) / 1000),
                            diff = now - dateTime,
                            str;

                        if (diff < 60) {
                            return String(diff) + ' seconds ago';
                        } else if (diff < 3600) {
                            str = String(Math.ceil(diff / (60)));
                            return str + (str == "1" ? ' minute' : ' minutes') + ' ago';
                        } else if (diff < 86400) {
                            str = String(Math.ceil(diff / (3600)));
                            return str + (str == "1" ? ' hour' : ' hours') + ' ago';
                        } else if (diff < 60 * 60 * 24 * 365) {
                            str = String(Math.ceil(diff / (60 * 60 * 24)));
                            return str + (str == "1" ? ' day' : ' days') + ' ago';
                        } else {
                            return Ext.Date.format(new Date(date), 'jS M \'y');
                        }
                    } catch (e) {
                        return '';
                    }
                },

                preprocess_opponents: function(raw) {
                    var opponents = raw.split(",");
                    opponents = _.without(opponents, StartStop.user.name);
                    return "Me vs " + opponents.join(" vs ");
                }
            }

        ]
    }
});