/**
 * The class controls the adding of new Runs to the database.
 */
Ext.define('StartStop.controller.Games', {
    extend: 'Ext.app.Controller',

    selectedItems: [],

    config: {
        control: {
            '#showFormButton': {
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
                Ext.getCmp('showFormButton').disable();
//                self.isActive = true;
            }
            else {
                Ext.getCmp('showFormButton').enable();
//                self.isActive = false;
            }
        });
    },

    onFriendSelected: function (friend) {
        this.selectedItems.push(friend);
    },

    onFriendDeSelected: function (friend) {
        this.selectedItems = _.reject(this.selectedItems, function(item) {
            return friend.data.fb_id == item.data.fb_id;
        });
    },

//    onRunsLoad: function(store) {
//
//        var main = Ext.getCmp('main'),
//            runList = Ext.getCmp('runList'),
//            noFriends = Ext.getCmp('noFriends');
//
//        if (store.getCount()) {
//            if (!runList) {
//                runList = Ext.create('StartStop.view.run.List', {
//                    id: 'runList'
//                });
//            }
//            main.setActiveItem(runList);
//        } else {
//            if (!noFriends) {
//                noFriends = Ext.create('StartStop.view.NoFriends', {
//                    id: 'noFriends',
//                    data: StartStop.userData
//                });
//            }
//            main.setActiveItem(noFriends);
//        }
//    },

    startGame: function() {
//        if (!this.addRunForm) {
//            this.addRunForm = Ext.create('StartStop.view.Form', {
//                id: 'runForm'
//            });
//        }
//        Ext.Viewport.setActiveItem(this.addRunForm);
//        console.log("clicked the show form with selections: ", this.selectedItems.length);
        if (this.selectedItems.length < 1) {
            Ext.Msg.alert("Pick a Friend(s) to play with");
        } else {
            Ext.getCmp('main').setMasked({
                xtype: 'loadmask',
                message: 'Preparing game...'
            });
        }
    },

    hideForm: function() {
//        Ext.Viewport.setActiveItem(Ext.getCmp('main'));
//        Ext.getCmp('runForm').hide();
    },

    addRun: function() {

//        var distance = Ext.getCmp('distanceField').getValue(),
//            location = Ext.getCmp('locationField').getValue(),
//            caption = StartStop.userData.first_name + ' ran ' + distance + ' miles';
//
//        if (location) {
//            caption += ' in ' + location;
//        }
//
//        Ext.getCmp('runForm').setMasked({
//            xtype: 'loadmask',
//            message: 'Adding New Jog...'
//        });
//
//        Ext.Ajax.request({
//            url: '/run',
//            method: 'POST',
//            params: {
//                location: location,
//                distance: distance
//            },
//            callback: this.onAddRun,
//            scope: this
//        });
    },

    onAddRun: function(options, success, response) {
//        Ext.getCmp('runForm').setMasked(false);
//        this.hideForm();
//        Ext.getStore('Runs').load();
    }
});
