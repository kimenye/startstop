/**
 * Application helpers
 * requires Underscore.js
 */
var ApplicationHelpers = {
    railsify_keys: function (namespace, obj) {
        var self = this,
            curr_keys = _.keys(obj);

        return _.reduce(curr_keys, function (new_obj, curr_key) {
            var new_key = (self.is_primary_key(curr_key) ? curr_key : namespace + '[' + curr_key + ']');

            new_obj[new_key] = obj[curr_key];
            return new_obj;
        }, {});
    },

    // returns if k equals "id" or "_id"
    is_primary_key: function (k) {
        return k == 'id' || k == '_id';
    },

    current_tab: function () {
        return Ext.Viewport.getActiveItem().getTabBar().getActiveTab().getTitle()
    },

    time_ago: function (date) {
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

    csrf_token: function() {
        return document.getElementsByName("csrf-token")[0].getAttribute("content");
    }
};

// alias helpers to ApplicationHelpers for easier access. or don't.
var helpers = ApplicationHelpers;

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}