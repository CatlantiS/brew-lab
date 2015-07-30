var mongoose = require('mongoose');
var User = require('../../db_mongo/User.js').User;
var clientSchema = new mongoose.Schema({ clientId: Number, name: String, secret: String, redirectUri: String });
var Client = mongoose.model('clients', clientSchema);

module.exports.User = User;
module.exports.Client = Client;
