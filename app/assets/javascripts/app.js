//Ext.application({
//    launch: function () {
//        Ext.create('Ext.Panel', {
//            fullscreen: true,
//            html: 'Hello World!'
//        });
//    }
//});

Ext.application({
   name: 'StartStop',
   icon: '/assets/icon.png'
});

/*Ext.application({
    name: 'JWF',

    icon: 'resources/icons/icon.png',
    phoneStartupScreen:  'resources/images/phone_startup.png',

    models: [
        'Run'
    ],

    views: [
        'Main',
        'Form',
        'Login'
    ],

    controllers: [
        'Facebook',
        'Runs'
    ],

    stores: [
        'Runs'
    ],

    viewport: {
        autoMaximize: true
    },

    launch: function() {

        this.facebookAppId = '';

        if (this.facebookAppId === '') {
            Ext.create('Ext.Component', {
                fullscreen: true,
                padding: 20,
                html: [
                    '<p>Please read the source of app.js to set up this example locally.</p><br/>',
                    '<p>For a live example, visit <a href="http://ju.mp/senchajwf">http://ju.mp/senchajwf</a></p>'
                ].join('')
            });
        }
    }
});*/