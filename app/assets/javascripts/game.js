Ext.Loader.setConfig({ enabled: false });
Ext.application({
    name: 'StartStop',
    icon: '/assets/icon.png',

    models: [
        'Player'
    ],

    controllers: [
        'Facebook'
    ],

    views: [
        'Login',
        'NoFriends',
        'Main'
    ],

    stores: [
        'Players'
    ],

    config: {
        enableLoader: false
    },

    viewport: {
        autoMaximize: true
    },


    launch: function() {
        console.log("Application has launched");
        this.facebookAppId = '411630315582393';
    }
});