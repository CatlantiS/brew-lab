(function() {
    module.exports = function () {
        console.log('calling oath config');
        var oauth2lib = require('oauth20-provider/lib/');
        var obj = new oauth2lib({log: {level: 0}});
        var model = require('./model/');
        var db = require('./model/db.js');
        var User = db.User;
        var Client = db.Client;

        User.find({ userId: 1 }, function(err, obj) {
           if (err)
           {
               console.log(err);
           }
           else if (obj.length === 0){
               User.create({ userId : 1, userName: 'brewuser', password: 'meow', secret: 'secret'}, function(err, obj) {
                  if (err)
                  {
                      console.log(err);
                  }
                   else {
                      console.log('created user with id = ' + obj._id);
                  }
               });
           }
            else
           {
               console.log('User table already seeded.');
           }
        });

        Client.find({ clientId: 1 }, function(err, obj) {
           if (err) {
               console.log(err);
           }
            else if (obj.length === 0) {
               Client.create({ clientId: 1, name: 'Default Client', redirectUri: '/secure' }, function(err, obj) {
                   if (err) {
                       console.log(err);
                   }
                   else {
                       console.log('created client with id = ' + obj._id);
                   }
               });
           }
            else {
               console.log('Client table already seeded.');
           }
        });

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