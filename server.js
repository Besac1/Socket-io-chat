var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/", express.static(__dirname + "/public"));

http.listen(3000, function(){
    console.log('Server is listening on *:3000');
});

io.on('connection', function(socket){

    var loggedUser;

    //CONNECT
    socket.on('connectionLogin', function (user) {

        loggedUser = user;
        var messageToSend = {

            username: 'INFO',
            content: 'Un nouvel utilisateur a rejoint le salon : ' + user.username

        };
        socket.broadcast.emit('receiveInfoMessage', messageToSend);

    });
    //________

    //DISCONNECT
    socket.on('disconnect', function(){

        var messageToSend = {

            username: 'INFO',
            content: 'Un utilisateur a quitté le salon'

        };
        socket.broadcast.emit('receiveInfoMessage', messageToSend);

    });
    //__________


    //MESSAGES
    socket.on('sendMessage', function (receivedMessage) {

        var messageToSend = {

            username: loggedUser.username,
            content: receivedMessage.content

        }
        io.emit('receiveMessage', messageToSend);

    });
    //--------

});