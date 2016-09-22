var socket = io();

//CONNECT
$('#connection form').submit(function (e) {

    e.preventDefault();
    var user = {

        username: $('#connection form > input').val().trim()

    };
    if (user.username.length > 0 && user.username.match('^[a-zA-Z]{3,16}$')) {

        socket.emit('connectionLogin', user);
        $('#connection').remove();
        $('#mainpage').css('display', 'block');
    
    }

});
//---------

//SENDMESSAGE
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
//___________

//RECEIVEMESSAGE

function scrollMessagesToBottom () {
    
    var heightToScroll = parseFloat($('#messages').css('height')),
        wrapperHeight = parseFloat($('#messageWrapper').css('height'));
    if (heightToScroll > wrapperHeight) {

        $('#messageWrapper').animate({ scrollTop: heightToScroll }, 1)
    
    }

};

socket.on('receiveMessage', function (message) {

    $('#messages').append('<li><p><span class="author">'+message.username+': </span> '+message.content+'</p></li>');
    scrollMessagesToBottom();

});

//INFOMESSAGE
socket.on('receiveInfoMessage', function (message) {

    $('#messages').append('<li class="infoMessage"><p><span class="author">'+message.username+': </span> '+message.content+'</p></li>');
    scrollMessagesToBottom();

});
//--------------