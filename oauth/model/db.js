var mongoose = require('mongoose');
//var userSchema = new mongoose.Schema({ userId: Number, userName: String, firstName: String, LastName: String, Email: String, password: String, secret: String });
//var User = mongoose.model('users', userSchema);
var User = require('../../db_mongo/User.js').User;
var clientSchema = new mongoose.Schema({ clientId: Number, name: String, secret: String, redirectUri: String });
var Client = mongoose.model('clients', clientSchema);

module.exports.User = User;
module.exports.Client = Client;
