Ext.Loader.setConfig({ enabled: false });
Ext.application({
    name: 'StartStop',
    icon: '/assets/icon.png',

    models: [
        'Player',
        'Game'
    ],

    controllers: [
        'Facebook',
        'Games'
    ],

    views: [
        'Login',
        'Main',
        'games.List'
    ],

    stores: [
        'Players',
        'Games'
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