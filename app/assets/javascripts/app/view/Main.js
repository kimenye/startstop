/**
 * This screen is displayed once a user has logged in to Facebook and authorized our app.
 */
Ext.define('StartStop.view.Main', {
    extend: 'Ext.tab.Panel',
    config: {
        activeTab: 0,
        tabBar: {
            layout: {
                pack: 'center',
                align: 'center'
            },
            docked: 'bottom'
        },
        defaults: {
            scrollable: false
        },
        listeners: {
            activeitemchange: function (tabPanel, tab, oldTab) {
                SHOTGUN.fire("tab-changed", [tab.config.tab.title]);
            }
        },
        items : [
            {
                docked: 'top',
                xtype: 'toolbar',
                id: 'mainToolbar',
                cls: 'homeToolbar',
                items: [
                    {   xtype: 'spacer'   },
                    {
                        xtype: 'button',
                        cls: 'fbButton',
                        iconCls: 'startGameBtn',
                        id: 'startGameButton'
                    },
                    {
                        xtype: 'button',
                        cls: 'fbButton',
                        iconCls: 'signoutBtn',
                        id: 'signout'
                    }
                ]
            },
            { xtype: 'friendsContainer' },
            { xtype: 'gamesContainer' }
        ]
    },

    initialize: function() {
        this.callParent();

        // Enable the Tap event on the profile picture in the toolbar, so we can show a logout button
        var meta = Ext.getCmp('signout');
        if (meta) {
            meta.element.on('tap', function(e) {
                meta.fireEvent('tap', meta, e);
            });
        }

        var self = this;

        SHOTGUN.listen('presence', function(message) {
            var tabBar = self.getTabBar();
            var tab = tabBar.getItems().getAt(0);
            tab.setBadgeText(message.occupancy);
        });
    }
});
