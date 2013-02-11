/**
 * The class controls the adding of new Runs to the database.
 */
Ext.define('StartStop.controller.Games', {
    extend: 'Ext.app.Controller',

    selectedUsers: [],

    config: {
        control: {
            '#startGameButton': {
                tap: 'startGame'
            }
        }
    },

    isActive: false,

    init: function() {
        var self = this;
        this.callParent();

        SHOTGUN.listen('select-friend', function(friend) {
            self.onFriendSelected(friend);
        });

        SHOTGUN.listen('de-select-friend', function(friend) {
            self.onFriendDeSelected(friend);
        });

        SHOTGUN.listen("tab-changed", function(title) {
            if (title == "Games") {
                Ext.getCmp('startGameBtn').disable();
            }
            else {
                Ext.getCmp('startGameBtn').enable();
            }
        });
    },

    onFriendSelected: function (friend) {
        this.selectedUsers.push(friend);
    },

    onFriendDeSelected: function (friend) {
        this.selectedUsers = _.reject(this.selectedUsers, function(item) {
            return friend.data.fb_id == item.data.fb_id;
        });
    },

    startGame: function() {
        if (this.selectedUsers.length < 1) {
            Ext.Msg.alert("Pick a Friend(s) to play with");
        } else {
            Ext.getCmp('main').setMasked({
                xtype: 'loadmask',
                message: 'Preparing game...'
            });


            var users = [StartStop.user.fb_id];
            _.each(this.selectedUsers, function(user) {
                users.push(user.data.fb_id);
            });
            var params = {
                status: "pending"
            };

            Ext.Ajax.request({
                url: "/games",
                method: "POST",
                headers: {
                    "Accept" : "application/json"
                },
                params: helpers.railsify_keys('game', params),
                callback: function(rsp, status, obj) {
                    if (status) {
                        var game = $.parseJSON(obj.responseText);

                        _.each(users, function(user) {
                            if (user != StartStop.user.fb_id)
                                SHOTGUN.fire("invite-friend", [StartStop.user.fb_id, user, game.id]);
                        });
                    }
                }
            });
        }
    }
});
