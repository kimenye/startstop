Ext.define('StartStop.view.Login', {
    extend: 'Ext.Container',

    config: {
        padding: 20,
        layout: 'fit',

        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                cls: 'ssToolbar'
            }
        ]
    },

    showLoginText: function() {

        var redirectUrl = Ext.Object.toQueryString({
            redirect_uri: window.location.protocol + "//" + window.location.host + window.location.pathname,
            client_id: StartStop.app.facebookAppId,
            response_type: 'token'
        });

        this.setHtml([
            '<div class="teaser"><p>Beat your pals in this trivia game and #rockonwithyournerdself</p></div>',
            '<a class="fbLogin" href="https://m.facebook.com/dialog/oauth?' + redirectUrl + '"></a>',
            '<div class="fb-facepile" data-app-id="' + StartStop.app.facebookAppId + '" data-max-rows="2" data-width="300"></div>'
        ].join(''));

        FB.XFBML.parse(document.getElementById('splash'));
    }
});