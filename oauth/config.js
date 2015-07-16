(function() {
    module.exports = function () {
        var oauth2lib = require('oauth20-provider/lib/');
        var obj = new oauth2lib({log: {level: 0}});
        var model = require('./model/');

        //client methods
        obj.model.client.fetchById = model.client.fetchById;
        obj.model.client.getRedirectUri = model.client.getRedirectUri;
        obj.model.client.getId = model.client.getId;
        obj.model.client.checkSecret = model.client.checkSecret;

        // user methods
        obj.model.user.getId = model.user.getId;
        obj.model.user.fetchById = model.user.fetchById;
        obj.model.user.fetchByUsername = model.user.fetchByUsername;
        obj.model.user.fetchFromRequest = model.user.fetchFromRequest;
        obj.model.user.checkPassword = model.user.checkPassword;

        // refresh token
        obj.model.refreshToken.removeByUserIdClientId = model.refreshToken.removeByUserIdClientId;
        obj.model.refreshToken.create = model.refreshToken.create;

        // accessToken
        obj.model.accessToken.create = model.accessToken.create;
        obj.model.accessToken.getToken = model.accessToken.getToken;
        obj.model.accessToken.fetchByToken = model.accessToken.fetchByToken;
        obj.model.accessToken.checkTTL = model.accessToken.checkTTL;
        obj.model.accessToken.getTTL = model.accessToken.getTTL;

        return obj;
    };
})();