/**
 * Handles Facebook interactions, specifically Login and Logout.
 *
 * When a user logs in, we display their profile picture and a list of Runs.
 */
Ext.define('StartStop.controller.Facebook', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox'],

    config: {
        control: {
            '#signout': {
                tap: 'onUserTap'
            },
            '#logoutButton': {
                tap: 'logout'
            }
        }
    },

    /**
     * Load the Facebook Javascript SDK asynchronously
     */
    init: function() {

        window.fbAsyncInit = Ext.bind(this.onFacebookInit, this);

        (function(d){
            var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            d.getElementsByTagName('head')[0].appendChild(js);
        }(document));
    },

    onFacebookInit: function() {

        if (StartStop.app.facebookAppId === '') return;

        var me = this;

        FB.init({
            appId  : StartStop.app.facebookAppId,
            cookie : true
        });

        FB.Event.subscribe('auth.logout', Ext.bind(me.onLogout, me));

        FB.getLoginStatus(function(response) {
            console.log("Response : ", response);

            clearTimeout(me.fbLoginTimeout);

            me.hasCheckedStatus = true;
            Ext.Viewport.setMasked(false);

            Ext.get('splashLoader').destroy();
            Ext.get('body-canvas').addCls('greyBg');

            if (response.status == 'connected') {
                me.onLogin();
            } else {
                me.login();
            }
        });

        me.fbLoginTimeout = setTimeout(function() {

            Ext.Viewport.setMasked(false);

            Ext.create('Ext.MessageBox', {
                title: 'Facebook Error',
                message: [
                    'Facebook Authentication is not responding. ',
                    'Please check your Facebook app is correctly configured, ',
                    'then check the network log for calls to Facebook for more information.',
                    'Restart the app to try again.'
                ].join('')
            }).show();

        }, 10000);
    },

    login: function() {
        Ext.Viewport.setMasked(false);
        var splash = Ext.getCmp('login');
        if (!splash) {
            Ext.Viewport.add({ xclass: 'StartStop.view.Login', id: 'login' });
        }
        Ext.getCmp('login').showLoginText();
    },

    onLogin: function() {

        var me = this,
            errTitle;

        FB.api('/me', function(response) {

            if (response.error) {
                FB.logout();

                errTitle = "Facebook " + response.error.type + " error";
                Ext.Msg.alert(errTitle, response.error.message, function() {
                    me.login();
                });
            } else {
                StartStop.userData = response;
                StartStop.user_token = FB.getAuthResponse()['accessToken'];

                if (!me.main) {
                    me.main = Ext.create('StartStop.view.Main', {
                        id: 'main'
                    });
                }
                me.loadUser();
            }
        });
    },

    initUser:  function(response,email, config) {
        var me = this;
        console.log("Email: ", email, config);
        if (response == "cancel" ||
            !Ext.data.Validations.email({},email)) {

            Ext.Msg.prompt("Email Address Required!", "We need a valid email address to continue", this.initUser, this);
        }
        else {
            var params = {
                fb_id: StartStop.userData.id,
                name: StartStop.userData.name,
                location: StartStop.userData.location != null ?  StartStop.userData.location.name : ""
            };

            Ext.Ajax.request({
                url: "/players?authenticity_token=" + helpers.csrf_token(),
                method: "POST",
                headers: {
                    "Accept" : "application/json"
                },
                params: helpers.railsify_keys('player', params),

                callback: function(rsp, status, obj) {
                    if (status) {
                        StartStop.user = $.parseJSON(obj.responseText);
                        console.log("Created player", StartStop.user);
                        me.loadMainView();
                    }
                }
            });
        }
    },

    loadMainView : function() {
        var self = this;
        Ext.Viewport.setActiveItem(this.main);
        Ext.getStore('Players').load();
        Ext.getStore('Games').getProxy().setUrl("/games?player_id=" + StartStop.user.id);
        Ext.getStore('Games').load();
        Ext.getStore('Messages').load();

        var detailPanel = Ext.ComponentQuery.query('friendInfo')[0];
        detailPanel.setData(StartStop.user);

        var pubnub = PUBNUB.init({
            publish_key   : 'pub-c-d32051ce-6533-4d15-8b8e-6ea0f44ffc77',
            subscribe_key : 'sub-c-ee3a5cbe-742c-11e2-8b02-12313f022c90'
        });

        pubnub.subscribe({
            channel  : "start_stop_channel", // Channel Name
            connect  : function(message) {
                console.log("Connected!", message);
            }, // OnConnect Callback
            callback : function(message) {
                if (message.type == "invite" && message.to == StartStop.user.fb_id) {
                    SHOTGUN.fire("invite-received", [message])
                }
            },  // Received Message Callback
            presence : function(message) {
                SHOTGUN.fire('presence', [message]);
            }
        });

        SHOTGUN.listen("invite-friend", function(from, to, gameId, name) {
            pubnub.publish({
                channel: "start_stop_channel",
                message: { from: from, to: to, game: gameId, type: "invite", sender: name }
            });
        });

        SHOTGUN.listen("invite-received", function(message) {
            Ext.getStore('Messages').add({ status: "unread", game: message.game, from: message.from, sender: message.sender, message: " wants to play Start / Stop with you.", sent_at: new Date(), id: new Date().getTime() });
            SHOTGUN.fire("update-message-counter", [2,1]);
        });

        SHOTGUN.listen("update-message-counter", function(tabIndex,counter) {
            var main = Ext.ComponentQuery.query('mainTab')[0];
            var tabBar = main.getTabBar();
            var tab = tabBar.getItems().getAt(tabIndex);

            var badgeText = tab.getBadgeText();
            if (badgeText == null)
                badgeText = 0;

            badgeText+= counter;
            tab.setBadgeText(badgeText);
        });
    },

    loadUser: function() {
        var me = this;
        $.getJSON("/players/" + StartStop.userData.id + "?token=" + StartStop.user_token,
            function (data) {
                if (data == null) {
                    Ext.Msg.prompt("Welcome " + StartStop.userData.name, "What is your Email?", me.initUser, me);
                }
                else {
                    StartStop.user = data;
                    me.loadMainView();
                }
            }
        );
    },

    logout: function() {
        Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Logging out...'});
        FB.logout();
    },

    /**
     * Called when the Logout button is tapped
     */
    onLogout: function() {

        if (!this.hasCheckedStatus) return;

        this.login();

        Ext.Viewport.setMasked(false);
        Ext.Viewport.setActiveItem(Ext.getCmp('login'));
        Ext.getStore('Runs').removeAll();

        this.logoutCmp.destroy();
    },

    /**
     * When the user profile picture is tapped, create a Logout button and pop it up next to the
     * avatar.
     */
    onUserTap: function(cmp) {

        if (!this.logoutCmp) {
            this.logoutCmp = Ext.create('Ext.Panel', {
                width: 120,
                top: 0,
                left: 0,
                padding: 5,
                modal: true,
                hideOnMaskTap: true,
                items: [
                    {
                        xtype: 'button',
                        id: 'logoutButton',
                        text: 'Logout',
                        ui: 'decline'
                    }
                ]
            });
        }

        this.logoutCmp.showBy(cmp);
    }
});
