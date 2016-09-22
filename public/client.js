var socket = io();

//CONNCTION
$('#connection form').submit(function (e) {
    e.preventDefault();
    var user = {
        username: $('#connection form > input').val().trim()
    };
    if (user.username.length > 0 && user.username.match('^[a-zA-Z]{3,16}$')) {
        socket.emit('connectionLogin', user);
        $('#connection').remove();
        $('#mainpage').fadeIn();
    }
});
//---------

$('#chat form').submit(function(e) {

    e.preventDefault();
    var message = {
        content : $('#messageContent').val()
    }    

    if (message.content.trim().length !== 0) {

        socket.emit('sendMessage', message);

    }

    $('#messageContent').val('');
    $('#chat input').focus();

});

//RECEIVEMESSAGE
socket.on('receiveMessage', function (message) {
    $('#messages').append('<li><p><span class="author">'+message.username+': </span> '+message.content+'</p></li>');
});
//--------------