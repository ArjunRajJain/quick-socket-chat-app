const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var rug = require('random-username-generator');
// rug.setName(['new name']);
// rug.setAdjectives(['new adjective']);
let port = process.env.PORT ? process.env.PORT : 3003;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var user = rug.generate();

app.get('/initMessages',(req,res)=> {
  res.json({
    messages:[
      {msg:'first message',username:user},
      {msg:'second message',username:user},
      {msg:'third message',username:user},
      {msg:'fourth message',username:user},
      {msg:'fifth message',username:user},
    ]
  })
})

io.on('connection', (socket) => {
  socket.emit('username',rug.generate());
  //receive message from user
  socket.on('chat message', ({msg,username}) => {
    io.emit('chat message', {msg,username}); //broadcast message to user
  });
});


server.listen(port, () => {
  console.log('listening on *:3000');
});