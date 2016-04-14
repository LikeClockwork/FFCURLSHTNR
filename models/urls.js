// The url model

var shortid = require('shortid');

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var urlSchema = new Schema({
    urlId: ObjectId,
    short: {type: String, unique: true, 'default': shortid.generate},
    long: {type: String}
});

module.exports = mongoose.model('Urls', urlSchema);