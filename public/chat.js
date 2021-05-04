$(document).ready(function() {

    var socket = io.connect('http://localhost:3000')

    var username = $("#username");
    
    var change_username = $("#change_username");

    var feedback = $("#feedback");

    var message = $("#message");
    
    var change_message = $("#change_message");

    change_message.click(function () {
        socket.emit('new_message', {message:message.val()})
    })

    socket.on('new_message', (data) => {
        //feedback.html('');
        message.val();

        feedback.append('<p>' + data.username + ":" + data.message + "</p>");
    })
    change_username.click(function(){
        socket.emit('change_username', {
            username:username.val()
        });

        socket.on('change_username', (data)=>{
            socket.username = data.username;
        })
    });

    message.bind('keypress', () => {
        socket.emit('typing')
    })
    socket.on('typing', (data) =>{
        feedback.html('<p><i>' + data.username + " is typing a message..." + "</i></p>")
    })
});
