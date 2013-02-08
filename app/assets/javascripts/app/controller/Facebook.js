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
            console.log("Prepare to create");
            var params = {
                fb_id: StartStop.userData.id,
                name: StartStop.userData.name,
                location: StartStop.userData.location != null ?  StartStop.userData.location.name : ""
            };

            Ext.Ajax.request({
                url: "/players",
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
        Ext.Viewport.setActiveItem(this.main);
        Ext.getStore('Players').load();
    },

    loadUser: function() {
        var me = this;
        $.getJSON("/players/" + StartStop.userData.id,
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
