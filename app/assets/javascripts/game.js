Ext.Loader.setConfig({ enabled: false });
Ext.application({
    name: 'StartStop',
    icon: '/assets/icon.png',

    models: [
        'Player',
        'Game',
        'Message'
    ],

    controllers: [
        'Facebook',
        'Games'
    ],

    views: [
        'Login',
        'Main',
        'games.List',
        'messages.List'
    ],

    stores: [
        'Players',
        'Games',
        'Messages'
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