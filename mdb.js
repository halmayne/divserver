/**
 * User: halmayne
 * Date: 6/3/13
 * Time: 11:00 AM
 */
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;



mdb = function() {
   
};

mdb.prototype.connect = function (host, port) {

    this.db= new Db('cog_store', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
    this.db.open(function(){});
    
}

mdb.prototype.getCollection= function(callback) {

    this.db.collection('cogs', function(error, cog_collection) {
        if( error ) callback(error);
        else callback(null, cog_collection);
    });
};


mdb.prototype.find = function(id, callback) {
    this.getCollection(function(error, cog_collection) {
        if( error ) callback(error)
        else {
            cog_collection.findOne({ "_id" : ObjectID(id)},function(error, result) {
                if( error ) callback(error)
                else callback(null, result)
            });
        }
    });
};


mdb.prototype.save = function(cogs, callback) {
    this.getCollection(function(error, cog_collection) {
        if (!error) {
            if (typeof(cogs.length) == "undefined")
                cogs = [cogs];

            //TODO: check if saveable behavior exists

            for (var i = 0; i < cogs.length; i++) {
                var cog = cogs[i].toJSON();
                cog.saved_at = new Date();
                cogs[i] = cog;
            }

            cog_collection.insert(cogs, function () {
                callback(null, cogs);
            });
        } else {
            callback(error)
        }
    });
};



exports.mdb = mdb;
