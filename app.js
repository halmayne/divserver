
/**
 * Module dependencies.
 */



var express 	= require('express'),
    routes      = require('./routes') ,
    user        = require('./routes/user'),
    http        = require('http'),
    app			= express(),
    server  	= http.createServer(app),
    io      	= require('socket.io').listen(server),
    path        = require('path'),
    port    	= 8080,

// hash object to save clients data,
// { socketid: { clientid, nickname }, socketid: { ... } }
    chatClients = new Object();

// listening to port...
server.listen(port);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);


var widget0 = io
    .of('/widget0')
    .on('connection', function (socket) {
        socket.emit('a message', {
            that: 'only'
            , '/chat': 'will get'
        });
        widget0.emit('a message', {
            everyone: 'in'
            , '/chat': 'will get'
        });
    });

var widget1 = io
    .of('/widget1')
    .on('connection', function (socket) {
        socket.emit('item', { news: 'item' });
    });


var term = io
    .of('/term')
    .on('connection', function (socket) {
            socket.emit('message', { message: 'hi' });
            socket.on('line', function(data,callback) {
                console.log('didit');
                callback('hi'); //({response:'recv: ' + data.line});

            })
    });






console.log('Chat server is running and listening to port %d...', port);
