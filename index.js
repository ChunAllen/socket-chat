var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 3000

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// Acts as the receiver
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('User disconnected');
    io.emit('disconnect', 'A user has been disconnected');
  });
});

http.listen(port, () => console.log(`Socket Chat listening on port ${port}!`))
